import type { StoreSettings } from "../types";

interface LocationSectionProps {
  settings: StoreSettings;
}

export function LocationSection({ settings }: LocationSectionProps) {
  return (
    <section className="location-section container">
      <div>
        <p className="section-tag">Localização</p>
        <h2>Estamos prontos para te atender</h2>
        <p>{settings.address_text}</p>
        <a
          className="btn-secondary"
          href={settings.maps_url}
          target="_blank"
          rel="noreferrer"
        >
          Abrir no Google Maps
        </a>
      </div>
      <iframe
        title="Mapa Cantinho do Açaí"
        src="https://www.google.com/maps?q=-29.889447,-51.14031&z=16&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}
