import type { Scene, SceneVariant, Flag, EndingId } from '../types/game'

// Returns the first variant whose every condition key matches the current flags.
// A variant with condition:{} always matches — use as last-resort fallback.
export function resolveVariant(scene: Scene, flags: Flag): SceneVariant {
  return (
    scene.variants.find((v) =>
      Object.entries(v.condition).every(
        ([k, val]) => flags[k as keyof Flag] === val
      )
    ) ?? scene.variants[scene.variants.length - 1]
  )
}

// toneScore range: -8 to +8
export function resolveEnding(toneScore: number): EndingId {
  if (toneScore >= 5)  return 'ending_light_a'
  if (toneScore >= 2)  return 'ending_light_b'
  if (toneScore >= -1) return 'ending_dark_a'
  return 'ending_dark_b'
}

export function mergeFlags(current: Flag, incoming: Partial<Flag>): Flag {
  return { ...current, ...incoming }
}

// Update elliotOpenness after a director note scene
export function resolveDirectorNote(
  toneScore: number,
  resistiu: boolean,
  current: number
): number {
  if (!resistiu) return current
  const delta = toneScore >= 3 ? 1 : -1
  return Math.max(-2, Math.min(2, current + delta))
}

// Route to the correct S3 scene based on accumulated flags
export function resolveS3(flags: Flag): string {
  if (flags.family === 'together') {
    return flags.bond === 'strong' ? 's3_ts' : 's3_tw'
  }
  return flags.bond === 'medium' ? 's3_am' : 's3_aw'
}

// Route to the correct S4 scene based on accumulated flags
export function resolveS4(flags: Flag): string {
  if (flags.family === 'together') {
    if (flags.bond !== 'weak') {
      return flags.storm === 'shared' ? 's4_ts_shared' : 's4_ts_solo'
    }
    return flags.storm === 'shared' ? 's4_tw_shared' : 's4_tw_solo'
  }
  if (flags.bond === 'medium') {
    return flags.storm === 'shared' ? 's4_am_connected' : 's4_am_silent'
  }
  return flags.storm === 'shared' ? 's4_aw_late' : 's4_aw_lost'
}

// Check whether director_note_2 should be shown
export function shouldShowDirectorNote2(toneScore: number, resistedNote: boolean): boolean {
  return (toneScore >= 3 && resistedNote) || (toneScore <= -3 && !resistedNote)
}

export const ACT_TITLES: Record<number, string> = {
  0: 'PRÓLOGO',
  1: 'A DECISÃO',
  2: 'A VIDA NO FAROL',
  3: 'O INEVITÁVEL',
}
