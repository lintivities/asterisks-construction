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
import { CarvedWoodNavbar } from "@/components/site/CarvedWoodNavbar";
import { ScrollableBuildingBackground } from "@/components/site/ScrollableBuildingBackground";
import { PinnedTopRollCanvas } from "@/components/scroll-canvas/PinnedTopRollCanvas";
import { PaperFolioContainer } from "@/components/scroll-canvas/PaperFolioContainer";
import { SeoSchema } from "@/components/site/seo-schema";

const title =
  "Asterisk Construction — Design & Build Contractors in Nairobi, Kenya | Architectural Engineering & Turnkey Projects";
const description =
  "Asterisk Construction is a premier Nairobi design-and-build firm delivering turnkey luxury mansions, high-rise apartments, and commercial projects across Kenya and Pan-Africa. WhatsApp instant quotation available.";
const siteUrl = "https://asterisksconstruction.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "construction company Nairobi, building contractors Kenya, design and build Kenya, civil engineering Nairobi, luxury mansions Kilifi, apartments Juja Kiambu, quantity surveyor Kenya, architectural design Nairobi",
      },
      { name: "author", content: "Asterisk Construction Limited" },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Asterisk Construction" },
      { property: "og:locale", content: "en_KE" },
      { property: "og:url", content: siteUrl },
      { property: "og:title", content: "Asterisk Construction — Building Africa's Future, Today" },
      { property: "og:description", content: description },
      { property: "og:image", content: `${siteUrl}/building-background.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Asterisk Construction Architectural High-Rise Tower" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Asterisk Construction — Design & Build Firm, Nairobi" },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: `${siteUrl}/building-background.jpg` },
    ],
    links: [
      { rel: "canonical", href: siteUrl },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Schema.org JSON-LD Structured Data for Google Rich Snippets */}
      <SeoSchema />

      {/* Dynamic Scrollable Building Background Canvas (Pans from top to bottom through the whole website) */}
      <ScrollableBuildingBackground />

      {/* Sticky Carved Wood Navbar anchored to the wooden table surface */}
      <CarvedWoodNavbar />

      {/* 3D Archimedean Spiral Roll anchored & sticky to the top of the viewport */}
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
