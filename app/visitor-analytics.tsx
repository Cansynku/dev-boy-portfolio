'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import {
  mayMeasure,
  PREFERENCE_KEY,
  PRODUCTION_HOST,
} from '@/lib/analytics-policy.mjs';
import config from './analytics-config.json';

function readPreference() {
  const browser = navigator as Navigator & { globalPrivacyControl?: boolean };
  if (
    location.hostname !== PRODUCTION_HOST ||
    !/^[a-f0-9]{32}$/i.test(config.token) ||
    browser.doNotTrack === '1' ||
    browser.globalPrivacyControl
  )
    return 'hidden';
  try {
    return localStorage.getItem(PREFERENCE_KEY) === 'allowed'
      ? 'allowed'
      : 'denied';
  } catch {
    return 'denied';
  }
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === PREFERENCE_KEY || event.key === null) onChange();
  };
  window.addEventListener('storage', onStorage);
  return () => window.removeEventListener('storage', onStorage);
}

export default function VisitorAnalytics() {
  const preference = useSyncExternalStore(
    subscribe,
    readPreference,
    () => 'hidden',
  );
  const [storageFailed, setStorageFailed] = useState(false);

  useEffect(() => {
    const browser = navigator as Navigator & { globalPrivacyControl?: boolean };
    const existing = document.getElementById('dev-boy-analytics');
    if (
      !mayMeasure({
        hostname: location.hostname,
        token: config.token,
        preference,
        doNotTrack: browser.doNotTrack,
        globalPrivacyControl: browser.globalPrivacyControl,
      })
    ) {
      if (existing) location.reload();
      return;
    }
    if (existing) return;
    const script = document.createElement('script');
    script.id = 'dev-boy-analytics';
    script.type = 'module';
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.dataset.cfBeacon = JSON.stringify({
      token: config.token,
      spa: false,
    });
    document.body.appendChild(script);
  }, [preference]);

  function choose(value: 'allowed' | 'denied') {
    try {
      localStorage.setItem(PREFERENCE_KEY, value);
      // Reload to remove all previously registered beacon listeners on withdrawal.
      location.reload();
    } catch {
      setStorageFailed(true);
    }
  }

  if (preference === 'hidden') return null;
  return (
    <aside
      className="analytics-preferences"
      aria-label="Preferencias de estadísticas"
    >
      <details>
        <summary>Privacidad y estadísticas</summary>
        <p>
          Javier Cano utiliza Cloudflare Web Analytics para conocer las visitas
          y el rendimiento de este portfolio. Solo se activa si lo permites. Tu
          elección se guarda en este navegador.
        </p>
        <p>
          Cloudflare recibe datos técnicos de la visita, como página,
          procedencia y rendimiento. No enviamos el contenido del CV,
          formularios ni eventos de contacto. El panel no es público.
        </p>
        <p>
          <a
            href="https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/"
            target="_blank"
            rel="noreferrer"
          >
            Datos que recoge Cloudflare ↗
          </a>{' '}
          · <a href="mailto:jcanogarcia96@gmail.com">Contacto de privacidad</a>
        </p>
        <p aria-live="polite">
          {storageFailed
            ? 'No se ha podido guardar tu elección. Las estadísticas permanecen sin cambios.'
            : preference === 'allowed'
              ? 'Estadísticas permitidas en este navegador.'
              : 'Estadísticas desactivadas en este navegador.'}
        </p>
        <div className="analytics-choices">
          <button
            onClick={() => choose('allowed')}
            disabled={preference === 'allowed'}
          >
            Permitir estadísticas
          </button>
          <button
            onClick={() => choose('denied')}
            disabled={preference === 'denied'}
          >
            No permitir
          </button>
        </div>
        <p className="analytics-note">
          Cambiar la preferencia recarga la página. Puedes retirarla aquí cuando
          quieras.
        </p>
      </details>
    </aside>
  );
}
