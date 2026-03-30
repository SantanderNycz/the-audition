import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        studio: {
          black: '#0a0a0a',
          deep: '#111118',
          shadow: '#1a1a2e',
          muted: '#2a2a3e',
          border: '#3a3a5c',
          dim: '#6b6b8a',
          silver: '#a0a0b8',
          light: '#e8e4d8',
          warm: '#f5f0e8',
          gold: '#c9a84c',
          amber: '#e6b84a',
        },
        spot: {
          core: '#fff8e7',
          mid: '#fde68a',
          outer: '#92400e',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out forwards',
        'fade-out': 'fadeOut 0.8s ease-in-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
          '75%': { opacity: '0.95' },
        },
      },
    },
  },
  plugins: [],
}

export default config
