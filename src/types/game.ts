export type Tone = 'light' | 'dark'

export type Flag = {
  family?: 'together' | 'apart'
  bond?: 'strong' | 'medium' | 'weak'
  storm?: 'shared' | 'solo'
  boat?: 'action' | 'hesitation'
}

export type Choice = {
  id: string
  label: string
  tone: Tone
  toneValue: number
  elliotReaction: string
  setsFlag?: Partial<Flag>
  nextSceneId: string
}

export type SceneVariant = {
  id: string
  condition: Partial<Flag>
  narration: string
  elliotPrompt: string | null
  choices: [Choice, Choice]
}

export type Scene = {
  id: string
  act: number
  title: string
  variants: SceneVariant[]
}

export type EndingId =
  | 'ending_light_a'
  | 'ending_light_b'
  | 'ending_dark_a'
  | 'ending_dark_b'

export type GameState = {
  playerName: string
  currentSceneId: string
  toneScore: number
  flags: Flag
  choiceLog: { sceneId: string; choiceId: string; tone: Tone }[]
  phase: 'intro' | 'playing' | 'ending'
  endingId?: EndingId
}

export type GameAction =
  | { type: 'START_GAME'; playerName: string }
  | { type: 'MAKE_CHOICE'; choice: Choice }
  | { type: 'RESOLVE_ENDING' }
  | { type: 'RESTART' }
