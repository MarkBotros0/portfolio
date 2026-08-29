import { sections } from '../data/portfolio'

interface NavProps {
  wide: boolean
  active: string | null
  menuOpen: boolean
  onToggleMenu: () => void
  onCloseMenu: () => void
  onOpenPalette: () => void
}

export function Nav({ wide, active, menuOpen, onToggleMenu, onCloseMenu, onOpenPalette }: NavProps) {
  const navSections = sections.filter((s) => s.id !== 'contact')

  return (
    <header className="site-header">
      <nav className="nav-inner">
        <a href="#top" className="brand">
          <span className="logo-tile">
            <span aria-hidden="true" className="logo-beam" />
            <span className="logo-core">MB</span>
          </span>
          <span className="brand-name">Mark Botros</span>
        </a>
        {wide ? (
          <div className="navlinks">
            {navSections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={`navlink${active === s.id ? ' active' : ''}`}>
                <span className="idx">{s.num}</span> {s.navLabel}
              </a>
            ))}
            <button onClick={onOpenPalette} aria-label="Open quick navigation" className="jump-btn">
              Jump to <span className="kbd">⌘K</span>
            </button>
            <a data-magnet href="#contact" className="contact-pill">
              Contact
            </a>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={onOpenPalette} aria-label="Open quick navigation" className="icon-btn">
              ⌕
            </button>
            <button onClick={onToggleMenu} aria-label="Menu" aria-expanded={menuOpen} className="icon-btn">
              <span className="burger">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        )}
      </nav>
      {!wide && menuOpen && (
        <ul className="mobile-menu">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                onClick={onCloseMenu}
                href={`#${s.id}`}
                className={`mobile-link${s.id === 'contact' ? ' mobile-link--contact' : ''}`}
              >
                <span className="idx">{s.num}</span> {s.menuLabel}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
