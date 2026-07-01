import type { Metadata } from "next";
import { Section, Eyebrow, Button } from "@/components/ui";
import { PalmFrond } from "@/components/icons";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "La Casa — Nuestra historia",
  description:
    "La historia de Villa Areka: una finca de descanso en la vereda Apiay, Villavicencio, inspirada en la naturaleza de los Llanos Orientales y el arte de descansar.",
  alternates: { canonical: "/la-casa" },
};

const valores = [
  {
    title: "Naturaleza",
    text: "Cada rincón conserva el verde, la sombra y el aire abierto del Llano. Diseñada para estar afuera, entre palmas y jardines.",
  },
  {
    title: "Descanso",
    text: "Menos ruido, más calma. Espacios pensados para dormir bien, leer sin prisa y compartir sin reloj.",
  },
  {
    title: "Hogar llanero",
    text: "La hospitalidad cálida del Meta: recibir con gusto, cuidar los detalles y hacer sentir a cada huésped como en casa.",
  },
];

export default function LaCasa() {
  return (
    <>
      {/* Encabezado */}
      <section className="relative flex min-h-[62svh] items-end overflow-hidden bg-selva">
        <div className="absolute inset-0">
          <MediaPlaceholder
            label="Foto ambiental de Villa Areka"
            className="h-full w-full rounded-none border-0"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,37,27,0.5) 0%, rgba(18,37,27,0.35) 45%, rgba(18,37,27,0.95) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-32 md:px-10">
          <div className="reveal max-w-2xl">
            <div className="flex items-center gap-3 text-oro">
              <PalmFrond className="h-6 w-6" />
              <Eyebrow className="text-oro-300">La Casa</Eyebrow>
            </div>
            <h1 className="display mt-6 text-5xl text-arena sm:text-6xl md:text-7xl">
              Nuestra historia
            </h1>
            <p className="mt-6 max-w-xl text-lg text-arena/85">
              Un proyecto familiar nacido del amor por la naturaleza y el buen
              descanso en el corazón de los Llanos.
            </p>
          </div>
        </div>
      </section>

      {/* Relato */}
      <Section className="bg-arena">
        <div className="grid gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-start">
          <div className="space-y-6 text-lg leading-relaxed text-tinta/80">
            <p>
              Villa Areka surgió de una idea sencilla: crear un lugar donde el
              tiempo pasara más despacio. En la {site.location.vereda}, a las
              afueras de {site.location.city}, encontramos el escenario
              perfecto: tierra fértil, cielo inmenso y el ritmo tranquilo del
              Llano.
            </p>
            <p>
              Levantamos la finca con la intención de compartirla. Cada espacio
              —la piscina, las zonas sociales, los jardines— fue pensado para
              recibir a familias y amigos que buscan desconectarse y reencontrarse
              con lo importante.
            </p>
            <p>
              Hoy Villa Areka abre sus puertas para que más personas vivan esa
              misma calma: unos días de descanso auténtico, rodeados de
              naturaleza y de la hospitalidad cálida de los Llanos Orientales.
            </p>
          </div>
          <MediaPlaceholder
            tone="light"
            label="Foto de la familia / la finca"
            className="aspect-[4/5] w-full"
          />
        </div>
      </Section>

      {/* El nombre / significado */}
      <Section className="bg-selva text-arena">
        <div className="mx-auto max-w-3xl text-center">
          <PalmFrond className="mx-auto h-14 w-14 text-oro" />
          <Eyebrow className="mt-6 text-oro-300">El nombre</Eyebrow>
          <h2 className="display mt-4 text-4xl sm:text-5xl">
            ¿Por qué “Areka”?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-arena/80">
            La palma <em>areca</em> es símbolo de trópico, frescura y vida. Da
            sombra, embellece y acompaña el paisaje llanero. De ella tomamos el
            nombre y el espíritu de la finca:{" "}
            <span className="text-oro-300">naturaleza y descanso</span>, la misma
            promesa que aparece en el letrero que da la bienvenida.
          </p>
        </div>
      </Section>

      {/* Valores */}
      <Section className="bg-arena">
        <div className="mb-14 max-w-2xl">
          <Eyebrow className="text-madera">Lo que nos mueve</Eyebrow>
          <h2 className="display mt-4 text-4xl text-tinta sm:text-5xl">
            Tres cosas que cuidamos
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {valores.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-tinta/10 bg-arena-200/50 p-8"
            >
              <h3 className="display text-2xl text-tinta">{v.title}</h3>
              <p className="mt-3 text-tinta/75">{v.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA final */}
      <Section className="bg-selva-800 text-arena">
        <div className="flex flex-col items-center gap-6 text-center">
          <Eyebrow className="text-oro-300">{site.tagline}</Eyebrow>
          <h2 className="display max-w-2xl text-4xl sm:text-5xl">
            Ven a vivir el descanso del Llano
          </h2>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <Button href="/#reservar">Reservar tu estadía</Button>
            <Button href="/#galeria" variant="outline">
              Ver la galería
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
