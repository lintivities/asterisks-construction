import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/header";
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
      <Header />
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
      <FloatingWhatsApp />
      <Motion />
    </>
  );
}
