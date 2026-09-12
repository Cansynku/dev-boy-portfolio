'use client';
import { useState } from 'react';
import type { ProjectId } from '../data/projects';

export default function ShareProject({
  id,
  title,
}: {
  id: ProjectId;
  title: string;
}) {
  const [status, setStatus] = useState('');
  const [fallback, setFallback] = useState('');
  async function copyLink() {
    const url = new URL(window.location.pathname, window.location.origin);
    url.searchParams.set('project', id);
    url.hash = 'console';
    try {
      await navigator.clipboard.writeText(url.href);
      setFallback('');
      setStatus('¡Enlace copiado!');
    } catch {
      setFallback(url.href);
      setStatus('Selecciona y copia el enlace para compartir este cartucho.');
    }
  }
  return (
    <div className="share-project">
      <button
        type="button"
        onClick={copyLink}
        aria-label={`Compartir ${title}`}
      >
        Compartir cartucho
      </button>
      <output aria-live="polite">{status}</output>
      {fallback && (
        <label>
          Enlace al cartucho
          <input
            readOnly
            value={fallback}
            onFocus={(event) => event.currentTarget.select()}
          />
        </label>
      )}
    </div>
  );
}
