'use client';

import { useEffect, useState } from 'react';

export default function DiscoveryTrail({ suspended }: { suspended: boolean }) {
  const [discovered, setDiscovered] = useState(false);
  useEffect(() => {
    const destination = document.getElementById('cartridges');
    if (!destination || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDiscovered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(destination);
    return () => observer.disconnect();
  }, []);

  if (discovered || suspended) return null;

  return (
    <aside className="discovery-trail" aria-label="Descubre los cartuchos">
      <a
        className="discovery-link"
        href="#cartridges"
        onClick={(event) => {
          const destination = document.getElementById('cartridges');
          if (!destination) return;
          event.preventDefault();
          destination.focus({ preventScroll: true });
          destination.scrollIntoView({
            block: 'start',
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
              .matches
              ? 'instant'
              : 'smooth',
          });
        }}
      >
        <span className="discovery-map" aria-hidden="true">
          <span className="discovery-path" />
          <svg
            className="discovery-trainer"
            viewBox="0 0 32 40"
            shapeRendering="crispEdges"
          >
            <path d="M8 2H23V5H26V11H5V5H8Z" fill="#e15d4d" />
            <path d="M8 7H25V11H8Z" fill="#f6eed0" />
            <path d="M9 11H23V20H9Z" fill="#eac393" />
            <path d="M8 11H11V15H8ZM20 12H23V15H20Z" fill="#353433" />
            <path d="M10 20H23V31H8V23H10Z" fill="#599cb2" />
            <path d="M13 21H19V31H13Z" fill="#f3eccf" />
            <path d="M5 22H9V29H5ZM23 22H27V29H23Z" fill="#eac393" />
            <path d="M8 30H15V36H8ZM18 30H24V36H18Z" fill="#354c71" />
            <path d="M6 36H15V39H6ZM18 36H27V39H18Z" fill="#f3eccf" />
          </svg>
          <span className="discovery-spark">✦</span>
        </span>
        <span className="discovery-copy">
          <span className="discovery-route">RUTA 02 · SIGUE EXPLORANDO</span>
          <strong>¡Hay cartuchos más abajo!</strong>
          <span>
            Proyectos, música y más. <b>Ver cartuchos ↓</b>
          </span>
        </span>
        <span className="discovery-arrow" aria-hidden="true">
          ↓
        </span>
      </a>
      <button
        className="discovery-dismiss"
        onClick={() => setDiscovered(true)}
        aria-label="Ocultar la pista de los cartuchos"
      >
        ×
      </button>
    </aside>
  );
}
