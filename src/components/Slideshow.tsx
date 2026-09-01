import { useEffect, useRef, useState } from 'react'
import { shotPlaceholders } from '../data/shotPlaceholders'
import { prefersReducedMotion } from '../hooks/useMedia'

const INTERVAL = 2200
/** Start fetching a card's first frame this far before it scrolls into view. */
const PRELOAD_MARGIN = '800px 0px'

/**
 * Auto-rotating screenshot slideshow: crossfades between images every 2.2s
 * with a random per-card stagger so frames don't switch in lockstep, and only
 * cycles while on screen. A single image renders statically; under reduced
 * motion the first image stays put.
 *
 * Frames are never blank. An inlined 24px blur of the current shot paints
 * immediately (no network), slides load one at a time — the visible one first,
 * each unlocking the next — and the rotation only advances to a slide that has
 * already decoded.
 */
export function Slideshow({ images: sources, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0)
  const [armed, setArmed] = useState(false)
  const [running, setRunning] = useState(false)
  const [loaded, setLoaded] = useState<string[]>([])
  // A file that fails to load drops out of the rotation rather than showing a
  // broken frame — so listing a shot before it exists degrades gracefully.
  const [broken, setBroken] = useState<string[]>([])
  const ref = useRef<HTMLDivElement>(null)
  const images = sources.filter((s) => !broken.includes(s))

  // The visible slide loads alone so the frame fills as fast as possible; the
  // rest are released together as soon as it settles. Chaining them one at a
  // time instead made a ten-slide card's last frames tens of seconds away.
  const settled = loaded.length + broken.length
  const mounted = !armed ? 0 : settled ? images.length : 1

  // The rotation timer reads these through a ref so a newly-loaded image
  // doesn't restart the interval and reset the stagger.
  const latest = useRef({ images, loaded })
  useEffect(() => {
    latest.current = { images, loaded }
  })

  useEffect(() => {
    if (index >= images.length) setIndex(0)
  }, [images.length, index])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setArmed(true)
        io.disconnect()
      },
      { rootMargin: PRELOAD_MARGIN },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (images.length < 2 || prefersReducedMotion()) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [images.length])

  useEffect(() => {
    if (!running) return
    const advance = () =>
      setIndex((i) => {
        const { images: imgs, loaded: done } = latest.current
        const next = (i + 1) % imgs.length
        // Hold the current frame rather than crossfading into an empty one.
        return done.includes(imgs[next]) ? next : i
      })
    let interval: ReturnType<typeof setInterval> | undefined
    const kickoff = setTimeout(
      () => {
        advance()
        interval = setInterval(advance, INTERVAL)
      },
      INTERVAL + Math.random() * 900,
    )
    return () => {
      clearTimeout(kickoff)
      if (interval) clearInterval(interval)
    }
  }, [running, images.length])

  if (!sources.length) return null

  // With every source broken there is nothing left to rotate, but the frame
  // still keeps its blurred preview — collapsing to an empty box is the one
  // outcome worse than a low-res one.
  const current = images[index] ?? sources[0]
  // Any shot's blur beats an empty box, so a src with no generated placeholder
  // borrows the first one the card does have.
  const blur = shotPlaceholders[current] ?? sources.map((s) => shotPlaceholders[s]).find(Boolean)

  return (
    <div ref={ref} className="slideshow">
      {blur && (
        <div
          aria-hidden="true"
          className="slide-blur"
          style={{ backgroundImage: `url("${blur}")`, opacity: loaded.includes(current) ? 0 : 1 }}
        />
      )}
      {images.slice(0, mounted).map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ''}
          decoding="async"
          fetchPriority={i === 0 ? 'high' : 'low'}
          onLoad={() => setLoaded((l) => (l.includes(src) ? l : [...l, src]))}
          onError={() => setBroken((b) => (b.includes(src) ? b : [...b, src]))}
          className={i === index && loaded.includes(src) ? 'active' : undefined}
        />
      ))}
      {images.length > 1 && (
        <span className="slide-dots" aria-hidden="true">
          {images.map((src, i) => (
            <span key={src} className={i === index ? 'active' : undefined} />
          ))}
        </span>
      )}
    </div>
  )
}
