/** Fixed decorative stack: starfield, grid, aurora blobs, grain, cursor glow. */
export function Background() {
  return (
    <>
      <div aria-hidden="true" className="bg-layer bg-stars" />
      <div aria-hidden="true" className="bg-layer bg-grid" />
      <div aria-hidden="true" className="bg-aurora bg-aurora--violet" />
      <div aria-hidden="true" className="bg-aurora bg-aurora--blue" />
      <div aria-hidden="true" className="bg-aurora bg-aurora--pink" />
      <div aria-hidden="true" className="bg-layer bg-grain" />
      <div data-cursor aria-hidden="true" className="cursor-glow" />
    </>
  )
}
