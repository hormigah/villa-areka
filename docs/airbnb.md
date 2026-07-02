# Integración con Airbnb + reservas propias

Guía de decisión y planificación para conectar **Villa Areka** con Airbnb
**y, a la vez, aceptar reservas directas desde este sitio web** sin caer en
sobreventas (double booking).

> **Estado:** documento de planificación. Aún no hay backend ni integración
> activa. Hoy el sitio solo enlaza a Airbnb (si se define la URL) y capta
> reservas por WhatsApp. Ver [Cómo se conecta con este proyecto](#cómo-se-conecta-con-este-proyecto).

---

## TL;DR (respuesta corta)

1. **Airbnb NO tiene API pública** para un anfitrión individual. No puedes
   "pedir una API key" ni desarrollar tú mismo contra su API. El acceso es solo
   por invitación a empresas de software con escala (channel managers / PMS).
2. Por lo tanto, para manejar reservas de Airbnb desde tu propio sistema, la vía
   realista es contratar un **Channel Manager (PMS)** que ya sea partner oficial
   de Airbnb.
3. Como también quieres **reservas directas en el sitio**, la mejor arquitectura
   es que exista **una única fuente de verdad del calendario** (el channel
   manager), a la que se conecten *tanto* Airbnb *como* el motor de reservas de
   esta web. Así, una reserva por cualquier canal bloquea las fechas en todos.
4. Opción de bajo costo (más riesgosa): **sincronización por iCal** entre Airbnb
   y tu sistema. Funciona, pero se actualiza cada ~3 h (puede haber sobreventa en
   esa ventana) y solo sincroniza disponibilidad, no precios ni pagos.
5. En Colombia, para alquilar por días **es obligatorio el RNT** (Registro
   Nacional de Turismo); Airbnb lo exige y lo verifica. Ver
   [Requisitos legales y fiscales](#requisitos-legales-y-fiscales-en-colombia).

---

## 1. La realidad de la API de Airbnb

- Airbnb **no ofrece acceso público a su API**. No se aceptan solicitudes
  abiertas de desarrolladores individuales.
- El programa de partners **es por invitación**: el equipo de Airbnb contacta a
  empresas de software que ya tienen un producto (booking engine / PMS), con
  escala significativa, madurez operativa, soporte 24/7 y que pasan una revisión
  de seguridad y calidad de datos.
- Conclusión: **no es viable** construir una integración directa contra la API de
  Airbnb solo para esta finca. La integración se hace **a través de un
  intermediario** (channel manager) que ya es partner.

---

## 2. El problema central: la doble reserva

Si aceptas reservas en **dos lugares a la vez** (Airbnb + este sitio), el riesgo
número uno es vender las mismas fechas dos veces. Todo el diseño de la
integración gira en torno a **mantener un solo calendario de disponibilidad
sincronizado en tiempo real**.

Regla de oro: **una sola fuente de verdad**. Cuando entra una reserva por
cualquier canal, las fechas deben bloquearse inmediatamente en todos los demás.

---

## 3. Opciones de integración

### Opción A — Channel Manager / PMS como fuente de verdad ✅ (recomendada)

Un channel manager mantiene conexión **API bidireccional y en tiempo real** con
Airbnb (y con Booking.com, Vrbo, etc.), y además ofrece un **motor de reservas
(booking engine)** que se incrusta en tu web.

```
                 ┌────────────────────────┐
   Airbnb  ⇄─────┤                        │
   Booking ⇄─────┤   Channel Manager /    │   ← fuente única del calendario,
   (otras) ⇄─────┤   PMS (partner Airbnb) │     precios y reservas
                 │                        │
   Sitio web ⇄───┤  (motor de reservas +  │
   Villa Areka   │   API/widget + pagos)  │
                 └────────────────────────┘
```

- **Pros:** sincronización instantánea (evita sobreventa), gestiona precios,
  disponibilidad, mensajería, pagos de reservas directas, reportes. Reservas
  directas en la web *sin comisión de OTA*.
- **Contras:** costo mensual; dependes de un tercero; curva de configuración.
- **Herramientas típicas** (verificar planes y que sean partner Airbnb vigente):
  - 1–3 propiedades: **Hospitable**, **iGMS**, **Smoobu**, **Beds24**.
  - Con web de reservas directas incluida: **Lodgify**, **Uplisting**.
  - Enterprise / muchas unidades: **Hostaway**, **Guesty**.
- **Rango de costo orientativo:** ~USD 20–40/mes para 1 propiedad (verificar).

**Cómo encaja con esta web:** dos caminos según la herramienta:
- **(A1)** Incrustar el widget/booking engine del channel manager en la sección
  de reserva (más rápido, menos control visual).
- **(A2)** Consumir su **API** para construir un calendario y checkout propios con
  el diseño de Villa Areka (más trabajo, mejor experiencia). Requiere backend.

### Opción B — Sincronización por iCal (bajo costo)

Airbnb permite **exportar** un calendario `.ics` con sus reservas e **importar**
calendarios externos. Si tu sitio genera su propio `.ics` de reservas directas,
se puede hacer sincronización cruzada.

- **Pros:** gratis, sin partner, simple.
- **Contras / límites importantes:**
  - Se actualiza **cada ~3 h (hasta 24 h)** → ventana real de **sobreventa**.
  - Solo sincroniza **disponibilidad** (fechas bloqueadas), **no** precios, ni
    datos del huésped, ni pagos.
  - Requiere igualmente construir el sistema de reservas + pagos propio.
- **Recomendado solo** como solución transitoria o para volumen muy bajo, con
  colchón de días entre reservas y confirmación manual.

### Opción C — API oficial de Airbnb directa ❌ (no viable)

Descartada para una finca individual (ver sección 1).

### Comparativa rápida

| Criterio                     | A) Channel Manager | B) iCal          | C) API directa |
| ---------------------------- | ------------------ | ---------------- | -------------- |
| Evita sobreventa             | Sí (tiempo real)   | Parcial (~3–24h) | Sí             |
| Sincroniza precios           | Sí                 | No               | Sí             |
| Reservas directas + pagos    | Sí                 | Hay que armarlo  | Hay que armarlo|
| Viable para 1 finca          | Sí                 | Sí               | No             |
| Costo                        | Mensual            | Gratis           | —              |
| Esfuerzo técnico             | Bajo–medio         | Medio–alto       | —              |

---

## 4. Reservas directas desde el sitio web

Aunque uses Airbnb, cobrar directo evita comisiones de OTA. Para habilitarlo se
necesita:

1. **Calendario de disponibilidad** (idealmente el del channel manager como
   fuente de verdad).
2. **Motor de reservas / checkout**: selección de fechas, huéspedes, cálculo de
   tarifa, reglas (estadía mínima, día de entrada/salida).
3. **Pasarela de pagos** — en Colombia, opciones a evaluar:
   - **Wompi** (Bancolombia), **PayU**, **Mercado Pago**, **ePayco**,
     **Bold** — soportan PSE, tarjetas y pagos locales.
   - **Stripe** — internacional (útil si hay huéspedes extranjeros con tarjeta).
   - Decidir política: ¿cobro total, anticipo/depósito, o pago contra estadía?
4. **Backend** para: persistir reservas, validar disponibilidad, procesar el
   webhook de pago, enviar confirmaciones y **empujar el bloqueo de fechas** al
   channel manager (o generar el `.ics` en la opción B).
5. **Notificaciones**: correo de confirmación al huésped y aviso al anfitrión
   (email/WhatsApp).
6. **Política de cancelación** y **términos** claros y consistentes con Airbnb.

> Este sitio es hoy **estático (sin backend)**. Las reservas directas requieren
> añadir un backend/API (p. ej. rutas de API en Next.js, o un servicio externo /
> el del channel manager).

---

## 5. Requisitos legales y fiscales en Colombia

Alquilar por **menos de 30 días** convierte al propietario en **prestador de
servicios turísticos**. A tener en cuenta:

- **RNT (Registro Nacional de Turismo): OBLIGATORIO.**
  - Exigido por la **Ley 2068 de 2020** y el **Decreto 1836 de 2021**.
  - Airbnb **verifica y exige** el RNT vigente para publicar en Colombia (el
    decreto obliga a las plataformas a verificarlo).
  - Se tramita ante las **Cámaras de Comercio** (plataforma de Confecámaras).
  - **Vigencia anual**: renovar cada año entre el **1 de enero y el 31 de marzo**;
    si vence, se suspende y puede acarrear sanciones y retiro del anuncio.
- **Contribución parafiscal al turismo (FONTUR):** tener RNT activo genera la
  obligación de pagar **2,5 por mil (0,25%)** de los ingresos operacionales por
  alojamiento.
- **Impuestos (DIAN):** evaluar **IVA** sobre alojamiento, retenciones y
  declaración de renta según el régimen. Consultar con un contador.
- **Otros:** normas locales de Villavicencio/Meta, requisitos de seguridad,
  y reglas de propiedad/uso del suelo rural en la vereda Apiay.

> ⚠️ Esto es orientativo. **Validar con un abogado/contador** antes de operar.

---

## 6. Costos y comisiones a considerar

- **Comisión de Airbnb** al anfitrión: modelo *split-fee* (~3% al anfitrión + fee
  al huésped) o *host-only* (~14–16% al anfitrión). Verificar el vigente.
- **Channel manager:** suscripción mensual.
- **Pasarela de pagos:** comisión por transacción (típico ~2,5–3,5% + fijo).
- **RNT + parafiscal + impuestos** (sección 5).
- **Ventaja de la reserva directa:** ahorras la comisión de la OTA, a cambio de
  asumir el pago y el soporte tú mismo.

---

## 7. Arquitectura recomendada (resumen)

1. Sacar el **RNT** y publicar en Airbnb.
2. Contratar un **channel manager** partner de Airbnb → se vuelve la **fuente
   única del calendario y precios**.
3. Conectar Airbnb (y futuras OTAs) al channel manager.
4. Habilitar **reservas directas** en esta web contra el channel manager
   (widget embebido = rápido; API propia = mejor UX, requiere backend) + pasarela
   de pagos colombiana.
5. Automatizar confirmaciones y bloqueo de fechas cross-canal.

---

## 8. Cómo se conecta con este proyecto

Puntos del código ya preparados para la integración:

- **`src/lib/site.ts` → `integrations`:**
  - `airbnbUrl`: se toma de `NEXT_PUBLIC_AIRBNB_URL`. Al definirla, aparecen los
    botones "Ver/Reservar en Airbnb" en el hero, el footer y la sección de
    reserva.
  - `directBookingEnabled` (hoy `false`): bandera para activar la reserva directa
    cuando exista backend.
- **`src/components/sections/booking.tsx`:** contiene el formulario de reserva
  directa (hoy deshabilitado) y el botón de WhatsApp (activo). Aquí se integrará
  el widget del channel manager o el checkout propio.
- **`.env.local.example`:** ya reserva `NEXT_PUBLIC_AIRBNB_URL`. Al integrar,
  se añadirán aquí las claves del channel manager / pasarela (server-side, sin
  prefijo `NEXT_PUBLIC_`).

**Paso mínimo hoy (sin backend):** definir `NEXT_PUBLIC_AIRBNB_URL` con el
anuncio de Airbnb para canalizar reservas allí, y seguir usando WhatsApp para
las directas — confirmando disponibilidad manualmente contra el calendario de
Airbnb.

---

## 9. Plan por fases

- **Fase 0 — Legal (bloqueante):** obtener RNT; definir política de precios,
  cancelación y pagos.
- **Fase 1 — Airbnb en vivo:** publicar en Airbnb; poner `NEXT_PUBLIC_AIRBNB_URL`;
  reservas directas por WhatsApp con confirmación manual.
- **Fase 2 — Channel manager:** contratar PMS partner; conectar Airbnb; centralizar
  calendario y precios.
- **Fase 3 — Reservas directas en la web:** embeber booking engine (A1) o construir
  backend + API + pasarela (A2); activar `directBookingEnabled`.
- **Fase 4 — Automatización:** sincronización en tiempo real multicanal, correos,
  precios dinámicos, más OTAs.

---

## 10. Decisiones pendientes (para el negocio)

- [ ] ¿Se tramita ya el RNT? (bloqueante para publicar legalmente)
- [ ] ¿Qué channel manager? (según presupuesto y si trae web de reservas)
- [ ] ¿Reserva directa con widget embebido o con checkout propio (backend)?
- [ ] ¿Qué pasarela de pagos colombiana? ¿Cobro total, anticipo o contra estadía?
- [ ] ¿Modelo de comisión de Airbnb (split vs host-only)?
- [ ] Política de cancelación unificada Airbnb ↔ web.

---

## Fuentes

- [Airbnb — Announcing our 2025 Preferred Software Partners](https://news.airbnb.com/announcing-our-2025-preferred-software-partners/)
- [Airbnb API Terms of Service (Help Center)](https://www.airbnb.com/help/article/3418)
- [Cómo obtener y usar la API de Airbnb (Elfsight)](https://elfsight.com/blog/how-to-get-and-use-airbnb-api-partnership-and-integration/)
- [What is the Airbnb API? (Smoobu)](https://www.smoobu.com/en/blog/airbnb-api/)
- [Sync your calendar to other websites (Airbnb Help)](https://www.airbnb.com/help/article/99)
- [Sync Airbnb & Booking.com calendars to avoid double bookings (Smoobu)](https://www.smoobu.com/en/blog/how-to-sync-airbnb-booking-com-calendars-to-avoid-double-bookings/)
- [How to sync your calendar without double bookings (StayStrat)](https://staystrat.com/blog/airbnb-calendar-sync-multiple-platforms)
- [Información para anfitriones en Colombia (Airbnb Help)](https://www.airbnb.com/help/article/3112)
- [Cómo obtener el RNT para tu Airbnb en Colombia (Digitra)](https://digitra.news/noticias/como-obtener-el-rnt-para-tu-airbnb-en-colombia-paso-a-paso-2026)
- [RNT — Registro Nacional de Turismo (Airbnb News PDF)](https://news.airbnb.com/wp-content/uploads/sites/4/2025/12/registro_nacional_de_turismo_col.pdf)

> Las condiciones, comisiones y umbrales de Airbnb y de los proveedores cambian.
> Verificar contra la documentación oficial vigente antes de decidir.
