import { PalmFrond } from "@/components/icons";

/**
 * Marcador de posición para fotos y videos aún no disponibles.
 * Mantiene la composición visual y deja claro qué medio va en cada lugar.
 * Reemplazar por <Image> o <video> cuando llegue el material real.
 */
export function MediaPlaceholder({
  label,
  kind = "photo",
  className = "",
  tone = "dark",
}: {
  label: string;
  kind?: "photo" | "video";
  className?: string;
  tone?: "dark" | "light";
}) {
  const toneClasses =
    tone === "dark"
      ? "bg-selva-700 text-arena/70 border-white/10"
      : "bg-arena-200 text-tinta/60 border-tinta/10";
  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border ${toneClasses} ${className}`}
      role="img"
      aria-label={`Espacio para ${kind === "video" ? "video" : "foto"}: ${label}`}
    >
      {/* Textura sutil de follaje */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, currentColor 0.5px, transparent 1px), radial-gradient(circle at 70% 60%, currentColor 0.5px, transparent 1px)",
          backgroundSize: "28px 28px, 36px 36px",
        }}
      />
      {kind === "video" ? (
        <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-current/40">
          <svg
            viewBox="0 0 24 24"
            className="ml-1 h-6 w-6"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      ) : (
        <PalmFrond className="mb-2 h-10 w-10 opacity-60" />
      )}
      <span className="eyebrow px-4 text-center">{label}</span>
    </div>
  );
}
