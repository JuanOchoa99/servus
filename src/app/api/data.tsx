export const footerlabels: { label: string; herf: string }[] = [
  { label: "Terms", herf: "#" },
  { label: "Disclosures", herf: "#" },
  { label: "Disclosures", herf: "#" },
  { label: "Latest News", herf: "#" },
];

export type TechnologyCard = {
  title: string;
  short: string;
  icon: string;
  background: string;
  description: string;
  note?: string;
};

const createCard = (card: TechnologyCard) => card;

export const technologyShowcase: TechnologyCard[] = [
  createCard({
    title: "Google Cloud",
    short: "GCP",
    icon: "images/icons/google-cloud.svg",
    background: "bg-warning bg-opacity-20",
    description: "Managed infrastructure",
    note: "Global scale deployment",
  }),
  createCard({
    title: "Microsoft Azure",
    short: "Azure",
    icon: "images/icons/Azure.svg",
    background: "bg-light_grey",
    description: "Enterprise cloud stack",
    note: "Hybrid and multi-cloud support",
  }),
  createCard({
    title: "Amazon Web Services",
    short: "AWS",
    icon: "images/icons/AWS.svg",
    background: "bg-warning bg-opacity-20",
    description: "Enterprise-grade hosting",
    note: "High availability services",
  }),
  createCard({
    title: "GitHub",
    short: "DevOps",
    icon: "images/icons/github.svg",
    background: "bg-light_grey",
    description: "Source control & CI",
    note: "Actions and automation suite",
  }),
  createCard({
    title: "Gemini",
    short: "Google AI",
    icon: "images/icons/gemini.svg",
    background: "bg-warning bg-opacity-20",
    description: "Multimodal intelligence",
    note: "Reasoning and content AI",
  }),
  createCard({
    title: "Claude",
    short: "Anthropic AI",
    icon: "images/icons/claude-logo.svg",
    background: "bg-light_grey",
    description: "Safety-first copilots",
    note: "Claude 3 family integration",
  }),
  createCard({
    title: "OpenAI",
    short: "Generative AI",
    icon: "images/icons/openai.svg",
    background: "bg-warning bg-opacity-20",
    description: "Conversational copilots",
    note: "GPT-4o and Assistants API",
  }),
];

export type ProjectHighlight = {
  title: string;
  description: string;
  accent: string;
  icon?: string;
};

export type ProjectCaseStudy = {
  id: string;
  client: string;
  badge: string;
  title: string;
  summary: string;
  highlights: ProjectHighlight[];
};

export const projectShowcase: ProjectCaseStudy[] = [
  {
    id: "laila",
    client: "Laila",
    badge: "Featured Project",
    title: "Launching a New York dating app with a full-stack product squad",
    summary:
      "We designed, built, and automated the entire platform behind Laila. A focused team shipped the mobile app, backend, analytics, and delivery workflows needed to scale in a competitive market.",
    highlights: [
      {
        title: "React Native mobile app",
        description: "iOS and Android launch tailored for the New York market.",
        accent: "bg-primary/10 ring-1 ring-primary/40",
        icon: "images/icons/react.svg",
      },
      {
        title: "Modular NestJS backend",
        description: "Feature-based modules for matchmaking, billing, and content.",
        accent: "bg-secondary/10 ring-1 ring-secondary/40",
        icon: "images/icons/nestjs.svg",
      },
      {
        title: "React client dashboards",
        description: "Operations workspace for concierge and partner teams.",
        accent: "bg-success/10 ring-1 ring-success/40",
        icon: "images/icons/react.svg",
      },
      {
        title: "Amplitude analytics",
        description: "Heatmaps and cohorts to surface engagement trends.",
        accent: "bg-warning/10 ring-1 ring-warning/40",
        icon: "images/icons/amplitude.svg",
      },
      {
        title: "Firebase Authentication",
        description: "Passwordless, social, and phone sign-in in a single flow.",
        accent: "bg-tealGreen/10 ring-1 ring-tealGreen/40",
        icon: "images/icons/Firebase.svg",
      },
      {
        title: "Twilio communications",
        description: "Automated SMS onboarding and support escalations.",
        accent: "bg-error/10 ring-1 ring-error/40",
        icon: "images/icons/twilio.svg",
  },
      {
        title: "Azure CI/CD delivery",
        description: "GitHub Actions shipping to App Service and Static Web Apps.",
        accent: "bg-midnight_text/10 ring-1 ring-midnight_text/30",
        icon: "images/icons/Azure.svg",
      },
      {
        title: "Sendbird messaging",
        description: "Realtime chat embedded across mobile and web touchpoints.",
        accent: "bg-dark_border/10 ring-1 ring-dark_border/30",
        icon: "images/icons/sendbird.png",
      },
      {
        title: "Engineering excellence",
        description: "Clean code with SOLID, DRY patterns and full test coverage.",
        accent: "bg-grey/5 ring-1 ring-grey/30",
      },
    ],
  },
  {
    id: "america-working",
    client: "America Working",
    badge: "Career Platform",
    title: "Helping newcomers land jobs across the United States with localized guidance",
    summary:
      "Florida-based America Working partnered with us to launch a multilingual platform that demystifies the job hunt for international talent. We built a content-rich experience with automated publishing, advisory workflows, and secure enrollment.",
    highlights: [
      {
        title: "Next.js 15 foundation",
        description: "App Router, server components, and streaming layouts for performance.",
        accent: "bg-primary/10 ring-1 ring-primary/40",
        icon: "images/icons/nextjs.svg",
  },
  {
        title: "Multilingual delivery",
        description: "English, Spanish, and Portuguese content powered by message catalogs.",
        accent: "bg-secondary/10 ring-1 ring-secondary/40",
      },
      {
        title: "Modular auth flows",
        description: "Reusable login, signup, and verification screens under `/[locale]/(auth)`.",
        accent: "bg-tealGreen/10 ring-1 ring-tealGreen/40",
      },
      {
        title: "PostgreSQL knowledge base",
        description: "Structured career guides and visa information stored with Prisma models.",
        accent: "bg-success/10 ring-1 ring-success/40",
        icon: "images/icons/postgresql.svg",
  },
  {
        title: "AWS storage buckets",
        description: "Static assets and document uploads distributed via regional S3 buckets.",
        accent: "bg-midnight_text/10 ring-1 ring-midnight_text/30",
        icon: "images/icons/AWS.svg",
      },
      {
        title: "Neos deployment pipeline",
        description: "Automated preview and production rollouts with environment promotion gates.",
        accent: "bg-dark_border/10 ring-1 ring-dark_border/30",
      },
      {
        title: "Advisory workflows",
        description: "Forms and CRM exports supporting remote coaching engagements.",
        accent: "bg-warning/10 ring-1 ring-warning/40",
      },
      {
        title: "Bun-powered dev setup",
        description: "Fast local DX using Bun scripts and linting utilities.",
        accent: "bg-error/10 ring-1 ring-error/30",
      },
      {
        title: "Responsive resource hub",
        description: "Cards, FAQs, pricing, and visa tracks curated for mobile-first audiences.",
        accent: "bg-grey/5 ring-1 ring-grey/30",
      },
    ],
  },
];

export const upgradeData: { title: string }[] = [
  { title: "100% Secure" },
  { title: "A Fraction of the Cost" },
  { title: "More Durable" },
  { title: "Easier to Use" },
];

export const perksData: {
  icon: string;
  title: string;
  text: string;
  space: string;
}[] = [
  {
    icon: "images/perks/icon-support.svg",
    title: "24/7 Support",
    text: "Need help? Get your requests solved quickly via support team.",
    space: "lg:mt-8",
  },
  {
    icon: "images/perks/icon-community.svg",
    title: "Community",
    text: "Join the conversations on our worldwide OKEx communities",
    space: "lg:mt-14",
  },
  {
    icon: "images/perks/icon-academy.svg",
    title: "Academy",
    text: "Learn blockchain and<br /> crypto for free.",
    space: "lg:mt-4",
  },
];

export const timelineData: {
  icon: string;
  title: string;
  text: string;
  position: string;
}[] = [
  {
    icon: "images/timeline/icon-planning.svg",
    title: "Planning",
    text: "Map the project's scope and architecture",
    position: "md:top-0 md:left-0",
  },
  {
    icon: "images/timeline/icon-refinement.svg",
    title: "Refinement",
    text: "Refine and improve your solution",
    position: "md:top-0 md:right-0",
  },
  {
    icon: "images/timeline/icon-prototype.svg",
    title: "Prototype",
    text: "Build a working prototype to test your product",
    position: "md:bottom-0 md:left-0",
  },
  {
    icon: "images/timeline/icon-support.svg",
    title: "Support",
    text: "Deploy the product and ensure full support by us",
    position: "md:bottom-0 md:right-0",
  },
];

export const CryptoData: { name: string; price: number }[] = [ // TODO: Remove this data
  { name: "Bitcoin BTC/USD", price: 67646.84 },
  { name: "Ethereum ETH/USD", price: 2515.93 },
  { name: "Bitcoin Cash BTC/USD", price: 366.96 },
  { name: "Litecoin LTC/USD", price: 61504.54 },
];
