"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AGENTS, FAQ, SITE } from "@/lib/content";

export const Arrow = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
  </svg>
);

export function Workflows() {
  const [tab, setTab] = useState(0);
  const [active, setActive] = useState(0);
  const agent = AGENTS[tab];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((n) => (n + 1) % agent.steps.length), 1100);
    return () => clearInterval(id);
  }, [agent]);

  return (
    <section id="workflows" className="wf-section" data-scene-section="2">
      <div className="wf" data-reveal>
        <span className="label">How an agent runs</span>
        <h2 style={{ marginTop: 14, maxWidth: "18ch" }}>
          Follow the data, <mark>step by step.</mark>
        </h2>
        <div className="wf-tabs" role="tablist" aria-label="Choose an agent">
          {AGENTS.map((a, i) => (
            <button
              key={a.id}
              role="tab"
              aria-selected={tab === i}
              className="wf-tab"
              onClick={() => {
                setTab(i);
                setActive(0);
              }}
            >
              {a.code} {a.name.split(" ")[0]} {a.name.split(" ")[1] === "&" ? "" : a.name.split(" ")[1]}
            </button>
          ))}
        </div>
        <div className="wf-body">
          <div>
            <h3>{agent.name}</h3>
            <p>{agent.description}</p>
            <div className="wf-meta">
              <div><span className="label">Level</span><b>{agent.level}</b></div>
              <div><span className="label">Prototype build</span><b>{agent.build}</b></div>
              <div><span className="label">Stack</span><b>{agent.tools.join(", ")}</b></div>
            </div>
          </div>
          <div className="pipe" role="list" aria-label={`${agent.name} workflow steps`}>
            <div className="rail"><i /></div>
            {agent.steps.map((s, i) => (
              <div className={`step${active === i ? " on" : ""}`} key={s} role="listitem">
                <span className="dot">{String(i + 1).padStart(2, "0")}</span>
                <span className="t">{s}</span>
                <span className="tag">{i === 4 && agent.id !== "email" ? "Human step" : i === 2 ? "AI step" : "Running"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" data-scene-section="4" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="sec-head">
          <span className="label" data-reveal>FAQ</span>
          <h2 data-split>Questions people ask first.</h2>
        </div>
        <div className="faq">
          {FAQ.map((f, i) => (
            <div className={`qa${open === i ? " open" : ""}`} key={f.q} data-reveal>
              <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                {f.q}
                <span className="plus" />
              </button>
              <div className="ans"><div><p>{f.a}</p></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactForm() {
  const [note, setNote] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = `${d.get("message")}\n\nFrom: ${d.get("name")} (${d.get("email")})`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Automation project")}&body=${encodeURIComponent(body)}`;
    setNote("Opening your email app. If nothing opens, write to " + SITE.email);
  }
  return (
      <form className="form" onSubmit={submit} data-reveal>
          <label>
            <span className="label">Name</span>
            <input name="name" required autoComplete="name" />
          </label>
          <label>
            <span className="label">Email</span>
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            <span className="label">What do you want to automate?</span>
            <textarea name="message" rows={4} required />
          </label>
          <button type="submit" className="btn primary" style={{ justifyContent: "center" }}>
            Send message <Arrow />
          </button>
          <span className="label" role="status" style={{ textTransform: "none", letterSpacing: 0 }}>{note}</span>
        </form>
  );
}
