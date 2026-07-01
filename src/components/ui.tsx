import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-3";
const buttonVariants = {
  solid:
    "bg-oro text-selva hover:bg-oro-300 shadow-[0_10px_30px_-10px_rgba(210,162,76,0.6)] hover:-translate-y-0.5",
  outline: "border border-arena/40 text-arena hover:border-oro hover:text-oro",
  ghost: "text-selva hover:text-madera underline-offset-4 hover:underline",
} as const;

/** Botón/enlace con dos variantes: sólido dorado y contorno claro. */
export function Button({
  variant = "solid",
  className = "",
  children,
  ...props
}: { variant?: "solid" | "outline" | "ghost" } & ComponentProps<typeof Link>) {
  return (
    <Link
      className={`${buttonBase} ${buttonVariants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

/** Eyebrow: mayúsculas espaciadas — eco del letrero de la finca. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

/** Contenedor de sección con ancho máximo y padding consistente. */
export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-6 py-20 sm:py-28 md:px-10 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
