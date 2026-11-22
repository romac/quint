// Use ground Quint IR for pick values: this keeps maps, sets, variants, records
// and arbitrary-precision integers distinct. Site IDs refer to the same model.
import { Event } from './choices'
import { RuntimeValue, rv } from '../impl/runtimeValue'

export function writeSchedule(events: Event[]): string {
  return (
    JSON.stringify(
      {
        version: 1,
        events: events.map(event =>
          event.map(d => ({
            site: String(d.site),
            value: rv.toQuintEx(d.value),
          }))
        ),
      },
      (key, value) => (key === 'id' ? undefined : typeof value === 'bigint' ? String(value) : value),
      2
    ) + '\n'
  )
}

interface EncodedValue {
  kind?: string
  name?: string
  value?: unknown
  opcode?: string
  args?: EncodedValue[]
}

// Only ground constructors produced by the writer are accepted. In particular,
// a malformed boolean must never turn into a truthy string during replay.
export function readValue(input: unknown): RuntimeValue {
  const ex = input as EncodedValue | null
  if (ex?.kind === 'bool' && typeof ex.value === 'boolean') return rv.mkBool(ex.value)
  if (ex?.kind === 'str' && typeof ex.value === 'string') return rv.mkStr(ex.value)
  if (ex?.kind === 'int' && typeof ex.value === 'string' && /^-?\d+$/.test(ex.value)) return rv.mkInt(BigInt(ex.value))
  if (ex?.kind === 'name' && (ex.name === 'Nat' || ex.name === 'Int')) return rv.mkInfSet(ex.name)
  if (ex?.kind === 'app' && Array.isArray(ex.args)) {
    const args = ex.args
    switch (ex.opcode) {
      case 'Tup':
        return rv.mkTuple(args.map(readValue))
      case 'List':
        return rv.mkList(args.map(readValue))
      case 'Set':
        return rv.mkSet(args.map(readValue))
      case 'Map':
        return rv.mkMap(
          args.map(pair => {
            if (pair?.kind !== 'app' || pair.opcode !== 'Tup' || pair.args?.length !== 2)
              throw new Error('Expected a key-value pair in the schedule')
            return [readValue(pair.args[0]), readValue(pair.args[1])]
          })
        )
      case 'Rec': {
        const fields: [string, RuntimeValue][] = []
        for (let i = 0; i < args.length; i += 2) {
          const key = args[i]
          if (key?.kind !== 'str' || typeof key.value !== 'string') throw new Error('Invalid record field in schedule')
          fields.push([key.value, readValue(args[i + 1])])
        }
        return rv.mkRecord(fields)
      }
      case 'variant':
        if (args.length === 2 && args[0]?.kind === 'str' && typeof args[0].value === 'string')
          return rv.mkVariant(args[0].value, readValue(args[1]))
    }
  }
  throw new Error('Invalid Quint value in schedule')
}

export function readSchedule(text: string): Event[] {
  const schedule = JSON.parse(text)
  if (schedule?.version !== 1 || !Array.isArray(schedule.events) || !schedule.events.length) {
    throw new Error('Expected a version 1 Quint schedule with an initializer')
  }
  return schedule.events.map((event: unknown) => {
    if (!Array.isArray(event)) throw new Error('Expected an array of choices in the schedule')
    return event.map(d => {
      if (typeof d?.site !== 'string' || !/^\d+$/.test(d.site)) throw new Error('Invalid choice site in schedule')
      return { site: BigInt(d.site), value: readValue(d.value) }
    })
  })
}
