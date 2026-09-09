'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function BattleBonus() {
  const [replay, setReplay] = useState(0);
  return (
    <div className="battle-bonus">
      <div className="battle-reveal" key={replay}>
        <Image
          className="battle-illustration"
          src="/images/javier-pokemon-battle.png"
          alt="Combate ilustrado de Pokémon: un entrenador de LinkedIn desafía a Javier Cano, junto a su equipo de programación, un perro y un gato."
          width={1536}
          height={1024}
          sizes="(max-width: 1000px) 94vw, 1000px"
          unoptimized
        />
        <div className="battle-curtain curtain-top" aria-hidden="true" />
        <div className="battle-curtain curtain-bottom" aria-hidden="true" />
        <div className="battle-grass" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
        <span className="battle-intro" aria-hidden="true">
          ¡Un encuentro inesperado!
        </span>
      </div>
      <div className="battle-bonus-footer">
        <span>★ Has encontrado el encuentro secreto.</span>
        <button onClick={() => setReplay((v) => v + 1)}>
          ↻ Repetir entrada
        </button>
      </div>
    </div>
  );
}
