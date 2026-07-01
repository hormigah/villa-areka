import Link from "next/link";
import { nav, site, integrations } from "@/lib/site";
import { PalmFrond } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="bg-selva text-arena">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-3 md:px-10">
        <div>
          <div className="flex items-center gap-2.5">
            <PalmFrond className="text-oro h-8 w-8" />
            <span className="display text-2xl italic">{site.name}</span>
          </div>
          <p className="eyebrow text-oro-300 mt-3">{site.tagline}</p>
          <p className="text-arena/70 mt-4 max-w-xs text-sm">
            Finca de descanso en {site.location.vereda}, {site.location.city} ·{" "}
            {site.location.region}, {site.location.country}.
          </p>
        </div>

        <div>
          <h2 className="eyebrow text-arena/50">Explora</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-arena/80 hover:text-oro transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-arena/50">Contacto</h2>
          <ul className="text-arena/80 mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`https://wa.me/${site.contact.whatsapp}`}
                className="hover:text-oro transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="hover:text-oro transition-colors"
              >
                {site.contact.email}
              </a>
            </li>
            {site.social.instagram && (
              <li>
                <a
                  href={site.social.instagram}
                  className="hover:text-oro transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            )}
            {integrations.airbnbUrl && (
              <li>
                <a
                  href={integrations.airbnbUrl}
                  className="hover:text-oro transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Airbnb
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="text-arena/50 mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs sm:flex-row md:px-10">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos los derechos
            reservados.
          </p>
          <p>Hecho con cariño en los Llanos Orientales.</p>
        </div>
      </div>
    </footer>
  );
}
