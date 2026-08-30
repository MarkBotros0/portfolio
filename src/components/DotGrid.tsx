import { useEffect, useRef } from 'react'
import { hoverNone, prefersReducedMotion } from '../hooks/useMedia'

const GAP = 30
const R = 1.15
const MAX = 3.6
const REACH = 190
/** Calm zone around [data-dots-avoid] content: rect padding + soft falloff. */
const AVOID_PAD = 14
const AVOID_FADE = 64

/**
 * Interactive dot-grid background: dots near the cursor grow, brighten to the
 * accent color, and push 5px outward. The grid is content-aware — elements
 * marked [data-dots-avoid] (headings, paragraphs sitting directly on the
 * background) cast a calm zone where dots dim to a whisper and ignore the
 * cursor, with a smooth halo at the edges, so text stays legible while the
 * effect runs at full strength in open space. Under (hover: none) or reduced
 * motion the grid draws statically with no pointer tracking or rAF loop.
 */
export function DotGrid() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const interactive = !hoverNone() && !prefersReducedMotion()
    let w = 0
    let h = 0
    let cols = 0
    let rows = 0
    let ox = 0
    let oy = 0
    let accent = '#a78bfa'
    let tx = -9999
    let ty = -9999
    let mx = -9999
    let my = -9999
    let raf = 0
    const avoidEls = Array.from(document.querySelectorAll('[data-dots-avoid]'))

    const draw = () => {
      // viewport rects of content the dots should part around, freshly read so
      // scroll position and reveal transforms are always respected
      const zones: { l: number; t: number; r: number; b: number }[] = []
      for (const el of avoidEls) {
        const r = el.getBoundingClientRect()
        if (r.width === 0 || r.bottom < -AVOID_FADE || r.top > h + AVOID_FADE) continue
        zones.push({ l: r.left - AVOID_PAD, t: r.top - AVOID_PAD, r: r.right + AVOID_PAD, b: r.bottom + AVOID_PAD })
      }

      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = ox + i * GAP
          const y = oy + j * GAP

          // 1 in open space → 0 inside a calm zone, smoothstepped at the rim
          let f = 1
          for (const z of zones) {
            const zdx = Math.max(z.l - x, x - z.r, 0)
            const zdy = Math.max(z.t - y, y - z.b, 0)
            if (zdx === 0 && zdy === 0) {
              f = 0
              break
            }
            const dist = Math.hypot(zdx, zdy)
            if (dist < AVOID_FADE) {
              const e = dist / AVOID_FADE
              const s = e * e * (3 - 2 * e)
              if (s < f) f = s
            }
          }

          const ddx = x - mx
          const ddy = y - my
          const d = Math.hypot(ddx, ddy)
          let k = d < REACH ? 1 - d / REACH : 0
          k = k * k * (3 - 2 * k)
          k *= f
          let px = x
          let py = y
          if (k > 0 && d > 0.0001) {
            px = x + (ddx / d) * 5 * k
            py = y + (ddy / d) * 5 * k
          }
          if (k > 0.02) {
            ctx.globalAlpha = (0.16 + 0.72 * k) * (0.25 + 0.75 * f)
            ctx.fillStyle = accent
          } else {
            ctx.globalAlpha = 0.1 * (0.25 + 0.75 * f)
            ctx.fillStyle = '#ffffff'
          }
          ctx.beginPath()
          ctx.arc(px, py, R + (MAX - R) * k, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / GAP) + 1
      rows = Math.ceil(h / GAP) + 1
      ox = (w - (cols - 1) * GAP) / 2
      oy = (h - (rows - 1) * GAP) / 2
      accent = getComputedStyle(document.documentElement).getPropertyValue('--a').trim() || accent
      if (!interactive) draw()
    }

    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
    }
    const onLeave = () => {
      tx = -9999
      ty = -9999
    }

    const onStaticScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        draw()
      })
    }

    if (interactive) {
      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerleave', onLeave)
      const loop = () => {
        mx += (tx - mx) * 0.12
        my += (ty - my) * 0.12
        draw()
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    } else {
      // calm zones are viewport-relative — re-render them as the page scrolls
      window.addEventListener('scroll', onStaticScroll, { passive: true })
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onStaticScroll)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="dot-grid" />
}
