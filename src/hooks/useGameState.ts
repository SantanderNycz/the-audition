import { useReducer } from 'react'
import type { GameState, GameAction } from '../types/game'
import { resolveEnding, mergeFlags } from '../engine/storyEngine'

const initialState: GameState = {
  playerName: '',
  currentSceneId: 's1',
  toneScore: 0,
  flags: {},
  choiceLog: [],
  phase: 'intro',
}

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return { ...initialState, playerName: action.playerName, phase: 'playing' }

    case 'MAKE_CHOICE': {
      const { choice } = action
      const newScore = state.toneScore + choice.toneValue
      const newFlags = choice.setsFlag ? mergeFlags(state.flags, choice.setsFlag) : state.flags
      const newLog = [
        ...state.choiceLog,
        { sceneId: state.currentSceneId, choiceId: choice.id, tone: choice.tone },
      ]

      if (choice.nextSceneId === 'ending') {
        return {
          ...state,
          toneScore: newScore,
          flags: newFlags,
          choiceLog: newLog,
          phase: 'ending',
          endingId: resolveEnding(newScore),
        }
      }

      return {
        ...state,
        currentSceneId: choice.nextSceneId,
        toneScore: newScore,
        flags: newFlags,
        choiceLog: newLog,
      }
    }

    case 'RESOLVE_ENDING':
      return {
        ...state,
        phase: 'ending',
        endingId: resolveEnding(state.toneScore),
      }

    case 'RESTART':
      return { ...initialState }

    default:
      return state
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return { state, dispatch }
}
