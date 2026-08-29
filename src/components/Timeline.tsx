import { experience } from '../data/portfolio'
import { RichText } from './RichText'
import { Spot } from './Spot'

export function Timeline() {
  return (
    <ol className="xp-list">
      {experience.map((entry, i) => {
        const last = i === experience.length - 1
        const spine = last
          ? ''
          : i === 0
            ? ' xp-item--spine-head'
            : i === 1
              ? ' xp-item--spine-fade'
              : ' xp-item--spine-plain'
        const dot = entry.current ? ` xp-dot--accent${i === 0 ? ' xp-dot--glow' : ''}` : ''

        return (
          <li key={entry.company} className={`xp-item${last ? ' xp-item--last' : ''}${spine}`}>
            <span aria-hidden="true" className={`xp-dot${dot}`} />
            <div data-reveal>
              <p className={`xp-period${entry.current ? ' xp-period--current' : ''}`}>{entry.period}</p>
              <h3 className="xp-h3">
                {entry.company} <span className="role">— {entry.role}</span>
              </h3>
              {entry.description && (
                <p className="xp-desc">
                  <RichText segments={entry.description} />
                </p>
              )}
              {entry.engagements && (
                <ul className="xp-engagements">
                  {entry.engagements.map((eng) => (
                    <li key={eng.title} data-spot className="xp-card">
                      <Spot size={300} color="var(--a-faint)" />
                      <p className="xp-card-period">{eng.period}</p>
                      <h4>{eng.title}</h4>
                      <p className="xp-card-desc">
                        <RichText segments={eng.description} />
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
