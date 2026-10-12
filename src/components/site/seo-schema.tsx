import { projectsData } from "@/data/projects";
import { teamData } from "@/data/team";
import { PHONE_DISPLAY, EMAIL } from "@/lib/whatsapp";

const SITE_URL = "https://asterisksconstruction.com";

export function SeoSchema() {
  const contractorSchema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${SITE_URL}/#organization`,
    name: "Asterisk Construction Limited",
    alternateName: "Asterisk Construction",
    url: SITE_URL,
    logo: `${SITE_URL}/building-background.jpg`,
    image: `${SITE_URL}/building-background.jpg`,
    description:
      "Premier Nairobi-based design-and-build firm delivering turnkey luxury residential estates, high-rise apartment towers, and commercial infrastructure across Kenya and Pan-Africa.",
    foundingDate: "2025",
    telephone: `+${PHONE_DISPLAY.replace(/\s+/g, "")}`,
    email: EMAIL,
    priceRange: "KSh 5,000,000 - KSh 250,000,000+",
    currenciesAccepted: "KES, USD",
    paymentAccepted: "Bank Transfer, Cheque",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Commercial District, Nairobi",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      postalCode: "00100",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-1.286389",
      longitude: "36.817223",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    areaServed: [
      { "@type": "Country", name: "Kenya" },
      { "@type": "AdministrativeArea", name: "Nairobi County" },
      { "@type": "AdministrativeArea", name: "Kiambu County" },
      { "@type": "AdministrativeArea", name: "Kilifi County" },
      { "@type": "AdministrativeArea", name: "Machakos County" },
      { "@type": "AdministrativeArea", name: "Murang'a County" },
      { "@type": "Continent", name: "Africa" },
    ],
    knowsAbout: [
      "Architectural Design & Concepts",
      "Civil & Structural Engineering",
      "Quantity Surveying & Bills of Quantities",
      "Commercial High-Rise Construction",
      "Luxury Residential Villa Construction",
      "Multi-Unit Apartment Complexes",
      "Green Building & Sustainable Development",
      "Land Surveying & Topography",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction & Engineering Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Architectural & Interior Design",
            description: "Concept through construction drawings, daylight optimization, and sustainable architectural layouts.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Structural, Mechanical & Electrical Engineering",
            description: "Integrated MEP engineering coordinated across disciplines before physical ground-breaking.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Turnkey Construction & Site Execution",
            description: "Full build delivery on schedule and budget with certified site safety and rigorous QA workflows.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Project Valuation & Quantity Surveying",
            description: "Detailed bills of quantities (BQs), cost planning, valuations, and transparent payment certification.",
          },
        },
      ],
    },
    employee: teamData.map((m) => ({
      "@type": "Person",
      name: m.name,
      jobTitle: `${m.role} (${m.department})`,
      image: `${SITE_URL}${m.image}`,
    })),
  };

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Asterisk Construction Developments Portfolio",
    description: "Featured turnkey developments delivered across Kenya and East Africa.",
    numberOfItems: projectsData.length,
    itemListElement: projectsData.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "RealEstateListing",
        name: p.title,
        description: p.summary,
        image: `${SITE_URL}${p.image}`,
        category: p.categoryLabel,
        location: {
          "@type": "Place",
          name: p.location,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contractorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
    </>
  );
}
