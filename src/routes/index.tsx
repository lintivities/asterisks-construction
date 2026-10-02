import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Projects } from "@/components/site/projects";
import { Services } from "@/components/site/services";
import { Benchmarks } from "@/components/site/benchmarks";
import { Team } from "@/components/site/team";
import { Quotation } from "@/components/site/quotation";
import { Footer } from "@/components/site/footer";
import { Motion } from "@/components/site/motion";
import { FloatingWhatsApp } from "@/components/site/floating-whatsapp";
import { PinnedTopRollCanvas } from "@/components/scroll-canvas/PinnedTopRollCanvas";
import { PaperFolioContainer } from "@/components/scroll-canvas/PaperFolioContainer";

const title = "Asterisk Construction — Building Africa's Future, Today";
const description =
  "Nairobi-based design-and-build firm delivering sustainable residential, commercial and infrastructure projects across Kenya and Pan-Africa. Request a quotation on WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Prominent 3D Archimedean Spiral Roll anchored at the top of the viewport */}
      <PinnedTopRollCanvas />

      {/* Architectural Parchment Paper Folio with Integrated Ledger, Drafting Frame, & Content */}
      <PaperFolioContainer>
        <main>
          <Hero />
          <About />
          <Services />
          <Projects />
          <Benchmarks />
          <Team />
          <Quotation />
        </main>
        <Footer />
      </PaperFolioContainer>

      {/* Floating WhatsApp CTA Widget & Fluid Scroll Animations */}
      <FloatingWhatsApp />
      <Motion />
    </>
  );
}
