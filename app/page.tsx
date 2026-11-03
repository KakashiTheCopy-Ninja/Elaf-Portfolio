import Motion from "@/components/Motion";
import SceneLayer from "@/components/SceneLayer";
import { jsonLd } from "@/lib/seo";
import { About, Contact, Faq, Footer, Hero, Marquee, Nav, Process, Services, Work, Workflows } from "@/components/Sections";

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <SceneLayer />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Workflows />
        <Process />
        <Work />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
