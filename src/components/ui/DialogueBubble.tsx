import { FadeWrapper } from './FadeWrapper'

interface DialogueBubbleProps {
  text: string
  speaker?: string
}

export function DialogueBubble({ text, speaker = 'Elliot Marsh' }: DialogueBubbleProps) {
  return (
    <FadeWrapper duration={600}>
      <div className="relative border-l-2 border-studio-gold/40 pl-5 py-1">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-studio-gold/60 mb-2">
          {speaker}
        </p>
        <p className="font-serif italic text-studio-silver/80 text-base leading-relaxed">
          {text}
        </p>
      </div>
    </FadeWrapper>
  )
}
