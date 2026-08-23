/* ---------- Elements ---------- */

const pageRoot = document.documentElement;
const gridPage = document.querySelector('.page-shell');
const siteHeader = document.querySelector('.site-header');
const detailPage = document.querySelector('.detail-page');
const detailContent = document.querySelector('.detail-content');
const detailBackButton = document.querySelector('.detail-back-button');
const themeButton = document.querySelector('.theme-control');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const ballButton = document.querySelector('.ball-control');
const cardCollection = document.querySelector('.collections');
const navigationTrack = document.querySelector('.navigation-track');
const navigationLinesContainer = document.querySelector('.navigation-lines');
const navigationTargets = document.querySelectorAll('.navigation-target');
const navigationLabels = document.querySelectorAll('.navigation-label');
const homeNavigationButton = document.querySelector('.navigation-control');
const cardGrids = document.querySelectorAll('.card-grid');
const cards = document.querySelectorAll('.card');
const projectTagLists = document.querySelectorAll('.project-card__tags');
const buildsGrid = document.querySelector('.card-grid--mosaic');
const prototypeToggle = document.querySelector('.prototype-toggle');
const prototypeToggleTitle = document.querySelector('.prototype-toggle__title');
const motionPrototypeCards = document.querySelectorAll('.motion-prototype-card');
const introCard = document.querySelector('.intro-card');
const introTitle = introCard.querySelector('h1');
const introParticleCanvas = introCard.querySelector('.intro-card__particles');
const reducedMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const mobileLayoutPreference = window.matchMedia('(max-width: 760px)');

introParticleCanvas.hidden = reducedMotionPreference.matches;

if (!reducedMotionPreference.matches) {
  introTitle.style.opacity = '0';
}

/* ---------- Project case-study content ---------- */

const PROJECT_CASE_STUDIES = [
  {
    id: 'double-ai',
    number: '01',
    title: 'Double AI — Voice AI Agent',
    description: 'Case study: designing Double AI’s agentic platform across AI Twin Agents, voice, onboarding, analytics, workflow automation, billing, and referrals.',
    subtitle: 'Designing an agentic platform that turns professional identity into an interactive AI Twin.',
    image: 'assets/images/projects/double-ai.webp',
    role: 'Product Designer',
    year: '2026',
    tools: 'Figma, AI for research and flow design, AI coding agents',
    tags: ['AI twin', 'AI SaaS', 'Voice agent', 'Identity'],
    hook: 'Professional profiles can explain who someone is, but they cannot answer questions, qualify intent, or act on their behalf. Double AI turns that static identity into an AI Twin Agent that people can configure, teach, speak with, and use to engage visitors.',
    context: {
      Company: 'Double AI (Early-Stage AI Startup)',
      Role: 'Sole Product Designer',
      Timeline: '2026 · 5+ major releases shipped in 3 months',
      Team: 'Founders and engineering',
      Tools: 'Figma, AI for research and flow design, AI coding agents',
      Constraints: 'The product had to move quickly while voice cloning, text-to-speech quality, open-source model performance, and GPU infrastructure were still evolving.'
    },
    challenge: 'Double AI is an agentic platform for professionals who want to create an AI Twin that can represent their identity, use their knowledge, speak in a cloned voice, interact with visitors, and support lead-generation workflows.',
    details: 'I owned the end-to-end UX as the sole designer, partnering directly with founders and engineering across conversational AI, voice interfaces, onboarding, analytics, workflow automation, and billing. The central design challenge was turning a technically complex set of capabilities into one understandable path from identity to working agent.',
    problems: {
      'Business problem': 'The original digital-card product gave professionals a richer identity layer, but it remained a passive destination. As general-purpose AI agents became more capable, Double AI needed a stronger proposition: help professionals turn their identity and knowledge into an agent that could engage visitors, qualify leads, and support repeatable work.',
      'User problem': 'Creating a useful AI Twin required people to bring together their profile, knowledge, personality, voice, actions, and usage settings. The experience had to make that complexity understandable without asking users to think like AI engineers.'
    },
    process: {
      'Research & benchmarking': 'The founders brought deep sales-workflow knowledge to the product direction. I used session recordings and user feedback to evaluate how people moved through the existing experience, identify friction, and turn those observations into changes across setup and core product flows.',
      'Ideation & flow design': 'When the product shifted from a digital card to an agent-first platform, I helped redefine its mental model: the profile became the identity and knowledge foundation for an active AI Twin. I mapped that model across six connected surfaces—conversational agents, voice, onboarding, analytics, workflow automation, and billing.',
      'Trade-offs & priorities': 'We needed to demonstrate and ship the new direction quickly while the underlying AI and voice stack was still changing. I designed within those technical limits, prioritized the flows needed to make the agent understandable and usable, and used Figma MCP and AI coding agents to deliver developer-ready specifications directly to engineering.',
      'Iterations & feedback': 'I redesigned onboarding to move users from signup to a working AI Twin in fewer, clearer steps. I continued refining the product through session recordings, feedback, and close collaboration with engineering, contributing to more than five major feature releases in three months.'
    },
    difficulty: 'The original product was built around digital identity and business cards. Rapid improvements in general-purpose AI agents weakened that positioning, so the company moved toward an agentic platform. As the sole designer, I translated that strategic change into the product itself—reframing a static profile as an active AI Twin and redesigning the journeys around creating, configuring, demonstrating, and managing that agent.',
    impact: {
      Quantitative: 'The Double AI platform serves more than 600 professionals who create, manage, and interact with AI Twin Agents. I helped ship 5+ major feature releases in three months.',
      Qualitative: 'The redesign gave the pivot a coherent end-to-end experience: a clearer path from signup to a working agent, connected controls for knowledge and voice, visibility into leads and usage, and referral and billing flows that support monetization.'
    },
    architecture: [
      'Conversational AI agents grounded in each professional’s identity and knowledge.',
      'Voice interfaces for cloning, configuring, and speaking with an AI Twin.',
      'Onboarding from account creation to a working agent.',
      'Analytics for conversations, leads, and product usage.',
      'Actions and workflow automation for agent-led tasks.',
      'Billing, usage limits, and referrals supporting product monetization.'
    ],
    video: { title: 'Double AI product walkthrough', youtubeId: 'e-TcyLuBLJA' },
    gallery: Array.from({ length: 10 }, (_, index) => ({
      src: `assets/images/double-ai/Double ai ${index + 1}.webp`,
      alt: `Double AI product frame ${index + 1}`
    })),
    liveUrl: 'https://thedouble.ai/',
    linkText: 'View product',
    work: [
      'Owned end-to-end UX across six product surfaces as the sole designer embedded with founders and engineering.',
      'Redesigned onboarding to take users from signup to a working AI Twin through fewer, clearer, and more intuitive steps.',
      'Designed the conversational and voice-agent experience, including personality, knowledge, voice configuration, chat, and usage states.',
      'Designed Actions and Workflows so an AI Twin could move beyond answering questions and support repeatable tasks.',
      'Created the AI Agent Demo Feature to make the agent-first proposition easier to experience and communicate.',
      'Designed analytics for conversations, leads, and usage so professionals could understand how their AI Twin was performing.',
      'Designed referral, pricing, billing, and limit-management flows end to end to support monetization.',
      'Used Figma MCP and AI coding agents to shorten design-to-development handoff and ship developer-ready specifications directly.'
    ]
  },
  {
    id: 'maruti-suzuki-smartplay', number: '02', title: 'Maruti Suzuki SmartPlay Pro X',
    description: 'Case study: designing the production SmartPlay Pro X automotive infotainment experience shipped in the Maruti Suzuki Victoris.',
    subtitle: 'Taking a 10.1-inch automotive HMI from early concepts to production.', image: 'assets/images/projects/maruti-suzuki.webp', role: 'Product Designer', year: '2025',
    tools: 'Figma, Adobe Creative Suite, competitive benchmarking, usability analysis', tags: ['10.1-inch', 'Infotainment HMI', 'Automotive UI'],
    hook: 'Designing for a car is different from designing for a browser: every interaction has to remain clear at a glance, responsive on constrained hardware, and dependable across changing road and light conditions. I helped take SmartPlay Pro X from early interaction models to a production HMI shipped in the Maruti Suzuki Victoris.',
    context: { Company: 'Maruti Suzuki', Role: 'Product Designer (Automotive HMI)', Timeline: '2 years · concept to production-ready handoff', Team: 'Two designers, one Maruti Suzuki engineer, and two Bosch engineers', Tools: 'Figma, Adobe Creative Suite, competitive benchmarking, usability analysis', Constraints: 'Automotive-grade hardware, limited processing power, display latency, fixed screen geometry, safety requirements, and legibility across real driving conditions.' },
    challenge: 'SmartPlay Pro X is Maruti Suzuki’s 10.1-inch connected infotainment system, designed for production vehicles rather than as a concept interface. It combines native vehicle experiences with smartphone connectivity, voice assistance, built-in applications, and OTA updates.',
    details: 'I contributed across the product lifecycle: competitive benchmarking, user flows, information architecture, interaction models, high-fidelity UI, design-system foundations, and production-ready specifications. The central challenge was preserving clarity and consistency while translating the design into constrained automotive hardware with embedded and firmware engineers.',
    problems: { 'Business problem': 'Maruti Suzuki needed a modern infotainment experience for its next generation of vehicles while preserving the reliability, consistency, and production feasibility expected of an automotive platform. The system also needed reusable foundations that could support more than one vehicle interface.', 'User problem': 'Drivers needed familiar functions—navigation, media, calling, vehicle controls, and smartphone connectivity—to be easy to find and understand without demanding prolonged attention. Wireless Apple CarPlay and Android Auto were becoming baseline expectations, but the native HMI still had to feel coherent and useful.' },
    process: { 'Research & benchmarking': 'I benchmarked automotive HMIs from Hyundai, Tata, and other manufacturers, studying navigation depth, information hierarchy, common interaction patterns, and how competing systems handled frequently used driving tasks. Usability analysis and in-vehicle evaluation helped move decisions beyond visual comparison alone.', 'Ideation & flow design': 'Working as one of two designers, I built user flows, information architecture, and interaction models from early concepts through production-ready handoff. I also contributed reusable components, interaction patterns, iconography, and UI standards to a design-system foundation used across infotainment and cluster interfaces.', 'Trade-offs & priorities': 'SmartPlay Pro X could not be treated like a smartphone interface. I worked directly with Maruti Suzuki and Bosch engineers to align layouts, states, transitions, and specifications with limited processing power, display latency, fixed hardware, safety considerations, and implementation feasibility.', 'Iterations & feedback': 'We reviewed concepts with stakeholders and engineering, then evaluated them in realistic vehicle and lighting conditions. That loop exposed problems a studio monitor could not: an early dark visual direction lost legibility in daylight, requiring a system-level response rather than a cosmetic adjustment.' },
    difficulty: 'Our initial dark theme used subtle neon accents and looked strong in controlled reviews. In daylight road tests, glare made critical interface elements difficult to read—a failure that would not have surfaced on a studio monitor. We rebuilt the visual system around higher contrast and automatic day/night switching driven by the vehicle’s ambient-light sensor. Legibility became adaptive system behaviour, not merely a static colour choice.',
    impact: { Quantitative: 'SmartPlay Pro X shipped in the Maruti Suzuki Victoris. The vehicle reached more than 100,000 units sold within nine months of launch—the fastest ramp among models in Maruti Suzuki’s current portfolio—showing the production scale at which the HMI is experienced.', Qualitative: 'The production system brought together a 10.1-inch interface, wireless Apple CarPlay and Android Auto, Alexa Auto Voice AI, built-in apps, and over-the-air updates within one coherent HMI. The underlying component and interaction standards also contributed to consistency across multiple vehicle interfaces.' },
    liveUrl: 'https://www.marutisuzuki.com/arena/victoris#technology-block', linkText: 'View product',
    work: ['Built the user flows, information architecture, and interaction models that took SmartPlay Pro X from early concepts to production-ready handoff.', 'Designed navigation, system states, and screen behaviour around glanceability, predictable access to frequent actions, and the realities of in-vehicle attention.', 'Reworked the visual system after daylight road testing exposed glare, introducing higher contrast and ambient-light-driven day/night behaviour.', 'Contributed reusable components, interaction patterns, iconography, and UI standards adopted across multiple infotainment and cluster interfaces.', 'Partnered directly with embedded and firmware engineers to resolve hardware constraints, display latency, specification details, and production feasibility.']
  },
  {
    id: 'quilo', number: '03', title: 'Quilo Chrome Extension',
    description: 'Case study: conceiving, designing, building, and launching Quilo, an AI prompt library spanning a Chrome extension and a Next.js web application.',
    subtitle: 'Taking an AI prompt library from browser extension to a connected product ecosystem.', image: 'assets/images/projects/quilo.webp', role: 'Product Designer & Builder', year: '2025',
    tools: 'Figma, Claude Code, Chrome APIs, Next.js, React, Tailwind CSS, Vercel', tags: ['0→1 product', 'Browser extension', 'Product growth'],
    hook: 'Reusable prompts often live in documents and notes, away from the AI tools where people need them. I designed Quilo to make finding, adapting, and reusing a prompt part of the conversation—first through a Chrome extension, then through a companion web application for easier management.',
    context: { Company: 'Quilo (Self-Initiated Product)', Role: 'Product Designer & Builder', Timeline: '3 months · 2025', Team: 'Independent project', Tools: 'Figma, Claude Code, Chrome APIs, Next.js, React, Tailwind CSS, Vercel', Constraints: 'A zero-marketing-budget launch, Chrome extension security and interaction constraints, and the need to keep the first version lightweight and privacy-conscious.' },
    challenge: 'Quilo is a self-initiated AI prompt library that I conceived, designed, built, and launched. Its first release placed 56+ curated prompts and personal prompt management directly inside the browser; its second iteration explored a companion web application for managing the library beyond the extension window.',
    details: 'Owning the full lifecycle made this both a product-design and product-building exercise. I defined the product scope, structured the content taxonomy, designed the interaction model, built both surfaces, prepared the Chrome Web Store launch, localized the listing, and used the resulting acquisition data to identify where the product needed to improve next.',
    problems: { 'Business problem': 'The product needed to prove that a focused prompt utility could provide immediate value before I invested in accounts, cloud infrastructure, and synchronization. After launch, the harder problem became distribution: turning Chrome Web Store visitors into active installs.', 'User problem': 'People using multiple AI tools had to retrieve prompts from disconnected documents or notes, interrupting their work. They needed fast access to useful starting points as well as a simple way to create and manage prompts of their own.' },
    process: { 'Research & benchmarking': 'I framed the first release around the complete prompt-reuse journey: discover a useful prompt, find it again, adapt it, copy it into an AI tool, and create personal prompts. That led to a launch catalogue of 56+ curated prompts organized across 16+ categories for different professional use cases.', 'Ideation & flow design': 'I chose a Chrome extension because it could remain available on top of the websites where AI conversations already happened. The experience combined keyboard access, real-time search, category filtering, one-click copying, and custom prompt management in a compact browser surface.', 'Trade-offs & priorities': 'For the first release, I used local storage instead of introducing accounts and cloud sync. That kept the extension lightweight, reduced infrastructure scope, enabled offline use, and avoided collecting user data while I tested whether the core utility deserved a larger system.', 'Iterations & feedback': 'The second iteration expanded Quilo into a standalone Next.js and React web application deployed on Vercel. I explored a connected model in which the extension provided in-context access while the web application offered more space to organize and manage a growing prompt library.' },
    difficulty: 'The product reached 680 visitors at its peak but converted only 41 into active installs. That gap challenged the assumption that shipping a useful product was enough to create adoption. It reframed the next design problem around the acquisition funnel—positioning, store-listing communication, screenshots, trust, and the moment of install—rather than adding more features to the extension.',
    impact: { Quantitative: 'Localized Chrome Web Store listings in English, Spanish, and Portuguese reached 680 unique visitors at peak across 7+ countries, including the United States, Brazil, and India. The funnel converted to 41 active installs—approximately 6%.', Qualitative: 'The launch validated that I could take a product through research, information architecture, interaction design, implementation, localization, and distribution independently. More importantly, the modest conversion rate identified the listing-to-install funnel—not feature depth—as the clearest growth bottleneck.' },
    architecture: ['Chrome extension for in-context prompt discovery and reuse.', '56+ curated prompts organized across 16+ categories.', 'Real-time search, filtering, keyboard access, and one-click copying.', 'Custom prompt creation and local, offline management.', 'Companion web-application concept for managing prompts at greater scale.', 'Reusable interface patterns shared across the extension and web product.'],
    liveUrl: 'https://chromewebstore.google.com/detail/quilo-%E2%80%93-ai-prompt-library/ofdelgfdnchpifecekmlaanebfkboehb', linkText: 'View Chrome extension',
    work: ['Owned the full 0→1 lifecycle from problem framing and product scope through design, implementation, localization, and Chrome Web Store launch.', 'Designed the prompt taxonomy, search and filtering model, custom-prompt workflow, keyboard interactions, and offline experience.', 'Curated and structured 56+ prompts across 16+ categories to make the product useful immediately after installation.', 'Built the Chrome extension and a second product iteration using Next.js, React, Tailwind CSS, and Vercel.', 'Established reusable UI patterns and component-driven architecture across the extension and web application.', 'Localized the store presence into three languages and analyzed the 680-visitor to 41-install funnel to identify conversion as the primary growth constraint.']
  },
  {
    id: 'autoflux', number: '04', title: 'AutoFlux.in',
    description: 'Case study: independently designing and building AutoFlux, an India-first platform for comparing EV, hybrid, and CNG vehicles by real-world suitability and ownership cost.',
    subtitle: 'Helping Indian buyers compare alternative-powertrain vehicles beyond the sticker price.', image: 'assets/images/projects/autoflux.webp', role: 'Founder, Product Designer & Builder', year: '2026',
    tools: 'Next.js, React, TypeScript, Payload CMS, PostgreSQL/Neon, Netlify, Trigger.dev, PostHog, Sentry', tags: ['0→1 product', 'Decision design', 'Automotive data', 'Explainable recommendations'],
    hook: 'Choosing between an EV, hybrid, and CNG vehicle is not a specification-comparison problem. Buyers must weigh budget, daily travel, charging access, real-world range, running cost, and long-term ownership at the same time. I built AutoFlux to turn those competing variables into a guided, explainable decision.',
    context: { Company: 'AutoFlux', Role: 'Founder, Product Designer & Builder', Timeline: 'Soft-launched in 2026 · live, before public marketing', Team: 'Independent project', Tools: 'Next.js, React, TypeScript, Payload CMS, PostgreSQL/Neon, Netlify, Trigger.dev, PostHog, Sentry', Constraints: 'Designing a trustworthy decision experience while independently researching and maintaining 188 variant-level records, building the product, and operating within early-stage infrastructure limits.' },
    challenge: 'AutoFlux is an India-first vehicle decision platform for comparing EV, hybrid, and CNG vehicles through real-world range, running cost, and total ownership—not only specifications and sticker price.',
    details: 'I independently own the product end to end: brand identity, information architecture, guided discovery, comparison and catalogue data models, ownership tools, frontend, backend and database structure, content governance, and SEO strategy. The design challenge is to make a technically complex purchase feel understandable without hiding uncertainty or oversimplifying the trade-offs.',
    problems: { 'Business problem': 'India’s vehicle market is expanding beyond petrol and diesel, but established automotive portals are still largely organized around listings, specifications, and purchase price. AutoFlux needed to differentiate through decision support: helping buyers understand which powertrain fits their life and what that choice costs over time.', 'User problem': 'A buyer cannot answer “Which vehicle is right for me?” with a single filter. Budget, commute, body type, charging access, range confidence, fuel cost, financing, and break-even interact with one another. Presenting every variable at once creates overload; hiding the reasoning behind a recommendation creates mistrust.' },
    process: { 'Research & benchmarking': 'I mapped the decision around the questions buyers must resolve, then designed the catalogue around exact variants rather than generic model pages. Each of the 188 records preserves sources, evidence, review status, and normalization assumptions so a recommendation can be traced back to the information behind it.', 'Ideation & flow design': 'I translated that complexity into a four-step guided discovery flow. The sequence narrows the decision progressively instead of exposing a dense filter panel upfront, then carries the buyer into ranked results, side-by-side comparison, saved vehicles, and ownership calculators without making them restart their research.', 'Trade-offs & priorities': 'I separated non-negotiable suitability constraints from weighted preferences. A vehicle that fails a hard requirement should not rank highly because of unrelated strengths; vehicles that remain viable can be ordered by transparent, versioned weights. This makes the recommendation logic explainable and gives the interface a defensible reason for every result.', 'Iterations & feedback': 'The live product is soft-launched and has not yet undergone structured user validation. PostHog is instrumented for the next phase: measuring finder completion, result engagement, comparison and shortlist behaviour, and use of ownership-cost tools before expanding features or investing in acquisition.' },
    difficulty: 'I initially treated acquiring vehicle data as the difficult part. The deeper product problem was deciding when that data was reliable enough to guide a purchase. Specifications change, sources conflict, and real-world range differs from certified figures. I responded by designing provenance, review status, conservative assumptions, public methodology, and corrections into the product model. The limitation remains clear: the experience is live, but its interaction model still needs validation with real buyers.',
    impact: { Quantitative: 'Scope at soft launch—not yet a measure of user impact—includes 188 variant-level vehicle records and 103 generated pages spanning discovery, vehicle research, comparison, calculators, methodology, and supporting content.', Qualitative: 'AutoFlux now has a coherent decision journey from an open-ended need to a traceable recommendation. Its public methodology, source attribution, review states, and corrections framework make trust part of the product experience rather than an invisible editorial promise.' },
    architecture: ['Four-step guided discovery for progressively narrowing a buyer’s needs.', 'Explainable results separating hard suitability requirements from weighted preferences.', 'Exact-variant catalogue, comparison, shortlist, and saved-vehicle journeys.', 'Real-world range, running-cost, EMI, charging, total-cost, and break-even tools.', 'Source attribution, review status, methodology, owner evidence, and correction flows.', 'Programmatic vehicle pages and partial Hindi journeys supporting discovery through search.'],
    liveUrl: 'https://autoflux.in', linkText: 'View live product',
    work: ['Defined the product around buyer decisions and ownership trade-offs rather than recreating a conventional vehicle-listing portal.', 'Designed the information architecture for a four-step finder, ranked results, vehicle comparison, shortlists, saved vehicles, and detail pages.', 'Designed calculators for real-world range, running cost, financing, charging, total ownership, and powertrain break-even.', 'Created an explainable recommendation model that distinguishes hard suitability constraints from weighted preferences.', 'Designed a source-attributed content system with evidence, review status, public methodology, owner input, and correction handling.', 'Built the brand identity and SEO architecture, including structured programmatic pages for each vehicle and multilingual search journeys.', 'Implemented the frontend, backend, database, analytics, and quality infrastructure needed to ship and evaluate the product independently.']
  },
  {
    id: 'formula-1-design', number: '05', title: 'Formula 1 Visual Storytelling',
    description: 'Creative side project: using Formula 1 knowledge, AI media tools, prompting, editing, and audience feedback to build a channel with 1.45M+ lifetime views.',
    subtitle: 'A creative side project in AI-assisted storytelling and audience-led iteration.', image: 'assets/images/projects/formula-1-youtube.webp', role: 'Creator & Designer', year: '2025',
    tools: 'AI video generation, image generation, prompt design, image editing, DaVinci Resolve', tags: ['Creative side project', 'AI media', 'Audience growth'],
    hook: 'Formula 1 history contains extraordinary cars, liveries, and design stories, but archival material cannot always show how those ideas might move, evolve, or look in a new context. I combined subject knowledge, precise prompting, AI media tools, and video editing to turn those ideas into concise visual stories.',
    context: { Company: 'Formula 1 Design Channel', Role: 'Creator & Designer', Timeline: 'F1 content direction developed in 2025 on an existing channel', Team: 'Independent creative side project', Tools: 'AI video generation, image generation, prompt design, image editing, DaVinci Resolve', Constraints: 'Maintaining visual quality and factual credibility while working with inconsistent AI generations, limited archival material, copyright considerations, and a fast-moving content platform.' },
    challenge: 'This is a creative side project, not a conventional product-design case study. I developed a Formula 1 visual-storytelling direction on an existing YouTube channel and used it to explore how AI-assisted creation, domain expertise, and audience feedback can work together.',
    details: 'The value of the project is the process behind the reach: finding a narrow audience promise, translating specialist knowledge into accessible stories, building a repeatable production workflow, and improving that system through behavioural feedback.',
    problems: { 'Business problem': 'The challenge was to establish a recognizable niche and repeatable creative system in an attention-driven platform. Each piece needed a clear premise, strong opening, and distinctive visual language before an audience would choose to watch it.', 'User problem': 'Formula 1 fans already know the sport is visually compelling. The opportunity was to make design history, classic cars, and livery ideas immediately engaging without relying on long, theory-heavy explanations.' },
    process: { 'Research & benchmarking': 'I used my Formula 1 knowledge to identify stories with an immediate visual premise, then studied audience response in YouTube analytics to understand which subjects, openings, and formats earned attention. This was applied creative research rather than a formal product-research study.', 'Ideation & flow design': 'I explored concepts around classic and vintage cars, alternative liveries, and imagined motion. Each video began with a concise narrative idea, followed by prompt development, generation, selection, image correction, sequencing, sound, and final editing.', 'Trade-offs & priorities': 'AI tools accelerated production but did not replace craft. Generated cars often lost defining proportions, sponsor placement, mechanical details, or continuity between frames. I traded volume for control by iterating prompts, rejecting weak outputs, editing images, and using my F1 knowledge to preserve recognizable details.', 'Iterations & feedback': 'I treated each release as a small experiment. Audience response informed the next subject, visual treatment, pacing, and format, while reusable prompt structures and editing patterns made the creative process more consistent over time.' },
    difficulty: 'My earliest approach placed too much value on what AI could generate and too little on why someone would keep watching. More elaborate output did not automatically create a stronger story. I shifted the workflow to start with one clear visual idea and use AI only where it strengthened that idea, making editorial judgment—not generation—the center of the process.',
    impact: { Quantitative: 'The channel has reached 1.45M+ lifetime views and 1,000 subscribers. These figures describe channel reach, not the outcome of a product-design engagement.', Qualitative: 'The project strengthened skills that transfer directly to product work: framing a clear proposition, building a repeatable system, communicating complex ideas visually, reading behavioural signals, and iterating without mistaking output volume for quality.' },
    liveUrl: 'https://www.youtube.com/@formula1design/shorts', linkText: 'View channel',
    work: ['Defined a focused content proposition around Formula 1 cars, liveries, history, and visual experimentation.', 'Combined domain knowledge with detailed prompts to guide AI video and image-generation tools toward credible, recognizable results.', 'Edited generated assets for composition, continuity, factual detail, pacing, sound, and narrative clarity.', 'Built reusable prompt structures and production patterns instead of treating every video as an isolated experiment.', 'Used YouTube performance signals to inform subsequent subjects, openings, pacing, and visual treatments.', 'Grew the channel to 1.45M+ lifetime views and 1,000 subscribers while keeping the work clearly positioned as a creative side project.']
  },
  {
    id: 'u3k-instrument-cluster', number: '06', title: 'Maruti Suzuki U3K Instrument Cluster',
    description: 'Case study: leading the design of a pre-production segmented digital instrument cluster for an entry-level Maruti Suzuki vehicle program.',
    subtitle: 'Making an entry-level instrument cluster feel modern without compromising safety or readability.', image: 'assets/images/projects/u3k.webp', role: 'Product Designer', year: '2024',
    tools: 'Figma, Adobe Creative Suite, competitive benchmarking, automotive HMI analysis', tags: ['Automotive HMI', 'Safety-critical UI', 'Hardware constraints'], underDevelopment: true,
    hook: 'A digital instrument cluster has to modernize the cockpit while communicating safety-critical information in a fraction of a second. As the sole designer, I led U3K from engineering discovery and early proposals to a selected direction now being prepared for prototype development.',
    context: { Company: 'Maruti Suzuki · entry-level vehicle program', Role: 'Product Designer · sole designer', Timeline: '2024 · pre-production prototype preparation', Team: 'MSIL engineering, senior management, and development vendors', Tools: 'Figma, Adobe Creative Suite, competitive benchmarking, automotive HMI analysis', Constraints: 'A sub-₹3,000 target, fixed segmented-display geometry, regulatory tell-tales, limited display states, manufacturing feasibility, and readability across different drivers and conditions.' },
    challenge: 'U3K is a pre-production segmented digital instrument-cluster program for an entry-level Maruti Suzuki vehicle. The project explores how constrained display technology can deliver a modern cockpit experience while protecting glanceability, regulatory compliance, and safety-critical feedback.',
    details: 'I led the design and high-fidelity UI as the sole designer, collaborating with MSIL engineering from initial technical discovery through proposal selection, management review, vendor onboarding, and prototype-ready detailing. Public details are intentionally limited while the program remains under development.',
    problems: { 'Business problem': 'Maruti Suzuki wanted to give an entry-level vehicle program a more contemporary cockpit without moving to the cost and complexity of a full TFT display. The design had to create a premium digital impression while remaining feasible for a tightly constrained production program.', 'User problem': 'The design had to resolve a real tension: younger, first-time buyers expected a modern digital experience, while drivers accustomed to analog meters still needed large, familiar, immediately readable information. Safety-critical tell-tales could never become secondary to visual novelty.' },
    process: { 'Research & benchmarking': 'I worked with MSIL engineers from the start to understand the existing meter architecture, display technology, packaging constraints, and regulatory tell-tales. I complemented that technical study with competitive benchmarking and usability analysis of instrument clusters from Hyundai, Tata, and other manufacturers.', 'Ideation & flow design': 'Using the engineering-provided layout as a fixed foundation, I created initial design proposals for the cluster layout, information hierarchy, speed presentation, supporting vehicle data, and driver-facing tell-tales. My proposed direction was selected to move into further refinement.', 'Trade-offs & priorities': 'A segmented display cannot place or animate information as freely as a TFT screen. I prioritized the speed readout and essential driving information, then worked with engineering to decide which indicators belonged in the primary display and which required dedicated physical tell-tales for clarity, regulation, and failure resilience.', 'Iterations & feedback': 'I incorporated senior-management feedback into successive high-fidelity iterations, onboarded the vendors responsible for developing the meter, and translated the selected design into the visual assets, states, dimensions, and implementation details needed for the first prototype sample.' },
    difficulty: 'An early direction placed turn-signal and headlight status inside the segmented display. Engineering review exposed a critical single point of failure: if the display module failed, the driver could also lose confirmation of those safety-relevant states. I moved them to dedicated physical LED tell-tales outside the main display, separating critical feedback from the failure domain of the digital module.',
    impact: { Quantitative: 'Pre-production outcome: the initial concept was selected and approved for refinement within the program’s sub-₹3,000 target. The project is now being prepared for its first prototype sample; it has not shipped in a production vehicle.', Qualitative: 'The selected direction establishes a clearer hierarchy between primary driving information, secondary vehicle data, and regulatory tell-tales while giving constrained segmented hardware a more contemporary visual character.' },
    work: ['Built a working understanding of the existing meter architecture, regulatory tell-tales, and segmented-display constraints with MSIL engineering.', 'Created the initial cluster proposals; my design direction was selected for further refinement.', 'Defined the cluster layout, information hierarchy, speed presentation, supporting vehicle information, and high-fidelity visual treatment.', 'Moved safety-relevant status indicators outside the main display after identifying a single-point-of-failure risk.', 'Iterated the selected direction with senior-management and engineering feedback while preserving production feasibility.', 'Onboarded development vendors and prepared the assets, states, dimensions, and specifications required to build the first prototype sample.']
  }
];

const PROJECTS_BY_ID = new Map(PROJECT_CASE_STUDIES.map((project) => [project.id, project]));

/* ---------- Interaction state ---------- */

let isAlternateThemeActive = false;
let horizontalScrollTarget = 0;
let scrollAnimationFrameId = null;
let scrollSnapTimerId = null;
let navigationSyncAnimationFrameId = null;
let activeGridIndex = -1;
let isCardTransitionActive = false;

const PROJECT_TRANSITION_TIMING = Object.freeze({
  lift: 150,
  morph: 760,
  fallbackReveal: 320
});

/* ---------- Intro particle-to-type motion ---------- */

let introParticleAnimationFrameId = null;
let hasCompletedInitialIntroAnimation = false;
let resolveInitialIntroAnimation;
const initialIntroAnimationComplete = new Promise((resolve) => {
  resolveInitialIntroAnimation = resolve;
});

function markInitialIntroAnimationComplete() {
  if (hasCompletedInitialIntroAnimation) return;

  hasCompletedInitialIntroAnimation = true;
  resolveInitialIntroAnimation();
}

function smootherStep(progress) {
  const clampedProgress = Math.min(1, Math.max(0, progress));

  return clampedProgress ** 3
    * (clampedProgress * (clampedProgress * 6 - 15) + 10);
}

function createIntroParticleTargets() {
  const titleStyles = getComputedStyle(introTitle);
  const titleBounds = introTitle.getBoundingClientRect();
  const cardBounds = introCard.getBoundingClientRect();
  const sampleCanvas = document.createElement('canvas');
  const sampleContext = sampleCanvas.getContext('2d', { willReadFrequently: true });
  const samplePadding = 6;
  const titleText = introTitle.textContent.trim();
  const lineHeight = Number.parseFloat(titleStyles.lineHeight);

  sampleContext.font = `${titleStyles.fontStyle} ${titleStyles.fontWeight} ${titleStyles.fontSize} ${titleStyles.fontFamily}`;
  sampleContext.fontKerning = titleStyles.fontKerning;

  if ('letterSpacing' in sampleContext) {
    sampleContext.letterSpacing = titleStyles.letterSpacing;
  }

  const textMetrics = sampleContext.measureText(titleText);
  const textAscent = textMetrics.actualBoundingBoxAscent;
  const textDescent = textMetrics.actualBoundingBoxDescent;
  const measuredTextHeight = textAscent + textDescent;
  const resolvedLineHeight = Number.isFinite(lineHeight)
    ? lineHeight
    : Number.parseFloat(titleStyles.fontSize) * 1.2;
  const textBaseline = samplePadding
    + (resolvedLineHeight - measuredTextHeight) / 2
    + textAscent;

  sampleCanvas.width = Math.ceil(textMetrics.width + samplePadding * 2);
  sampleCanvas.height = Math.ceil(resolvedLineHeight + samplePadding * 2);

  // Resetting canvas dimensions clears its drawing state.
  sampleContext.font = `${titleStyles.fontStyle} ${titleStyles.fontWeight} ${titleStyles.fontSize} ${titleStyles.fontFamily}`;
  sampleContext.fontKerning = titleStyles.fontKerning;

  if ('letterSpacing' in sampleContext) {
    sampleContext.letterSpacing = titleStyles.letterSpacing;
  }

  sampleContext.textBaseline = 'alphabetic';
  sampleContext.fillStyle = '#ffffff';
  sampleContext.fillText(titleText, samplePadding, textBaseline);

  const pixels = sampleContext.getImageData(0, 0, sampleCanvas.width, sampleCanvas.height).data;
  const targets = [];
  const samplingStep = 3;
  const titleOffsetX = titleBounds.left - cardBounds.left - samplePadding;
  const titleOffsetY = titleBounds.top - cardBounds.top - samplePadding;

  for (let y = 0; y < sampleCanvas.height; y += samplingStep) {
    for (let x = 0; x < sampleCanvas.width; x += samplingStep) {
      const alpha = pixels[(y * sampleCanvas.width + x) * 4 + 3];

      if (alpha > 90) {
        targets.push({
          x: titleOffsetX + x,
          y: titleOffsetY + y
        });
      }
    }
  }

  return targets;
}

function playIntroParticleMerge() {
  if (reducedMotionPreference.matches || gridPage.hidden) {
    introParticleCanvas.hidden = true;
    introTitle.style.removeProperty('opacity');
    markInitialIntroAnimationComplete();
    return;
  }

  if (introParticleAnimationFrameId !== null) {
    cancelAnimationFrame(introParticleAnimationFrameId);
  }

  const canvasContext = introParticleCanvas.getContext('2d');
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const cardWidth = introCard.clientWidth;
  const cardHeight = introCard.clientHeight;
  const targets = createIntroParticleTargets();
  const particleColor = getComputedStyle(introCard).color;
  const mergeDuration = 1900;
  const settleDuration = 220;
  const blendDuration = 900;
  const totalDuration = mergeDuration + settleDuration + blendDuration;

  introParticleCanvas.width = Math.round(cardWidth * pixelRatio);
  introParticleCanvas.height = Math.round(cardHeight * pixelRatio);
  canvasContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const particles = targets.map((target, index) => {
    const launchAngle = Math.random() * Math.PI * 2;
    const launchRadius = 90 + Math.random() * 330;

    return {
      targetX: target.x,
      targetY: target.y,
      startX: cardWidth * 0.5 + Math.cos(launchAngle) * launchRadius,
      startY: cardHeight * 0.35 + Math.sin(launchAngle) * launchRadius * 0.68,
      delay: Math.random() * 0.22,
      drift: 8 + Math.random() * 22,
      phase: index * 0.18 + Math.random() * Math.PI,
      radius: 0.65 + Math.random() * 1.15
    };
  });

  introParticleCanvas.hidden = false;
  introParticleCanvas.style.transition = 'none';
  introParticleCanvas.style.opacity = '1';
  introTitle.style.transition = 'none';
  introTitle.style.opacity = '0';

  const startedAt = performance.now();

  function animateIntroParticles(now) {
    const elapsed = now - startedAt;
    const overallProgress = Math.min(elapsed / mergeDuration, 1);
    const blendProgress = smootherStep(
      (elapsed - mergeDuration - settleDuration) / blendDuration
    );

    canvasContext.clearRect(0, 0, cardWidth, cardHeight);
    canvasContext.fillStyle = particleColor;
    canvasContext.shadowBlur = 0;

    particles.forEach((particle) => {
      const delayedProgress = Math.min(
        1,
        Math.max(0, (overallProgress - particle.delay) / (1 - particle.delay))
      );
      const easedProgress = smootherStep(delayedProgress);
      const remainingEnergy = 1 - easedProgress;
      const orbit = Math.sin(elapsed * 0.006 + particle.phase)
        * particle.drift
        * remainingEnergy;
      const x = particle.startX
        + (particle.targetX - particle.startX) * easedProgress
        + orbit;
      const y = particle.startY
        + (particle.targetY - particle.startY) * easedProgress
        + Math.cos(elapsed * 0.005 + particle.phase) * particle.drift * remainingEnergy;

      canvasContext.globalAlpha = 0.18 + easedProgress * 0.82;
      canvasContext.beginPath();
      canvasContext.arc(x, y, particle.radius, 0, Math.PI * 2);
      canvasContext.fill();
    });

    canvasContext.globalAlpha = 1;
    introParticleCanvas.style.opacity = String(1 - blendProgress);
    introTitle.style.opacity = String(blendProgress);

    if (elapsed < totalDuration) {
      introParticleAnimationFrameId = requestAnimationFrame(animateIntroParticles);
      return;
    }

    introParticleAnimationFrameId = null;
    introParticleCanvas.hidden = true;
    introParticleCanvas.style.removeProperty('transition');
    introParticleCanvas.style.removeProperty('opacity');
    introTitle.style.removeProperty('transition');
    introTitle.style.removeProperty('opacity');
    markInitialIntroAnimationComplete();
  }

  introParticleAnimationFrameId = requestAnimationFrame(animateIntroParticles);
}

document.fonts.ready.then(() => {
  if (!('IntersectionObserver' in window)) {
    playIntroParticleMerge();
    return;
  }

  let wasIntroVisible = false;
  const introVisibilityObserver = new IntersectionObserver((entries) => {
    const isIntroVisible = entries[0].intersectionRatio >= 0.65;

    if (isIntroVisible && !wasIntroVisible) {
      playIntroParticleMerge();
    }

    wasIntroVisible = isIntroVisible;
  }, {
    root: cardCollection,
    threshold: [0, 0.65]
  });

  introVisibilityObserver.observe(introCard);
});

/* ---------- Card entrance motion ---------- */

if (!reducedMotionPreference.matches) {
  cardGrids.forEach((grid) => {
    const gridCards = [...grid.querySelectorAll('.card:not(.motion-prototype-card)')];

    gridCards.forEach((card, cardIndex) => {
      card.style.setProperty('--card-entrance-delay', `${80 + cardIndex * 55}ms`);
      card.classList.add('is-entering');

      function finishCardEntrance(event) {
        if (event.animationName !== 'card-drop-in') return;

        card.classList.remove('is-entering');
        card.style.removeProperty('--card-entrance-delay');
        card.removeEventListener('animationend', finishCardEntrance);
      }

      card.addEventListener('animationend', finishCardEntrance);
    });
  });
}

/* ---------- Navigation label sizing ---------- */

function fitNavigationLabelsToTheirText() {
  const horizontalPadding = 16;

  navigationLabels.forEach((label) => {
    const textRange = document.createRange();
    textRange.selectNodeContents(label);

    const textWidth = textRange.getBoundingClientRect().width;
    const fittedLabelWidth = Math.ceil(textWidth + horizontalPadding);

    label.parentElement.style.setProperty('--label-width', `${fittedLabelWidth}px`);
  });
}

function hideProjectTagsThatDoNotFit() {
  projectTagLists.forEach((tagList) => {
    const tags = [...tagList.children];
    let shouldHideRemainingTags = false;

    // Reset the row before measuring it again.
    tags.forEach((tag) => {
      tag.hidden = false;
    });

    const tagListRightEdge = tagList.getBoundingClientRect().right;

    tags.forEach((tag) => {
      if (shouldHideRemainingTags || tag.getBoundingClientRect().right > tagListRightEdge) {
        tag.hidden = true;
        shouldHideRemainingTags = true;
      }
    });
  });
}

// Wait for the web fonts so all text measurements use the final typefaces.
document.fonts.ready.then(() => {
  fitNavigationLabelsToTheirText();
  hideProjectTagsThatDoNotFit();
});

window.addEventListener('resize', hideProjectTagsThatDoNotFit);

/* ---------- Collapsible motion prototypes ---------- */

motionPrototypeCards.forEach((card, prototypeIndex) => {
  card.style.setProperty('--prototype-delay', `${prototypeIndex * 25}ms`);
});

prototypeToggle.addEventListener('click', () => {
  const isExpanded = buildsGrid.classList.toggle('is-prototypes-expanded');

  prototypeToggle.setAttribute('aria-expanded', String(isExpanded));
  prototypeToggleTitle.textContent = isExpanded
    ? 'Collapse prototypes'
    : 'Motion prototypes';

  if (isExpanded) {
    requestAnimationFrame(hideProjectTagsThatDoNotFit);
  }
});

/* ---------- Card detail page ---------- */

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderPills(tags, underDevelopment = false) {
  const pills = tags.map((tag) => `<li>${escapeHtml(tag)}</li>`);

  if (underDevelopment) pills.push('<li>In development</li>');

  return `<ul class="case-study__tags" aria-label="Project tags">${pills.join('')}</ul>`;
}

function renderLabelledGrid(entries, className = '') {
  return `
    <div class="case-study__labelled-grid ${className}">
      ${Object.entries(entries).map(([label, value]) => `
        <div class="case-study__labelled-item">
          <span class="case-study__item-label">${escapeHtml(label)}</span>
          <p>${escapeHtml(value)}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function renderNumberedList(items) {
  return `
    <ol class="case-study__numbered-list">
      ${items.map((item, index) => `
        <li>
          <span class="case-study__number">${String(index + 1).padStart(2, '0')}</span>
          <p>${escapeHtml(item)}</p>
        </li>
      `).join('')}
    </ol>
  `;
}

function renderProcess(process) {
  return `
    <ol class="case-study__process-list">
      ${Object.entries(process).map(([label, description], index) => `
        <li>
          <span class="case-study__number">${String(index + 1).padStart(2, '0')}</span>
          <div>
            <h3>${escapeHtml(label)}</h3>
            <p>${escapeHtml(description)}</p>
          </div>
        </li>
      `).join('')}
    </ol>
  `;
}

function renderProjectGallery(project) {
  if (!project.gallery?.length) return '';

  return `
    <section class="case-study__section" aria-labelledby="project-gallery-title">
      <span class="case-study__eyebrow">Pitch deck</span>
      <div class="case-study__gallery-heading">
        <h2 id="project-gallery-title">The problem.</h2>
        <div class="case-study__gallery-controls" aria-label="Image gallery controls">
          <button class="case-study__gallery-button" type="button" data-gallery-direction="previous" aria-label="Previous image">
            <span class="material-symbols-rounded" aria-hidden="true">arrow_back</span>
          </button>
          <button class="case-study__gallery-button" type="button" data-gallery-direction="next" aria-label="Next image">
            <span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
      </div>
      <div class="case-study__gallery" tabindex="0" aria-label="Double AI product direction; scroll horizontally to view all frames">
        ${project.gallery.map(({ src, alt }) => `
          <figure class="case-study__gallery-frame">
            <img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" />
          </figure>
        `).join('')}
      </div>
    </section>
  `;
}

function initializeProjectGalleryControls() {
  const gallery = detailContent.querySelector('.case-study__gallery');
  const previousButton = detailContent.querySelector('[data-gallery-direction="previous"]');
  const nextButton = detailContent.querySelector('[data-gallery-direction="next"]');

  if (!gallery || !previousButton || !nextButton) return;

  const frames = [...gallery.querySelectorAll('.case-study__gallery-frame')];

  function getFramePositions() {
    return frames.map((frame) => frame.offsetLeft - gallery.offsetLeft);
  }

  function getCurrentFrameIndex(framePositions) {
    return framePositions.reduce((nearestIndex, framePosition, frameIndex) => {
      const nearestDistance = Math.abs(framePositions[nearestIndex] - gallery.scrollLeft);
      const frameDistance = Math.abs(framePosition - gallery.scrollLeft);

      return frameDistance < nearestDistance ? frameIndex : nearestIndex;
    }, 0);
  }

  function updateGalleryButtons() {
    const maximumScrollPosition = gallery.scrollWidth - gallery.clientWidth;
    previousButton.disabled = gallery.scrollLeft <= 1;
    nextButton.disabled = gallery.scrollLeft >= maximumScrollPosition - 1;
  }

  function moveGallery(direction) {
    const framePositions = getFramePositions();
    const currentIndex = getCurrentFrameIndex(framePositions);
    const nextIndex = clamp(currentIndex + direction, 0, framePositions.length - 1);

    gallery.scrollTo({
      left: framePositions[nextIndex],
      behavior: reducedMotionPreference.matches ? 'auto' : 'smooth'
    });
  }

  previousButton.addEventListener('click', () => moveGallery(-1));
  nextButton.addEventListener('click', () => moveGallery(1));
  gallery.addEventListener('scroll', updateGalleryButtons, { passive: true });

  // The detail view is still hidden while its markup is populated. Measure on
  // the next frame, after the gallery has its real width and scroll range.
  requestAnimationFrame(updateGalleryButtons);
}

function renderProjectVideo(project) {
  if (!project.video) return '';

  return `
    <section class="case-study__section" aria-labelledby="project-video-title">
      <span class="case-study__eyebrow">Video</span>
      <h2 id="project-video-title">${escapeHtml(project.video.title)}</h2>
      <div class="case-study__video">
        <iframe
          src="https://www.youtube-nocookie.com/embed/${escapeHtml(project.video.youtubeId)}"
          title="${escapeHtml(project.video.title)}"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </section>
  `;
}

function renderCaseStudy(project) {
  const architectureSection = project.architecture?.length ? `
    <section class="case-study__section" aria-labelledby="project-architecture-title">
      <span class="case-study__eyebrow">Product architecture</span>
      <h2 id="project-architecture-title">Functions of the client/UI layer.</h2>
      ${renderNumberedList(project.architecture)}
    </section>
  ` : '';

  const externalAction = project.liveUrl ? `
    <a class="case-study__action" href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer">
      <span>${escapeHtml(project.linkText || 'View live product')}</span>
    </a>
  ` : '';

  return `
    <div class="case-study">
      <header class="case-study__hero">
        <div class="case-study__intro">
          <span class="case-study__meta">Case file ${escapeHtml(project.number)} · ${escapeHtml(project.role)} · ${escapeHtml(project.year)}</span>
          <h1>${escapeHtml(project.title)}</h1>
          <p class="case-study__subtitle">${escapeHtml(project.subtitle)}</p>
          ${renderPills(project.tags, project.underDevelopment)}
        </div>

        <figure class="case-study__hero-media">
          <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" />
        </figure>

        <p class="case-study__hook">${escapeHtml(project.hook)}</p>
        ${renderLabelledGrid(project.context, 'case-study__context')}
        ${externalAction}
      </header>

      ${renderProjectGallery(project)}
      ${renderProjectVideo(project)}

      <section class="case-study__section" aria-labelledby="project-challenge-title">
        <span class="case-study__eyebrow">Challenge</span>
        <h2 id="project-challenge-title">What had to become clear.</h2>
        <p class="case-study__lead">${escapeHtml(project.challenge)}</p>
        <p class="case-study__secondary">${escapeHtml(project.details)}</p>
        ${renderLabelledGrid(project.problems, 'case-study__problems')}
      </section>

      <section class="case-study__section" aria-labelledby="project-process-title">
        <span class="case-study__eyebrow">Process</span>
        <h2 id="project-process-title">Decisions before decoration.</h2>
        ${renderProcess(project.process)}
      </section>

      <section class="case-study__section case-study__section--difficulty" aria-labelledby="project-difficulty-title">
        <span class="case-study__eyebrow">Difficulty</span>
        <h2 id="project-difficulty-title">The difficult part was what required the most care.</h2>
        <p class="case-study__lead">${escapeHtml(project.difficulty)}</p>
      </section>

      <section class="case-study__section" aria-labelledby="project-impact-title">
        <span class="case-study__eyebrow">Impact</span>
        <h2 id="project-impact-title">Evidence.</h2>
        ${renderLabelledGrid(project.impact, 'case-study__impact')}
      </section>

      ${architectureSection}

      <section class="case-study__section" aria-labelledby="project-work-title">
        <span class="case-study__eyebrow">Key work</span>
        <h2 id="project-work-title">What I designed and delivered.</h2>
        ${renderNumberedList(project.work)}
      </section>
    </div>
  `;
}

function populateCardDetail(projectId, projectTitle) {
  const project = PROJECTS_BY_ID.get(projectId);

  detailContent.dataset.projectId = projectId;
  detailContent.setAttribute('aria-label', `${projectTitle} content`);
  detailContent.innerHTML = project
    ? renderCaseStudy(project)
    : '<div class="case-study__missing"><h1>Project details coming soon.</h1></div>';

  initializeProjectGalleryControls();

  return project;
}

function commitCardDetail(projectId, projectTitle, addToBrowserHistory = true) {
  const project = PROJECTS_BY_ID.get(projectId);

  window.scrollTo({ top: 0, behavior: 'auto' });
  gridPage.hidden = true;
  detailPage.hidden = false;
  detailPage.removeAttribute('aria-hidden');
  document.title = 'Jatin Davis';

  if (addToBrowserHistory) {
    history.pushState({ projectId }, '', `#work/${projectId}`);
  }
}

function showCardDetail(projectId, projectTitle, addToBrowserHistory = true) {
  populateCardDetail(projectId, projectTitle);
  commitCardDetail(projectId, projectTitle, addToBrowserHistory);
}

function showGridPage() {
  detailPage.hidden = true;
  detailPage.removeAttribute('aria-hidden');
  gridPage.hidden = false;
  document.title = 'Jatin Davis';
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function createCardTransitionTarget() {
  const detailBounds = detailContent.getBoundingClientRect();
  const detailRadius = Number.parseFloat(getComputedStyle(detailContent).borderTopLeftRadius) || 8;
  const target = document.createElement('div');

  target.className = 'card-transition-target';
  target.setAttribute('aria-hidden', 'true');
  target.style.viewTransitionName = 'project-surface';
  Object.assign(target.style, {
    top: `${detailBounds.top}px`,
    left: `${detailBounds.left}px`,
    width: `${detailBounds.width}px`,
    height: `${Math.max(
      1,
      window.innerHeight - detailBounds.top + (mobileLayoutPreference.matches ? 20 : 32)
    )}px`,
    borderRadius: `${detailRadius}px`
  });

  document.body.append(target);
  return target;
}

async function revealProjectWithoutViewTransition(projectId, projectTitle) {
  populateCardDetail(projectId, projectTitle);
  commitCardDetail(projectId, projectTitle);

  const revealAnimation = detailPage.animate([
    { opacity: 0, transform: 'translate3d(0, 8px, 0) scale(0.996)' },
    { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }
  ], {
    duration: PROJECT_TRANSITION_TIMING.fallbackReveal,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    fill: 'both'
  });

  await revealAnimation.finished.catch(() => undefined);
  revealAnimation.cancel();
}

async function morphCardIntoDetail(card, projectId, projectTitle) {
  if (isCardTransitionActive) return;

  if (reducedMotionPreference.matches) {
    showCardDetail(projectId, projectTitle);
    return;
  }

  isCardTransitionActive = true;

  const cardStyles = getComputedStyle(card);
  const cardRadius = Number.parseFloat(cardStyles.borderTopLeftRadius) || 8;
  const raisedRadius = Math.max(cardRadius, Math.min(18, cardRadius + 8));
  const baseTransform = cardStyles.transform === 'none'
    ? 'translate3d(0, 0, 0)'
    : cardStyles.transform;
  const previousWillChange = card.style.willChange;
  let liftAnimation;
  let transitionTarget;
  let hasCommittedDetail = false;

  pageRoot.style.setProperty('--project-transition-raised-radius', `${raisedRadius}px`);
  pageRoot.style.setProperty('--project-transition-duration', `${PROJECT_TRANSITION_TIMING.morph}ms`);
  pageRoot.classList.add('is-project-view-transition');
  document.body.classList.add('is-card-transitioning');
  card.style.willChange = 'transform, border-radius, box-shadow';

  try {
    liftAnimation = card.animate([
      {
        borderRadius: `${cardRadius}px`,
        boxShadow: cardStyles.boxShadow,
        transform: baseTransform
      },
      {
        borderRadius: `${raisedRadius}px`,
        boxShadow: 'inset 0 -1px 0 rgba(0, 0, 0, 0.12), 0 24px 54px rgba(0, 0, 0, 0.3)',
        transform: `${baseTransform} translate3d(0, -11px, 0) scale(1.018)`
      }
    ], {
      duration: PROJECT_TRANSITION_TIMING.lift,
      easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      fill: 'forwards'
    });

    await liftAnimation.finished.catch(() => undefined);

    if (typeof document.startViewTransition !== 'function') {
      await revealProjectWithoutViewTransition(projectId, projectTitle);
      hasCommittedDetail = true;
      return;
    }

    card.style.viewTransitionName = 'project-surface';

    const pageTransition = document.startViewTransition(() => {
      populateCardDetail(projectId, projectTitle);
      commitCardDetail(projectId, projectTitle);
      hasCommittedDetail = true;
      transitionTarget = createCardTransitionTarget();
    });

    await pageTransition.finished.catch(() => undefined);
  } finally {
    try {
      if (!hasCommittedDetail) {
        populateCardDetail(projectId, projectTitle);
        commitCardDetail(projectId, projectTitle);
      }
    } finally {
      liftAnimation?.cancel();
      transitionTarget?.remove();
      card.style.removeProperty('view-transition-name');
      if (previousWillChange) {
        card.style.willChange = previousWillChange;
      } else {
        card.style.removeProperty('will-change');
      }
      pageRoot.style.removeProperty('--project-transition-raised-radius');
      pageRoot.style.removeProperty('--project-transition-duration');
      pageRoot.classList.remove('is-project-view-transition');
      document.body.classList.remove('is-card-transitioning');
      isCardTransitionActive = false;
      detailBackButton.focus({ preventScroll: true });
    }
  }
}

// Add the card--static class later to any tile that should not open a page.
cards.forEach((card, cardIndex) => {
  if (card.classList.contains('card--static')) return;

  const projectId = card.dataset.projectId || `card-${cardIndex + 1}`;
  const projectTitle = card.dataset.projectTitle || `Project ${cardIndex + 1}`;
  const externalUrl = card.dataset.externalUrl;

  function openCardDestination() {
    if (externalUrl) {
      window.open(externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    morphCardIntoDetail(card, projectId, projectTitle);
  }

  card.setAttribute('role', 'link');
  card.setAttribute('aria-label', `Open ${projectTitle}`);

  card.addEventListener('click', openCardDestination);

  card.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    openCardDestination();
  });
});

detailBackButton.addEventListener('click', () => {
  if (window.location.hash.startsWith('#work/')) {
    history.back();
    return;
  }

  showGridPage();
});

window.addEventListener('popstate', () => {
  const projectMatch = window.location.hash.match(/^#work\/([a-z0-9-]+)$/);

  if (projectMatch) {
    const matchingCard = document.querySelector(`[data-project-id="${projectMatch[1]}"]`);
    const projectTitle = matchingCard?.dataset.projectTitle || 'Selected project';
    showCardDetail(projectMatch[1], projectTitle, false);
  } else {
    showGridPage();
  }
});

// Restore a linked project page when the site loads with a project hash.
const initialProjectMatch = window.location.hash.match(/^#work\/([a-z0-9-]+)$/);
if (initialProjectMatch) {
  const matchingCard = document.querySelector(`[data-project-id="${initialProjectMatch[1]}"]`);
  const projectTitle = matchingCard?.dataset.projectTitle || 'Selected project';
  showCardDetail(initialProjectMatch[1], projectTitle, false);
}

/* ---------- Theme control ---------- */

themeButton.addEventListener('click', () => {
  isAlternateThemeActive = !isAlternateThemeActive;

  pageRoot.style.setProperty('--page', isAlternateThemeActive ? '#ededeb' : '#30302f');
  pageRoot.style.setProperty('--surface', isAlternateThemeActive ? '#f5f5f3' : '#373737');
  pageRoot.style.setProperty('--surface-hover', isAlternateThemeActive ? '#ffffff' : '#3b3b3b');
  pageRoot.style.setProperty('--edge', isAlternateThemeActive ? '#d2d2cf' : '#464646');
  pageRoot.style.setProperty('--text', isAlternateThemeActive ? '#30302f' : '#dedede');
  pageRoot.style.setProperty(
    '--shadow',
    isAlternateThemeActive ? 'rgba(0, 0, 0, 0.16)' : 'rgba(0, 0, 0, 0.42)'
  );

  themeButton.classList.toggle('is-light-theme', isAlternateThemeActive);
  pageRoot.classList.toggle('is-light-theme', isAlternateThemeActive);
  themeColorMeta.setAttribute('content', isAlternateThemeActive ? '#edf6fb' : '#020713');
  themeButton.setAttribute('aria-pressed', String(isAlternateThemeActive));
  themeButton.setAttribute(
    'aria-label',
    isAlternateThemeActive ? 'Switch to dark mode' : 'Switch to light mode'
  );
});

/* ---------- Playful falling balls ---------- */

function setBallControlMode(mode) {
  const isLightningMode = mode === 'lightning';

  ballButton.classList.toggle('is-lightning', isLightningMode);
  ballButton.querySelector('.ball-control__orb').textContent = isLightningMode ? 'bolt' : 'circle';
  ballButton.dataset.effectMode = mode;
  ballButton.setAttribute(
    'aria-label',
    isLightningMode ? 'Trigger lightning' : 'Drop playful balls'
  );
  ballButton.title = isLightningMode ? 'Trigger lightning' : 'Drop balls';
}

function dropBalls(onComplete) {
  const layer = document.createElement('div');
  const prefersReducedMotion = reducedMotionPreference.matches;
  const ballCount = prefersReducedMotion ? 10 : 30;
  const ballSize = 34;
  const balls = [];
  const ballColor = isAlternateThemeActive ? '#111111' : '#ffffff';
  const burstColors = isAlternateThemeActive
    ? ['#111111', '#ff477e', '#ffb703', '#1677ff', '#00a878']
    : ['#ffffff', '#ff5c8a', '#ffd84d', '#7aa7ff', '#6df0c2'];
  const burstStartsAt = prefersReducedMotion ? 1500 : 4050;
  const burstStagger = prefersReducedMotion ? 160 : 480;
  const animationEndsAt = prefersReducedMotion ? 1900 : 5300;
  const startedAt = performance.now();
  let previousFrame = startedAt;

  layer.className = 'falling-ball-layer';
  layer.setAttribute('aria-hidden', 'true');
  document.body.append(layer);

  for (let index = 0; index < ballCount; index += 1) {
    const element = document.createElement('span');
    const size = ballSize;

    element.className = 'falling-ball';
    element.style.setProperty('--ball-size', `${size}px`);
    element.style.setProperty('--ball-color', ballColor);
    layer.append(element);

    balls.push({
      element,
      size,
      x: Math.random() * Math.max(1, window.innerWidth - size),
      y: -size - Math.random() * window.innerHeight * 0.45,
      velocityX: (Math.random() - 0.5) * 230,
      velocityY: 40 + Math.random() * 120,
      rotation: Math.random() * 180,
      rotationSpeed: (Math.random() - 0.5) * 240,
      bounce: 0.56 + Math.random() * 0.16,
      explodeAt: burstStartsAt + Math.random() * burstStagger,
      exploded: false
    });
  }

  function explodeBall(ball) {
    const burst = document.createElement('span');
    const ring = document.createElement('span');
    const particleCount = prefersReducedMotion ? 5 : 9;

    burst.className = 'ball-burst';
    burst.style.transform = `translate3d(${ball.x + ball.size / 2}px, ${ball.y + ball.size / 2}px, 0)`;
    burst.style.setProperty('--burst-color', ballColor);
    ring.className = 'ball-burst__ring';
    burst.append(ring);

    for (let index = 0; index < particleCount; index += 1) {
      const particle = document.createElement('span');
      const angle = (360 / particleCount) * index + (Math.random() - 0.5) * 22;

      particle.className = 'ball-burst__particle';
      particle.style.setProperty('--particle-angle', `${angle}deg`);
      particle.style.setProperty('--particle-distance', `${30 + Math.random() * 30}px`);
      particle.style.setProperty('--particle-spin', `${120 + Math.random() * 300}deg`);
      particle.style.setProperty(
        '--particle-color',
        burstColors[(index + Math.floor(Math.random() * burstColors.length)) % burstColors.length]
      );
      burst.append(particle);
    }

    ball.exploded = true;
    ball.element.remove();
    layer.append(burst);
    window.setTimeout(() => burst.remove(), 700);
  }

  function getVisibleCardBounds() {
    return [...document.querySelectorAll('.card')]
      .map((card) => card.getBoundingClientRect())
      .filter((bounds) => (
        bounds.width > 0
        && bounds.height > 0
        && bounds.right > 0
        && bounds.left < window.innerWidth
        && bounds.bottom > 0
        && bounds.top < window.innerHeight
      ));
  }

  function resolveCardCollision(ball, previousX, previousY, cardBounds) {
    const ballRight = ball.x + ball.size;
    const ballBottom = ball.y + ball.size;
    const overlapsCard = ballRight > cardBounds.left
      && ball.x < cardBounds.right
      && ballBottom > cardBounds.top
      && ball.y < cardBounds.bottom;

    if (!overlapsCard) return;

    const previousRight = previousX + ball.size;
    const previousBottom = previousY + ball.size;

    if (previousBottom <= cardBounds.top && ball.velocityY > 0) {
      ball.y = cardBounds.top - ball.size;
      ball.velocityY *= -ball.bounce;
      ball.velocityX *= 0.94;
      return;
    }

    if (previousY >= cardBounds.bottom && ball.velocityY < 0) {
      ball.y = cardBounds.bottom;
      ball.velocityY *= -ball.bounce;
      return;
    }

    if (previousRight <= cardBounds.left && ball.velocityX > 0) {
      ball.x = cardBounds.left - ball.size;
      ball.velocityX *= -0.72;
      return;
    }

    if (previousX >= cardBounds.right && ball.velocityX < 0) {
      ball.x = cardBounds.right;
      ball.velocityX *= -0.72;
    }
  }

  let visibleCardBounds = getVisibleCardBounds();
  let collisionBoundsFrame = 0;

  function animateBalls(now) {
    const elapsed = now - startedAt;
    const delta = Math.min((now - previousFrame) / 1000, 0.034);
    const floor = window.innerHeight;
    previousFrame = now;

    // Refresh periodically so collisions follow horizontal grid movement without
    // forcing a layout measurement for every animation frame.
    collisionBoundsFrame += 1;
    if (collisionBoundsFrame % 6 === 0) {
      visibleCardBounds = getVisibleCardBounds();
    }

    balls.forEach((ball) => {
      if (ball.exploded) return;

      const previousX = ball.x;
      const previousY = ball.y;

      ball.velocityY += 1350 * delta;
      ball.x += ball.velocityX * delta;
      ball.y += ball.velocityY * delta;
      ball.rotation += ball.rotationSpeed * delta;

      visibleCardBounds.forEach((cardBounds) => {
        resolveCardCollision(ball, previousX, previousY, cardBounds);
      });

      if (ball.x <= 0 || ball.x + ball.size >= window.innerWidth) {
        ball.x = clamp(ball.x, 0, window.innerWidth - ball.size);
        ball.velocityX *= -0.72;
      }

      if (ball.y + ball.size >= floor) {
        ball.y = floor - ball.size;
        ball.velocityY *= -ball.bounce;
        ball.velocityX *= 0.92;
        ball.rotationSpeed *= 0.9;
      }

      ball.element.style.transform = `translate3d(${ball.x}px, ${ball.y}px, 0) rotate(${ball.rotation}deg)`;

      if (elapsed >= ball.explodeAt) {
        explodeBall(ball);
      }
    });

    if (elapsed < animationEndsAt) {
      requestAnimationFrame(animateBalls);
    } else {
      layer.remove();
      onComplete();
    }
  }

  requestAnimationFrame(animateBalls);
}

function showLightning(onComplete) {
  const layer = document.createElement('div');
  const lightningColor = isAlternateThemeActive ? '#111111' : '#ffffff';
  const lightningFlash = isAlternateThemeActive
    ? 'rgba(17, 17, 17, 0.14)'
    : 'rgba(255, 255, 255, 0.18)';

  layer.className = 'lightning-layer';
  layer.setAttribute('aria-hidden', 'true');
  layer.style.setProperty('--lightning-color', lightningColor);
  layer.style.setProperty('--lightning-flash', lightningFlash);

  for (let index = 0; index < 5; index += 1) {
    const bolt = document.createElement('span');

    bolt.className = 'lightning-bolt';
    bolt.style.left = `${8 + Math.random() * 84}%`;
    bolt.style.setProperty('--bolt-width', `${14 + Math.random() * 15}px`);
    bolt.style.setProperty('--bolt-height', `${42 + Math.random() * 38}vh`);
    bolt.style.setProperty('--bolt-rotation', `${-12 + Math.random() * 24}deg`);
    bolt.style.setProperty('--bolt-delay', `${index * 24}ms`);
    layer.append(bolt);
  }

  document.body.append(layer);

  window.setTimeout(() => {
    layer.remove();
    onComplete();
  }, 760);
}

let isNavbarEffectRunning = false;
setBallControlMode('balls');

ballButton.addEventListener('click', () => {
  if (isNavbarEffectRunning) return;

  isNavbarEffectRunning = true;

  if (ballButton.dataset.effectMode === 'lightning') {
    showLightning(() => {
      setBallControlMode('balls');
      isNavbarEffectRunning = false;
    });
    return;
  }

  dropBalls(() => {
    setBallControlMode('lightning');
    isNavbarEffectRunning = false;
  });
});

/* ---------- Smooth horizontal wheel scrolling ---------- */

function clamp(number, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, number));
}

function getMaximumScrollPosition() {
  return cardCollection.scrollWidth - cardCollection.clientWidth;
}

function animateHorizontalScroll() {
  const currentPosition = cardCollection.scrollLeft;
  const remainingDistance = horizontalScrollTarget - currentPosition;

  // Finish on an exact pixel so the grid remains correctly aligned.
  if (Math.abs(remainingDistance) < 0.5) {
    cardCollection.scrollLeft = horizontalScrollTarget;
    scrollAnimationFrameId = null;

    if (scrollSnapTimerId === null) {
      cardCollection.classList.remove('is-wheel-scrolling');
    }

    return;
  }

  cardCollection.scrollLeft += remainingDistance * 0.14;
  scrollAnimationFrameId = requestAnimationFrame(animateHorizontalScroll);
}

function findNearestGridPosition(scrollPosition) {
  const collectionStyles = getComputedStyle(cardCollection);
  const collectionLeftPadding = parseFloat(collectionStyles.paddingLeft);
  const maximumScrollPosition = getMaximumScrollPosition();
  const cardGrids = document.querySelectorAll('.card-grid');

  // Each position places a grid on the navigation bar's left alignment line.
  const gridPositions = [...cardGrids].map((grid) => {
    const alignedPosition = grid.offsetLeft - collectionLeftPadding;
    return clamp(alignedPosition, 0, maximumScrollPosition);
  });

  return gridPositions.reduce((nearestPosition, candidatePosition) => {
    const candidateDistance = Math.abs(candidatePosition - scrollPosition);
    const nearestDistance = Math.abs(nearestPosition - scrollPosition);

    return candidateDistance < nearestDistance ? candidatePosition : nearestPosition;
  });
}

function startScrollAnimation() {
  if (scrollAnimationFrameId !== null) return;

  scrollAnimationFrameId = requestAnimationFrame(animateHorizontalScroll);
}

function centerGrid(gridIndex, isPreview = true) {
  const selectedGrid = cardGrids[gridIndex];
  if (!selectedGrid) return;

  if (mobileLayoutPreference.matches) {
    cardCollection.classList.remove('is-navigation-preview', 'is-wheel-scrolling');
    selectedGrid.scrollIntoView({
      behavior: reducedMotionPreference.matches ? 'auto' : 'smooth',
      block: 'start'
    });
    return;
  }

  const centeredPosition = selectedGrid.offsetLeft
    + selectedGrid.offsetWidth / 2
    - cardCollection.clientWidth / 2;

  horizontalScrollTarget = clamp(centeredPosition, 0, getMaximumScrollPosition());
  cardCollection.classList.toggle('is-navigation-preview', isPreview);

  if (!isPreview) {
    cardCollection.classList.add('is-wheel-scrolling');
  }

  startScrollAnimation();
}

/* Keep the navigation marker in sync with the section currently in view. */
function setActiveGrid(gridIndex) {
  if (gridIndex === activeGridIndex) return;

  activeGridIndex = gridIndex;

  navigationTargets.forEach((target, targetIndex) => {
    const isActive = targetIndex === gridIndex;
    target.classList.toggle('is-active', isActive);

    if (isActive) {
      target.setAttribute('aria-current', 'true');
    } else {
      target.removeAttribute('aria-current');
    }
  });
}

function getActiveGridIndex() {
  if (mobileLayoutPreference.matches) {
    const headerBottom = siteHeader.getBoundingClientRect().bottom;
    let currentIndex = 0;
    let largestVisibleArea = -1;

    cardGrids.forEach((grid, gridIndex) => {
      const gridBounds = grid.getBoundingClientRect();
      const visibleTop = Math.max(gridBounds.top, headerBottom);
      const visibleBottom = Math.min(gridBounds.bottom, window.innerHeight);
      const visibleArea = Math.max(0, visibleBottom - visibleTop);

      if (visibleArea > largestVisibleArea) {
        largestVisibleArea = visibleArea;
        currentIndex = gridIndex;
      }
    });

    return currentIndex;
  }

  const collectionStyles = getComputedStyle(cardCollection);
  const collectionLeftPadding = parseFloat(collectionStyles.paddingLeft);
  const maximumScrollPosition = getMaximumScrollPosition();
  let nearestIndex = 0;
  let nearestDistance = Infinity;

  cardGrids.forEach((grid, gridIndex) => {
    const alignedPosition = clamp(
      grid.offsetLeft - collectionLeftPadding,
      0,
      maximumScrollPosition
    );
    const distance = Math.abs(alignedPosition - cardCollection.scrollLeft);

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = gridIndex;
    }
  });

  return nearestIndex;
}

function syncNavigationToScroll() {
  navigationSyncAnimationFrameId = null;
  setActiveGrid(getActiveGridIndex());
}

function scheduleNavigationSync() {
  if (navigationSyncAnimationFrameId !== null) return;

  navigationSyncAnimationFrameId = requestAnimationFrame(syncNavigationToScroll);
}

cardCollection.addEventListener('scroll', scheduleNavigationSync, { passive: true });
window.addEventListener('scroll', scheduleNavigationSync, { passive: true });
window.addEventListener('resize', scheduleNavigationSync);
mobileLayoutPreference.addEventListener('change', scheduleNavigationSync);
syncNavigationToScroll();

/* Hovering over the navigation markers previews each grid in the center. */
navigationTargets.forEach((target) => {
  target.addEventListener('pointerenter', () => {
    centerGrid(Number(target.dataset.gridIndex));
  });

  target.addEventListener('focus', () => {
    centerGrid(Number(target.dataset.gridIndex));
  });

  target.addEventListener('click', () => {
    centerGrid(Number(target.dataset.gridIndex), false);
  });
});

homeNavigationButton.addEventListener('click', () => {
  centerGrid(0, false);
});

navigationTrack.addEventListener('pointerleave', () => {
  cardCollection.classList.remove('is-navigation-preview');
});

/* ---------- Cursor-reactive navigation lines ---------- */

let navigationLines = [];
let pendingLineAnimationFrame = null;
let latestPointerPosition = null;

function createNavigationLines() {
  const availableWidth = navigationLinesContainer.clientWidth;
  const lineWidth = 1;
  const gapBetweenLines = 4;
  const numberOfLines = Math.max(
    1,
    Math.floor((availableWidth + gapBetweenLines) / (lineWidth + gapBetweenLines))
  );

  navigationLines = Array.from({ length: numberOfLines }, () => {
    const line = document.createElement('span');
    line.className = 'navigation-line';
    return line;
  });

  navigationLinesContainer.replaceChildren(...navigationLines);
}

function resetNavigationLines() {
  navigationLines.forEach((line) => {
    line.style.removeProperty('--line-scale');
    line.style.removeProperty('--line-offset');
    line.style.removeProperty('--line-opacity');
  });
}

function animateNavigationLines() {
  pendingLineAnimationFrame = null;

  if (!latestPointerPosition || reducedMotionPreference.matches) {
    resetNavigationLines();
    return;
  }

  const trackBounds = navigationTrack.getBoundingClientRect();
  const lineLayerBounds = navigationLinesContainer.getBoundingClientRect();
  const pointerX = latestPointerPosition.x - lineLayerBounds.left;
  const pointerY = latestPointerPosition.y - trackBounds.top;
  const verticalDistanceFromCenter = pointerY - trackBounds.height / 2;
  const influenceRadius = 105;
  const lineWidth = 1;
  const gapBetweenLines = 4;
  const lineStep = lineWidth + gapBetweenLines;
  const linesTotalWidth = navigationLines.length * lineWidth
    + (navigationLines.length - 1) * gapBetweenLines;
  const firstLineCenter = (lineLayerBounds.width - linesTotalWidth) / 2 + lineWidth / 2;

  navigationLines.forEach((line, lineIndex) => {
    const linePositionX = firstLineCenter + lineIndex * lineStep;
    const distanceFromPointer = Math.abs(linePositionX - pointerX);
    const influence = Math.max(0, 1 - distanceFromPointer / influenceRadius);
    const softenedInfluence = influence * influence;

    const heightScale = 1 + softenedInfluence * 0.7;
    const verticalOffset = verticalDistanceFromCenter * softenedInfluence * 0.18;
    const opacity = 0.65 + softenedInfluence * 0.35;

    line.style.setProperty('--line-scale', heightScale.toFixed(3));
    line.style.setProperty('--line-offset', `${verticalOffset.toFixed(2)}px`);
    line.style.setProperty('--line-opacity', opacity.toFixed(3));
  });
}

navigationTrack.addEventListener('pointermove', (event) => {
  latestPointerPosition = { x: event.clientX, y: event.clientY };

  if (pendingLineAnimationFrame === null) {
    pendingLineAnimationFrame = requestAnimationFrame(animateNavigationLines);
  }
});

navigationTrack.addEventListener('pointerleave', () => {
  latestPointerPosition = null;
  resetNavigationLines();
});

// Recalculate the number of lines whenever the responsive navbar changes size.
const navigationResizeObserver = new ResizeObserver(createNavigationLines);
navigationResizeObserver.observe(navigationTrack);
createNavigationLines();

function scheduleGridAlignment() {
  clearTimeout(scrollSnapTimerId);

  // Wait until the wheel stops, then align the nearest grid with the navbar.
  scrollSnapTimerId = setTimeout(() => {
    scrollSnapTimerId = null;
    cardCollection.classList.add('is-wheel-scrolling');
    horizontalScrollTarget = findNearestGridPosition(horizontalScrollTarget);
    startScrollAnimation();
  }, 110);
}

cardCollection.addEventListener('wheel', (event) => {
  // The mobile layout is a native vertical document flow.
  if (mobileLayoutPreference.matches) return;

  const isHorizontalGesture = Math.abs(event.deltaX) > Math.abs(event.deltaY);
  const rawWheelMovement = isHorizontalGesture ? event.deltaX : event.deltaY;

  // Some mice report wheel distance as lines instead of pixels.
  const wheelMovementInPixels = event.deltaMode === WheelEvent.DOM_DELTA_LINE
    ? rawWheelMovement * 16
    : rawWheelMovement;

  if (wheelMovementInPixels === 0) return;

  if (scrollAnimationFrameId === null) {
    horizontalScrollTarget = cardCollection.scrollLeft;
  }

  const nextScrollTarget = clamp(
    horizontalScrollTarget + wheelMovementInPixels,
    0,
    getMaximumScrollPosition()
  );

  // At either end, allow the browser to handle the wheel normally.
  if (nextScrollTarget === horizontalScrollTarget) return;

  event.preventDefault();
  horizontalScrollTarget = nextScrollTarget;
  cardCollection.classList.add('is-wheel-scrolling');

  startScrollAnimation();
  scheduleGridAlignment();
}, { passive: false });

/* ---------- Temporary card hover effect ---------- */

cards.forEach((card) => {
  if (card.classList.contains('card--static') || card.classList.contains('card--no-tilt')) return;

  card.addEventListener('pointermove', (event) => {
    if (reducedMotionPreference.matches) return;

    const cardBounds = card.getBoundingClientRect();
    const horizontalPointerPosition = (event.clientX - cardBounds.left) / cardBounds.width - 0.5;
    const verticalPointerPosition = (event.clientY - cardBounds.top) / cardBounds.height - 0.5;

    card.style.setProperty('--rx', `${(-verticalPointerPosition * 1.6).toFixed(2)}deg`);
    card.style.setProperty('--ry', `${(horizontalPointerPosition * 1.6).toFixed(2)}deg`);
  });

  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  });
});

/* ---------- Landing confetti and welcome toast ---------- */

let hasPlayedWelcomeCelebration = false;
const introToConfettiDelay = 2000;
const confettiToToastDelay = 300;

function waitForAnimationSequence(delay) {
  return new Promise((resolve) => window.setTimeout(resolve, delay));
}

function burstWelcomeConfetti() {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const confettiColor = pageRoot.classList.contains('is-light-theme') ? '#000000' : '#ffffff';
  const particleCount = mobileLayoutPreference.matches ? 320 : 700;
  const pulseCount = 5;
  const particlesPerPulse = particleCount / pulseCount;
  const particles = Array.from({ length: particleCount }, (_, index) => {
    const launchesFromLeft = index % 2 === 0;
    const pulseIndex = Math.floor(index / particlesPerPulse);

    return {
      x: launchesFromLeft ? -12 : viewportWidth + 12,
      y: viewportHeight * (0.32 + Math.random() * 0.58),
      launchDelay: pulseIndex * 240 + Math.random() * 45,
      velocityX: (launchesFromLeft ? 1 : -1) * (7 + Math.random() * 15),
      velocityY: -7 - Math.random() * 15,
      width: 5 + Math.random() * 7,
      height: 3 + Math.random() * 5,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.38,
      color: confettiColor
    };
  });
  const animationDuration = 2800;
  const fadeDuration = 600;
  const startedAt = performance.now();
  let previousFrame = startedAt;

  canvas.className = 'welcome-confetti';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.width = Math.round(viewportWidth * pixelRatio);
  canvas.height = Math.round(viewportHeight * pixelRatio);
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  document.body.append(canvas);

  return new Promise((resolve) => {
    function finishConfetti() {
      canvas.remove();
      resolve();
    }

    function runConfettiFrame(now) {
      const elapsed = now - startedAt;
      const frameScale = Math.min(2, (now - previousFrame) / 16.67);
      const opacity = elapsed > animationDuration - fadeDuration
        ? Math.max(0, (animationDuration - elapsed) / fadeDuration)
        : 1;

      previousFrame = now;
      context.clearRect(0, 0, viewportWidth, viewportHeight);
      context.globalAlpha = opacity;

      particles.forEach((particle) => {
        if (elapsed < particle.launchDelay) return;

        particle.velocityX *= 0.992 ** frameScale;
        particle.velocityY += 0.19 * frameScale;
        particle.x += particle.velocityX * frameScale;
        particle.y += particle.velocityY * frameScale;
        particle.rotation += particle.rotationSpeed * frameScale;

        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation);
        context.fillStyle = particle.color;
        context.fillRect(
          -particle.width / 2,
          -particle.height / 2,
          particle.width,
          particle.height
        );
        context.restore();
      });

      context.globalAlpha = 1;

      if (elapsed < animationDuration) {
        requestAnimationFrame(runConfettiFrame);
        return;
      }

      finishConfetti();
    }

    requestAnimationFrame(runConfettiFrame);
  });
}

function showWelcomeToast() {
  const toast = document.createElement('aside');
  const title = document.createElement('strong');
  const message = document.createElement('p');
  const closeButton = document.createElement('button');
  const closeIcon = document.createElement('span');
  let removalTimer;

  toast.className = 'welcome-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  title.className = 'welcome-toast__title';
  title.textContent = 'Welcome to my portfolio!';
  message.className = 'welcome-toast__message';
  message.textContent = 'Glad you’re here — explore my work, builds, and story.';
  closeButton.className = 'welcome-toast__close';
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Dismiss welcome message');
  closeIcon.className = 'material-symbols-rounded';
  closeIcon.setAttribute('aria-hidden', 'true');
  closeIcon.textContent = 'close';
  closeButton.append(closeIcon);

  function removeToast() {
    clearTimeout(removalTimer);
    toast.classList.remove('is-visible');
    window.setTimeout(() => toast.remove(), reducedMotionPreference.matches ? 0 : 650);
  }

  closeButton.addEventListener('click', removeToast);
  toast.append(title, message, closeButton);
  document.body.append(toast);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('is-visible'));
  });
  removalTimer = window.setTimeout(removeToast, 5200);
}

async function playWelcomeCelebration() {
  if (hasPlayedWelcomeCelebration || gridPage.hidden) return;

  hasPlayedWelcomeCelebration = true;
  await waitForAnimationSequence(introToConfettiDelay);

  if (gridPage.hidden) return;

  if (!reducedMotionPreference.matches) {
    await burstWelcomeConfetti();
    await waitForAnimationSequence(confettiToToastDelay);
  }

  if (!gridPage.hidden) {
    showWelcomeToast();
  }
}

initialIntroAnimationComplete.then(playWelcomeCelebration);
