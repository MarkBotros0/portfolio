import type { CSSProperties } from 'react'

/**
 * Pointer-tracking spotlight layer. Place inside a `position: relative`
 * element that carries `data-spot`; usePageFx wires the pointer events.
 */
export function Spot({ size = 300, color }: { size?: number; color?: string }) {
  const style: CSSProperties = { '--spot-size': `${size}px` } as CSSProperties
  if (color) (style as Record<string, string>)['--spot-color'] = color
  return <div data-spotlayer aria-hidden="true" className="spot-layer" style={style} />
}
