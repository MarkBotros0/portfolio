import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../hooks/useMedia'

const INTERVAL = 4500

/**
 * Auto-rotating screenshot slideshow: crossfades between images every 4.5s
 * with a random per-card stagger so frames don't switch in lockstep, and only
 * cycles while on screen. A single image renders statically; under reduced
 * motion the first image stays put.
 */
export function Slideshow({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0)
  const [running, setRunning] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

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
      INTERVAL + Math.random() * 1500,
    )
    return () => {
      clearTimeout(kickoff)
      if (interval) clearInterval(interval)
    }
  }, [running, images.length])

  return (
    <div ref={ref} className="slideshow">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ''}
          loading="lazy"
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
