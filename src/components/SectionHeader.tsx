import type { CSSProperties } from 'react'
import { BlurText } from './BlurText'

interface SectionHeaderProps {
  eyebrow: string
  heading: string
  headingMaxCh?: number
  sub?: string
}

export function SectionHeader({ eyebrow, heading, headingMaxCh, sub }: SectionHeaderProps) {
  const style: CSSProperties | undefined = headingMaxCh ? { maxWidth: `${headingMaxCh}ch` } : undefined
  return (
    <div className="section-head">
      <div className="eyebrow">
        <span className="rule" />
        <span className="label">{eyebrow}</span>
      </div>
      <BlurText as="h2" className="section-h2" style={style}>
        {heading}
      </BlurText>
      {sub && <p className="section-sub">{sub}</p>}
    </div>
  )
}
