import { createFileRoute } from "@tanstack/react-router";
import { UnrollingFolioCanvas } from "@/components/scroll-canvas/UnrollingFolioCanvas";
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
      <main className="relative w-full min-h-screen bg-white overflow-x-hidden">
        <UnrollingFolioCanvas />
      </main>
      <FloatingWhatsApp />
    </>
  );
}
