import { useEffect, useState, type ReactNode } from 'react'

interface FadeWrapperProps {
  children: ReactNode
  className?: string
  duration?: number
}

export function FadeWrapper({ children, className = '', duration = 700 }: FadeWrapperProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 40)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${duration}ms ease-in-out`,
      }}
    >
      {children}
    </div>
  )
}
