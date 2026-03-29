import type { FilterCondition, NameRecord, FullNameCombo } from '@/types/name-page'

function getFieldValue(name: NameRecord, field: string): unknown {
  return (name as unknown as Record<string, unknown>)[field]
}

function matchCondition(name: NameRecord, cond: FilterCondition): boolean {
  const val = getFieldValue(name, cond.field)

  switch (cond.op) {
    case 'eq':
      return val === cond.value

    case 'any_of': {
      const targets = Array.isArray(cond.value) ? cond.value : [cond.value]
      if (Array.isArray(val)) {
        return targets.some(t => (val as string[]).includes(t as string))
      }
      return targets.includes(val as string)
    }

    case 'all_of': {
      if (!Array.isArray(val) || !Array.isArray(cond.value)) return false
      return cond.value.every(t => (val as string[]).includes(t as string))
    }

    case 'contains': {
      if (Array.isArray(val)) {
        return (val as string[]).includes(cond.value as string)
      }
      if (typeof val === 'string' && typeof cond.value === 'string') {
        return val.toLowerCase().includes(cond.value.toLowerCase())
      }
      return false
    }

    case 'gte':
      return typeof val === 'number' && val >= Number(cond.value)
    case 'lte':
      return typeof val === 'number' && val <= Number(cond.value)
    case 'gt':
      return typeof val === 'number' && val > Number(cond.value)
    case 'lt':
      return typeof val === 'number' && val < Number(cond.value)

    default:
      return false
  }
}

export function filterNames(
  names: NameRecord[],
  mustConditions: FilterCondition[],
  shouldConditions: FilterCondition[] = []
): NameRecord[] {
  const mustPassed = names.filter(name =>
    mustConditions.every(c => matchCondition(name, c))
  )

  if (shouldConditions.length === 0) return mustPassed

  const scored = mustPassed.map(name => ({
    name,
    score: shouldConditions.reduce(
      (sum, c) => sum + (matchCondition(name, c) ? 1 : 0),
      0
    ),
  }))

  scored.sort((a, b) => b.score - a.score)
  return scored.map(s => s.name)
}

function matchComboCondition(combo: FullNameCombo, cond: FilterCondition): boolean {
  if (cond.field === 'vibe') {
    const arr = combo.combinedVibes
    if (cond.op === 'any_of') {
      const targets = Array.isArray(cond.value) ? cond.value : [cond.value]
      return targets.some(t => arr.includes(t as string))
    }
  }
  if (cond.field === 'element') {
    const arr = combo.combinedElements
    if (cond.op === 'any_of') {
      const targets = Array.isArray(cond.value) ? cond.value : [cond.value]
      return targets.some(t => arr.includes(t as string))
    }
  }
  if (cond.field === 'era') {
    if (cond.op === 'eq') return combo.era === cond.value
    if (cond.op === 'any_of') {
      const targets = Array.isArray(cond.value) ? cond.value : [cond.value]
      return targets.includes(combo.era)
    }
  }
  if (cond.field === 'popularity') {
    if (cond.op === 'any_of') {
      const targets = Array.isArray(cond.value) ? cond.value : [cond.value]
      const gPop = combo.given.popularity ?? ''
      const fPop = combo.family.popularity ?? ''
      return targets.includes(gPop) || targets.includes(fPop)
    }
  }
  return matchCondition(combo.given, cond) || matchCondition(combo.family, cond)
}

export function filterCombos(
  combos: FullNameCombo[],
  shouldConditions: FilterCondition[]
): FullNameCombo[] {
  if (shouldConditions.length === 0) return combos

  const scored = combos.map(combo => ({
    combo,
    score: shouldConditions.reduce(
      (sum, c) => sum + (matchComboCondition(combo, c) ? 1 : 0),
      0
    ),
  }))

  scored.sort((a, b) => b.score - a.score)
  return scored.filter(s => s.score > 0).map(s => s.combo)
}

export function splitByNamePart(names: NameRecord[]) {
  return {
    givenNames: names.filter(n => n.name_part === 'given_name'),
    familyNames: names.filter(n => n.name_part === 'family_name'),
  }
}

export function pickRandom<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined
  return arr[Math.floor(Math.random() * arr.length)]
}
