// All site copy lives here. Replace every TODO value before launch.

export const SITE = {
  name: "Elaf Muneeb",
  role: "AI Automation Expert",
  // TODO: replace with Elaf's real contact details
  email: "hello@elafmuneeb.com",
  linkedin: "https://www.linkedin.com/in/your-handle",
  github: "https://github.com/your-handle",
  whatsapp: "https://wa.me/0000000000",
  booking: "#contact",
};

export type Agent = {
  id: string;
  code: string;
  name: string;
  tagline: string;
  description: string;
  steps: string[];
  tools: string[];
  level: string;
  build: string;
};

export const AGENTS: Agent[] = [
  {
    id: "leads",
    code: "WF-01",
    name: "Lead Generation & Qualification",
    tagline: "Research, score and draft outreach, with you approving every send.",
    description:
      "Finds prospects from authorized business sources and lead forms, enriches each company, scores fit and intent, saves qualified leads to your CRM, and drafts personalized outreach for a human to approve.",
    steps: ["Lead source", "Enrich company", "AI qualifies", "Save to CRM", "Human approves", "Send outreach"],
    tools: ["n8n", "Apollo", "AI API", "Google Sheets", "HubSpot"],
    level: "Intermediate",
    build: "5–10 days",
  },
  {
    id: "support",
    code: "WF-02",
    name: "Customer Support Agent",
    tagline: "Answers from your documents and hands off what it should not decide.",
    description:
      "Answers common customer questions, retrieves facts from your company documents, opens support tickets, and escalates complex problems to a person with the full conversation attached.",
    steps: ["Message in", "Search docs", "AI answers", "Create ticket", "Escalate if unsure", "Reply sent"],
    tools: ["n8n", "OpenAI / Gemini", "WhatsApp API", "Supabase"],
    level: "Intermediate",
    build: "5–10 days",
  },
  {
    id: "email",
    code: "WF-03",
    name: "Email Management & Follow-Up",
    tagline: "An inbox that sorts itself and remembers to follow up.",
    description:
      "Classifies incoming email, extracts action items, prepares replies, flags urgent messages, and schedules follow-up reminders on your calendar.",
    steps: ["Email arrives", "Classify", "Extract actions", "Draft reply", "Flag urgent", "Schedule follow-up"],
    tools: ["n8n", "Gmail API", "Gemini", "Google Calendar"],
    level: "Beginner to Intermediate",
    build: "3–6 days",
  },
  {
    id: "invoices",
    code: "WF-04",
    name: "Invoice & Document Processing",
    tagline: "Reads the paperwork, checks the math, routes it for approval.",
    description:
      "Reads invoices and receipts, extracts structured data, validates totals, detects duplicates, and sends clean entries to accounting for approval.",
    steps: ["Document in", "OCR read", "Extract fields", "Validate totals", "Detect duplicates", "Send to accounting"],
    tools: ["n8n", "OCR", "AI API", "Python", "Google Sheets"],
    level: "Intermediate",
    build: "5–8 days",
  },
  {
    id: "reports",
    code: "WF-05",
    name: "Business Reporting & Analytics",
    tagline: "Your numbers, summarized in plain English on a schedule.",
    description:
      "Collects sales and operations data, calculates KPIs, spots anomalies, and writes automated daily or weekly business summaries.",
    steps: ["Pull data", "Clean with SQL", "Calculate KPIs", "Detect anomalies", "AI writes summary", "Deliver report"],
    tools: ["n8n", "Python", "SQL", "Gemini", "Looker Studio"],
    level: "Intermediate",
    build: "5–10 days",
  },
];

export const TOOLS = [
  "n8n", "Python", "SQL", "OpenAI", "Gemini", "Supabase", "HubSpot", "Gmail API",
  "WhatsApp API", "Google Sheets", "Looker Studio", "Apollo",
];

export const PROCESS = [
  { title: "Map", body: "We walk through the task as it happens today, and agree what the agent does and what stays with a person." },
  { title: "Build", body: "I build the workflow on n8n and Python, connected to your real tools and data sources." },
  { title: "Test", body: "We run it on real examples, check edge cases, and add human approval wherever a mistake would cost you." },
  { title: "Hand off", body: "You get documentation and a walkthrough. Optional monthly maintenance keeps it working as your tools change." },
];

export const FAQ = [
  { q: "Will the agent send things without my approval?", a: "Only where you want it to. For outreach, replies and anything customer-facing, I build a human approval step by default." },
  { q: "Which tools does it connect to?", a: "n8n connects to most business tools. The common ones are Gmail, Google Sheets, HubSpot, Supabase, WhatsApp and Google Calendar. If your tool has an API, it can usually be connected." },
  { q: "How long does a first version take?", a: "A working prototype usually takes 3 to 10 days depending on the workflow and the number of integrations. Production hardening is scoped separately." },
  { q: "How is pricing set?", a: "Each project is quoted after a short call, based on integrations, complexity and API costs. Monthly maintenance is optional." },
  { q: "Do I need to know how to code?", a: "No. I handle the build and hand over clear documentation." },
];

// TODO: replace with Elaf's real bio
export const ABOUT = {
  lead: "I turn repetitive business tasks into AI-powered workflows that run on their own.",
  body: "I work with Python, APIs and databases to connect the tools a team already uses, add an AI step where judgement is needed, and keep a person in the loop where it matters.",
  skills: ["Python", "APIs", "SQL & databases", "n8n workflows", "LLM prompting", "ETL & reporting"],
};
