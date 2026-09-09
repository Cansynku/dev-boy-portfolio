'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function ArrivalIntro({ onDone }: { onDone: () => void }) {
  const [ready, setReady] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const previous =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const reduced = () => {
      if (motion.matches) onDone();
    };
    if (motion.matches) {
      onDone();
      return;
    }
    dialog.current?.showModal();
    skip.current?.focus({ preventScroll: true });
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onDone();
      }
    };
    document.addEventListener('keydown', key);
    motion.addEventListener('change', reduced);
    // A slow or failed image must never keep the portfolio behind the intro.
    const fallback = setTimeout(onDone, 12000);
    return () => {
      clearTimeout(fallback);
      document.removeEventListener('keydown', key);
      motion.removeEventListener('change', reduced);
      previous?.focus({ preventScroll: true });
    };
  }, [onDone]);
  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(onDone, 10000);
    return () => clearTimeout(timer);
  }, [ready, onDone]);
  return (
    <dialog
      ref={dialog}
      onCancel={onDone}
      className={`arrival-intro ${ready ? 'arrival-ready' : ''}`}
      aria-modal="true"
      aria-label="Encuentro de bienvenida"
    >
      <div className="arrival-speedlines" aria-hidden="true" />
      <div className="arrival-scene">
        <span className="arrival-kicker">UN NUEVO ENCUENTRO</span>
        <div className="arrival-picture">
          <Image
            src="/images/recruiter-intro.png"
            alt="Una recruiter IT desafía a Javier Cano en una escena de combate Pokémon: tu experiencia encaja muy bien, ¿te unes a nuestra aventura?"
            width={1536}
            height={1024}
            sizes="(max-width: 1100px) 94vw, 1100px"
            unoptimized
            priority
            onLoad={() => setReady(true)}
            onError={onDone}
          />
        </div>
        <p>
          Tu próxima aventura empieza aquí<span aria-hidden="true"> ▼</span>
        </p>
        <div className="arrival-countdown" aria-hidden="true">
          <i />
        </div>
      </div>
      <button ref={skip} className="arrival-skip" onClick={onDone}>
        Saltar intro <span aria-hidden="true">↵</span>
      </button>
    </dialog>
  );
}
