import { Section, Eyebrow, Button } from "@/components/ui";
import { site, integrations } from "@/lib/site";

/**
 * Reserva. Sin backend todavía:
 * - Airbnb: enlace directo (cuando NEXT_PUBLIC_AIRBNB_URL esté definido).
 * - WhatsApp: canal disponible hoy con mensaje prellenado.
 * - Reserva directa: interfaz visible pero deshabilitada hasta conectar el backend.
 */
export function Booking() {
  const waMessage = encodeURIComponent(
    "¡Hola! Me interesa reservar una estadía en Villa Areka. ¿Me ayudan con la disponibilidad?",
  );
  const waHref = `https://wa.me/${site.contact.whatsapp}?text=${waMessage}`;

  return (
    <Section id="reservar" className="bg-selva text-arena">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <Eyebrow className="text-oro-300">Reserva tu descanso</Eyebrow>
          <h2 className="display mt-4 text-4xl sm:text-5xl">
            Aparta tus días en Villa Areka
          </h2>
          <p className="mt-5 max-w-md text-arena/75">
            Elige cómo prefieres reservar. Muy pronto habilitaremos la reserva
            directa en línea; mientras tanto, escríbenos por WhatsApp o resérvala
            a través de Airbnb.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={waHref} className="!bg-oro">
              Reservar por WhatsApp
            </Button>
            {integrations.airbnbUrl && (
              <Button href={integrations.airbnbUrl} variant="outline">
                Reservar en Airbnb
              </Button>
            )}
          </div>
        </div>

        {/* Tarjeta de reserva directa — deshabilitada hasta tener backend */}
        <div className="rounded-2xl border border-white/10 bg-selva-700/60 p-6 backdrop-blur-sm sm:p-8">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="display text-2xl">Reserva directa</h3>
            <span className="rounded-full bg-oro/15 px-3 py-1 text-xs font-semibold text-oro-300">
              Próximamente
            </span>
          </div>

          {/* Formulario inerte: muestra la experiencia futura sin enviar datos */}
          <form className="space-y-4 opacity-70">
            <div className="grid grid-cols-2 gap-4">
              <label className="block text-sm">
                <span className="text-arena/70">Llegada</span>
                <input
                  type="date"
                  disabled
                  className="mt-1 w-full rounded-lg border border-white/15 bg-selva px-3 py-2.5 text-arena/60"
                />
              </label>
              <label className="block text-sm">
                <span className="text-arena/70">Salida</span>
                <input
                  type="date"
                  disabled
                  className="mt-1 w-full rounded-lg border border-white/15 bg-selva px-3 py-2.5 text-arena/60"
                />
              </label>
            </div>
            <label className="block text-sm">
              <span className="text-arena/70">Huéspedes</span>
              <input
                type="number"
                min={1}
                disabled
                placeholder="2"
                className="mt-1 w-full rounded-lg border border-white/15 bg-selva px-3 py-2.5 text-arena/60"
              />
            </label>
            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-full bg-oro/40 px-6 py-3 text-sm font-semibold text-selva/70"
            >
              Consultar disponibilidad
            </button>
          </form>
          <p className="mt-4 text-xs text-arena/50">
            La reserva en línea se activará al conectar el sistema de pagos y
            disponibilidad.
          </p>
        </div>
      </div>
    </Section>
  );
}
