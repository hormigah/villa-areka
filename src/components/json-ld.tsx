/**
 * Inserta datos estructurados (JSON-LD) de forma segura.
 * Escapa `<`, `>` y `&` para que ningún contenido pueda romper la etiqueta
 * <script> ni derivar en XSS.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const safe = JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
