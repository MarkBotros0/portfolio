import { Slideshow } from './Slideshow'

/**
 * Frame treatment for projects whose screenshots are portrait phone captures.
 *
 * A single 9:19.5 shot letterboxed into a landscape frame wastes most of the
 * width and reads as a mistake, so the shots are dealt across device mocks
 * instead. Each phone owns its own rotation and the screens are partitioned
 * round-robin, so no two phones can ever show the same shot at once.
 *
 * Two layouts, picked by what the project has:
 *
 *   phones only    three mocks fanned across the centre of the frame.
 *   phones + web   the landscape shots fill the frame and a pair of phones
 *                  overlaps them from the right, so one composite carries both
 *                  halves of a product that spans mobile and web.
 */
export function PhoneStage({
  phones,
  backdrop,
  alt,
}: {
  phones: string[]
  backdrop?: string[]
  alt: string
}) {
  if (!phones.length) return null

  // Phones share the frame with the web shots, so fewer and tighter.
  const split = Boolean(backdrop?.length)
  const laneCount = split ? 2 : 3
  const lanes =
    phones.length >= laneCount
      ? Array.from({ length: laneCount }, (_, i) => phones.filter((_, k) => k % laneCount === i))
      : [phones]
  // The lead is the front phone; the rest tuck in behind it to its left.
  const [lead, ...behind] = lanes

  return (
    <div className={split ? 'stage stage--split' : 'stage'}>
      {backdrop?.length ? (
        <div className="stage-back">
          <Slideshow images={backdrop} alt={`${alt} — admin console`} />
        </div>
      ) : null}
      <div className="stage-glow" aria-hidden="true" />
      <div className="stage-row">
        {/* Only the lead phone is described — the others cycle screens from the
            same app and would just be noise in a screen reader. */}
        {behind[0] ? <Phone screens={behind[0]} alt="" side="l" /> : null}
        <Phone screens={lead} alt={alt} />
        {behind[1] ? <Phone screens={behind[1]} alt="" side="r" /> : null}
      </div>
    </div>
  )
}

function Phone({ screens, alt, side }: { screens: string[]; alt: string; side?: 'l' | 'r' }) {
  return (
    <div className={`phone${side ? ` phone--${side}` : ' phone--lead'}`}>
      <span className="phone-notch" aria-hidden="true" />
      <div className="phone-screen">
        <Slideshow images={screens} alt={alt} />
      </div>
    </div>
  )
}
