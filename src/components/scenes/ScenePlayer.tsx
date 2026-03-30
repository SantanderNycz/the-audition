import { useState, useEffect } from 'react'
import { StudioLayout } from '../layout/StudioLayout'
import { FadeWrapper } from '../ui/FadeWrapper'
import { ChoiceButton } from '../ui/ChoiceButton'
import { DialogueBubble } from '../ui/DialogueBubble'
import { scenesMap } from '../../data/scenes'
import { resolveVariant, ACT_TITLES } from '../../engine/storyEngine'
import type { GameState, GameAction, Choice } from '../../types/game'

interface ScenePlayerProps {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

// S5 is a read-only convergence scene — single [continuar] button, no choice display
const isReadScene = (sceneId: string) => sceneId === 's5'

// Total meaningful choice steps: S1 + S2 + S3 + S4 + S5 + S6 = 6
const PROGRESS_TOTAL = 6

export function ScenePlayer({ state, dispatch }: ScenePlayerProps) {
  const scene = scenesMap.get(state.currentSceneId)!
  const variant = resolveVariant(scene, state.flags)
  const readOnly = isReadScene(scene.id)

  const [phase, setPhase] = useState<'reading' | 'reacting'>('reading')
  const [pendingChoice, setPendingChoice] = useState<Choice | null>(null)

  // Reset local state whenever the scene changes
  useEffect(() => {
    setPhase('reading')
    setPendingChoice(null)
  }, [state.currentSceneId])

  function handleChoice(choice: Choice) {
    setPendingChoice(choice)
    setPhase('reacting')
  }

  function handleContinue() {
    if (pendingChoice) {
      dispatch({ type: 'MAKE_CHOICE', choice: pendingChoice })
    }
  }

  const progressDone = state.choiceLog.length

  return (
    <StudioLayout>
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
        {phase === 'reading' && (
          <FadeWrapper key="reading" duration={600}>
            {/* Elliot's prompt (non-read scenes only) */}
            {variant.elliotPrompt && !readOnly && (
              <div className="mb-6">
                <DialogueBubble text={variant.elliotPrompt} />
              </div>
            )}

            {readOnly ? (
              // S5: single continue button
              <button
                onClick={() => handleChoice(variant.choices[0])}
                className="mt-4 font-sans text-xs tracking-[0.25em] uppercase text-studio-dim/50 hover:text-studio-dim transition-colors duration-300 flex items-center gap-3"
              >
                <span className="w-5 h-px bg-current" />
                continuar
              </button>
            ) : (
              // Normal scenes: two choice buttons
              <div className="space-y-3">
                {variant.choices.map((choice, i) => (
                  <ChoiceButton
                    key={choice.id}
                    index={i}
                    optionLabel={i === 0 ? 'A' : 'B'}
                    text={choice.label}
                    onClick={() => handleChoice(choice)}
                  />
                ))}
              </div>
            )}
          </FadeWrapper>
        )}

        {/* ── REACTING phase ── */}
        {phase === 'reacting' && pendingChoice && (
          <FadeWrapper key="reacting" duration={600}>
            <div className="space-y-6">
              {pendingChoice.elliotReaction && (
                // Stage directions [in brackets] get italic treatment; dialogue gets DialogueBubble
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
