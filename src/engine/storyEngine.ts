import type { Scene, SceneVariant, Flag, EndingId } from '../types/game'

// Returns the first variant whose conditions all match the current flags.
// An empty condition {} always matches — use as the fallback/last variant.
export function resolveVariant(scene: Scene, flags: Flag): SceneVariant {
  return (
    scene.variants.find((v) =>
      Object.entries(v.condition).every(
        ([k, val]) => flags[k as keyof Flag] === val
      )
    ) ?? scene.variants[scene.variants.length - 1]
  )
}

// toneScore thresholds: max 6 (1+1+1+1+2), min -6 (-1-1-1-1-2)
export function resolveEnding(toneScore: number): EndingId {
  if (toneScore >= 5) return 'ending_light_a'
  if (toneScore >= 3) return 'ending_light_b'
  if (toneScore >= 1) return 'ending_dark_a'
  return 'ending_dark_b'
}

export function mergeFlags(current: Flag, incoming: Partial<Flag>): Flag {
  return { ...current, ...incoming }
}

export const ACT_TITLES: Record<number, string> = {
  1: 'A DECISÃO',
  2: 'A VIDA NO FAROL',
  3: 'O INEVITÁVEL',
}
