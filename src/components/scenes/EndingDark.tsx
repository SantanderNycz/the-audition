import { useState, useEffect } from 'react'
import { FadeWrapper } from '../ui/FadeWrapper'
import { getEnding } from '../../data/endings'
import type { GameState, GameAction } from '../../types/game'

interface EndingDarkProps {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

// ending_dark_a: Elliot applauds alone, one light stays on
// ending_dark_b: Elliot leaves early, assistant conveys thanks
export function EndingDark({ state, dispatch }: EndingDarkProps) {
  const ending = getEnding(state.endingId ?? 'ending_dark_b')
  const isA = state.endingId === 'ending_dark_a'

  const [step, setStep] = useState(0)
  const [darkness, setDarkness] = useState(0)
  const [showRestart, setShowRestart] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    if (isA) {
      // dark_a: Elliot stands, applauds, thanks, exits, lights out (one stays)
      timers.push(setTimeout(() => setStep(1), 1000))  // "Elliot levanta..."
      timers.push(setTimeout(() => setStep(2), 3200))  // applause
      timers.push(setTimeout(() => setStep(3), 5500))  // quote
      timers.push(setTimeout(() => setStep(4), 8000))  // "Sai."
      timers.push(setTimeout(() => setDarkness(0.5), 9500))
      timers.push(setTimeout(() => setDarkness(0.85), 12000))
      timers.push(setTimeout(() => setStep(5), 13500)) // one light stays
      timers.push(setTimeout(() => setShowRestart(true), 16000))
    } else {
      // dark_b: Elliot leaves before end, assistant arrives
      timers.push(setTimeout(() => setStep(1), 1000))  // Elliot exits
      timers.push(setTimeout(() => setStep(2), 3800))  // assistant arrives
      timers.push(setTimeout(() => setStep(3), 6500))  // assistant's line
      timers.push(setTimeout(() => setDarkness(0.9), 9000))
      timers.push(setTimeout(() => setShowRestart(true), 12000))
    }

    return () => timers.forEach(clearTimeout)
  }, [isA])

  return (
    <div className="relative min-h-screen w-full bg-studio-black flex flex-col items-center justify-center overflow-hidden">
      {/* Film grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      {/* Darkness overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 bg-black"
        style={{ opacity: darkness, transition: 'opacity 3000ms ease-in' }}
      />

      {/* Studio lights at top — go dark progressively */}
      {isA && (
        <div className="absolute top-0 left-0 right-0 flex justify-around px-8 z-0">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1 transition-all"
              style={{
                height: step >= 4 && i < (step >= 5 ? 2 : 3) ? '0px' : '60px',
                background: i === 2 && step >= 5
                  ? 'linear-gradient(to bottom, rgba(253,230,138,0.12), transparent)'
                  : 'linear-gradient(to bottom, rgba(253,230,138,0.06), transparent)',
                transitionDelay: `${i * 900}ms`,
                transitionDuration: '2000ms',
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 w-full max-w-lg mx-auto px-6 space-y-7">
        {/* dark_a sequence */}
        {isA && (
          <>
            <p className="font-sans text-xs tracking-widest uppercase text-studio-dim/40">
              Elliot Marsh
            </p>

            {step >= 1 && (
              <FadeWrapper key="s1" duration={1000}>
                <p className="font-serif text-studio-silver/60 text-base leading-loose">
                  Levanta devagar da cadeira.
                </p>
              </FadeWrapper>
            )}
            {step >= 2 && (
              <FadeWrapper key="s2" duration={900}>
                <p className="font-sans text-xs text-studio-dim/40 italic tracking-wide">
                  [Bate palmas sozinho, lento, sem pressa.]
                </p>
              </FadeWrapper>
            )}
            {step >= 3 && (
              <FadeWrapper key="s3" duration={900}>
                <p className="font-serif text-studio-warm/70 text-lg italic leading-loose">
                  "É exatamente isso. Obrigado."
                </p>
              </FadeWrapper>
            )}
            {step >= 4 && (
              <FadeWrapper key="s4" duration={900}>
                <p className="font-serif text-studio-silver/40 text-base leading-loose">
                  Sai. As luzes do estúdio apagam uma a uma.
                </p>
              </FadeWrapper>
            )}
            {step >= 5 && (
              <FadeWrapper key="s5" duration={1200}>
                <p className="font-sans text-xs text-studio-dim/30 italic tracking-wide">
                  [Antes da última — uma permanece acesa.]
                </p>
              </FadeWrapper>
            )}
          </>
        )}

        {/* dark_b sequence */}
        {!isA && (
          <>
            {step >= 1 && (
              <FadeWrapper key="b1" duration={1000}>
                <p className="font-sans text-xs text-studio-dim/40 italic tracking-wide">
                  [Elliot sai antes do fim da última cena.]
                </p>
              </FadeWrapper>
            )}
            {step >= 2 && (
              <FadeWrapper key="b2" duration={900}>
                <p className="font-serif text-studio-silver/50 text-base leading-loose">
                  Uma assistente atravessa o estúdio em direção a você.
                </p>
              </FadeWrapper>
            )}
            {step >= 3 && (
              <FadeWrapper key="b3" duration={900}>
                <p className="font-serif text-studio-warm/60 text-lg italic leading-loose">
                  "Ele pediu para agradecer."
                </p>
              </FadeWrapper>
            )}
          </>
        )}
      </div>

      {/* Restart */}
      {showRestart && (
        <div className="absolute bottom-10 left-0 right-0 flex justify-center z-30">
          <FadeWrapper duration={1500}>
            <button
              onClick={() => dispatch({ type: 'RESTART' })}
              className="font-sans text-xs tracking-[0.25em] uppercase text-studio-dim/30 hover:text-studio-dim/60 transition-colors duration-500 flex items-center gap-3"
            >
              <span className="w-4 h-px bg-current" />
              recomeçar
            </button>
          </FadeWrapper>
        </div>
      )}
    </div>
  )
}
