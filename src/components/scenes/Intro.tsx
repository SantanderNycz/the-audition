import { useState, useEffect, type FormEvent } from 'react'
import { StudioLayout } from '../layout/StudioLayout'
import { FadeWrapper } from '../ui/FadeWrapper'
import { StageBackground } from './StageBackground'
import { synopsis } from '../../data/synopsis'
import type { GameAction } from '../../types/game'

type IntroStep =
  | 'waiting-room'
  | 'name-input'
  | 'called'
  | 'studio'
  | 'envelope'
  | 'title-card'

interface IntroProps {
  dispatch: React.Dispatch<GameAction>
}

function ContinueHint({ onClick, label = 'continuar' }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="mt-10 font-sans text-xs tracking-[0.25em] uppercase text-studio-dim/50 hover:text-studio-dim transition-colors duration-300 flex items-center gap-3 animate-pulse-slow"
    >
      <span className="w-5 h-px bg-current" />
      {label}
    </button>
  )
}

export function Intro({ dispatch }: IntroProps) {
  const [step, setStep] = useState<IntroStep>('waiting-room')
  const [nameInput, setNameInput] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [envelopeMode, setEnvelopeMode] = useState(false)      // text fades out
  const [envelopeVisible, setEnvelopeVisible] = useState(false)  // envelope fades in
  const [envelopeOpen, setEnvelopeOpen] = useState(false)        // envelope opens
  const [screenplayVisible, setScreenplayVisible] = useState(false)

  // Sequence: text fades out → envelope fades in → envelope opens → screenplay appears
  function handleReadClick() {
    setEnvelopeMode(true)                                        // t=0:    text fade-out (0.5s)
    setTimeout(() => setEnvelopeVisible(true), 350)              // t=350:  envelope fade-in (0.7s)
    setTimeout(() => setEnvelopeOpen(true), 550)                 // t=550:  envelope opens
    setTimeout(() => setScreenplayVisible(true), 550 + 1700)     // t=2250: screenplay
  }

  // Closes the screenplay overlay, then advances to title-card
  function handleGuardarClick() {
    setScreenplayVisible(false)
    setTimeout(() => {
      setEnvelopeOpen(false)
      setEnvelopeVisible(false)
      go('title-card')
    }, 650)
  }

  // Auto-advance from title-card to game
  useEffect(() => {
    if (step !== 'title-card') return
    const t = setTimeout(() => {
      dispatch({ type: 'START_GAME', playerName })
    }, 3200)
    return () => clearTimeout(t)
  }, [step, playerName, dispatch])

  function go(next: IntroStep) {
    setStep(next)
  }

  function handleNameSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = nameInput.trim()
    if (!trimmed) return
    setPlayerName(trimmed)
    go('called')
  }

  return (
    <StudioLayout
      spotlight={step !== 'title-card'}
      background={
        <StageBackground
          scene="roteiro"
          envelopeVisible={envelopeVisible}
          envelopeOpen={envelopeOpen}
          screenplayVisible={screenplayVisible}
          onGuardarClick={handleGuardarClick}
        />
      }
    >
      {step === 'waiting-room' && (
        <FadeWrapper key="waiting-room" duration={900}>
          <div className="space-y-6">
            <p className="font-serif text-studio-silver/70 text-base leading-loose">
              Sala de espera.
            </p>
            <p className="font-serif text-studio-silver/60 text-base leading-loose">
              Cadeiras de plástico alinhadas contra a parede. Cartazes de filmes antigos emoldurados em vidro embaçado. Um copo de isopor com café frio em cima de uma cadeira vazia.
            </p>

            <div className="my-8 border border-studio-border/40 bg-studio-deep/60 px-6 py-5 font-mono text-sm space-y-1">
              <p className="text-studio-dim/50 text-xs tracking-widest uppercase mb-3">
                Quadro de horários
              </p>
              <p className="text-studio-silver/70">AUDIÇÃO ABERTA</p>
              <p className="text-studio-warm/80 tracking-wider">{synopsis.title}</p>
              <p className="text-studio-dim/60 mt-2">Dir.: E. Marsh</p>
            </div>

            <ContinueHint onClick={() => go('name-input')} />
          </div>
        </FadeWrapper>
      )}

      {step === 'name-input' && (
        <FadeWrapper key="name-input" duration={700}>
          <div className="space-y-6">
            <p className="font-serif text-studio-silver/60 text-base leading-loose">
              Uma assistente se aproxima com uma prancheta. Não sorri.
            </p>
            <p className="font-serif text-studio-warm/80 text-lg italic mt-4">
              "Seu nome, por favor."
            </p>

            <form onSubmit={handleNameSubmit} className="mt-8 space-y-4">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="—"
                maxLength={40}
                autoFocus
                className="
                  w-full bg-transparent border-b border-studio-border/60
                  px-0 py-2 font-serif text-studio-warm text-lg
                  placeholder-studio-dim/30
                  focus:outline-none focus:border-studio-gold/50
                  transition-colors duration-300
                "
              />
              <button
                type="submit"
                disabled={!nameInput.trim()}
                className="
                  font-sans text-xs tracking-[0.25em] uppercase
                  text-studio-dim hover:text-studio-silver
                  disabled:opacity-20 disabled:cursor-not-allowed
                  transition-colors duration-300 flex items-center gap-3 mt-6
                "
              >
                <span className="w-5 h-px bg-current" />
                confirmar
              </button>
            </form>
          </div>
        </FadeWrapper>
      )}

      {step === 'called' && (
        <FadeWrapper key="called" duration={700}>
          <div className="space-y-6">
            <p className="font-serif text-studio-silver/60 text-base leading-loose">
              Ela escreve algo. Devolve a prancheta ao balcão.
            </p>
            <p className="font-serif text-studio-warm text-xl mt-6">
              "{playerName}."
            </p>
            <p className="font-serif text-studio-silver/60 text-base leading-loose mt-4">
              Abre uma porta de metal pesado. Do outro lado: silêncio absoluto.
            </p>
            <p className="font-serif text-studio-warm/80 text-lg italic">
              "Elliot está pronto para você."
            </p>

            <ContinueHint onClick={() => go('studio')} label="entrar" />
          </div>
        </FadeWrapper>
      )}

      {step === 'studio' && (
        <FadeWrapper key="studio" duration={800}>
          <div className="space-y-5">
            <p className="font-serif text-studio-silver/60 text-base leading-loose">
              O estúdio é maior do que parece por fora. A iluminação, crua e direta. Cabos no chão. Câmeras guardadas nos cantos como sentinelas.
            </p>

            <div className="my-8 h-px w-16 bg-studio-border/40" />

            <p className="font-serif text-studio-silver/70 text-base leading-loose">
              Ao fundo, numa cadeira simples de diretor:
            </p>
            <div className="pl-5 border-l border-studio-border/40 space-y-1 my-4">
              <p className="font-serif text-studio-warm/90 text-base">Elliot Marsh. 63 anos.</p>
              <p className="font-serif text-studio-silver/60 text-base">Folhas no colo.</p>
              <p className="font-serif text-studio-silver/60 text-base">Postura de quem espera há muito tempo.</p>
            </div>
            <p className="font-serif text-studio-silver/60 text-base leading-loose">
              Não se levanta.
            </p>

            <ContinueHint onClick={() => go('envelope')} />
          </div>
        </FadeWrapper>
      )}

      {step === 'envelope' && (
        <FadeWrapper key="envelope" duration={700}>
          <div
            className="space-y-5"
            style={{
              opacity: envelopeMode ? 0 : 1,
              pointerEvents: envelopeMode ? 'none' : 'auto',
              transition: 'opacity 0.5s ease',
            }}
          >
            <p className="font-serif text-studio-silver/60 text-base leading-loose">
              Elliot não olha diretamente. Mexe nas folhas que tem no colo.
            </p>

            <p className="font-serif text-studio-warm text-xl italic my-8 text-center">
              "Você leu o roteiro?"
            </p>

            <p className="font-serif text-studio-silver/60 text-base leading-loose">
              Estende um envelope amarelado sem esperar resposta.
            </p>

            <div className="mt-10 space-y-4">
              {/* Read: triggers animated envelope opening in background */}
              <button
                onClick={handleReadClick}
                className="
                  w-full text-left font-sans text-xs tracking-[0.25em] uppercase
                  text-studio-gold/60 hover:text-studio-gold
                  transition-colors duration-300 flex items-center gap-3
                "
              >
                <span className="w-5 h-px bg-current" />
                ler o roteiro
              </button>

              {/* Skip: proceed directly to title-card */}
              <ContinueHint onClick={() => go('title-card')} label="não, obrigado" />
            </div>
          </div>
        </FadeWrapper>
      )}

      {step === 'title-card' && (
        <FadeWrapper key="title-card" duration={1200}>
          <div className="text-center py-16">
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-studio-dim/40 mb-8">
              {synopsis.subtitle}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-studio-warm font-semibold tracking-wide">
              {synopsis.title}
            </h1>
          </div>
        </FadeWrapper>
      )}
    </StudioLayout>
  )
}
