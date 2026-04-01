export type Tone = 'light' | 'dark' | 'neutral'

export type Flag = {
  family?:         'together' | 'apart'
  bond?:           'strong' | 'medium' | 'weak'
  storm?:          'shared' | 'solo'
  boat?:           'action' | 'hesitation'
  actorStyle?:     'prepared' | 'raw'
  elliotWarmth?:   'warm' | 'neutral' | 'cold'
  usedSilence?:    boolean
  brokeCharacter?: boolean
  resistedNote?:   boolean
  lightPath?:      boolean   // computed when entering S6
}

export type Choice = {
  id:              string
  label:           string
  tone:            Tone
  toneValue:       number
  elliotReaction:  string
  setsFlag?:       Partial<Flag>
  nextSceneId:     string
}

export type SceneType =
  | 'choice'      // cena normal com 2 opções
  | 'director'    // "Elliot Para" — seguir nota ou resistir
  | 'question'    // "A Pergunta" — 3 opções + skip
  | 'advance'     // cena de leitura, só botão continuar (S5)

export type SceneVariant = {
  id:             string
  condition:      Partial<Flag>
  narration:      string
  elliotState:    string
  elliotPrompt:   string | null
  choices:        Choice[]
  silenceChoice?: Choice
}

export type Scene = {
  id:       string
  act:      number
  title:    string
  type:     SceneType
  variants: SceneVariant[]
}

export type EndingId =
  | 'ending_light_a'
  | 'ending_light_b'
  | 'ending_dark_a'
  | 'ending_dark_b'

export type GameState = {
  playerName:     string
  currentSceneId: string
  toneScore:      number
  flags:          Flag
  elliotOpenness: number      // -2 a 2 — afeta reações de Elliot
  choiceLog:      { sceneId: string; choiceId: string; tone: Tone }[]
  silenceCount:   number
  phase:          'synopsis' | 'intro' | 'playing' | 'ending'
  endingId?:      EndingId
}

export type GameAction =
  | { type: 'START_GAME'; playerName: string; actorStyle?: 'prepared' | 'raw' }
  | { type: 'MAKE_CHOICE'; choice: Choice }
  | { type: 'RESOLVE_ENDING' }
  | { type: 'RESTART' }
