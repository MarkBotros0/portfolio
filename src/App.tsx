import { useEffect, useMemo, useState } from 'react'
import { featuredProjects, personalProjects, sections } from './data/portfolio'
import { useWide } from './hooks/useMedia'
import { usePageFx } from './hooks/usePageFx'
import { useSectionSpy } from './hooks/useSectionSpy'
import { Background } from './components/Background'
import { BentoStats } from './components/BentoStats'
import { CommandPalette } from './components/CommandPalette'
import { Contact } from './components/Contact'
import { Credentials } from './components/Credentials'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Nav } from './components/Nav'
import { PersonalCard } from './components/PersonalCard'
import { ProjectCase } from './components/ProjectCase'
import { Rail } from './components/Rail'
import { SectionHeader } from './components/SectionHeader'
import { SkillsGrid } from './components/SkillsGrid'
import { Timeline } from './components/Timeline'

interface AppProps {
  /** Accent override, e.g. cyan oklch(0.82 0.16 190), green oklch(0.80 0.19 145), amber oklch(0.78 0.17 55). */
  accent?: string
  /** Master switch for spotlight / tilt / magnet / cursor-glow effects. */
  pointerFx?: boolean
  /** Opens all six case-study details — useful for print/PDF. */
  projectDetailsOpen?: boolean
}

export default function App({ accent, pointerFx = true, projectDetailsOpen = false }: AppProps) {
  const wide = useWide()
  const [menuOpen, setMenuOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    projectDetailsOpen
      ? Object.fromEntries([...featuredProjects, ...personalProjects].map((p) => [p.id, true]))
      : {},
  )
  const ids = useMemo(() => sections.map((s) => s.id), [])
  const active = useSectionSpy(ids)

  useEffect(() => {
    if (accent) document.documentElement.style.setProperty('--a', accent)
  }, [accent])

  useEffect(() => {
    if (wide) setMenuOpen(false)
  }, [wide])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
        setMenuOpen(false)
      } else if (e.key === 'Escape') {
        setPaletteOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  usePageFx(pointerFx)

  const toggle = (id: string) => setOpen((s) => ({ ...s, [id]: !s[id] }))

  return (
    <div className="page">
      <Background />

      <div aria-hidden="true" className="progress-track">
        <div data-progress className="progress-fill" />
      </div>

      <Nav
        wide={wide}
        active={active}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((o) => !o)}
        onCloseMenu={() => setMenuOpen(false)}
        onOpenPalette={() => {
          setPaletteOpen(true)
          setMenuOpen(false)
        }}
      />

      {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} />}
      {wide && <Rail active={active} />}

      <main id="top">
        <div className="shell">
          <Hero />
          <BentoStats />
        </div>

        <Marquee />

        <div className="shell">
          <section id="experience" className="section section--first">
            <span aria-hidden="true" className="ghost-num ghost-num--offset">
              01
            </span>
            <SectionHeader eyebrow="Experience" heading="Four years, five teams, one thread" headingMaxCh={22} />
            <Timeline />
          </section>

          <section id="projects" className="section">
            <span aria-hidden="true" className="ghost-num">
              02
            </span>
            <SectionHeader
              eyebrow="Featured projects"
              heading="Client work, owned end to end"
              headingMaxCh={22}
              sub="Freelance engagements: architecture, backend, frontend, and cloud infrastructure."
            />
            <div className="case-stack">
              {featuredProjects.map((p, i) => (
                <ProjectCase key={p.id} project={p} position={i} open={!!open[p.id]} onToggle={() => toggle(p.id)} />
              ))}
            </div>
          </section>

          <section id="personal" className="section">
            <span aria-hidden="true" className="ghost-num">
              03
            </span>
            <SectionHeader
              eyebrow="Personal projects"
              heading="Built for myself and my communities"
              headingMaxCh={24}
              sub="My own products, built unpaid and running in the hands of real users."
            />
            <div className="pgrid">
              {personalProjects.map((p) => (
                <PersonalCard key={p.id} project={p} open={!!open[p.id]} onToggle={() => toggle(p.id)} />
              ))}
            </div>
          </section>

          <section id="skills" className="section">
            <span aria-hidden="true" className="ghost-num">
              04
            </span>
            <SectionHeader eyebrow="Skills" heading="The stack I build with" />
            <SkillsGrid />
          </section>

          <section id="credentials" className="section">
            <span aria-hidden="true" className="ghost-num">
              05
            </span>
            <SectionHeader eyebrow="Certifications & education" heading="Credentials" />
            <Credentials />
          </section>

          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  )
}
