import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";
import { seoKeywords, areasServed, defaultOgImage } from "@/lib/seo";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline} en Villavicencio`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: seoKeywords,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "travel",
  applicationName: site.name,
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, address: true },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline} en Villavicencio`,
    description: site.description,
    images: [
      {
        url: defaultOgImage, // PENDIENTE: crear public/og.jpg (1200×630)
        width: 1200,
        height: 630,
        alt: `${site.name}, finca de descanso con piscina en Villavicencio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline} en Villavicencio`,
    description: site.description,
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/** JSON-LD para buscadores: negocio de hospedaje vacacional. */
const lodgingJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LodgingBusiness", "Resort"],
  "@id": `${site.url}/#finca`,
  name: site.name,
  alternateName: `${site.name} — Finca de descanso en Villavicencio`,
  description: site.description,
  url: site.url,
  slogan: site.tagline,
  keywords: seoKeywords.join(", "),
  image: `${site.url}${defaultOgImage}`,
  priceRange: "$$",
  currenciesAccepted: "COP",
  petsAllowed: false,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.location.vereda,
    addressLocality: site.location.city,
    addressRegion: site.location.region,
    addressCountry: "CO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.location.lat,
    longitude: site.location.lng,
  },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${site.location.lat},${site.location.lng}`,
  areaServed: areasServed.map((name) => ({ "@type": "Place", name })),
  telephone: site.contact.phone,
  email: site.contact.email,
  sameAs: [site.social.instagram, site.social.facebook].filter(Boolean),
  amenityFeature: [
    "Piscina",
    "Naturaleza llanera",
    "Zona de asados",
    "Zonas sociales",
    "Estacionamiento",
  ].map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-CO"
      className={`${fraunces.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="bg-arena text-tinta flex min-h-full flex-col">
        <JsonLd data={lodgingJsonLd} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
