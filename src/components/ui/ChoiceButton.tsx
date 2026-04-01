interface ChoiceButtonProps {
  optionLabel: string
  text: string
  onClick: () => void
  disabled?: boolean
  index: number
}

export function ChoiceButton({ optionLabel, text, onClick, disabled = false, index }: ChoiceButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        group w-full text-left px-5 py-4 border
        font-sans text-sm leading-relaxed
        transition-all duration-300 ease-out
        ${
          disabled
            ? 'opacity-20 cursor-not-allowed border-studio-border'
            : 'border-studio-border bg-studio-deep/40 hover:border-studio-gold/50 hover:bg-studio-deep/80 cursor-pointer'
        }
      `}
      style={{
        animationDelay: `${index * 150}ms`,
        animation: 'slideUp 0.5s ease-out forwards',
        opacity: 0,
      }}
    >
      <span className="font-mono text-xs tracking-widest text-studio-gold/70 mr-4 group-hover:text-studio-gold transition-colors duration-200">
        {optionLabel}
      </span>
      <span className={`${disabled ? 'text-studio-dim' : 'text-studio-silver group-hover:text-studio-warm transition-colors duration-200'}`}>
        {text}
      </span>
    </button>
  )
}
