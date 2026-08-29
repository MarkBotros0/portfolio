import type { FeaturedProject } from '../data/portfolio'
import { Spot } from './Spot'

interface ProjectCaseProps {
  project: FeaturedProject
  position: number
  open: boolean
  onToggle: () => void
}

/** One sticky featured-project panel; panels stack and dim as the next rides up. */
export function ProjectCase({ project, position, open, onToggle }: ProjectCaseProps) {
  const { detail } = project

  return (
    <article data-reveal data-spot data-stack className="case" style={{ top: 92 + position * 12 }}>
      <Spot size={480} />
      <div className="case-grid">
        <div data-tilt className="shot">
          {project.image && <img src={project.image} alt={`${project.name} screenshot`} />}
          <span className="shot-idx">{project.index}</span>
          {!project.image && <span className="shot-cap">{project.screenshotCaption}</span>}
        </div>
        <div className="case-col">
          <span className="case-pill">{project.meta}</span>
          <h3 className="case-h3">
            {project.name} <span className="sub">— {project.subtitle}</span>
          </h3>
          <p className="case-desc">{project.description}</p>
          <ul className="tags">
            {project.tags.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
          <button data-magnet onClick={onToggle} aria-expanded={open} className="case-toggle">
            <span className="sign">{open ? '−' : '+'}</span> Case study
          </button>
        </div>
      </div>
      {open && (
        <div className="case-detail">
          <div className="detail-col">
            <div>
              <h4 className="detail-h">The problem</h4>
              <p className="detail-p">{detail.problem}</p>
            </div>
            <div>
              <h4 className="detail-h">What I built</h4>
              <p className="detail-p">{detail.built}</p>
            </div>
            <div>
              <h4 className="detail-h">Role &amp; scope</h4>
              <p className="detail-p">{detail.role}</p>
            </div>
          </div>
          <div className="detail-col detail-col--chips">
            {detail.groups.map((g) => (
              <div key={g.label}>
                <h4 className="detail-h detail-h--muted">{g.label}</h4>
                <ul className="chip-row">
                  {g.items.map((item) => (
                    <li key={item} className="chip-fill">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
