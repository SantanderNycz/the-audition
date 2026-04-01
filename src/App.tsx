import { useGameState } from './hooks/useGameState'
import { Intro } from './components/scenes/Intro'
import { ScenePlayer } from './components/scenes/ScenePlayer'
import { EndingLight } from './components/scenes/EndingLight'
import { EndingDark } from './components/scenes/EndingDark'

export function App() {
  const { state, dispatch } = useGameState()

  if (state.phase === 'synopsis') {
    return <Intro dispatch={dispatch} />
  }

  if (state.phase === 'ending') {
    const isLight =
      state.endingId === 'ending_light_a' || state.endingId === 'ending_light_b'
    if (isLight) return <EndingLight state={state} dispatch={dispatch} />
    return <EndingDark state={state} dispatch={dispatch} />
  }

  return <ScenePlayer state={state} dispatch={dispatch} />
}
