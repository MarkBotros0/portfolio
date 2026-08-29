import { footer } from '../data/portfolio'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span>{footer.left}</span>
        <span>
          {footer.right} <span className="footer-glyph">&lt;/&gt;</span>
        </span>
      </div>
    </footer>
  )
}
