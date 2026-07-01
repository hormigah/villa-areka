import type { SVGProps } from "react";
import type { Amenity } from "@/lib/site";

/**
 * Hoja de palma Areca — elemento firma de la marca, tomado del letrero.
 * Line-art trazado, se reutiliza como acento en secciones y separadores.
 */
export function PalmFrond(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* raquis (tallo central) */}
      <path d="M32 60C32 44 33 24 44 6" />
      {/* foliolos a lado y lado */}
      <path d="M40 14c-4 1-7 4-8 9M45 12c4-1 8 0 11 3" />
      <path d="M38 22c-5 1-8 5-9 10M43 20c5-1 9 1 12 5" />
      <path d="M36 32c-5 2-8 6-9 12M41 30c5 0 9 3 11 8" />
      <path d="M34 44c-5 2-7 6-8 11M39 42c5 1 8 4 10 9" />
    </svg>
  );
}

function Pool(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3 18c1.5 1.2 3 1.2 4.5 0S10.5 16.8 12 18s3 1.2 4.5 0S19.5 16.8 21 18" />
      <path d="M3 21c1.5 1.2 3 1.2 4.5 0S10.5 19.8 12 21s3 1.2 4.5 0S19.5 19.8 21 21" />
      <path d="M8 15V6a2 2 0 1 1 4 0M16 15V6a2 2 0 0 0-4 0" />
    </svg>
  );
}

function Leaf(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 20c0-8 6-14 16-14 0 10-6 16-16 14Z" />
      <path d="M4 20C8 16 12 13 16 11" />
    </svg>
  );
}

function Sun(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function Fire(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 3c1 3 4 4 4 8a4 4 0 0 1-8 0c0-1 .5-2 1-2.5C9 9.5 11 8 12 3Z" />
      <path d="M12 21a5 5 0 0 0 5-5c0-3-2-4-3-6" />
    </svg>
  );
}

function Bed(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3 18V8M3 12h18a0 0 0 0 1 0 0v6M21 18v-2" />
      <path d="M7 12v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function Wifi(props: SVGProps<SVGSVGElement>) {
  // Reutilizado como "espacios para reunirse" (icono de personas).
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 6a3 3 0 0 1 0 6M17 20a6 6 0 0 0-3-5.2" />
    </svg>
  );
}

const map = { pool: Pool, leaf: Leaf, sun: Sun, fire: Fire, bed: Bed, wifi: Wifi } as const;

export function AmenityIcon({ name, ...props }: { name: Amenity["icon"] } & SVGProps<SVGSVGElement>) {
  const Cmp = map[name];
  return <Cmp {...props} />;
}
