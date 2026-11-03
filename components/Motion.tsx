"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { sceneState } from "@/lib/state";

gsap.registerPlugin(ScrollTrigger);

// Wrap every word of an element's text in a clipped span so it can slide up.
function splitWords(root: HTMLElement) {
  if (root.dataset.splitDone) return [] as HTMLElement[];
  root.dataset.splitDone = "1";
  const inners: HTMLElement[] = [];
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        (child.textContent ?? "").split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(" "));
            return;
          }
          const w = document.createElement("span");
          w.className = "w";
          const i = document.createElement("span");
          i.textContent = part;
          w.appendChild(i);
          inners.push(i);
          frag.appendChild(w);
        });
        child.parentNode?.replaceChild(frag, child);
      } else if (child.nodeType === 1) {
        walk(child);
      }
    });
  };
  walk(root);
  return inners;
}

export default function Motion() {
  const loader = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      // smooth scroll
      const lenis = new Lenis({ lerp: reduce ? 1 : 0.09 });
      const nav = document.querySelector(".nav");
      lenis.on("scroll", (l: Lenis) => {
        sceneState.scrollY = l.scroll;
        nav?.classList.toggle("solid", l.scroll > 40);
        ScrollTrigger.update();
      });
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
        if (!a) return;
        const id = a.getAttribute("href");
        if (!id || id === "#") return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -60, duration: 1.4 });
      };
      document.addEventListener("click", onClick);
      cleanups.push(() => {
        document.removeEventListener("click", onClick);
        gsap.ticker.remove(tick);
        lenis.destroy();
      });

      // which section the 3D scene should respond to
      gsap.utils.toArray<HTMLElement>("[data-scene-section]").forEach((el) => {
        const n = Number(el.dataset.sceneSection);
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => {
            if (self.isActive) sceneState.section = n;
          },
        });
      });

      // headline word reveals
      const heroWords: HTMLElement[] = [];
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const words = splitWords(el);
        if (!words.length) return;
        if (!reduce) gsap.set(words, { yPercent: 115 });
        if (el.dataset.split === "hero") {
          heroWords.push(...words);
        } else if (!reduce) {
          ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            once: true,
            onEnter: () =>
              gsap.to(words, { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.035 }),
          });
        }
      });

      // block reveals
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (!reduce) {
        gsap.set(reveals, { opacity: 0, y: 44 });
        ScrollTrigger.batch(reveals, {
          start: "top 92%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.09, overwrite: true }),
        });
      }

      // intro: loader -> hero
      const heroIn = gsap.utils.toArray<HTMLElement>("[data-hero-in]");
      if (!reduce) gsap.set(heroIn, { opacity: 0, y: 30 });
      const tl = gsap.timeline();
      if (reduce) {
        gsap.set(loader.current, { display: "none" });
      } else {
        tl.to(bar.current, { scaleX: 1, duration: 0.5, ease: "power2.inOut" })
          .to(loader.current, { yPercent: -100, duration: 0.65, ease: "power4.inOut" })
          .to(heroWords, { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.04 }, "-=0.4")
          .to(heroIn, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 }, "-=0.8")
          .set(loader.current, { display: "none" });
      }

      // custom cursor
      const cur = cursor.current;
      if (cur && matchMedia("(hover: hover)").matches) {
        const qx = gsap.quickTo(cur, "x", { duration: 0.22, ease: "power3" });
        const qy = gsap.quickTo(cur, "y", { duration: 0.22, ease: "power3" });
        const move = (e: PointerEvent) => {
          qx(e.clientX);
          qy(e.clientY);
        };
        const over = (e: PointerEvent) => {
          const hit = (e.target as HTMLElement).closest("a,button,input,textarea,[data-hover]");
          cur.classList.toggle("big", !!hit);
        };
        window.addEventListener("pointermove", move, { passive: true });
        document.addEventListener("pointerover", over);
        cleanups.push(() => {
          window.removeEventListener("pointermove", move);
          document.removeEventListener("pointerover", over);
        });
      }

      // magnetic buttons
      gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
        const mx = gsap.quickTo(el, "x", { duration: 0.5, ease: "elastic.out(1,0.5)" });
        const my = gsap.quickTo(el, "y", { duration: 0.5, ease: "elastic.out(1,0.5)" });
        const mv = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          mx((e.clientX - (r.left + r.width / 2)) * 0.28);
          my((e.clientY - (r.top + r.height / 2)) * 0.4);
        };
        const lv = () => {
          mx(0);
          my(0);
        };
        el.addEventListener("pointermove", mv);
        el.addEventListener("pointerleave", lv);
        cleanups.push(() => {
          el.removeEventListener("pointermove", mv);
          el.removeEventListener("pointerleave", lv);
        });
      });

      // 3D card tilt
      gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el) => {
        const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3" });
        const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3" });
        const mv = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          ry((px - 0.5) * 12);
          rx(-(py - 0.5) * 12);
          el.style.setProperty("--mx", `${px * 100}%`);
          el.style.setProperty("--my", `${py * 100}%`);
        };
        const lv = () => {
          rx(0);
          ry(0);
        };
        el.addEventListener("pointermove", mv);
        el.addEventListener("pointerleave", lv);
        cleanups.push(() => {
          el.removeEventListener("pointermove", mv);
          el.removeEventListener("pointerleave", lv);
        });
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div className="loader" ref={loader} aria-hidden="true">
        <div style={{ textAlign: "center" }}>
          <div className="mono" style={{ letterSpacing: ".12em", fontSize: ".8rem" }}>ELAF / MUNEEB</div>
          <div className="bar">
            <i ref={bar as React.RefObject<HTMLElement>} />
          </div>
        </div>
      </div>
      <div className="cursor" ref={cursor} aria-hidden="true" />
    </>
  );
}
