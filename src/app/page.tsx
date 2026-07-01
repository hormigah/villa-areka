import type { Metadata } from "next";
import { Section, Eyebrow, Button } from "@/components/ui";
import { PalmFrond, AmenityIcon } from "@/components/icons";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Hero } from "@/components/sections/hero";
import { Booking } from "@/components/sections/booking";
import { JsonLd } from "@/components/json-ld";
import { amenities, faqs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — Finca de descanso con piscina en Villavicencio`,
  description: site.description,
  alternates: { canonical: "/" },
};

/** FAQ estructurada para buscadores. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <Hero />

      {/* Intro / bienvenida */}
      <Section className="bg-arena">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <Eyebrow className="text-madera">Bienvenido</Eyebrow>
            <h2 className="display mt-4 text-4xl text-tinta sm:text-5xl">
              El descanso que se respira en el Llano
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-tinta/80">
              Villa Areka nace del deseo de volver a lo esencial: el agua, la
              sombra de las palmas y el silencio del atardecer llanero. Un lugar
              pensado para reunir a la familia, celebrar y, sobre todo,
              descansar.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-tinta/80">
              A pocos minutos de Villavicencio y a un paso de la naturaleza, es
              el refugio ideal para desconectarse del ruido de la ciudad.
            </p>
            <div className="mt-8">
              <Button href="/la-casa" variant="ghost">
                Conoce nuestra historia →
              </Button>
            </div>
          </div>
          <MediaPlaceholder
            tone="light"
            label="Foto de la finca / piscina"
            className="aspect-[4/5] w-full"
          />
        </div>
      </Section>

      {/* Amenidades */}
      <Section id="experiencia" className="bg-selva-800 text-arena">
        <div className="mb-14 max-w-2xl">
          <Eyebrow className="text-oro-300">La experiencia</Eyebrow>
          <h2 className="display mt-4 text-4xl sm:text-5xl">
            Todo listo para tu descanso
          </h2>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((a) => (
            <li
              key={a.title}
              className="group bg-selva-800 p-8 transition-colors hover:bg-selva-700"
            >
              <AmenityIcon
                name={a.icon}
                className="h-8 w-8 text-oro transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              <h3 className="display mt-5 text-2xl">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-arena/70">
                {a.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Galería */}
      <Section id="galeria" className="bg-arena">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <Eyebrow className="text-madera">Galería</Eyebrow>
            <h2 className="display mt-4 text-4xl text-tinta sm:text-5xl">
              Un vistazo a Villa Areka
            </h2>
          </div>
          <PalmFrond className="hidden h-12 w-12 shrink-0 text-palma sm:block" />
        </div>
        {/* Retícula tipo mosaico; cada bloque se reemplaza por una foto real */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <MediaPlaceholder tone="light" label="Piscina" className="col-span-2 aspect-[4/3]" />
          <MediaPlaceholder tone="light" label="Zona social" className="aspect-square" />
          <MediaPlaceholder tone="light" label="Habitación" className="aspect-square" />
          <MediaPlaceholder tone="light" label="Jardines" className="aspect-square" />
          <MediaPlaceholder tone="light" label="Atardecer llanero" className="aspect-square" />
          <MediaPlaceholder tone="light" label="Zona de asados" className="col-span-2 aspect-[4/3]" />
        </div>
      </Section>

      {/* Video */}
      <Section className="bg-selva text-arena">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <Eyebrow className="text-oro-300">En movimiento</Eyebrow>
            <h2 className="display mt-4 text-4xl sm:text-5xl">
              Vive la finca antes de llegar
            </h2>
            <p className="mt-5 text-arena/75">
              Un recorrido en video por los espacios, la piscina y el entorno
              natural de Villa Areka.
            </p>
          </div>
          <MediaPlaceholder
            kind="video"
            label="Video de recorrido por la finca"
            className="aspect-video w-full"
          />
        </div>
      </Section>

      {/* Ubicación */}
      <Section id="ubicacion" className="bg-arena">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow className="text-madera">Ubicación</Eyebrow>
            <h2 className="display mt-4 text-4xl text-tinta sm:text-5xl">
              {site.location.vereda}, {site.location.city}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-tinta/80">
              Villa Areka está en la {site.location.vereda}, en{" "}
              {site.location.city} ({site.location.region}), en pleno corazón de
              los Llanos Orientales de Colombia.
            </p>
            <dl className="mt-8 space-y-4">
              <div className="flex gap-4 border-t border-tinta/10 pt-4">
                <dt className="eyebrow w-32 shrink-0 text-madera">Desde Bogotá</dt>
                <dd className="text-tinta/80">{site.location.fromBogota}</dd>
              </div>
              <div className="flex gap-4 border-t border-tinta/10 pt-4">
                <dt className="eyebrow w-32 shrink-0 text-madera">Entorno</dt>
                <dd className="text-tinta/80">
                  Rural, tranquilo y rodeado de naturaleza llanera.
                </dd>
              </div>
            </dl>
          </div>
          {/* PENDIENTE: incrustar mapa (Google Maps / Mapbox) con la ubicación exacta */}
          <MediaPlaceholder
            tone="light"
            label="Mapa de la ubicación (Apiay, Villavicencio)"
            className="aspect-square w-full"
          />
        </div>
      </Section>

      <Booking />

      {/* FAQ */}
      <Section className="bg-selva-800 text-arena">
        <JsonLd data={faqJsonLd} />
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow className="text-oro-300">Preguntas frecuentes</Eyebrow>
            <h2 className="display mt-4 text-4xl sm:text-5xl">
              Lo que necesitas saber
            </h2>
          </div>
          <dl className="divide-y divide-white/10">
            {faqs.map((f) => (
              <div key={f.q} className="py-6 first:pt-0">
                <dt className="display text-xl text-arena">{f.q}</dt>
                <dd className="mt-2 text-arena/70">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
    </>
  );
}
