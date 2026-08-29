import { contact, profile } from '../data/portfolio'
import { BlurText } from './BlurText'
import { Spot } from './Spot'

export function Contact() {
  return (
    <section id="contact" className="section section--contact">
      <div data-spot className="contact-rim">
        <span aria-hidden="true" className="contact-beam" />
        <div className="contact-inner">
          <Spot size={520} color="rgba(255,255,255,0.09)" />
          <div className="eyebrow" style={{ position: 'relative' }}>
            <span className="rule" />
            <span className="label">{contact.eyebrow}</span>
          </div>
          <BlurText as="h2" className="contact-h2">
            {contact.heading}
          </BlurText>
          <div className="contact-actions">
            <a data-magnet href={`mailto:${profile.email}`} className="contact-primary">
              {profile.email}
            </a>
            <a data-magnet href={profile.github.url} target="_blank" rel="noopener" className="contact-ghost">
              GitHub · {profile.github.label}
            </a>
            <a data-magnet href={profile.linkedin.url} target="_blank" rel="noopener" className="contact-ghost">
              LinkedIn · {profile.linkedin.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
