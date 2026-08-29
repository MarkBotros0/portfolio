import { skills } from '../data/portfolio'
import type { SkillGroup } from '../data/portfolio'
import { Spot } from './Spot'

function chipClass(style: SkillGroup['primaryStyle']): string {
  if (style === 'hero') return 'skill-hero'
  if (style === 'bright') return 'skill-bright'
  return 'skill-primary'
}

function Chips({ group }: { group: SkillGroup }) {
  const primary = chipClass(group.primaryStyle)
  const big = group.primaryStyle === 'hero' || group.primaryStyle === 'bright'
  return (
    <ul className={`skill-chips${big ? ' skill-chips--big' : ''}`}>
      {group.primary?.map((s) => (
        <li key={s} className={primary}>
          {s}
        </li>
      ))}
      {group.secondary?.map((s) => (
        <li key={s} className="skill-secondary">
          {s}
        </li>
      ))}
    </ul>
  )
}

function Card({ group }: { group: SkillGroup }) {
  const big = group.primaryStyle === 'hero'

  if (group.conic) {
    return (
      <div data-reveal data-spot className="skill-rim">
        <span aria-hidden="true" className="skill-rim-beam" />
        <div className="skill-rim-inner">
          <Spot size={360} color="rgba(255,255,255,0.08)" />
          <p className="skill-num">{group.num}</p>
          <h3 className="skill-title skill-title--big">{group.title}</h3>
          <Chips group={group} />
        </div>
      </div>
    )
  }

  return (
    <div
      data-reveal
      data-spot
      className={`skill-card${group.span === 2 ? ' skill-card--span2 skill-card--wide' : ''}`}
    >
      <Spot size={group.span === 2 ? 380 : 300} />
      <p className="skill-num">{group.num}</p>
      <h3 className={`skill-title${big ? ' skill-title--big' : ''}`}>{group.title}</h3>
      <Chips group={group} />
      {group.sub && (
        <>
          <h3 className="skill-title skill-title--sub">{group.sub.title}</h3>
          <ul className="skill-chips">
            {group.sub.primary.map((s) => (
              <li key={s} className="skill-primary">
                {s}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export function SkillsGrid() {
  return (
    <div className="skills-grid">
      {skills.map((g) => (
        <Card key={g.num} group={g} />
      ))}
    </div>
  )
}
