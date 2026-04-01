import { useState, useEffect, useRef } from 'react'
import { StageBackground, resolveBackground, type BgScene } from './StageBackground'

interface BackgroundTransitionProps {
  sceneId: string
  onReadClick?: () => void
  onGuardarClick?: () => void
  envelopeOpen?: boolean
  envelopeVisible?: boolean
  screenplayVisible?: boolean
}

export function BackgroundTransition({
  sceneId,
  onReadClick,
  onGuardarClick,
  envelopeOpen = false,
  envelopeVisible = false,
  screenplayVisible = false,
}: BackgroundTransitionProps) {
  const targetScene = resolveBackground(sceneId)

  // Dual-buffer: A e B alternam para cross-fade
  const [bufA, setBufA] = useState<BgScene>(targetScene)
  const [bufB, setBufB] = useState<BgScene>(targetScene)
  const [active, setActive] = useState<'A' | 'B'>('A')
  const [transitioning, setTransitioning] = useState(false)
  const prevScene = useRef<BgScene>(targetScene)

  useEffect(() => {
    if (targetScene === prevScene.current) return

    prevScene.current = targetScene

    if (active === 'A') {
      setBufB(targetScene)
      setActive('B')
    } else {
      setBufA(targetScene)
      setActive('A')
    }

    setTransitioning(true)
    const t = setTimeout(() => setTransitioning(false), 900)
    return () => clearTimeout(t)
  }, [targetScene]) // eslint-disable-line react-hooks/exhaustive-deps

  const isEnvelope = targetScene === 'roteiro'
  const envelopeProps = isEnvelope
    ? { onReadClick, onGuardarClick, envelopeOpen, envelopeVisible, screenplayVisible }
    : {}

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Buffer A */}
      <div
        style={{
          position: 'absolute', inset: 0,
          opacity: active === 'A' ? 1 : 0,
          transition: transitioning ? 'opacity 0.9s ease' : 'none',
          zIndex: active === 'A' ? 1 : 0,
        }}
      >
        <StageBackground scene={bufA} {...(active === 'A' ? envelopeProps : {})} />
      </div>

      {/* Buffer B */}
      <div
        style={{
          position: 'absolute', inset: 0,
          opacity: active === 'B' ? 1 : 0,
          transition: transitioning ? 'opacity 0.9s ease' : 'none',
          zIndex: active === 'B' ? 1 : 0,
        }}
      >
        <StageBackground scene={bufB} {...(active === 'B' ? envelopeProps : {})} />
      </div>
    </div>
  )
}
