import { DotGrid } from './DotGrid'

/** Fixed decorative stack: interactive dot grid, aurora blobs, grain. */
export function Background() {
  return (
    <>
      <DotGrid />
      <div aria-hidden="true" className="bg-aurora bg-aurora--violet" />
      <div aria-hidden="true" className="bg-aurora bg-aurora--blue" />
      <div aria-hidden="true" className="bg-aurora bg-aurora--pink" />
      <div aria-hidden="true" className="bg-layer bg-grain" />
    </>
  )
}
