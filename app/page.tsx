import Motion from "@/components/Motion";
import SceneLayer from "@/components/SceneLayer";
import { About, Contact, Faq, Footer, Hero, Marquee, Nav, Process, Services, Work, Workflows } from "@/components/Sections";

export default function Page() {
  return (
    <>
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
