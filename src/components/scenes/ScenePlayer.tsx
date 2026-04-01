import { useState, useEffect, useRef } from 'react'
import { StudioLayout } from '../layout/StudioLayout'
import { FadeWrapper } from '../ui/FadeWrapper'
import { ChoiceButton } from '../ui/ChoiceButton'
import { DialogueBubble } from '../ui/DialogueBubble'
import { StageBackground, resolveBackground } from './StageBackground'
import { scenesMap } from '../../data/scenes'
import { resolveVariant, ACT_TITLES } from '../../engine/storyEngine'
import type { GameState, GameAction, Choice } from '../../types/game'

interface ScenePlayerProps {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

const PROGRESS_TOTAL = 6
const SILENCE_HINT_MS = 6000
const SILENCE_TRIGGER_MS = 8000

function getOptionLabel(sceneType: string, index: number, totalChoices: number): string {
  // Last choice in a question scene is the skip option
  if (sceneType === 'question' && index === totalChoices - 1) return '—'
  return ['A', 'B', 'C', 'D'][index] ?? String(index + 1)
}

export function ScenePlayer({ state, dispatch }: ScenePlayerProps) {
  const scene = scenesMap.get(state.currentSceneId)!
  const variant = resolveVariant(scene, state.flags)
  const isAdvance = scene.type === 'advance'

  const [uiPhase, setUiPhase] = useState<'reading' | 'reacting'>('reading')
  const [pendingChoice, setPendingChoice] = useState<Choice | null>(null)
  const [showSilenceHint, setShowSilenceHint] = useState(false)
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const triggerTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setUiPhase('reading')
    setPendingChoice(null)
    setShowSilenceHint(false)
  }, [state.currentSceneId])

  // Silence timers — only when in reading phase and scene has a silenceChoice
  useEffect(() => {
    if (uiPhase !== 'reading' || !variant.silenceChoice) return

    hintTimer.current = setTimeout(() => setShowSilenceHint(true), SILENCE_HINT_MS)
    triggerTimer.current = setTimeout(() => {
      handleChoice(variant.silenceChoice!)
    }, SILENCE_TRIGGER_MS)

    return () => {
      if (hintTimer.current) clearTimeout(hintTimer.current)
      if (triggerTimer.current) clearTimeout(triggerTimer.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiPhase, state.currentSceneId])

  function cancelSilenceTimers() {
    if (hintTimer.current) clearTimeout(hintTimer.current)
    if (triggerTimer.current) clearTimeout(triggerTimer.current)
    setShowSilenceHint(false)
  }

  function handleChoice(choice: Choice) {
    cancelSilenceTimers()
    setPendingChoice(choice)
    setUiPhase('reacting')
  }

  function handleContinue() {
    if (pendingChoice) {
      dispatch({ type: 'MAKE_CHOICE', choice: pendingChoice })
    }
  }

  const progressDone = state.choiceLog.length

  return (
    <StudioLayout background={<StageBackground scene={resolveBackground(state.currentSceneId)} />}>
      <FadeWrapper key={state.currentSceneId} duration={700}>
        {/* Act header + progress */}
        <div className="flex items-center justify-between mb-8">
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-studio-gold/60">
            ATO {scene.act} · {ACT_TITLES[scene.act] ?? ''}
          </span>
          <div className="flex gap-2 items-center">
            {Array.from({ length: PROGRESS_TOTAL }).map((_, i) => (
              <span
                key={i}
                className={`block rounded-full transition-all duration-500 ${
                  i < progressDone
                    ? 'w-2 h-2 bg-studio-gold/70'
                    : i === progressDone
                    ? 'w-2 h-2 bg-studio-silver/60'
                    : 'w-1.5 h-1.5 bg-studio-border/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scene title */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl text-studio-warm font-semibold tracking-wide">
            {scene.title}
          </h2>
          <div className="w-10 h-px bg-studio-gold/40 mt-3" />
        </div>

        {/* Narration */}
        <p className="font-serif text-studio-silver/70 text-base leading-loose mb-8">
          {variant.narration}
        </p>

        {/* ── READING phase ── */}
        {uiPhase === 'reading' && (
          <FadeWrapper key="reading" duration={600}>
            {/* Elliot state (stage direction) */}
            {variant.elliotState && (
              <p className="font-sans text-xs text-studio-dim/50 italic tracking-wide mb-4">
                {variant.elliotState}
              </p>
            )}

            {/* Elliot's prompt */}
            {variant.elliotPrompt && !isAdvance && (
              <div className="mb-6">
                <DialogueBubble text={variant.elliotPrompt} />
              </div>
            )}

            {isAdvance ? (
              <button
                onClick={() => handleChoice(variant.choices[0])}
                className="mt-4 font-sans text-xs tracking-[0.25em] uppercase text-studio-dim/50 hover:text-studio-dim transition-colors duration-300 flex items-center gap-3"
              >
                <span className="w-5 h-px bg-current" />
                continuar
              </button>
            ) : (
              <div className="space-y-3" onClick={cancelSilenceTimers}>
                {variant.choices.map((choice, i) => (
                  <ChoiceButton
                    key={choice.id}
                    index={i}
                    optionLabel={getOptionLabel(scene.type, i, variant.choices.length)}
                    text={choice.label}
                    onClick={() => handleChoice(choice)}
                  />
                ))}

                {/* Silence hint — fades in after SILENCE_HINT_MS of inactivity */}
                {showSilenceHint && variant.silenceChoice && (
                  <button
                    onClick={() => handleChoice(variant.silenceChoice!)}
                    className="mt-4 font-sans text-xs tracking-[0.25em] uppercase text-studio-dim/30 hover:text-studio-dim/60 transition-colors duration-500 flex items-center gap-3 italic"
                  >
                    <span className="w-5 h-px bg-current" />
                    {variant.silenceChoice.label || 'permanecer em silêncio'}
                  </button>
                )}
              </div>
            )}
          </FadeWrapper>
        )}

        {/* ── REACTING phase ── */}
        {uiPhase === 'reacting' && pendingChoice && (
          <FadeWrapper key="reacting" duration={600}>
            <div className="space-y-6">
              {pendingChoice.elliotReaction && (
                pendingChoice.elliotReaction.startsWith('[') ? (
                  <p className="font-sans text-xs text-studio-dim/50 italic tracking-wide">
                    {pendingChoice.elliotReaction}
                  </p>
                ) : (
                  <DialogueBubble text={pendingChoice.elliotReaction} />
                )
              )}

              <button
                onClick={handleContinue}
                className="font-sans text-xs tracking-[0.25em] uppercase text-studio-dim/50 hover:text-studio-dim transition-colors duration-300 flex items-center gap-3"
              >
                <span className="w-5 h-px bg-current" />
                {scene.id === 's6' ? 'ver o resultado' : 'próxima cena'}
              </button>
            </div>
          </FadeWrapper>
        )}
      </FadeWrapper>
    </StudioLayout>
  )
}
