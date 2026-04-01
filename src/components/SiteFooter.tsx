import { formatTime } from "../lib/format";
import type { StoreSettings } from "../types";

const OFFICIAL_INSTAGRAM_URL =
  "https://www.instagram.com/cantinho_do_acai_e_mercado/";

interface SiteFooterProps {
  settings: StoreSettings;
  onQuickOrder: () => void;
}

export function SiteFooter({ settings, onQuickOrder }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>Cantinho do Açaí</h3>
          <p>{settings.address_text}</p>
        </div>
        <div>
          <h4>Contato</h4>
          <p>
            <a href={OFFICIAL_INSTAGRAM_URL} target="_blank" rel="noreferrer">
              {settings.instagram}
            </a>
          </p>
          <p>{settings.whatsapp_number.replace(/^55/, "(51) ")}</p>
        </div>
        <div>
          <h4>Funcionamento</h4>
          <p>
            Todos os dias: {formatTime(settings.opening_time)} às{" "}
            {formatTime(settings.closing_time)}
          </p>
        </div>
        <div>
          <button type="button" className="btn-primary" onClick={onQuickOrder}>
            Fazer pedido agora
          </button>
        </div>
      </div>
    </footer>
  );
}
