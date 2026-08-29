import { useEffect, useMemo, useRef, useState } from 'react'
import { profile, sections } from '../data/portfolio'

interface Row {
  key: string
  keywords: string
  label: string
  href: string
  /** Section index (mono accent) or link glyph (mono faint). */
  idx?: string
  glyph?: string
  external?: boolean
  closeOnClick: boolean
}

const rows: Row[] = [
  ...sections.map((s) => ({
    key: s.id,
    keywords: s.keywords,
    label: s.paletteLabel,
    href: `#${s.id}`,
    idx: s.num,
    closeOnClick: true,
  })),
  {
    key: 'email',
    keywords: 'email mail gmail write message',
    label: `Email ${profile.email}`,
    href: `mailto:${profile.email}`,
    glyph: '@',
    closeOnClick: false,
  },
  {
    key: 'github',
    keywords: 'github code repositories source',
    label: `GitHub — ${profile.github.label}`,
    href: profile.github.url,
    glyph: '</>',
    external: true,
    closeOnClick: false,
  },
  {
    key: 'linkedin',
    keywords: 'linkedin network profile',
    label: `LinkedIn — ${profile.linkedin.label}`,
    href: profile.linkedin.url,
    glyph: 'in',
    external: true,
    closeOnClick: false,
  },
]

export function CommandPalette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return rows
    return rows.filter((r) => `${r.keywords} ${r.label}`.toLowerCase().includes(q))
  }, [query])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => Math.min(filtered.length - 1, i + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => Math.max(0, i - 1))
    } else if (e.key === 'Enter') {
      rowRefs.current[Math.min(index, filtered.length - 1)]?.click()
      onClose()
    }
  }

  const highlight = Math.min(index, Math.max(0, filtered.length - 1))

  return (
    <div className="palette-overlay" onClick={onClose}>
      <div className="palette" role="dialog" aria-label="Quick navigation" onClick={(e) => e.stopPropagation()}>
        <div className="palette-head">
          <span className="arrow">→</span>
          <input
            ref={inputRef}
            className="palette-input"
            placeholder="Jump to a section…"
            aria-label="Search sections"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIndex(0)
            }}
            onKeyDown={onKeyDown}
          />
          <span className="esc-chip">esc</span>
        </div>
        <ul className="palette-list">
          {filtered.map((r, i) => (
            <li key={r.key}>
              <a
                ref={(el) => {
                  rowRefs.current[i] = el
                }}
                href={r.href}
                onClick={r.closeOnClick ? onClose : undefined}
                {...(r.external ? { target: '_blank', rel: 'noopener' } : {})}
                className={`palette-row${i === highlight ? ' active' : ''}`}
              >
                {r.idx ? <span className="idx">{r.idx}</span> : <span className="glyph">{r.glyph}</span>}
                {r.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
