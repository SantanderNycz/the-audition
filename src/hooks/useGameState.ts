import { useReducer } from 'react'
import type { GameState, GameAction } from '../types/game'
import {
  resolveEnding,
  mergeFlags,
  resolveS3,
  resolveS4,
  resolveDirectorNote,
  shouldShowDirectorNote2,
} from '../engine/storyEngine'
import { scenesMap } from '../data/scenes'

const initialState: GameState = {
  playerName: '',
  currentSceneId: 'p1',
  toneScore: 0,
  flags: {},
  elliotOpenness: 0,
  choiceLog: [],
  silenceCount: 0,
  phase: 'synopsis',
}

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME': {
      const flags = action.actorStyle ? { actorStyle: action.actorStyle } : {}
      return {
        ...initialState,
        playerName: action.playerName,
        flags,
        phase: 'playing',
      }
    }

    case 'MAKE_CHOICE': {
      const { choice } = action
      const newScore = state.toneScore + choice.toneValue
      const newFlags = choice.setsFlag ? mergeFlags(state.flags, choice.setsFlag) : state.flags
      const newLog = [
        ...state.choiceLog,
        { sceneId: state.currentSceneId, choiceId: choice.id, tone: choice.tone },
      ]

      const newSilenceCount = choice.id.includes('silence')
        ? state.silenceCount + 1
        : state.silenceCount

      // Update elliotOpenness after director scenes
      const currentScene = scenesMap.get(state.currentSceneId)
      const isDirectorScene = currentScene?.type === 'director'
      const resistiu = !!newFlags.resistedNote
      const newElliotOpenness = isDirectorScene
        ? resolveDirectorNote(newScore, resistiu, state.elliotOpenness)
        : state.elliotOpenness

      let nextId = choice.nextSceneId

      if (nextId === 'ending') {
        return {
          ...state,
          toneScore: newScore,
          flags: newFlags,
          choiceLog: newLog,
          silenceCount: newSilenceCount,
          elliotOpenness: newElliotOpenness,
          phase: 'ending',
          endingId: resolveEnding(newScore),
        }
      }

      // Resolve virtual router scenes
      if (nextId === 's3_router') nextId = resolveS3(newFlags)
      if (nextId === 's4_router') nextId = resolveS4(newFlags)

      // Conditionally skip director_note_2
      if (
        nextId === 'director_note_2' &&
        !shouldShowDirectorNote2(newScore, !!newFlags.resistedNote)
      ) {
        nextId = 's5'
      }

      // Compute lightPath flag when entering s6
      let finalFlags = newFlags
      if (nextId === 's6') {
        finalFlags = mergeFlags(newFlags, { lightPath: newScore >= 0 })
      }

      return {
        ...state,
        currentSceneId: nextId,
        toneScore: newScore,
        flags: finalFlags,
        choiceLog: newLog,
        silenceCount: newSilenceCount,
        elliotOpenness: newElliotOpenness,
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
