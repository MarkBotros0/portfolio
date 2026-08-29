import { highlights } from '../data/portfolio'
import type { Highlight } from '../data/portfolio'
import { Count } from './Count'
import { Spot } from './Spot'

function Tile({ h }: { h: Highlight }) {
  const classes = [
    'tile',
    h.span === 2 ? 'tile--span2' : '',
    h.accentWash ? 'tile--accent' : '',
    h.text ? 'tile--center' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const spotSize = h.accentWash ? 340 : h.span === 2 ? 300 : 220
  const spotColor = h.accentWash ? 'rgba(255,255,255,0.09)' : undefined

  return (
    <li data-reveal data-spot className={classes}>
      <Spot size={spotSize} color={spotColor} />
      {h.text ? (
        <span className="tile-scope">
          {h.text.map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </span>
      ) : (
        <span className={`tile-num${h.accentWash ? ' tile-num--big' : ''}`}>
          {h.prefix}
          <Count target={h.value ?? 0} />
          {h.suffix}
        </span>
      )}
      <span className={`tile-label${h.accentWash ? ' tile-label--bright' : ''}`}>{h.label}</span>
      {h.note && <span className="tile-note">{h.note}</span>}
      {h.chips && (
        <ul className="tile-chips">
          {h.chips.map((c) => (
            <li key={c} className="chip-outline">
              {c}
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export function BentoStats() {
  return (
    <section aria-label="Highlights" className="bento-section">
      <ul className="bento">
        {highlights.map((h) => (
          <Tile key={h.label} h={h} />
        ))}
      </ul>
      <p aria-hidden="true" className="scroll-cue">
        scroll
      </p>
    </section>
  )
}
