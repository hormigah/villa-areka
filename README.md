# Villa Areka

Sitio web de **Villa Areka** — finca de descanso que se alquila por días en la
vereda Apiay, Villavicencio (Meta), Colombia. _Naturaleza & Descanso._

Construido con **Next.js 16 (App Router)**, **React 19**, **TypeScript** y
**Tailwind CSS v4**.

## Desarrollo

Requiere **pnpm** (`npm i -g pnpm` o vía `corepack enable`).

```bash
pnpm install
cp .env.local.example .env.local   # completar variables
pnpm dev                           # http://localhost:3000
```

## Scripts

| Comando      | Descripción            |
| ------------ | ---------------------- |
| `pnpm dev`   | Servidor de desarrollo |
| `pnpm build` | Build de producción    |
| `pnpm start` | Sirve el build         |
| `pnpm lint`  | ESLint                 |

## Páginas

- `/` — Home: promoción completa de la finca (hero, amenidades, galería, video,
  ubicación, reserva, FAQ).
- `/la-casa` — Historia de la finca.

## Configuración

- **Contenido del negocio** (contacto, ubicación, amenidades, FAQ): `src/lib/site.ts`.
- **Variables de entorno**: ver `.env.local.example`
  (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_AIRBNB_URL`).

## Estado

Sin backend todavía. La reserva por WhatsApp funciona; la reserva directa en línea
y la publicación en Airbnb están preparadas y pendientes de conectar. Las fotos y
videos usan marcadores de posición hasta contar con el material real.

Ver **`CLAUDE.md`** para la guía completa de arquitectura, diseño y convenciones.
