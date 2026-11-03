import { AGENTS, FAQ, SITE } from "./content";

// TODO: set NEXT_PUBLIC_SITE_URL to the real domain once it is bought and connected.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://elafmuneeb.com").replace(/\/$/, "");

export const TITLE = "Elaf Muneeb | AI Automation Expert";
export const DESCRIPTION =
  "Elaf Muneeb builds AI automation agents on n8n and Python: lead generation, customer support, email follow-up, invoice processing and business reporting.";

const real = (u: string) => (u.includes("your-handle") || u.includes("0000000000") ? [] : [u]);

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE.name,
      description: DESCRIPTION,
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE.name,
      jobTitle: SITE.role,
      url: SITE_URL,
      image: `${SITE_URL}/elaf.jpg`,
      description: DESCRIPTION,
      sameAs: [...real(SITE.linkedin), ...real(SITE.github)],
      knowsAbout: ["AI automation", "n8n", "Python", "Workflow automation", "LLM agents", "Business process automation"],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: `${SITE.name}: AI Automation`,
      url: SITE_URL,
      image: `${SITE_URL}/elaf.jpg`,
      founder: { "@id": `${SITE_URL}/#person` },
      description: DESCRIPTION,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI automation agents",
        itemListElement: AGENTS.map((a) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: a.name, description: a.description },
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};
