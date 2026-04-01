import { useState, useEffect } from 'react'
import { FadeWrapper } from '../ui/FadeWrapper'
import { BackgroundTransition } from './BackgroundTransition'
import { getEnding } from '../../data/endings'
import type { GameState, GameAction } from '../../types/game'

interface EndingLightProps {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

// ending_light_a: full rolling credits, Elliot cries, player name large
// ending_light_b: shorter credits, Elliot silent
export function EndingLight({ state, dispatch }: EndingLightProps) {
  const ending = getEnding(state.endingId ?? 'ending_light_b')
  const isA = state.endingId === 'ending_light_a'

  const narrativeText = ending.narrativeText.replace('{playerName}', state.playerName)
  const paragraphs = narrativeText.split('\n\n').filter(Boolean)

  const [step, setStep] = useState(0)
  const [showName, setShowName] = useState(false)
  const [showRestart, setShowRestart] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    // Elliot scene direction
    timers.push(setTimeout(() => setStep(1), 800))

    if (isA) {
      // Full credit sequence
      timers.push(setTimeout(() => setStep(2), 2800))   // first para
      timers.push(setTimeout(() => setStep(3), 5200))   // second para
      timers.push(setTimeout(() => setStep(4), 7800))   // third para
      timers.push(setTimeout(() => setShowName(true), 10500))
      timers.push(setTimeout(() => setShowRestart(true), 13000))
    } else {
      // Shorter sequence for light_b
      timers.push(setTimeout(() => setStep(2), 2800))
      timers.push(setTimeout(() => setShowName(true), 5500))
      timers.push(setTimeout(() => setShowRestart(true), 8000))
    }

    return () => timers.forEach(clearTimeout)
  }, [isA])

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      <BackgroundTransition sceneId={state.endingId ?? 'ending_light_b'} />

      {/* Film grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      <div className="relative z-10 w-full max-w-md mx-auto px-6 text-center space-y-6">
        {/* Elliot stage direction */}
        {step >= 1 && (
          <FadeWrapper key="elliot-scene" duration={1000}>
            <p className="font-sans text-xs text-white/20 italic tracking-wide mb-10">
              [{ending.elliotScene}]
            </p>
          </FadeWrapper>
        )}

        {/* Credit paragraphs, revealed one by one */}
        {paragraphs.map((para, i) => (
          step >= i + 2 && (
            <FadeWrapper key={`para-${i}`} duration={1200}>
              <p
                className={`font-serif leading-loose ${
                  i === paragraphs.length - 1
                    ? 'text-white/50 text-sm'
                    : 'text-white/70 text-base'
                }`}
              >
                {para}
              </p>
            </FadeWrapper>
          )
        ))}

        {/* Player name */}
        <div
          className="mt-12 transition-opacity duration-[2000ms] ease-in"
          style={{ opacity: showName ? 1 : 0 }}
        >
          <p className="font-serif text-3xl text-white/90 font-semibold tracking-wide">
            {state.playerName}
          </p>
        </div>

        {/* Restart */}
        <div
          className="mt-16 transition-opacity duration-[1000ms]"
          style={{ opacity: showRestart ? 1 : 0 }}
        >
          <button
            onClick={() => dispatch({ type: 'RESTART' })}
            className="font-sans text-xs tracking-[0.25em] uppercase text-white/20 hover:text-white/40 transition-colors duration-300 flex items-center gap-3 mx-auto"
          >
            <span className="w-4 h-px bg-current" />
            outro caminho
          </button>
        </div>
      </div>
    </div>
  )
}
