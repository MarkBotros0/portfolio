import type { PersonalProject } from '../data/portfolio'
import { Spot } from './Spot'

interface PersonalCardProps {
  project: PersonalProject
  open: boolean
  onToggle: () => void
}

export function PersonalCard({ project, open, onToggle }: PersonalCardProps) {
  const { detail } = project

  return (
    <article data-reveal data-spot data-dots-avoid className="pcard">
      <Spot size={280} />
      <span className="pbadge">personal</span>
      <div className="pshot">{project.image && <img src={project.image} alt={`${project.name} screenshot`} />}</div>
      <h3>{project.name}</h3>
      <p className="psub">{project.subtitle}</p>
      <p className="pdesc">{project.description}</p>
      <ul className="chips-outline">
        {project.tags.map((t) => (
          <li key={t} className="chip-outline">
            {t}
          </li>
        ))}
      </ul>
      <button onClick={onToggle} aria-expanded={open} className="pdetails-btn">
        <span className="sign">{open ? '−' : '+'}</span> Details
      </button>
      {open && (
        <div className="pdetail">
          <div>
            <h4 className="pdetail-h">The problem</h4>
            <p className="pdetail-p">{detail.problem}</p>
          </div>
          <div>
            <h4 className="pdetail-h">What I built</h4>
            <p className="pdetail-p">{detail.built}</p>
          </div>
          <div>
            <h4 className="pdetail-h pdetail-h--muted">Stack</h4>
            <ul className="chip-mini-row">
              {detail.stack.map((s) => (
                <li key={s} className="chip-mini">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="pdetail-h pdetail-h--muted">Role &amp; scope</h4>
            <p className="pdetail-p">{detail.role}</p>
          </div>
        </div>
      )}
    </article>
  )
}
