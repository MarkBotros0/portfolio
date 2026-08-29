import { createElement, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { useReducedMotion } from '../hooks/useMedia'

interface BlurTextProps {
  as?: 'h2' | 'p'
  className?: string
  style?: CSSProperties
  children: string
}

/**
 * Splits a headline into words that reveal from a 9px blur with a 55ms
 * stagger once 25% visible. Renders plain text under reduced motion.
 */
export function BlurText({ as = 'h2', className, style, children }: BlurTextProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true)
            io.disconnect()
          }
        })
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  if (reduced) return createElement(as, { className, style }, children)

  const words = children.trim().split(/\s+/)
  return createElement(
    as,
    { className, style, ref },
    words.map((w, i) => (
      <span
        key={i}
        style={{
          display: 'inline-block',
          whiteSpace: 'pre',
          opacity: shown ? 1 : 0,
          filter: shown ? 'blur(0)' : 'blur(9px)',
          transform: shown ? 'translate3d(0,0,0)' : 'translate3d(0,14px,0)',
          transition: 'opacity .7s ease, filter .7s ease, transform .7s cubic-bezier(.22,1,.36,1)',
          transitionDelay: `${i * 55}ms`,
        }}
      >
        {w + (i < words.length - 1 ? ' ' : '')}
      </span>
    )),
  )
}
