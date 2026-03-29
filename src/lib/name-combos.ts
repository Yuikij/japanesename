import type { NameRecord, FullNameCombo } from '@/types/name-page'

function union(a?: string[], b?: string[]): string[] {
  return [...new Set([...(a ?? []), ...(b ?? [])])]
}

function hasOverlap(a?: string[], b?: string[]): boolean {
  if (!a?.length || !b?.length) return false
  return a.some(v => b.includes(v))
}

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return s / 2147483647
  }
}

/**
 * Generate curated full-name combos by pairing family + given names.
 * Pairs names with compatible vibes/elements for natural-sounding combos.
 * Uses a deterministic seed so SSG produces consistent output.
 */
export function generateCombos(
  names: NameRecord[],
  maxCombos = 200,
  seed = 42
): FullNameCombo[] {
  const givenNames = names.filter(n => n.name_part === 'given_name')
  const familyNames = names.filter(n => n.name_part === 'family_name')

  if (givenNames.length === 0 || familyNames.length === 0) return []

  const combos: FullNameCombo[] = []
  const usedGivenIds = new Set<string>()
  const rand = seededRandom(seed)

  const shuffledGiven = [...givenNames].sort(() => rand() - 0.5)
  const shuffledFamily = [...familyNames].sort(() => rand() - 0.5)

  for (const given of shuffledGiven) {
    if (combos.length >= maxCombos) break

    let bestFamily: NameRecord | null = null
    let bestScore = -1

    for (const family of shuffledFamily) {
      let score = 1
      if (hasOverlap(family.vibe, given.vibe)) score += 2
      if (hasOverlap(family.element, given.element)) score += 1
      if (family.era === given.era) score += 1

      if (score > bestScore) {
        bestScore = score
        bestFamily = family
      }
    }

    if (!bestFamily) continue

    const comboId = `${bestFamily.id}_${given.id}`
    combos.push({
      id: comboId,
      family: bestFamily,
      given,
      fullKanji: `${bestFamily.kanji}${given.kanji}`,
      fullReading: `${bestFamily.reading} ${given.reading}`,
      fullRomaji: `${bestFamily.romaji} ${given.romaji}`,
      combinedVibes: union(bestFamily.vibe, given.vibe),
      combinedElements: union(bestFamily.element, given.element),
      era: given.era ?? bestFamily.era ?? 'modern',
    })

    usedGivenIds.add(given.id)
  }

  // Fill remaining slots with random pairings if needed
  if (combos.length < maxCombos && givenNames.length > 0 && familyNames.length > 0) {
    for (let i = combos.length; i < maxCombos; i++) {
      const g = givenNames[Math.floor(rand() * givenNames.length)]
      const f = familyNames[Math.floor(rand() * familyNames.length)]
      const comboId = `${f.id}_${g.id}`
      if (combos.some(c => c.id === comboId)) continue
      combos.push({
        id: comboId,
        family: f,
        given: g,
        fullKanji: `${f.kanji}${g.kanji}`,
        fullReading: `${f.reading} ${g.reading}`,
        fullRomaji: `${f.romaji} ${g.romaji}`,
        combinedVibes: union(f.vibe, g.vibe),
        combinedElements: union(f.element, g.element),
        era: g.era ?? f.era ?? 'modern',
      })
    }
  }

  return combos
}
