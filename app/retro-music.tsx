'use client';
import { useEffect, useRef, useState } from 'react';

export default function RetroMusic({
  active,
  onInsert,
  onEject,
}: {
  active: boolean;
  onInsert: () => void;
  onEject: () => void;
}) {
  const audio = useRef<HTMLAudioElement>(null);
  const pending = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!active) audio.current?.pause();
  }, [active]);
  useEffect(() => {
    const player = audio.current;
    if (player) player.volume = 0.3;
    const hide = () => {
      if (document.hidden) player?.pause();
    };
    document.addEventListener('visibilitychange', hide);
    return () => {
      document.removeEventListener('visibilitychange', hide);
      player?.pause();
    };
  }, []);
  async function toggle() {
    const player = audio.current;
    if (!player || pending.current) return;
    if (!player.paused) {
      player.pause();
      onEject();
      return;
    }
    pending.current = true;
    setFailed(false);
    onInsert();
    try {
      await player.play();
    } catch {
      setFailed(true);
      onEject();
    } finally {
      pending.current = false;
    }
  }
  return (
    <div className={`music-cartridge-holder ${playing ? 'music-playing' : ''}`}>
      <audio
        ref={audio}
        src="/audio/title-screen.mp3"
        preload="none"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setFailed(true);
          setPlaying(false);
        }}
      >
        <track
          kind="captions"
          src="/audio/music-description.vtt"
          srcLang="es"
          label="Música instrumental"
          default
        />
      </audio>
      <button
        className="project-cartridge cartridge-yellow"
        onClick={() => void toggle()}
        aria-pressed={active}
        aria-label={
          playing
            ? 'Expulsar cartucho amarillo y pausar música'
            : 'Insertar cartucho amarillo y reproducir música'
        }
      >
        <span className="cartridge-ridges" aria-hidden="true" />
        <span className="cartridge-emboss">DEV BOY · MUSIC PAK</span>
        <span className="cartridge-label yellow-label">
          <span className="cartridge-edition">YELLOW · MUSIC EDITION</span>
          <strong>Pokémon</strong>
          <svg
            className="music-pikachu"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <path
              d="M69 64 L91 46 L84 71 L96 72 L71 92 L77 73 Z"
              fill="#f5c834"
              stroke="#4c351a"
              strokeWidth="2"
            />
            <path
              d="M25 39 L16 3 Q29 4 36 33 M58 33 Q67 5 79 3 L70 44"
              fill="#f9d84b"
              stroke="#4c351a"
              strokeWidth="2"
            />
            <path
              d="M16 3 L21 18 L29 15 Q24 5 16 3 M79 3 L75 18 L67 15 Q72 5 79 3"
              fill="#29252a"
            />
            <path
              d="M29 65 Q18 82 25 92 Q48 102 69 92 Q74 80 62 65"
              fill="#f9d84b"
              stroke="#4c351a"
              strokeWidth="2"
            />
            <path
              d="M23 38 Q45 23 67 36 L76 56 Q71 75 48 77 Q22 75 17 57 Z"
              fill="#ffe365"
              stroke="#4c351a"
              strokeWidth="2"
            />
            <ellipse cx="33" cy="49" rx="4" ry="6" fill="#211e24" />
            <ellipse cx="60" cy="49" rx="4" ry="6" fill="#211e24" />
            <circle cx="34" cy="47" r="1.5" fill="white" />
            <circle cx="61" cy="47" r="1.5" fill="white" />
            <circle cx="25" cy="61" r="6" fill="#ef544b" />
            <circle cx="68" cy="61" r="6" fill="#ef544b" />
            <path d="M44 56 L49 56 L46.5 59 Z" fill="#35232a" />
            <path
              d="M38 63 Q42 68 47 63 Q52 68 57 62"
              fill="none"
              stroke="#35232a"
              strokeWidth="2"
            />
          </svg>
          <span className="cartridge-tech">♪ TITLE SCREEN · BANDA SONORA</span>
        </span>
        <span className="cartridge-bottom">
          {playing ? 'EXPULSAR · PAUSAR ⏏' : 'INSERTAR · ESCUCHAR ▶'}
        </span>
      </button>
      <span className="music-help" aria-live="polite">
        {failed
          ? 'No se pudo reproducir. Pulsa para volver a intentarlo.'
          : playing
            ? 'Sonando · expúlsalo para pausar'
            : 'Inserta el amarillo para escuchar la música'}
      </span>
    </div>
  );
}
