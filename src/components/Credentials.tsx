import { certifications } from '../data/portfolio'
import { Spot } from './Spot'

export function Credentials() {
  return (
    <div className="cred-grid">
      {certifications.map((c) => {
        if (c.pending) {
          return (
            <div key={c.org} data-reveal className="cred-card cred-card--pending">
              <p className="cred-org cred-org--muted">{c.org}</p>
              <h3 className="cred-title cred-title--muted">{c.title}</h3>
            </div>
          )
        }
        if (c.static) {
          return (
            <div key={c.org} data-reveal className="cred-card">
              <p className="cred-org">{c.org}</p>
              <p className="cred-body">{c.body}</p>
            </div>
          )
        }
        return (
          <div key={c.org} data-reveal data-spot className="cred-card cred-card--lift">
            <Spot size={240} />
            <p className="cred-org">{c.org}</p>
            <h3 className="cred-title">{c.title}</h3>
            {c.note && <p className="cred-note">{c.note}</p>}
          </div>
        )
      })}
    </div>
  )
}
