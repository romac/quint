// A step is identified by its complete path through any and oneOf. Store actual
// values so a pick still denotes the same event when a set grows or is reordered.
import { RuntimeValue, containsChoice, finiteChoices } from '../impl/runtimeValue'

export interface Decision {
  site: bigint
  value: RuntimeValue
}
export type Event = readonly Decision[]

export class WorkLimit extends Error {}

export interface ChoiceSource {
  select(site: bigint, domain: RuntimeValue): RuntimeValue | undefined
}

export function sameEvent(left: Event, right: Event): boolean {
  return (
    left.length === right.length && left.every((d, i) => d.site === right[i].site && d.value.equals(right[i].value))
  )
}

interface Frame extends Decision {
  alternatives: Iterator<RuntimeValue>
}

/** Depth-first enumeration of the choice tree inside one evaluation. Each
 * iterator belongs to its prefix, including when a later domain depends on an
 * earlier pick. Re-running the expression only retains the unchanged prefix. */
export class EnumerateChoices implements ChoiceSource {
  private frames: Frame[] = []
  private index = 0

  select(site: bigint, domain: RuntimeValue): RuntimeValue | undefined {
    if (this.index < this.frames.length) {
      const frame = this.frames[this.index++]
      if (frame.site !== site) throw new Error('Choice prefix diverged during enumeration')
      return frame.value
    }
    const alternatives = finiteChoices(domain)[Symbol.iterator]()
    const first = alternatives.next()
    if (first.done) return undefined
    this.frames.push({ site, value: first.value, alternatives })
    this.index++
    return first.value
  }

  event(): Event {
    return this.frames.map(({ site, value }) => ({ site, value }))
  }

  advance(): boolean {
    this.index = 0
    while (this.frames.length) {
      const frame = this.frames[this.frames.length - 1]
      const next = frame.alternatives.next()
      if (!next.done) {
        frame.value = next.value
        return true
      }
      this.frames.pop()
    }
    return false
  }
}

export class ReplayChoices implements ChoiceSource {
  private index = 0
  private matched = true
  constructor(private readonly event: Event) {}

  select(site: bigint, domain: RuntimeValue): RuntimeValue | undefined {
    finiteChoices(domain) // Replay has the same finite-domain contract as enumeration.
    const choice = this.event[this.index++]
    if (!choice || choice.site !== site || !containsChoice(domain, choice.value)) {
      this.matched = false
      return undefined
    }
    return choice.value
  }

  get complete(): boolean {
    return this.matched && this.index === this.event.length
  }
}
