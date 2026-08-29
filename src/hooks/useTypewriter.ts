import { useEffect, useState } from 'react'

/**
 * Cycles through phrases: type 58ms/char, hold 1600ms, delete 26ms/char,
 * 320ms between words. When disabled (reduced motion) renders all phrases
 * joined statically.
 */
export function useTypewriter(phrases: string[], enabled: boolean): string {
  const [typed, setTyped] = useState(() => (enabled ? '' : phrases.join(' · ')))

  useEffect(() => {
    if (!enabled) {
      setTyped(phrases.join(' · '))
      return
    }
    let p = 0
    let i = 0
    let dir = 1
    let t: ReturnType<typeof setTimeout>
    const tick = () => {
      const word = phrases[p]
      i += dir
      setTyped(word.slice(0, i))
      let delay = dir > 0 ? 58 : 26
      if (dir > 0 && i >= word.length) {
        dir = -1
        delay = 1600
      } else if (dir < 0 && i <= 0) {
        dir = 1
        p = (p + 1) % phrases.length
        delay = 320
      }
      t = setTimeout(tick, delay)
    }
    t = setTimeout(tick, 500)
    return () => clearTimeout(t)
  }, [phrases, enabled])

  return typed
}
