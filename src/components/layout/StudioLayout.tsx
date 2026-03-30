import type { ReactNode } from 'react'

interface StudioLayoutProps {
  children: ReactNode
  spotlight?: boolean
}

export function StudioLayout({ children, spotlight = true }: StudioLayoutProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-studio-black flex flex-col items-center justify-center">
      {/* Film grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.95) 100%)',
        }}
      />

      {/* Spotlight */}
      {spotlight && (
        <div
          className="pointer-events-none absolute inset-0 z-0 animate-flicker"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 50% 35%, rgba(253,230,138,0.07) 0%, rgba(201,168,76,0.03) 40%, transparent 70%)',
          }}
        />
      )}

      {/* Scanlines */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.025]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 4px)',
        }}
      />

      {/* Content */}
      <div className="relative z-20 w-full max-w-2xl mx-auto px-6 py-8">{children}</div>
    </div>
  )
}
