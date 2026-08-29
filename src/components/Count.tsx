import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../hooks/useMedia'

/** Counts 0 → target over 950ms (easeOutCubic) once 50% visible. */
export function Count({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    el.textContent = '0'
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          io.unobserve(e.target)
          const start = performance.now()
          const dur = 950
          const step = (now: number) => {
            const k = Math.min(1, (now - start) / dur)
            el.textContent = String(Math.round(target * (1 - Math.pow(1 - k, 3))))
            if (k < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        })
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target])

  return (
    <span ref={ref} className="count">
      {target}
    </span>
  )
}
