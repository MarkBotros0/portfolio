import { useEffect, useRef } from 'react'
import { hoverNone, prefersReducedMotion } from '../hooks/useMedia'

const GAP = 30
const R = 1.15
const MAX = 3.6
const REACH = 190

/**
 * Interactive dot-grid background: dots near the cursor grow, brighten to the
 * accent color, and push 5px outward. Under (hover: none) or reduced motion
 * the grid draws once, statically, with no pointer tracking or rAF loop.
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

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = ox + i * GAP
          const y = oy + j * GAP
          const ddx = x - mx
          const ddy = y - my
          const d = Math.hypot(ddx, ddy)
          let k = d < REACH ? 1 - d / REACH : 0
          k = k * k * (3 - 2 * k)
          let px = x
          let py = y
          if (k > 0 && d > 0.0001) {
            px = x + (ddx / d) * 5 * k
            py = y + (ddy / d) * 5 * k
          }
          if (k > 0.02) {
            ctx.globalAlpha = 0.16 + 0.72 * k
            ctx.fillStyle = accent
          } else {
            ctx.globalAlpha = 0.1
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
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="dot-grid" />
}
