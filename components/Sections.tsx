import Image from "next/image";
import { ABOUT, AGENTS, PROCESS, SITE, TOOLS } from "@/lib/content";
import { Arrow, ContactForm, Faq, Workflows } from "./Interactive";

export { Faq, Workflows };

export function Nav() {
  return (
    <header className="nav">
      <a href="#top" className="logo" aria-label="Elaf Muneeb, home">
        <i />
        ELAF/MUNEEB
      </a>
      <ul>
        <li><a href="#services">Services</a></li>
        <li><a href="#workflows">Workflows</a></li>
        <li><a href="#process">Process</a></li>
        <li><a href="#work">Work</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
      <a href={SITE.booking} className="btn primary" data-magnetic style={{ padding: "10px 18px", fontSize: ".85rem" }}>
        Book a call
      </a>
    </header>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top" data-scene-section="0">
      <div className="container">
        <div className="hero-copy">
          <div className="eyebrow label" data-hero-in>
            <b /> AI Automation Expert
          </div>
          <h1 data-split="hero">
            I build AI agents that <mark>run your busy work.</mark>
          </h1>
          <p className="lead">
            I&apos;m Elaf Muneeb. I automate lead generation, customer support, email, invoices and reporting on n8n and
            Python, and keep a person in the loop wherever it matters.
          </p>
          <div className="hero-actions" data-hero-in>
            <a href={SITE.booking} className="btn primary" data-magnetic>
              Book a call <Arrow />
            </a>
            <a href="#workflows" className="btn ghost" data-magnetic>
              See how it works
            </a>
          </div>
        </div>
      </div>
      <div className="hero-meta label" data-hero-in>
        <span className="scroll-cue">
          <span /> Scroll
        </span>
        <span>Move your cursor: the 3D reacts</span>
      </div>
    </section>
  );
}

export function Marquee() {
  const row = [...TOOLS, ...TOOLS];
  return (
    <div className="marquee" aria-label="Tools I work with">
      <div className="marquee-track">
        <span>{row.map((t, i) => <b key={i} style={{ fontWeight: 500 }}>{t}</b>)}</span>
        <span aria-hidden="true">{row.map((t, i) => <b key={i} style={{ fontWeight: 500 }}>{t}</b>)}</span>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" data-scene-section="1">
      <div className="container">
        <div className="sec-head">
          <span className="label" data-reveal>Services</span>
          <h2 data-split>Five agents that take work off your plate.</h2>
          <p data-reveal>
            Each one is a workflow with a clear trigger, an AI step where judgement is needed, and a human check before
            anything customer-facing goes out.
          </p>
        </div>
        <div className="cards">
          {AGENTS.map((a) => (
            <article className="card" key={a.id} data-reveal data-tilt data-hover>
              <div className="glare" />
              <div className="card-top">
                <span className="label">{a.code}</span>
                <span className="label">{a.build}</span>
              </div>
              <h3>{a.name}</h3>
              <p>{a.tagline}</p>
              <div className="chips">
                {a.tools.map((t) => (
                  <span className="chip" key={t}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" data-scene-section="3">
      <div className="container">
        <div className="sec-head">
          <span className="label" data-reveal>Process</span>
          <h2 data-split>From messy task to running workflow in four steps.</h2>
        </div>
        <div className="process">
          {PROCESS.map((p, i) => (
            <div className="proc" key={p.title} data-reveal>
              <span className="label">Step {i + 1} of {PROCESS.length}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section id="work" data-scene-section="3" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="sec-head">
          <span className="label" data-reveal>Case studies</span>
          <h2 data-split>Builds, laid out.</h2>
          <p data-reveal>
            These are prototype workflows. Results from live client work will be added here as they are published.
          </p>
        </div>
        <div className="cases">
          {AGENTS.map((a) => (
            <div className="case" key={a.id} data-reveal data-hover>
              <span className="label">{a.code}</span>
              <div>
                <h3>{a.name}</h3>
                <p style={{ marginTop: 8 }}>{a.description}</p>
              </div>
              <div>
                <span className="label">Pipeline</span>
                <p style={{ marginTop: 8 }}>{a.steps.join("  >  ")}</p>
              </div>
              <span className="badge">Prototype</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" data-scene-section="4">
      <div className="container about">
        <div className="portrait photo" data-reveal data-hover>
          <Image
            src="/elaf.jpg"
            alt="Elaf Muneeb, AI automation expert"
            fill
            sizes="(max-width: 860px) 100vw, 40vw"
            quality={80}
          />
          <span className="tagline">Elaf Muneeb</span>
        </div>
        <div>
          <span className="label" data-reveal>About</span>
          <h2 data-split style={{ marginTop: 14 }}>{ABOUT.lead}</h2>
          <p data-reveal>{ABOUT.body}</p>
          <div className="skills" data-reveal>
            {ABOUT.skills.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="contact" data-scene-section="5">
      <div className="container">
        <span className="label" data-reveal>Contact</span>
        <h2 data-split style={{ marginTop: 14 }}>Let&apos;s automate something.</h2>
        <p className="lead" data-reveal>Tell me what eats your team&apos;s time. I&apos;ll reply with what an agent could take over.</p>
        <ContactForm />
        <div className="contact-links" data-reveal>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="label">
      <span>© {new Date().getFullYear()} Elaf Muneeb</span>
      <span>AI automation, built and maintained</span>
    </footer>
  );
}
