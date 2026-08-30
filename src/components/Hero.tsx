import { profile } from '../data/portfolio'
import { useReducedMotion } from '../hooks/useMedia'
import { useTypewriter } from '../hooks/useTypewriter'
import { BlurText } from './BlurText'
import { Spot } from './Spot'

function TerminalCard() {
  const reduced = useReducedMotion()
  const typed = useTypewriter(profile.typewriterPhrases, !reduced)
  const { terminal } = profile

  return (
    <div data-tilt data-spot className="term-wrap">
      <span aria-hidden="true" className="term-beam" />
      <div className="term">
        <Spot size={320} />
        <div className="term-head">
          <span className="term-dot" />
          <span className="term-dot" />
          <span className="term-dot term-dot--accent" />
          <span className="term-label">{terminal.path}</span>
        </div>
        <div className="term-body">
          <p className="term-cmd">
            <span className="arrow">→</span> mark --role
          </p>
          <p className="term-out">{terminal.roleAnswer}</p>
          <p className="term-cmd mt-cmd">
            <span className="arrow">→</span> mark --shipping
          </p>
          <p className="term-typed">
            <span className="typed">{typed}</span>
            <span className="caret" aria-hidden="true" />
          </p>
          <p className="term-cmd mt-cmd">
            <span className="arrow">→</span> mark --stack
          </p>
          {terminal.stackLines.map((line) => (
            <p key={line} className="term-dim">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section aria-label="Introduction" className="hero">
      <div data-dots-avoid>
        <p className="status-pill">
          <span className="status-dot" />
          {profile.status}
        </p>
        <h1 className="hero-h1">
          {profile.firstName}
          <br />
          {profile.lastName}
        </h1>
        <BlurText as="p" className="hero-role">
          {profile.role}
        </BlurText>
        <p className="hero-tag">{profile.tagline}</p>
        <p className="hero-value">{profile.valueProp}</p>
        <div className="hero-ctas">
          <a data-magnet href="#projects" className="btn-primary">
            View work <span className="mono">→</span>
          </a>
          <a data-magnet href="#contact" className="btn-ghost">
            Contact
          </a>
        </div>
      </div>
      <TerminalCard />
    </section>
  )
}
