import { Button, Eyebrow } from "@/components/ui";
import { PalmFrond } from "@/components/icons";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { site, integrations } from "@/lib/site";

export function Hero() {
  return (
    <section className="bg-selva relative flex min-h-[100svh] items-end overflow-hidden">
      {/* Fondo: aquí irá el video o la foto principal de la finca */}
      <div className="absolute inset-0">
        <MediaPlaceholder
          kind="video"
          label="Video o foto aérea de Villa Areka"
          className="h-full w-full rounded-none border-0"
        />
      </div>

      {/* Luz dorada ambiental — eco de la iluminación cálida del letrero */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 100%, rgba(210,162,76,0.28) 0%, transparent 55%), linear-gradient(180deg, rgba(18,37,27,0.55) 0%, rgba(18,37,27,0.25) 40%, rgba(18,37,27,0.92) 100%)",
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-32 pb-20 md:px-10 md:pb-28">
        <div className="reveal max-w-3xl">
          <div className="text-oro flex items-center gap-3">
            <PalmFrond className="h-6 w-6" />
            <Eyebrow className="text-oro-300">{site.tagline}</Eyebrow>
          </div>

          <h1 className="display text-arena mt-6 text-6xl sm:text-7xl md:text-8xl">
            <span className="italic">Villa</span> Areka
          </h1>

          <p className="text-arena/85 mt-6 max-w-xl text-lg leading-relaxed md:text-xl">
            Una finca para desconectarse en la {site.location.vereda},{" "}
            {site.location.city}. Piscina, cielo abierto y el descanso profundo
            de los Llanos Orientales.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="#reservar">Reservar tu estadía</Button>
            {integrations.airbnbUrl ? (
              <Button href={integrations.airbnbUrl} variant="outline">
                Ver en Airbnb
              </Button>
            ) : (
              <Button href="/la-casa" variant="outline">
                Conoce la casa
              </Button>
            )}
          </div>

          <p className="text-arena/60 mt-8 text-sm">
            {site.location.fromBogota}
          </p>
        </div>
      </div>
    </section>
  );
}
