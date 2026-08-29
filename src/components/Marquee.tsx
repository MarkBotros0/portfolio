import { Fragment } from 'react'
import { marquee } from '../data/portfolio'

function Run() {
  return (
    <span className="marquee-run">
      {marquee.map((item) => (
        <Fragment key={item}>
          <span>{item}</span>
          <span className="sep">/</span>
        </Fragment>
      ))}
    </span>
  )
}

/** Full-bleed tech ticker; two identical runs make the 34s loop seamless. */
export function Marquee() {
  return (
    <div aria-hidden="true" className="marquee-band">
      <div className="marquee-track">
        <Run />
        <Run />
      </div>
    </div>
  )
}
