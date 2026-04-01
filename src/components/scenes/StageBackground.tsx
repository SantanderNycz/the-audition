import { useEffect, useRef } from 'react'
import { Rainify } from 'rainify'
import '../../styles/backgrounds.css'

export type BgScene =
  | 'roteiro'
  | 'prologue'
  | 'act1'
  | 'act2'
  | 's5'
  | 'light'
  | 'dark'

export function resolveBackground(sceneId: string): BgScene {
  if (sceneId === 'synopsis')                                                   return 'roteiro'
  if (sceneId.startsWith('p'))                                                  return 'prologue'
  if (sceneId === 's1' || sceneId === 's2_together' || sceneId === 's2_apart') return 'act1'
  if (sceneId === 'director_note_1')                                            return 'act2'
  if (sceneId.startsWith('s3'))                                                 return 'act2'
  if (sceneId.startsWith('s4') || sceneId === 'question_break' || sceneId === 'director_note_2') return 'act2'
  if (sceneId === 's5' || sceneId === 's6')                                     return 's5'
  if (sceneId === 'ending_light_a' || sceneId === 'ending_light_b')            return 'light'
  if (sceneId === 'ending_dark_a'  || sceneId === 'ending_dark_b')             return 'dark'
  return 'prologue'
}

interface StageBackgroundProps {
  scene: BgScene
  onReadClick?: () => void
  onGuardarClick?: () => void
  envelopeOpen?: boolean
  envelopeVisible?: boolean
  screenplayVisible?: boolean
}

const SCREENPLAY = `                    A LUZ DO PORTO
              Escrito e dirigido por Elliot Marsh


                        FADE IN:

EXT. ILHA SEM NOME — ANOITECER

Um farol solitário. Mar a perder de vista.
A luz gira. O vento dobra a erva baixa.

INT. ESCRITÓRIO DA COMPANHIA — DIA

O GUARDA (44) senta diante de um representante
que coloca um contrato sobre a mesa de madeira nua.

                    REPRESENTANTE
          Presença permanente. Sem exceções.
          O salário compensa o isolamento.

O Guarda examina o contrato em silêncio.
Olha para a janela.
Olha para a aliança na mão esquerda.
Assina.

                    REPRESENTANTE (CONT'D)
          Há uma cláusula adicional.
          Sobre família.

O Guarda levanta os olhos pela primeira vez.

                                       CORTE PARA:

─────────────────────────────────────────

PERSONAGENS

O GUARDA — 44 anos. Homem de poucas
           palavras e muitas omissões.

O FILHO  — 16 anos. Lê muito. Fala pouco.
           Tem o olhar do pai.

A LUZ    — o farol. Personagem silencioso.
           Nunca apaga. Até o momento
           em que apaga.

─────────────────────────────────────────

               NOTA DO DIRETOR

     "Este roteiro não tem vilões.
      Tem escolhas — e o peso de cada uma.

      O ator que interpretar O Guarda
      precisa compreender que culpa
      e amor podem ter exatamente
      a mesma cara."

                            — Elliot Marsh`

function Stars() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || el.childElementCount > 0) return
    for (let i = 0; i < 72; i++) {
      const s = document.createElement('div')
      const sz = Math.random() < 0.15 ? 2 : 1
      s.style.cssText = `
        position:absolute;
        width:${sz}px;height:${sz}px;
        background:rgba(${180 + ((Math.random() * 60) | 0)},${190 + ((Math.random() * 55) | 0)},${220 + ((Math.random() * 35) | 0)},${.25 + Math.random() * .65});
        border-radius:50%;
        left:${Math.random() * 100}%;
        top:${Math.random() * 62}%;
        animation:twinkle ${3 + Math.random() * 6}s ease-in-out infinite ${-Math.random() * 6}s;
      `
      el.appendChild(s)
    }
  }, [])
  return <div className="stars-layer" ref={ref} />
}

function Lighthouse({ variant }: { variant: string }) {
  return (
    <div className={`lh ${variant}`}>
      <div className="rays-wrap">
        <div className="ray" /><div className="ray" /><div className="ray" />
        <div className="ray" /><div className="ray" />
      </div>
      <div className="lh-head" />
      <div className="lh-tower" />
      <div className="lh-base" />
    </div>
  )
}

const RAIN_BASE = {
  isRaining: true,
  wind: -4,
  speed: 12,
  thickness: 0.5,
  intensity: 300,
  splashDuration: 6,
  color: 'rgba(255,255,255,0.2)',
  splashColor: 'rgba(255,255,255,0.2)',
  zIndex: 0,
}

export function StageBackground({
  scene,
  onReadClick,
  onGuardarClick,
  envelopeOpen = false,
  envelopeVisible = false,
  screenplayVisible = false,
}: StageBackgroundProps) {
  const envClass = ['envelope', envelopeOpen ? 'open' : ''].filter(Boolean).join(' ')
  const paperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!paperRef.current) return
    paperRef.current.style.zIndex = envelopeOpen ? '5' : ''
  }, [envelopeOpen])

  return (
    <>
      {scene === 'roteiro' && (
        <div className="bg-roteiro" style={{ position: 'absolute', inset: 0 }}>
          <div className={`envelope-area${envelopeVisible ? ' visible' : ''}`}>
            <div className={envClass}>
              <div className="env-back" />
              <div className="env-paper" ref={paperRef} />
              <div className="env-front" />
              <div className="env-flap" />
            </div>
            {onReadClick && (
              <button className="read-btn" onClick={onReadClick}>
                ler o roteiro
              </button>
            )}
          </div>

          <div className={`screenplay-view ${screenplayVisible ? 'visible' : ''}`}>
            <div className="screenplay-scroll">
              <pre className="screenplay-text">{SCREENPLAY}</pre>
            </div>
            <div className="screenplay-footer">
              <button className="close-btn" onClick={onGuardarClick}>
                guardar o roteiro
              </button>
            </div>
          </div>

          <div className="roteiro-label">A Luz do Porto</div>
        </div>
      )}

      {scene === 'prologue' && (
        <div className="bg-prologue" style={{ position: 'absolute', inset: 0 }}>
          <div className="floor" />
          <div className="floor-glow" />
          <div className="chair">
            <div className="chair-back" />
            <div className="chair-seat" />
            <div className="chair-legs">
              <div className="chair-leg" />
              <div className="chair-leg" />
            </div>
          </div>
        </div>
      )}

      {scene === 'act1' && (
        <div className="bg-act1" style={{ position: 'absolute', inset: 0 }}>
          <Stars />
          <div className="horizon" />
          <div className="fog" />
          <Lighthouse variant="lh-a1" />
          <div className="sea">
            <div className="sea-shimmer" />
            <div className="sea-shimmer" />
          </div>
        </div>
      )}

      {scene === 'act2' && (
        <div className="bg-act2" style={{ position: 'absolute', inset: 0 }}>
          <div className="rain-mount">
            <Rainify {...RAIN_BASE} />
          </div>
          <div className="lightning" />
          <Lighthouse variant="lh-a2" />
          <div className="act2-sea" />
        </div>
      )}

      {scene === 's5' && (
        <div className="bg-s5" style={{ position: 'absolute', inset: 0 }}>
          <div className="rain-mount">
            <Rainify {...RAIN_BASE} intensity={500} speed={18} />
          </div>
          <div className="lightning-h" />
          <Lighthouse variant="lh-s5" />
          <div className="s5-sea">
            <div className="s5-wave" style={{ bottom: '18px', '--ws': '5s', '--wd': '0s' } as React.CSSProperties} />
            <div className="s5-wave" style={{ bottom: '36px', '--ws': '7s', '--wd': '-1.5s' } as React.CSSProperties} />
            <div className="s5-wave" style={{ bottom: '54px', '--ws': '6s', '--wd': '-3s' } as React.CSSProperties} />
          </div>
        </div>
      )}

      {scene === 'light' && (
        <div className="bg-light" style={{ position: 'absolute', inset: 0 }}>
          <div className="light-sea" />
          <div className="light-fog" />
          <Lighthouse variant="lh-li" />
        </div>
      )}

      {scene === 'dark' && (
        <div className="bg-dark" style={{ position: 'absolute', inset: 0 }}>
          <div className="dark-fog" />
          <div className="dark-sea" />
          <div className="dark-water-line" />
          <Lighthouse variant="lh-dk" />
        </div>
      )}
    </>
  )
}
