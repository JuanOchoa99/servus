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

export const frontendTechnologies: TechnologyCard[] = [
  createCard({
    title: "React",
    short: "Web",
    icon: "images/icons/react.svg",
    background: "bg-warning bg-opacity-20",
    description: "Interactive interfaces",
    note: "Reusable component system",
  }),
  createCard({
    title: "React Native",
    short: "CLI & Expo",
    icon: "images/icons/react.svg",
    background: "bg-light_grey",
    description: "CLI and Expo workflows",
    note: "Single codebase delivery",
  }),
  createCard({
    title: "Next.js",
    short: "Web Framework",
    icon: "images/icons/nextjs.svg",
    background: "bg-warning bg-opacity-20",
    description: "Hybrid static & SSR",
    note: "Optimized React delivery",
  }),
  createCard({
    title: "Angular",
    short: "Web Framework",
    icon: "images/icons/angular.svg",
    background: "bg-light_grey",
    description: "Enterprise-grade tooling",
    note: "TypeScript-first platform",
  }),
  createCard({
    title: "AngularJS",
    short: "Legacy Support",
    icon: "images/icons/angularjs.svg",
    background: "bg-warning bg-opacity-20",
    description: "Legacy app maintenance",
    note: "Migration-ready expertise",
  }),
];

export const backendTechnologies: TechnologyCard[] = [
  createCard({
    title: "NestJS",
    short: "Backend Framework",
    icon: "images/icons/nestjs.svg",
    background: "bg-warning bg-opacity-20",
    description: "Production-ready APIs",
    note: "TypeScript-first architecture",
  }),
  createCard({
    title: "Node.js",
    short: "Runtime",
    icon: "images/icons/nodejs.svg",
    background: "bg-light_grey",
    description: "Scalable event loop",
    note: "Mission-critical services",
  }),
  createCard({
    title: "Go",
    short: "Backend Language",
    icon: "images/icons/go.svg",
    background: "bg-warning bg-opacity-20",
    description: "High-performance services",
    note: "Concurrency by design",
  }),
  createCard({
    title: "Python",
    short: "Backend Language",
    icon: "images/icons/python.svg",
    background: "bg-light_grey",
    description: "Automation & data pipelines",
    note: "Extensive ecosystem",
  }),
  createCard({
    title: "Prisma",
    short: "ORM",
    icon: "images/icons/prisma.svg",
    background: "bg-warning bg-opacity-20",
    description: "Type-safe data access",
    note: "Accelerated database workflows",
  }),
  createCard({
    title: "TypeORM",
    short: "ORM",
    icon: "images/icons/TypeScript.svg",
    background: "bg-light_grey",
    description: "Enterprise data mapping",
    note: "Supports multiple databases",
  }),
];

export const platformTechnologies: TechnologyCard[] = [
  createCard({
    title: "Google Cloud",
    short: "Cloud Platform",
    icon: "images/icons/google-cloud.svg",
    background: "bg-light_grey",
    description: "Managed infrastructure",
    note: "Global scale deployment",
  }),
  createCard({
    title: "AWS",
    short: "Cloud Platform",
    icon: "images/icons/aws.svg",
    background: "bg-light_grey",
    description: "Enterprise-grade hosting",
    note: "High availability services",
  }),
  createCard({
    title: "PostgreSQL",
    short: "Relational DB",
    icon: "images/icons/postgresql.svg",
    background: "bg-warning bg-opacity-20",
    description: "ACID-compliant storage",
    note: "Advanced SQL & extensions",
  }),
  createCard({
    title: "MongoDB",
    short: "NoSQL DB",
    icon: "images/icons/mongodb.svg",
    background: "bg-light_grey",
    description: "Flexible document model",
    note: "Horizontal scalability",
  }),
  createCard({
    title: "Azure",
    short: "Cloud Platform",
    icon: "images/icons/azure.svg",
    background: "bg-warning bg-opacity-20",
    description: "Enterprise cloud stack",
    note: "Hybrid and multi-cloud support",
  }),
];

export const aiTechnologies: TechnologyCard[] = [
  createCard({
    title: "OpenAI API",
    short: "Generative AI",
    icon: "images/icons/openai.svg",
    background: "bg-warning bg-opacity-20",
    description: "Conversational copilots",
    note: "GPT-4o and Assistants API",
  }),
  createCard({
    title: "TensorFlow",
    short: "ML Framework",
    icon: "images/icons/tensorflow.svg",
    background: "bg-warning bg-opacity-20",
    description: "Predictive modeling",
    note: "Production-ready pipelines",
  }),
  createCard({
    title: "Claude API",
    short: "Anthropic Model",
    icon: "images/icons/claude-logo.svg",
    background: "bg-light_grey",
    description: "Safety-first copilots",
    note: "Claude 3 family integration",
  }),
];

export const portfolioData: { image: string; title: string }[] = [
  {
    image: "images/portfolio/icon-wallet.svg",
    title: "Manage your portfolio",
  },
  {
    image: "images/portfolio/icon-vault.svg",
    title: "Vault protection",
  },
  {
    image: "images/portfolio/icon-mobileapp.svg",
    title: "Mobile apps",
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

export const CryptoData: { name: string; price: number }[] = [
  { name: "Bitcoin BTC/USD", price: 67646.84 },
  { name: "Ethereum ETH/USD", price: 2515.93 },
  { name: "Bitcoin Cash BTC/USD", price: 366.96 },
  { name: "Litecoin LTC/USD", price: 61504.54 },
];
