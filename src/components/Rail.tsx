import { sections } from '../data/portfolio'

/** Desktop-only fixed section rail of ticks on the right edge. */
export function Rail({ active }: { active: string | null }) {
  return (
    <ul aria-hidden="true" className="rail">
      {sections.map((s) => (
        <li key={s.id}>
          <a href={`#${s.id}`} tabIndex={-1} className={`rail-tick${active === s.id ? ' active' : ''}`} />
        </li>
      ))}
    </ul>
  )
}
