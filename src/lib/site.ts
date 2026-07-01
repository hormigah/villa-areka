/**
 * Configuración central de Villa Areka.
 * Un único lugar para editar marca, contacto, ubicación e integraciones.
 * Los valores marcados como PENDIENTE se completan cuando el negocio los defina.
 */

export const site = {
  name: "Villa Areka",
  tagline: "Naturaleza & Descanso",
  // Frase de una línea para metadatos y redes.
  description:
    "Finca de descanso en la vereda Apiay, Villavicencio (Meta). Piscina, naturaleza llanera y tranquilidad para desconectarse. Reserva por días.",
  // URL pública del sitio (ajústala al dominio real cuando exista).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://villaareka.com",
  locale: "es_CO",

  location: {
    vereda: "Vereda Apiay",
    city: "Villavicencio",
    region: "Meta",
    country: "Colombia",
    // Coordenadas aproximadas de Apiay — AJUSTAR a la ubicación exacta de la finca.
    lat: 4.0736,
    lng: -73.5589,
    // Referencia útil para el visitante.
    fromBogota: "≈ 3 horas por la vía al Llano (Bogotá – Villavicencio)",
  },

  contact: {
    // PENDIENTE: reemplazar por los datos reales del negocio.
    phone: "+57 300 000 0000",
    // WhatsApp en formato internacional sin signos (para el enlace wa.me).
    whatsapp: "573000000000",
    email: "hola@villaareka.com",
  },

  social: {
    instagram: "https://instagram.com/villaareka", // PENDIENTE: usuario real
    facebook: "", // PENDIENTE
  },
} as const;

/**
 * Integraciones externas — hoy son placeholders (no hay backend).
 * El enlace de Airbnb se toma de una variable de entorno para no tocar código
 * cuando se publique el anuncio.
 */
export const integrations = {
  /** URL del anuncio en Airbnb. Definir en NEXT_PUBLIC_AIRBNB_URL. */
  airbnbUrl: process.env.NEXT_PUBLIC_AIRBNB_URL ?? "",
  /** ¿Está lista la reserva directa en el sitio? Cambiará al conectar el backend. */
  directBookingEnabled: false,
} as const;

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "La Casa", href: "/la-casa" },
  { label: "Galería", href: "/#galeria" },
  { label: "Ubicación", href: "/#ubicacion" },
  { label: "Reservar", href: "/#reservar" },
];

export type Amenity = {
  title: string;
  description: string;
  icon: "pool" | "leaf" | "sun" | "fire" | "wifi" | "bed";
};

export const amenities: Amenity[] = [
  {
    title: "Piscina al aire libre",
    description:
      "Refréscate bajo el sol del Llano en una piscina rodeada de verde y descanso.",
    icon: "pool",
  },
  {
    title: "Naturaleza llanera",
    description:
      "Palmas, jardines y el canto de los pájaros: la calma de los Llanos Orientales.",
    icon: "leaf",
  },
  {
    title: "Atardeceres únicos",
    description:
      "El cielo abierto de Villavicencio regala unos de los atardeceres más bellos de Colombia.",
    icon: "sun",
  },
  {
    title: "Zona de asados",
    description:
      "Espacio para preparar la mamona o un buen asado y compartir en familia.",
    icon: "fire",
  },
  {
    title: "Descanso pleno",
    description:
      "Habitaciones cómodas y frescas para recargar energías lejos del ruido de la ciudad.",
    icon: "bed",
  },
  {
    title: "Espacios para reunirse",
    description:
      "Zonas sociales amplias, ideales para grupos, celebraciones y encuentros familiares.",
    icon: "wifi",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "¿Dónde queda Villa Areka?",
    a: "En la vereda Apiay, en Villavicencio (Meta), a unas 3 horas de Bogotá por la vía al Llano. Es un entorno rural, tranquilo y rodeado de naturaleza.",
  },
  {
    q: "¿Cómo puedo reservar?",
    a: "Pronto podrás reservar directamente desde este sitio y también a través de Airbnb. Mientras tanto, escríbenos por WhatsApp y te ayudamos con tu reserva.",
  },
  {
    q: "¿Cuántas personas se pueden hospedar?",
    a: "La finca es ideal para familias y grupos. La capacidad exacta y las tarifas se confirmarán al abrir las reservas.",
  },
  {
    q: "¿Se alquila por días?",
    a: "Sí. Villa Areka se alquila por días para estadías de descanso, celebraciones y encuentros familiares.",
  },
];
