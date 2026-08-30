import { useEffect } from 'react'
import { hoverNone, prefersReducedMotion } from './useMedia'

/**
 * Page-level motion effects, driven by data attributes so components stay
 * purely presentational:
 *  - data-spot / data-spotlayer  → pointer-tracking card spotlight
 *  - data-tilt                   → 3D tilt (rAF-throttled)
 *  - data-magnet                 → magnetic buttons
 *  - data-reveal                 → scroll-in reveal with (i % 4) * 70ms stagger
 *  - data-progress / data-stack  → scroll progress bar + sticky-stack dimming
 *
 * All pointer effects are skipped under prefers-reduced-motion, on
 * (hover: none) devices, and when pointerFx is off.
 */
export function usePageFx(pointerFx: boolean) {
  useEffect(() => {
    const reduced = prefersReducedMotion()
    const noHover = hoverNone()
    const ac = new AbortController()
    const { signal } = ac
    const observers: IntersectionObserver[] = []

    // --- spotlights ---
    if (!reduced && !noHover && pointerFx) {
      document.querySelectorAll<HTMLElement>('[data-spot]').forEach((card) => {
        const layer = card.querySelector<HTMLElement>('[data-spotlayer]')
        if (!layer) return
        card.addEventListener(
          'pointermove',
          (e) => {
            const r = card.getBoundingClientRect()
            layer.style.setProperty('--mx', `${e.clientX - r.left}px`)
            layer.style.setProperty('--my', `${e.clientY - r.top}px`)
          },
          { signal },
        )
        card.addEventListener('pointerenter', () => (layer.style.opacity = '1'), { signal })
        card.addEventListener('pointerleave', () => (layer.style.opacity = '0'), { signal })
      })

      // --- 3D tilt ---
      document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
        let raf = 0
        el.addEventListener(
          'pointermove',
          (e) => {
            if (raf) return
            raf = requestAnimationFrame(() => {
              raf = 0
              const r = el.getBoundingClientRect()
              const px = (e.clientX - r.left) / r.width - 0.5
              const py = (e.clientY - r.top) / r.height - 0.5
              el.style.transform = `perspective(900px) rotateY(${(px * 7).toFixed(2)}deg) rotateX(${(-py * 7).toFixed(2)}deg) scale(1.012)`
            })
          },
          { signal },
        )
        el.addEventListener(
          'pointerleave',
          () => {
            el.style.transform = 'perspective(900px) rotateY(0) rotateX(0) scale(1)'
          },
          { signal },
        )
      })

      // --- magnetic buttons ---
      document.querySelectorAll<HTMLElement>('[data-magnet]').forEach((el) => {
        el.addEventListener(
          'pointermove',
          (e) => {
            const r = el.getBoundingClientRect()
            const dx = (e.clientX - (r.left + r.width / 2)) / r.width
            const dy = (e.clientY - (r.top + r.height / 2)) / r.height
            el.style.transform = `translate3d(${(dx * 7).toFixed(1)}px,${(dy * 5 - 2).toFixed(1)}px,0)`
          },
          { signal },
        )
        el.addEventListener('pointerleave', () => (el.style.transform = 'translate3d(0,0,0)'), { signal })
      })
    }

    // --- scroll reveal ---
    if (!reduced) {
      const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
      const below = els.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.88)
      below.forEach((el, i) => {
        el.style.opacity = '0'
        el.style.transform = 'translate3d(0,22px,0)'
        el.style.transition = 'opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1)'
        el.style.transitionDelay = `${(i % 4) * 70}ms`
      })
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return
            const el = e.target as HTMLElement
            el.style.opacity = '1'
            el.style.transform = 'translate3d(0,0,0)'
            io.unobserve(el)
          })
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
      )
      below.forEach((el) => io.observe(el))
      observers.push(io)
    }

    // --- scroll progress + sticky-stack dim ---
    const bar = document.querySelector<HTMLElement>('[data-progress]')
    const stack = Array.from(document.querySelectorAll<HTMLElement>('[data-stack]'))
    const onScroll = () => {
      if (bar) {
        const h = document.documentElement.scrollHeight - window.innerHeight
        bar.style.width = `${h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0}%`
      }
      stack.forEach((el, i) => {
        const next = stack[i + 1]
        if (!next) {
          el.style.filter = 'none'
          return
        }
        const r = next.getBoundingClientRect()
        const k = Math.max(0, Math.min(1, 1 - r.top / Math.max(1, window.innerHeight * 0.85)))
        el.style.filter = `brightness(${(1 - k * 0.35).toFixed(3)})`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true, signal })
    onScroll()

    return () => {
      ac.abort()
      observers.forEach((io) => io.disconnect())
    }
  }, [pointerFx])
}
