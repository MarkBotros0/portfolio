import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../hooks/useMedia'

const INTERVAL = 2200

/**
 * Auto-rotating screenshot slideshow: crossfades between images every 2.2s
 * with a random per-card stagger so frames don't switch in lockstep, and only
 * cycles while on screen. A single image renders statically; under reduced
 * motion the first image stays put.
 */
export function Slideshow({ images: sources, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0)
  const [running, setRunning] = useState(false)
  // A file that fails to load drops out of the rotation rather than showing a
  // broken frame — so listing a shot before it exists degrades gracefully.
  const [broken, setBroken] = useState<string[]>([])
  const ref = useRef<HTMLDivElement>(null)
  const images = sources.filter((s) => !broken.includes(s))

  useEffect(() => {
    if (index >= images.length) setIndex(0)
  }, [images.length, index])

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
    let interval: ReturnType<typeof setInterval> | undefined
    const kickoff = setTimeout(
      () => {
        setIndex((i) => (i + 1) % images.length)
        interval = setInterval(() => setIndex((i) => (i + 1) % images.length), INTERVAL)
      },
      INTERVAL + Math.random() * 900,
    )
    return () => {
      clearTimeout(kickoff)
      if (interval) clearInterval(interval)
    }
  }, [running, images.length])

  if (!images.length) return null

  return (
    <div ref={ref} className="slideshow">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ''}
          loading="lazy"
          onError={() => setBroken((b) => (b.includes(src) ? b : [...b, src]))}
          className={i === index ? 'active' : undefined}
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
