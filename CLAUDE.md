# CLAUDE.md — Villa Areka

Guía para trabajar en el sitio de **Villa Areka**, una finca de descanso que se
alquila por días en la **vereda Apiay, Villavicencio (Meta), Colombia**.
Lema de marca: **_Naturaleza & Descanso_**.

## Qué es este proyecto

Portal de promoción de la finca (marketing + SEO) con reservas. Hoy **no hay
backend**: las integraciones de reserva directa y Airbnb están preparadas pero
pendientes de conectar. El objetivo del sitio es promocionar la finca con
imágenes, videos y contenido indexable, y canalizar reservas.

Páginas:

- `/` (Home): promoción completa — hero, experiencia/amenidades, galería, video,
  ubicación, reserva y FAQ.
- `/la-casa`: historia de la finca, el origen del nombre y los valores.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (configuración por CSS en `src/app/globals.css` con `@theme`)
- Fuentes vía `next/font`: **Fraunces** (display) y **Hanken Grotesk** (cuerpo)
- Sin librerías de UI externas; componentes propios en `src/components`

## Comandos

El gestor de paquetes es **pnpm** (fijado en `packageManager` de `package.json`).
No usar `npm`/`yarn` (evita generar `package-lock.json`).

```bash
pnpm install    # instalar dependencias
pnpm dev        # desarrollo (http://localhost:3000)
pnpm build      # build de producción
pnpm start      # servir el build
pnpm lint       # ESLint
pnpm dlx react-doctor@latest src   # auditoría React (objetivo: 100/100)
```

## Estructura

```
src/
  app/
    layout.tsx          # fuentes, metadatos globales, header/footer, JSON-LD del negocio
    page.tsx            # Home (ensambla las secciones)
    la-casa/page.tsx    # Historia de la finca
    sitemap.ts, robots.ts
    globals.css         # tokens de diseño (@theme) + estilos base
  components/
    site-header.tsx     # header fijo con menú móvil ("use client")
    site-footer.tsx
    ui.tsx              # Button, Eyebrow, Section
    icons.tsx           # PalmFrond (firma) + iconos de amenidades
    media-placeholder.tsx  # marcador para fotos/videos aún no disponibles
    json-ld.tsx         # inserta JSON-LD escapado (seguro contra XSS)
    sections/
      hero.tsx
      booking.tsx
  lib/
    site.ts             # ⭐ configuración central: marca, contacto, ubicación, amenidades, FAQ, integraciones
```

## Sistema de diseño

Derivado del letrero de la finca (`docs/areka-letrro.JPG`): madera cálida, reja
verde-noche, iluminación dorada y follaje de palma. **No es el look genérico
"crema + serif + terracota"**: el fondo dominante es verde-selva nocturno.

Colores (tokens Tailwind en `globals.css`): `selva` (base oscura), `palma`
(verde salvia), `oro` (ámbar dorado, acento cálido), `arena` (crema/fondo claro),
`madera` (nogal). Úsalos siempre como clases (`bg-selva`, `text-oro`, …) — no
metas hex sueltos.

Convenciones:

- Titulares: clase `.display` (Fraunces). Antetítulos: clase `.eyebrow`
  (mayúsculas muy espaciadas, eco del letrero).
- Elemento firma: `<PalmFrond />` (hoja de palma Areca).
- Envolver bloques en `<Section>` para ancho y padding consistentes.
- Alternar fondos claros (`bg-arena`) y oscuros (`bg-selva`/`bg-selva-800`).
- Accesibilidad: foco visible, `prefers-reduced-motion` respetado, contraste
  cuidado. Mantenerlo al agregar componentes.

## Contenido y datos

**Edita el contenido del negocio en `src/lib/site.ts`** (nombre, contacto,
WhatsApp, redes, ubicación, amenidades, FAQ). Casi todo el texto de marketing sale
de ahí; evita hardcodear datos de contacto o ubicación en los componentes.

El idioma del sitio es **español (es-CO)**. El tono: cálido, cercano, sin
tecnicismos; vender el descanso, no "features".

## Medios (imágenes y videos)

Aún no hay material real. Los espacios usan `<MediaPlaceholder>` con una etiqueta
que describe qué va en cada lugar. Al recibir el material:

1. Poner los archivos en `public/` (ej. `public/gallery/piscina.jpg`).
2. Reemplazar `<MediaPlaceholder>` por `<Image>` de `next/image` (definir `alt`
   descriptivo en español para SEO).
3. Crear `public/og.jpg` (1200×630) para las tarjetas sociales.
4. Para videos: usar `<video>` local o incrustar (YouTube/Vimeo) en el Hero y en
   la sección "En movimiento".

## Integraciones (pendientes — no hay backend)

Configuradas en `src/lib/site.ts` (`integrations`) y por variables de entorno
(ver `.env.local.example`):

- **Airbnb**: define `NEXT_PUBLIC_AIRBNB_URL` con la URL del anuncio y aparecen
  automáticamente los botones "Ver/Reservar en Airbnb".
- **Reserva directa**: el formulario en `sections/booking.tsx` está visible pero
  deshabilitado (`directBookingEnabled: false`). Al haber backend, conectar
  disponibilidad + pagos y habilitar el envío.
- **WhatsApp**: ya funciona (enlace `wa.me` con mensaje prellenado). Actualizar el
  número real en `site.contact.whatsapp`.

## SEO

- Metadatos por página con `metadata` (App Router); plantilla de título en
  `layout.tsx`.
- JSON-LD: `LodgingBusiness` (global) y `FAQPage` (home) vía `<JsonLd>` — **usar
  siempre ese componente**, que escapa el JSON (no `dangerouslySetInnerHTML`
  directo).
- `sitemap.ts` y `robots.ts` generan `/sitemap.xml` y `/robots.txt`. Al agregar
  páginas, añadirlas al sitemap.
- Definir `NEXT_PUBLIC_SITE_URL` con el dominio real (afecta canónicas, OG y
  sitemap).

## Reglas al contribuir

- Antes de dar por terminada una tarea: `pnpm build` y `pnpm dlx react-doctor src`
  deben pasar (build limpio, doctor 100/100).
- No introducir `dangerouslySetInnerHTML` sin escapar; usar `<JsonLd>`.
- Mantener el contenido en `site.ts`, el diseño en tokens y el español como idioma.
- Skills de referencia (diseño y patrones Next.js): **frontend-design**,
  **web-design-guidelines**, **nextjs-app-router-patterns**. Se versionan vía
  `skills-lock.json` (los archivos materializados en `.agents/`/`.claude/skills/`
  están en `.gitignore`). Para restaurarlos: `pnpm dlx skills experimental_install`.
