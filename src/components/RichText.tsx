import type { RichText as RichTextData } from '../data/portfolio'

/** Renders rich text segments: plain, accent/bright spans, and links. */
export function RichText({ segments }: { segments: RichTextData }) {
  return (
    <>
      {segments.map((seg, i) => {
        if (typeof seg === 'string') return <span key={i}>{seg}</span>
        if ('href' in seg)
          return (
            <a key={i} href={seg.href}>
              {seg.text}
            </a>
          )
        return (
          <span key={i} className={seg.style === 'accent' ? 'accent' : 'bright'}>
            {seg.text}
          </span>
        )
      })}
    </>
  )
}
