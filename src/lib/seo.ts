import type { Metadata } from "next";
import { site } from "./site";

/**
 * Palabras clave objetivo del negocio. Cubren las variantes con las que la gente
 * busca este tipo de alojamiento en la región (finca / cabaña / casa de descanso,
 * Villavicencio / Villavo / Meta, Llanos / piedemonte / tierra caliente,
 * alquiler por días / estancias cortas).
 */
export const seoKeywords = [
  // Tipo de propiedad
  "finca de descanso",
  "casa de descanso",
  "cabaña de descanso",
  "finca con piscina",
  "villa de descanso",
  // Ubicación
  "finca en Villavicencio",
  "finca en Villavo",
  "cabaña en Villavicencio",
  "casa de descanso en Villavicencio",
  "finca de descanso Meta",
  "finca en el Meta",
  "finca vereda Apiay",
  "finca Apiay Villavicencio",
  "finca en los Llanos Orientales",
  "finca en el piedemonte llanero",
  "finca en tierra caliente",
  // Intención de reserva
  "alquiler de finca por días",
  "alquiler de finca Villavicencio",
  "alquiler por días Meta",
  "estancias cortas Villavicencio",
  "alquiler estancia corta Llanos",
  "hospedaje en Villavicencio",
  "alojamiento turístico Meta",
  // Marca
  "Villa Areka",
];

/** Zonas que atiende la finca (para schema areaServed). */
export const areasServed = [
  "Villavicencio",
  "Meta",
  "Llanos Orientales",
  "Piedemonte llanero",
  "Vereda Apiay",
];

/** Imagen social por defecto (1200×630). PENDIENTE: crear public/og.jpg. */
export const defaultOgImage = "/og.jpg";

/**
 * Construye los metadatos por página de forma consistente: título absoluto
 * (sin duplicar la marca del template), descripción, canónica y propiedades
 * completas para compartir en redes (Open Graph + Twitter Card).
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  image = defaultOgImage,
  imageAlt,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
}): Metadata {
  const url = `${site.url}${path}`;
  return {
    title: { absolute: title },
    description,
    keywords: keywords ?? seoKeywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      url,
      siteName: site.name,
      title,
      description,
      images: [
        { url: image, width: 1200, height: 630, alt: imageAlt ?? title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
