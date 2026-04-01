import { formatTime } from "../lib/format";
import type { StoreSettings } from "../types";

const OFFICIAL_INSTAGRAM_URL =
  "https://www.instagram.com/cantinho_do_acai_e_mercado/";

interface HeroSectionProps {
  settings: StoreSettings;
  onPedirAgora: () => void;
  onVerCardapio: () => void;
}

export function HeroSection({
  settings,
  onPedirAgora,
  onVerCardapio
}: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="hero-overlay" />
      <div className="container hero-content">
        <img
          src="/fotologo.png"
          alt="Logo Cantinho do Açaí"
          className="hero-logo"
          loading="eager"
        />
        <p className="hero-badge">Delivery Premium em Canoas</p>
        <h1>
          <span className="script">Cantinho</span> do Açaí
        </h1>
        <p className="hero-subtitle">
          Açaí cremoso, pastel crocante e um sabor que te surpreende em cada
          pedido.
        </p>

        <div className="hero-cta">
          <button type="button" className="btn-primary" onClick={onPedirAgora}>
            Pedir agora
          </button>
          <button type="button" className="btn-secondary" onClick={onVerCardapio}>
            Ver cardápio
          </button>
        </div>

        <div className="hero-info-grid">
          <article>
            <h3>Horário de funcionamento</h3>
            <p>
              {formatTime(settings.opening_time)} às {formatTime(settings.closing_time)}
            </p>
          </article>
          <article>
            <h3>WhatsApp</h3>
            <a
              href={`https://wa.me/${settings.whatsapp_number}`}
              target="_blank"
              rel="noreferrer"
            >
              {settings.whatsapp_number.replace(/^55/, "(51) ")}
            </a>
          </article>
          <article>
            <h3>Instagram</h3>
            <a href={OFFICIAL_INSTAGRAM_URL} target="_blank" rel="noreferrer">
              {settings.instagram}
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
