/**
 * All site content. Adding a project = adding one object here — no component edits.
 * Copy is verbatim from the v3 design handoff.
 */

/** Inline rich text: plain string, accent/bright colored span, or a link. */
export type RichSegment =
  | string
  | { text: string; style: 'accent' | 'bright' }
  | { text: string; href: string }

export type RichText = RichSegment[]

export interface Profile {
  firstName: string
  lastName: string
  role: string
  tagline: string
  valueProp: string
  status: string
  email: string
  github: { label: string; url: string }
  linkedin: { label: string; url: string }
  typewriterPhrases: string[]
  terminal: {
    path: string
    roleAnswer: string
    stackLines: string[]
  }
}

export const profile: Profile = {
  firstName: 'Mark',
  lastName: 'Botros',
  role: 'Senior Software Engineer',
  tagline: 'Backend at the core, products end to end',
  valueProp:
    'I design, build, and ship complete products end to end: web frontends, mobile apps, APIs, databases, and cloud infrastructure. Java/Spring Boot, NestJS and Python at the core.',
  status: 'Open to senior roles & freelance · Cairo · remote',
  email: 'MarkBotros0@gmail.com',
  github: { label: 'MarkBotros0', url: 'https://github.com/MarkBotros0' },
  linkedin: { label: 'MarkBotros0', url: 'https://linkedin.com/in/MarkBotros0' },
  typewriterPhrases: [
    'digital banking APIs',
    'SaaS platforms',
    'mobile marketplaces',
    'cloud infra',
    'AI-powered tools',
  ],
  terminal: {
    path: '~/mark — zsh',
    roleAnswer: 'senior software engineer',
    stackLines: ['java · spring boot · typescript · python', 'postgres · aws · azure · kubernetes'],
  },
}

export interface Section {
  id: string
  num: string
  navLabel: string
  menuLabel: string
  paletteLabel: string
  keywords: string
}

/** The six sections; the first five appear in the navbar, all six in menu/palette/rail. */
export const sections: Section[] = [
  {
    id: 'projects',
    num: '01',
    navLabel: 'Projects',
    menuLabel: 'Projects',
    paletteLabel: 'Featured projects',
    keywords: 'projects featured client work snurra spectra nannymom',
  },
  {
    id: 'personal',
    num: '02',
    navLabel: 'Personal',
    menuLabel: 'Personal',
    paletteLabel: 'Personal projects',
    keywords: 'personal projects egx jpc space money manager',
  },
  {
    id: 'experience',
    num: '03',
    navLabel: 'Experience',
    menuLabel: 'Experience',
    paletteLabel: 'Experience timeline',
    keywords: 'experience deloitte itworx qoodz tc egypt freelance timeline',
  },
  {
    id: 'skills',
    num: '04',
    navLabel: 'Skills',
    menuLabel: 'Skills',
    paletteLabel: 'Skills & stack',
    keywords: 'skills stack java spring boot typescript python aws azure',
  },
  {
    id: 'credentials',
    num: '05',
    navLabel: 'Certs',
    menuLabel: 'Certifications',
    paletteLabel: 'Certifications & education',
    keywords: 'certifications education aws degree languages',
  },
  {
    id: 'contact',
    num: '06',
    navLabel: 'Contact',
    menuLabel: 'Contact',
    paletteLabel: 'Contact',
    keywords: 'contact hire email',
  },
]

export interface Highlight {
  span?: 2
  accentWash?: boolean
  prefix?: string
  value?: number
  suffix?: string
  text?: string[]
  label: string
  note?: string
  chips?: string[]
}

export const highlights: Highlight[] = [
  {
    span: 2,
    accentWash: true,
    value: 6,
    label: 'products shipped end‑to‑end',
    note: 'Three client platforms and three of my own, each taken from architecture to production.',
  },
  { value: 4, suffix: '+', label: 'years of experience' },
  { prefix: '×', value: 2, label: 'AWS certified' },
  {
    span: 2,
    value: 6,
    suffix: '+',
    label: 'industries served',
    chips: ['banking', 'insurance', 'payments', 'F&B', 'education', 'agriculture'],
  },
  { text: ['web + mobile', '+ cloud'], label: 'full delivery scope' },
]

export const marquee: string[] = [
  'Java',
  'Spring Boot',
  'TypeScript',
  'NestJS',
  'Next.js',
  'React',
  'React Native',
  'Python',
  'FastAPI',
  'PostgreSQL',
  'Redis',
  'Kafka',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'Terraform',
  'Playwright',
]

export interface StackGroup {
  label: string
  items: string[]
}

export interface FeaturedProject {
  id: string
  index: string
  name: string
  subtitle: string
  meta: string
  description: string
  tags: string[]
  /** Real product screenshot; the striped frame renders as fallback while absent. */
  image?: string
  screenshotCaption: string
  detail: {
    problem: string
    built: string
    role: string
    groups: StackGroup[]
  }
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'snurra',
    index: '01',
    name: 'Snurra',
    subtitle: 'Automated Website Quality-Audit Platform',
    meta: 'freelance client engagement · 2026 – present',
    description:
      'SaaS platform that crawls entire websites and runs a catalog of 200+ automated checks across 6 quality pillars — accessibility (WCAG), SEO, performance, content quality and more — then scores results into dashboards with issue tracking, scheduled runs, reports, and alerts.',
    tags: ['TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'Playwright', 'Azure', 'Terraform'],
    screenshotCaption: 'screenshot slot — audit dashboard',
    detail: {
      problem:
        'Quality reviews were manual, inconsistent, and impossible to repeat at site scale — teams had no continuous, comparable view of accessibility, SEO, and performance regressions.',
      built:
        'The distributed audit engine — Node.js + TypeScript worker running Playwright browsers, Postgres-backed job queue (pg-boss), Drizzle ORM over a 30+ table schema — plus the analytics dashboard (Next.js 16, React 19, Tailwind v4, NextAuth) and cloud infrastructure as code (Terraform on Azure: Container Apps, private Postgres, VNet) with GitHub Actions CI/CD.',
      role: 'Sole engineer. Owned end-to-end from architecture to cloud deployment.',
      groups: [
        { label: 'Frontend', items: ['Next.js 16', 'React 19', 'Tailwind v4'] },
        { label: 'Backend', items: ['Node.js', 'TypeScript', 'Playwright', 'pg-boss', 'NextAuth'] },
        { label: 'Data', items: ['PostgreSQL', 'Drizzle ORM'] },
        { label: 'Infra', items: ['Azure Container Apps', 'Terraform', 'GitHub Actions'] },
      ],
    },
  },
  {
    id: 'spectra',
    index: '02',
    name: 'Spectra',
    subtitle: 'AI-Powered Design & QA Suite',
    meta: 'freelance client engagement · 2026 – present',
    description:
      'QA platform that compares live websites against their Figma designs pixel-by-pixel and uses AI vision (Claude) to produce human-readable discrepancy reports with suggested CSS fixes — expanded into a multi-product suite: site auditing, crawling, maintenance monitoring, and email-template QA across email clients.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Playwright', 'AI integration (Claude)'],
    screenshotCaption: 'screenshot slot — pixel-diff report',
    detail: {
      problem:
        'Design-to-build drift was caught by eye, late, and described in ways developers could not act on — and the same manual review had to be repeated for every page, breakpoint, and email client.',
      built:
        'The full-stack Next.js application — multi-browser screenshot & pixel-diff pipeline (Playwright + pixelmatch), AI analysis integration (Anthropic SDK), 20-model Prisma/PostgreSQL data layer, external REST API with API-key auth, scheduled monitoring jobs, Excel report exports.',
      role: 'Sole engineer. Owned end-to-end from architecture to cloud deployment.',
      groups: [
        { label: 'Frontend', items: ['Next.js', 'React', 'Tailwind'] },
        { label: 'Backend', items: ['TypeScript', 'Playwright + pixelmatch', 'Anthropic SDK', 'NextAuth'] },
        { label: 'Data', items: ['Prisma (20 models)', 'PostgreSQL'] },
        { label: 'Infra', items: ['Scheduled jobs', 'REST API + API keys'] },
      ],
    },
  },
  {
    id: 'nanny',
    index: '03',
    name: 'NannyMom',
    subtitle: 'Childcare Marketplace & Care-Monitoring App',
    meta: 'freelance client engagement · 2026 – present',
    description:
      'Dual-sided mobile marketplace connecting mothers with vetted nannies: verified on-demand booking, live care visibility (camera + real-time activity logs), payments, and a local-mom community with events and a peer-to-peer marketplace.',
    tags: ['React Native', 'Expo', 'Express', 'Prisma', 'Redis', 'AWS CDK', 'Payments'],
    screenshotCaption: 'screenshot slot — parent & nanny app',
    detail: {
      problem:
        'Parents booked childcare on trust alone, with no vetting, no visibility once care began, and no safe way to pay or resolve issues — and nannies had no reliable channel to find work.',
      built:
        'The complete product in a Turborepo monorepo — React Native (Expo) mobile app with separate parent and nanny experiences, Express + TypeScript backend (Prisma/PostgreSQL ~37 models, Redis rate limiting), Firebase auth & push, payment-gateway integration with refunds and promo codes, referrals & rewards, real-time chat, React admin console with analytics, AWS infrastructure via CDK, and layered test suites (unit, integration, E2E) on GitHub Actions.',
      role: 'Sole engineer. Owned end-to-end from architecture to cloud deployment.',
      groups: [
        { label: 'Frontend & mobile', items: ['React Native (Expo)', 'React admin console'] },
        {
          label: 'Backend',
          items: ['Express + TypeScript', 'Firebase auth & push', 'Payments & refunds', 'Real-time chat'],
        },
        { label: 'Data', items: ['Prisma (~37 models)', 'PostgreSQL', 'Redis'] },
        { label: 'Infra', items: ['AWS CDK', 'Turborepo', 'GitHub Actions'] },
      ],
    },
  },
]

export interface PersonalProject {
  id: string
  name: string
  subtitle: string
  description: string
  tags: string[]
  detail: {
    problem: string
    built: string
    stack: string[]
    role: string
  }
}

export const personalProjects: PersonalProject[] = [
  {
    id: 'egx',
    name: 'EGX Analytics',
    subtitle: 'Educational Stock-Analysis & Portfolio Tracker',
    description:
      'Mobile-first web app for Egyptian retail investors learning to analyze stocks on the Egyptian Exchange (EGX). A composite scoring engine rates each stock across 8 weighted categories with market-regime awareness; every feature carries a teaching layer explaining the “why”.',
    tags: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL'],
    detail: {
      problem:
        'Retail investors on the EGX get signals with no explanation, so they cannot learn to judge a stock themselves.',
      built:
        'Python FastAPI backend (pandas/NumPy indicator library — RSI, MACD, Bollinger and more; Postgres on Neon; JWT auth) + Next.js frontend with Recharts; portfolio tracker with risk dashboard, correlation heatmap and Monte Carlo projections; deployed on Vercel with a daily data-refresh cron.',
      stack: ['pandas / NumPy', 'React', 'Recharts', 'Vercel'],
      role: 'Solo — product, backend, frontend, deployment.',
    },
  },
  {
    id: 'jpcs',
    name: 'JPC Space',
    subtitle: 'Community-Management Platform',
    description:
      'Full portal for a student community running seasonal discipleship courses: five scoped roles (super, admin, leader, mentor, student), season/group/session management, and student well-being tracking.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'Auth.js'],
    detail: {
      problem:
        'Attendance, assignments, and pastoral notes lived in spreadsheets and chat threads, with no way to scope who could see what.',
      built:
        'Next.js 16 + React 19 app with Server Actions, Prisma/PostgreSQL, Auth.js v5 with permission scopes baked into the JWT for zero-DB permission checks; attendance with automatic at-risk flags, assignment submission & review workflow, QR check-in, session calendar, engagement notes with visibility tiers, reports with CSV export. Currently being rewritten as a Turborepo monorepo with an Expo/React Native mobile app and Express backend.',
      stack: ['React 19', 'PostgreSQL', 'Tailwind', 'React Native (v2)'],
      role: 'Solo — product, backend, frontend, deployment.',
    },
  },
  {
    id: 'jpcm',
    name: 'JPC Money Manager',
    subtitle: 'Group Finance PWA',
    description:
      'Installable PWA for seasonal group finances: members contribute income and record expenses per season, admins manage members and subscriptions, with role-scoped access throughout.',
    tags: ['Next.js', 'Prisma', 'PWA', 'Cloudinary'],
    detail: {
      problem:
        'Shared group money was tracked on paper and trust, with no receipts, no balances, and no record of who changed what.',
      built:
        'Next.js 16 app with Prisma/PostgreSQL and NextAuth v5; receipt uploads (Cloudinary + client-side image compression), balances/transfers, scheduled PDF & Excel export jobs, an audit log on every mutation with soft-delete throughout, Vitest test suite.',
      stack: ['TypeScript', 'NextAuth v5', 'Vitest'],
      role: 'Solo — product, backend, frontend, deployment.',
    },
  },
]

export interface Engagement {
  period: string
  title: string
  description: RichText
}

export interface ExperienceEntry {
  period: string
  /** Current roles get the accent period color and accent timeline dot. */
  current?: boolean
  company: string
  role: string
  description?: RichText
  engagements?: Engagement[]
}

export const experience: ExperienceEntry[] = [
  {
    period: 'Oct 2024 – Present · Cairo, Egypt',
    current: true,
    company: 'Deloitte',
    role: 'Senior Backend Engineer',
    engagements: [
      {
        period: 'May 2026 – Present · remote',
        title: 'OCEAN — Saudi digital bank (Deloitte UK)',
        description: [
          'Java Spring Boot microservices for cards, credit cards, transactions, notifications, and accounts; integrations with core banking, Network International, and fraud-detection platforms; Docker + Kubernetes.',
        ],
      },
      {
        period: 'Oct 2025 – Jan 2026 · remote',
        title: 'Nexi Group — payments, Italy',
        description: [
          'High-performing Spring Boot REST APIs; Hibernate → tuned native SQL; large-scale batch processing on Oracle/MySQL with Liquibase migrations; multithreaded tool processing millions of payment transactions.',
        ],
      },
      {
        period: 'Oct 2024 – Sep 2025 · remote',
        title: 'Hyperexponential — insurance, UK',
        description: [
          'Production portfolio-underwriting model on hX Renew for a major insurer — replaced a legacy Excel process with modular Python; ported actuarial R scripts; NumPy/SciPy/Pandas/Polars computation layer, ',
          { text: '~9× faster (13s → 1.5s)', style: 'accent' },
          '.',
        ],
      },
    ],
  },
  {
    period: '2026 – Present',
    current: true,
    company: 'Freelance',
    role: 'Senior Software Engineer',
    description: [
      'Snurra, Spectra and NannyMom — each owned end-to-end from architecture to cloud deployment. ',
      { text: 'See the case studies →', href: '#projects' },
    ],
  },
  {
    period: 'Apr 2023 – Sep 2024 · Cairo',
    company: 'ITWorx',
    role: 'Software Engineer',
    description: [
      { text: 'Syngenta Global — agriculture, USA.', style: 'bright' },
      ' Spring Boot + Hibernate microservices for agricultural data processing; Oracle optimization; AWS ECS + SNS event-driven architecture.',
    ],
  },
  {
    period: 'May 2022 – Apr 2023 · Remote (UAE)',
    company: 'Qoodz',
    role: 'Backend Engineer',
    description: [
      'NestJS backend for an F&B platform powering 3 mobile apps + 2 websites — loyalty, digital menus, inventory, ordering; Stripe/Paymob payments, Foodics POS; migrated Heroku → AWS.',
    ],
  },
  {
    period: 'Jan 2022 – May 2022 · Cairo',
    company: 'TC Egypt',
    role: 'Backend Engineer',
    description: [
      'NestJS LMS SaaS (courses, quizzes, learning tracks, progress tracking), TDD, Kashier payments, MySQL/TypeORM.',
    ],
  },
]

export interface SkillGroup {
  num: string
  title: string
  span?: 2
  /** The "current focus" tile gets the rotating conic rim + accent wash. */
  conic?: boolean
  /** Visual weight of the primary chips: hero (Backend), soft (default), bright (AI tile). */
  primaryStyle?: 'hero' | 'soft' | 'bright'
  primary?: string[]
  secondary?: string[]
  sub?: { title: string; primary: string[] }
}

export const skills: SkillGroup[] = [
  {
    num: '01 — core',
    title: 'Backend',
    span: 2,
    primaryStyle: 'hero',
    primary: ['Java (Spring Boot)', 'TypeScript (NestJS, Express)'],
    secondary: ['Python (Django)', 'microservices', 'Docker', 'Kubernetes', 'Apache Kafka'],
  },
  {
    num: '02',
    title: 'Frontend',
    primary: ['React', 'Next.js'],
    secondary: ['Tailwind CSS'],
    sub: { title: 'Mobile', primary: ['React Native (Expo)'] },
  },
  {
    num: '03',
    title: 'Databases & data',
    primary: ['PostgreSQL', 'MySQL', 'Oracle'],
    secondary: ['MongoDB', 'SQL tuning', 'indexing & partitioning', 'Pandas / Polars / NumPy', 'ETL pipelines'],
  },
  {
    num: '04',
    title: 'Cloud & DevOps',
    primary: ['AWS (EC2, ECS, SNS, CloudWatch, IAM)'],
    secondary: [
      'Azure (Container Apps, VMs)',
      'Terraform',
      'CI/CD (GitHub Actions, CodePipeline)',
      'Prisma / Drizzle / TypeORM / Hibernate',
    ],
  },
  {
    num: '05 — current focus',
    title: 'AI & agentic',
    span: 2,
    conic: true,
    primaryStyle: 'bright',
    primary: ['LLM tool integrations (Claude, Codex, Gemini)'],
    secondary: ['MCP servers', 'agentic development workflows', 'AI-vision analysis pipelines'],
  },
  {
    num: '06',
    title: 'Also',
    secondary: ['Playwright', 'Git', 'Jira', 'Azure DevOps', 'Swagger', 'Postman'],
  },
]

export interface Credential {
  org: string
  title?: string
  note?: string
  body?: string
  /** Dashed border, muted — the not-yet-earned cert. */
  pending?: boolean
  /** No hover lift/spotlight (the Languages card). */
  static?: boolean
}

export const certifications: Credential[] = [
  { org: 'AWS · Feb 2024', title: 'Developer Associate' },
  { org: 'AWS · Nov 2023', title: 'Cloud Practitioner' },
  { org: 'AWS · expected Aug 2026', title: 'Solutions Architect', pending: true },
  { org: 'Cairo University · 2017–2022', title: 'B.S. Civil Engineering', note: 'GPA 3.81/4 — ranked 2nd' },
  { org: 'Languages', body: 'Arabic (native) · English (fluent) · German (B1)', static: true },
]

export const contact = {
  eyebrow: 'Contact',
  heading: 'Have a product that needs building end to end?',
}

export const footer = {
  left: 'Mark Botros — Senior Software Engineer',
  right: 'Designed and built by hand.',
}
