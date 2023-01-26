/* ----------------------------------------------------------------------------------
 * Copyright (c) Informal Systems 2023. All rights reserved.
 * Licensed under the Apache 2.0.
 * See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------- */

/**
 * This module is a wrapper for Quint's static analysis.
 *
 * @author Gabriela Moreira
 *
 * @module
 */

import { ErrorTree } from "./errorTree"
import { LookupTableByModule } from "./lookupTable"
import { OpQualifier, QuintModule } from "./quintIr"
import { TypeScheme } from "./types/base"
import { TypeInferrer } from "./types/inferrer"
import { Effect } from "./effects/base"
import { EffectInferrer } from "./effects/inferrer"
import { FreshVarGenerator } from "./FreshVarGenerator"
import { ModeChecker } from "./effects/modeChecker"

/* Products from static analysis */
export type AnalyzisOutput = {
  types: Map<bigint, TypeScheme>,
  effects: Map<bigint, Effect>,
  modes: Map<bigint, OpQualifier>,
}

/* A list of errors and the analysis output */
export type AnalysisResult = [[bigint, ErrorTree][], AnalyzisOutput]

/**
 * Statically analyzes a Quint specification.
 *
 * @param lookupTable - The lookup tables for the modules.
 */
export class QuintAnalyzer {
  private effectInferrer: EffectInferrer
  private typeInferrer: TypeInferrer
  private modeChecker: ModeChecker

  private errors: [bigint, ErrorTree][] = []
  private output: AnalyzisOutput = { types: new Map(), effects: new Map(), modes: new Map() }

  constructor(lookupTable: LookupTableByModule) {
    const freshVarGenerator = new FreshVarGenerator()
    this.typeInferrer = new TypeInferrer(lookupTable, freshVarGenerator)
    this.effectInferrer = new EffectInferrer(lookupTable, freshVarGenerator)
    this.modeChecker = new ModeChecker()
  }

  analyze(module: QuintModule): void {
    const [typeErrMap, types] = this.typeInferrer.inferTypes(module)
    const [effectErrMap, effects] = this.effectInferrer.inferEffects(module)
    const [modeErrMap, modes] = this.modeChecker.checkModes(module, effects)

    this.errors = [...this.errors, ...typeErrMap, ...effectErrMap, ...modeErrMap]
    this.output = {
      types: new Map([...this.output.types, ...types]),
      effects: new Map([...this.output.effects, ...effects]),
      modes: new Map([...this.output.modes, ...modes]),
    }
  }

  getResult(): AnalysisResult {
    return [this.errors, this.output]
  }
}
