'use client';
import Content from './components/cv-content';
import DiscoveryTrail from './components/discovery-trail';
import PortableShell from './components/portable-shell';
import { sectionIds, sections, sectionHints, links } from './data/profile';
import ProjectCartridges, {
  ProjectContent,
  type ProjectId,
} from './project-cartridges';
import RetroMusic from './retro-music';
import BattleBonus from './battle-bonus';
import { useCallback, useEffect, useRef, useState } from 'react';
import ArrivalIntro from './arrival-intro';
import {
  ArrowDownToLine,
  ArrowUpRight,
  Volume2,
  VolumeX,
  Expand,
  Code2,
  BriefcaseBusiness,
  Mail,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
export default function Home() {
  const [introActive, setIntroActive] = useState(true);
  const finishIntro = useCallback(() => setIntroActive(false), []);
  const [selected, setSelected] = useState(0);
  const [cartridge, setCartridge] = useState<ProjectId | null>(null);
  const [musicInserted, setMusicInserted] = useState(false);
  const [insertion, setInsertion] = useState(0);
  const [quickView, setQuickView] = useState(false);
  const [secret, setSecret] = useState(false);
  const secretKeys = useRef<string[]>([]);
  const [consoleStyle, setConsoleStyle] = useState<'classic' | 'portable'>(
    'classic',
  );
  const [section, setSection] = useState<number | null>(null);
  const [sound, setSound] = useState(true);
  const [reading, setReading] = useState(false);
  const screen = useRef<HTMLDivElement>(null);
  const audio = useRef<AudioContext | null>(null);
  const [swapPhase, setSwapPhase] = useState<'idle' | 'out' | 'in'>('idle');
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swapping = useRef(false);
  useEffect(() => {
    // Restore the browser preference after hydration without changing server markup.
    const frame = requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem('dev-boy.console.v1');
        if (saved === 'classic' || saved === 'portable') setConsoleStyle(saved);
      } catch {
        /* The console remains usable when storage is unavailable. */
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(
    () => () => {
      if (swapTimer.current) clearTimeout(swapTimer.current);
    },
    [],
  );
  function changeConsole(next: 'classic' | 'portable') {
    if (next === consoleStyle || swapping.current) return;
    try {
      localStorage.setItem('dev-boy.console.v1', next);
    } catch {
      /* Optional preference. */
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setConsoleStyle(next);
      return;
    }
    swapping.current = true;
    beep();
    setSwapPhase('out');
    swapTimer.current = setTimeout(() => {
      setConsoleStyle(next);
      setSwapPhase('in');
      swapTimer.current = setTimeout(() => {
        setSwapPhase('idle');
        swapping.current = false;
        swapTimer.current = null;
      }, 520);
    }, 180);
  }
  const [boot, setBoot] = useState(0);
  const [visited, setVisited] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  function openSection(index: number) {
    setCartridge(null);
    setSelected(index);
    setSection(index);
    setVisited((v) => (v.includes(index) ? v : [...v, index]));
    beep();
  }
  function explore(index: number) {
    openSection(index);
    document.getElementById('console')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
      block: 'center',
    });
  }
  function sideways(delta: number) {
    if (cartridge) return;
    if (section === null) move(delta);
    else openSection((section + delta + sections.length) % sections.length);
  }
  function beep() {
    if (!sound) return;
    try {
      const ctx = audio.current ?? new AudioContext();
      audio.current = ctx;
      void ctx.resume();
      const o = ctx.createOscillator(),
        g = ctx.createGain();
      o.type = 'square';
      o.frequency.value = 440;
      g.gain.setValueAtTime(0.018, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.08);
    } catch {}
  }
  function move(delta: number) {
    beep();
    if (section !== null || cartridge)
      screen.current?.scrollBy({ top: delta * 130, behavior: 'smooth' });
    else setSelected((v) => (v + delta + sections.length) % sections.length);
  }
  function enter() {
    if (cartridge) return;
    beep();
    if (section === null) {
      openSection(selected);
      screen.current?.scrollTo(0, 0);
    }
  }
  function back() {
    beep();
    setCartridge(null);
    setMusicInserted(false);
    setSection(null);
  }
  useEffect(() => {
    if (section !== null || cartridge) return;
    const viewport = screen.current;
    const item = viewport?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!viewport || !item) return;
    const bounds = viewport.getBoundingClientRect();
    const row = item.getBoundingClientRect();
    if (row.bottom > bounds.bottom)
      viewport.scrollTop += row.bottom - bounds.bottom + 8;
    else if (row.top < bounds.top)
      viewport.scrollTop -= bounds.top - row.top + 8;
  }, [selected, section, consoleStyle, cartridge]);
  useEffect(() => {
    const el = screen.current;
    if (!el) return;
    if (section !== null || cartridge) el.scrollTo(0, 0);
    const update = () =>
      setProgress(
        el.scrollHeight <= el.clientHeight
          ? 100
          : Math.round(
              (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100,
            ),
      );
    update();
    el.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, [section, cartridge]);
  useEffect(() => {
    function key(e: KeyboardEvent) {
      if (
        introActive ||
        reading ||
        quickView ||
        secret ||
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        /INPUT|TEXTAREA/.test((e.target as HTMLElement).tagName) ||
        (e.key === 'Enter' &&
          /BUTTON|A/.test((e.target as HTMLElement).tagName))
      )
        return;
      if (e.key.startsWith('Arrow')) {
        secretKeys.current = [...secretKeys.current, e.key].slice(-8);
        if (
          secretKeys.current.join(',') ===
          'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight'
        ) {
          e.preventDefault();
          secretKeys.current = [];
          setSecret(true);
          return;
        }
      } else secretKeys.current = [];
      if (
        [
          'ArrowDown',
          'ArrowUp',
          'ArrowLeft',
          'ArrowRight',
          'Enter',
          'Escape',
          'a',
          'b',
        ].includes(e.key)
      ) {
        e.preventDefault();
        if (e.key === 'ArrowDown') move(1);
        else if (e.key === 'ArrowUp') move(-1);
        else if (e.key === 'ArrowRight') sideways(1);
        else if (e.key === 'ArrowLeft') sideways(-1);
        else if (e.key === 'Escape' || e.key === 'b') back();
        else enter();
      }
    }
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  });
  return (
    <>
      {introActive && <ArrivalIntro onDone={finishIntro} />}
      <div className={`site console-style-${consoleStyle}`} inert={introActive}>
        <a className="skip" href="#console">
          Ir a la consola
        </a>
        <header className="topbar">
          <button
            className="wordmark"
            onClick={back}
            aria-label="Volver al inicio"
          >
            <span className="logo">
              JC<span>_</span>
            </span>
            <span>
              JAVIER CANO<span className="wordmark-sub">BACKEND DEVELOPER</span>
            </span>
          </button>
          <div className="header-actions">
            <span className="location">
              MADRID, ES <span className="green-dot" />
            </span>
            <a
              className="download"
              href="/Javier_Cano_CV_Backend_Java_2026.pdf"
              download
            >
              <ArrowDownToLine size={16} /> Descargar CV
            </a>
          </div>
        </header>
        <main className="stage">
          <aside className="intro">
            <div className="edition">
              <span /> DEV BOY · EDICIÓN 2026
            </div>
            <h1>
              Serio con <br />
              el código. <br />
              <em>
                Con ganas <br />
                de jugar.
              </em>
            </h1>
            <p>
              Soy Javier. Desarrollo sistemas backend con Java y Spring Boot.{' '}
              <br />
              APIs, microservicios e integración de sistemas. <br />A los
              mandos, tú.
            </p>
            <div className="career-context">
              <span>E-COMMERCE</span>
              <span>BANCA</span>
              <span>JAVA 21</span>
            </div>
            <div className="intro-actions">
              <button className="primary-action" onClick={() => explore(1)}>
                Explorar mi experiencia <ArrowUpRight size={17} />
              </button>
              <a className="contact-action" href={links.email}>
                Hablemos <Mail size={16} />
              </a>
            </div>
            <button className="text-link" onClick={() => setReading(true)}>
              Prefiero el modo lectura <ArrowUpRight size={18} />
            </button>
            <button
              className="quick-view-button"
              onClick={() => setQuickView(true)}
            >
              ⚡ Tengo un minuto
            </button>
            <a className="explore-cartridges" href="#cartridges">
              ↓ Descubre los cartuchos · proyectos y música
            </a>
            <div className="intro-bottom">
              <span className="small-label">MI STACK PRINCIPAL</span>
              <div className="techline">
                Java <span>/</span> Spring Boot <span>/</span> AWS
              </div>
            </div>
          </aside>
          <section className="console-zone" aria-label="CV interactivo">
            <fieldset className="console-picker">
              <legend className="console-picker-label">ELIGE TU CONSOLA</legend>
              <div className="console-picker-options">
                <button
                  type="button"
                  aria-pressed={consoleStyle === 'classic'}
                  onClick={() => changeConsole('classic')}
                  disabled={swapPhase !== 'idle'}
                >
                  <span
                    className="console-mini mini-classic"
                    aria-hidden="true"
                  />
                  <span>
                    Dev Boy<small>CLÁSICA · 01</small>
                  </span>
                </button>
                <button
                  type="button"
                  aria-pressed={consoleStyle === 'portable'}
                  onClick={() => changeConsole('portable')}
                  disabled={swapPhase !== 'idle'}
                >
                  <span
                    className="console-mini mini-portable"
                    aria-hidden="true"
                  />
                  <span>
                    Dev Portable<small>PANORÁMICA · 02</small>
                  </span>
                </button>
              </div>
            </fieldset>
            <div className="orbit-label">
              <span className="live-light" /> PLAYER ONE · READY TO EXPLORE
            </div>
            <div
              className={`console console-${consoleStyle} swap-${swapPhase}`}
              id="console"
              aria-busy={swapPhase !== 'idle'}
            >
              {(cartridge || musicInserted) && (
                <div className="cartridge-slot" key={insertion}>
                  <button
                    className={`docked-cartridge dock-${musicInserted ? 'yellow' : cartridge}`}
                    onClick={back}
                    aria-label="Expulsar cartucho de la consola"
                  >
                    <span>
                      {musicInserted
                        ? '♪ POKÉMON YELLOW'
                        : cartridge === 'rescue'
                          ? 'BACKEND RESCUE'
                          : cartridge === 'health'
                            ? 'HEALTH CHECK'
                            : 'DEV BOY'}
                    </span>
                    <small>INSERTADO · ⏏</small>
                  </button>
                </div>
              )}
              {consoleStyle === 'portable' && (
                <>
                  <PortableShell />
                  <span className="psp-maker" aria-hidden="true">
                    SONY
                  </span>
                  <span
                    className="psp-shoulder shoulder-left"
                    aria-hidden="true"
                  />
                  <span
                    className="psp-shoulder shoulder-right"
                    aria-hidden="true"
                  />
                  <button
                    className="psp-stick"
                    aria-label="Stick: desplazar hacia abajo"
                    onClick={() => move(1)}
                  />
                  <div className="psp-utility">
                    <button onClick={back} aria-label="Home: volver al menú">
                      HOME
                    </button>
                    <button
                      onClick={() => setSound((v) => !v)}
                      aria-label={
                        sound ? 'Desactivar sonido PSP' : 'Activar sonido PSP'
                      }
                      aria-pressed={sound}
                    >
                      ♪
                    </button>
                    <span className="psp-volume-label" aria-hidden="true">
                      VOL
                    </span>
                    <button
                      onClick={() => setSound(false)}
                      aria-label="Silenciar PSP"
                    >
                      −
                    </button>
                    <button
                      onClick={() => setSound(true)}
                      aria-label="Activar audio PSP"
                    >
                      +
                    </button>
                  </div>
                  <span className="psp-power" aria-hidden="true">
                    POWER <i /> <br />
                    HOLD
                  </span>
                </>
              )}
              <div className="console-top">
                <button
                  className="power-switch"
                  onClick={() => {
                    setBoot((v) => v + 1);
                    back();
                  }}
                  aria-label="Repetir encendido y volver al menú"
                >
                  <span /> POWER
                </button>
                <span>JCG—2026</span>
              </div>
              <div className="bezel">
                <div className="bezel-title">
                  <i /> DOT MATRIX WITH CAREER VISION <i />
                </div>
                <span className="battery">
                  <b />
                  BATTERY
                </span>
                <div className="lcd">
                  <div key={boot} className="boot-screen" aria-hidden="true">
                    <strong>
                      JC<span>_</span>
                    </strong>
                    <span>DEVELOPER EDITION</span>
                    <i />
                  </div>
                  <div className="lcd-status">
                    <button
                      onClick={back}
                      className="screen-home"
                      aria-label="Volver al menú"
                    >
                      {cartridge
                        ? '‹ EXPULSAR'
                        : section === null
                          ? 'JC / DEVELOPER'
                          : '‹ MENÚ'}
                    </button>
                    <span>
                      {cartridge
                        ? 'PROYECTOS'
                        : section === null
                          ? '▮▮▮'
                          : sections[section].toUpperCase()}
                    </span>
                  </div>
                  <div
                    className="lcd-body"
                    ref={screen}
                    aria-label="Contenido del currículum"
                  >
                    <div
                      className={`screen-page ${cartridge ? 'cartridge-loaded' : ''}`}
                      key={cartridge ?? section ?? 'menu'}
                    >
                      {cartridge ? (
                        <ProjectContent id={cartridge} />
                      ) : section === null ? (
                        <>
                          <div className="menu-heading">
                            <span className="eyebrow">
                              CAREER CARTRIDGE / 01
                            </span>
                            <h2>
                              Hola, mundo<span className="blink">_</span>
                            </h2>
                            <p>Elige tu siguiente pantalla.</p>
                          </div>
                          <nav
                            className="game-menu"
                            aria-label="Secciones del CV"
                          >
                            {sections.map((s, i) => (
                              <button
                                key={s}
                                className={selected === i ? 'selected' : ''}
                                aria-current={
                                  selected === i ? 'true' : undefined
                                }
                                onFocus={() => setSelected(i)}
                                onClick={() => {
                                  openSection(i);
                                }}
                              >
                                <span>
                                  {selected === i ? '▶' : '·'} {s}
                                </span>
                                <span>
                                  {visited.includes(i)
                                    ? '✓'
                                    : String(i + 1).padStart(2, '0')}
                                </span>
                              </button>
                            ))}
                          </nav>
                        </>
                      ) : (
                        <Content section={section} />
                      )}
                    </div>
                  </div>
                  {(section !== null || cartridge) && (
                    <div className="reading-progress" aria-hidden="true">
                      <i style={{ width: `${progress}%` }} />
                    </div>
                  )}
                  <div className="lcd-footer">
                    <span>
                      {cartridge
                        ? '↑↓ LEER · B EXPULSAR'
                        : section === null
                          ? `↑↓ ELEGIR   ${consoleStyle === 'portable' ? '×' : 'A'} ABRIR`
                          : '↑↓ LEER  ←→ SECCIÓN'}
                    </span>
                    <span>
                      {cartridge
                        ? 'PROJECT PAK'
                        : section === null
                          ? 'MENU'
                          : `${String(section + 1).padStart(2, '0')} / 06`}
                    </span>
                  </div>
                </div>
              </div>
              <div className="console-brand">
                {consoleStyle === 'portable' ? '' : 'Javier Cano'}{' '}
                <strong>
                  {consoleStyle === 'portable' ? 'PSP' : 'DEV BOY'}
                </strong>
                <span>™</span>
              </div>
              <div className="controls">
                <div className="dpad" aria-label="Cruceta">
                  <button
                    className="up"
                    aria-label="Arriba"
                    onClick={() => move(-1)}
                  >
                    ▲
                  </button>
                  <button
                    className="left"
                    aria-label="Sección anterior"
                    onClick={() => sideways(-1)}
                  >
                    ◀
                  </button>
                  <span className="pad-center" />
                  <button
                    className="right"
                    aria-label="Sección siguiente"
                    onClick={() => sideways(1)}
                  >
                    ▶
                  </button>
                  <button
                    className="down"
                    aria-label="Abajo"
                    onClick={() => move(1)}
                  >
                    ▼
                  </button>
                </div>
                <div className="ab">
                  <div>
                    <button
                      onClick={back}
                      aria-label={
                        consoleStyle === 'portable'
                          ? 'Círculo: volver al menú'
                          : 'B: volver al menú'
                      }
                    />
                    <span>{consoleStyle === 'portable' ? '○' : 'B'}</span>
                  </div>
                  <div>
                    <button
                      onClick={enter}
                      aria-label={
                        consoleStyle === 'portable'
                          ? 'Cruz: abrir sección'
                          : 'A: abrir sección'
                      }
                    />
                    <span>{consoleStyle === 'portable' ? '×' : 'A'}</span>
                  </div>
                  {consoleStyle === 'portable' && (
                    <>
                      <div className="portable-triangle">
                        <button
                          onClick={back}
                          aria-label="Triángulo: volver al menú"
                        />
                        <span>△</span>
                      </div>
                      <div className="portable-square">
                        <button
                          onClick={() => setReading(true)}
                          aria-label="Cuadrado: modo lectura"
                        />
                        <span>□</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="bottom-controls">
                <div className="minor">
                  <button
                    onClick={() => setReading(true)}
                    aria-label="Select: modo lectura"
                  />
                  <span>SELECT</span>
                </div>
                <div className="minor">
                  <button
                    onClick={() => openSection(0)}
                    aria-label="Start: ver perfil"
                  />
                  <span>START</span>
                </div>
              </div>
              <div className="speaker" aria-hidden="true">
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <i key={n} />
                ))}
              </div>
              <div className="serial">PERSONAL PORTFOLIO SYSTEM</div>
            </div>
            <div className="screen-caption" aria-live="polite">
              <span>
                {cartridge
                  ? 'Cartucho insertado. Explora el proyecto o amplía la lectura.'
                  : visited.length === sections.length
                    ? '★ Recorrido completo. ¿Escribimos el siguiente capítulo?'
                    : sectionHints[section ?? selected]}
              </span>
              <span
                className="explored"
                aria-label={`${visited.length} de ${sections.length} secciones exploradas`}
              >
                {String(visited.length).padStart(2, '0')} / 06
              </span>
            </div>
            <div className="under-console">
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> navegar <kbd>↵</kbd> abrir <kbd>esc</kbd> volver
              </span>
              <button
                onClick={() => setSound((v) => !v)}
                aria-pressed={sound}
                aria-label={sound ? 'Silenciar sonido' : 'Activar sonido'}
              >
                {sound ? <Volume2 size={17} /> : <VolumeX size={17} />}
              </button>
              <button
                onClick={() => setReading(true)}
                aria-label="Abrir modo lectura"
              >
                <Expand size={17} /> <span>Ampliar lectura</span>
              </button>
            </div>
            <details className="bonus-hint">
              <summary>✦ Un entrenador dejó una pista…</summary>
              <p>«Los caminos secretos empiezan mirando arriba dos veces».</p>
              <p>Con el teclado, introduce:</p>
              <code>↑ ↑ ↓ ↓ ← → ← →</code>
              <p>En móvil, también puedes usar la cruceta de esta pista.</p>
              <div className="hint-directions">
                {['↑', '↓', '←', '→'].map((arrow) => (
                  <button
                    key={arrow}
                    aria-label={`Pista: ${arrow}`}
                    onClick={() => {
                      const key = {
                        '↑': 'ArrowUp',
                        '↓': 'ArrowDown',
                        '←': 'ArrowLeft',
                        '→': 'ArrowRight',
                      }[arrow]!;
                      secretKeys.current = [...secretKeys.current, key].slice(
                        -8,
                      );
                      if (
                        secretKeys.current.join(',') ===
                        'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight'
                      ) {
                        secretKeys.current = [];
                        setSecret(true);
                      }
                    }}
                  >
                    {arrow}
                  </button>
                ))}
              </div>
            </details>
          </section>
          <aside className="side-note">
            <span>
              {String((section ?? selected) + 1).padStart(2, '0')} — 06
            </span>
            <div className="section-dots">
              {sections.map((name, i) => (
                <button
                  key={name}
                  className={(section ?? selected) === i ? 'active' : ''}
                  aria-label={`Abrir ${name}`}
                  title={name}
                  onClick={() => openSection(i)}
                />
              ))}
            </div>
            <span>EXPLORA MI RECORRIDO</span>
          </aside>
        </main>
        <DiscoveryTrail
          suspended={introActive || reading || quickView || secret}
        />
        <ProjectCartridges
          active={cartridge}
          onEject={back}
          onInsert={(id) => {
            setMusicInserted(false);
            setInsertion((v) => v + 1);
            setCartridge(id);
            setSection(null);
            beep();
            document.getElementById('console')?.scrollIntoView({
              block: 'center',
              behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
                .matches
                ? 'instant'
                : 'smooth',
            });
          }}
        >
          <RetroMusic
            active={musicInserted}
            onEject={() => setMusicInserted(false)}
            onInsert={() => {
              setCartridge(null);
              setMusicInserted(true);
              setInsertion((v) => v + 1);
              document.getElementById('console')?.scrollIntoView({
                block: 'center',
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
                  .matches
                  ? 'instant'
                  : 'smooth',
              });
            }}
          />
        </ProjectCartridges>
        <footer className="footer">
          <span>
            © 2026 Javier Cano García <span className="footer-slash">/</span>{' '}
            Hecho con intención. Y un poco de nostalgia.
          </span>
          <div>
            <a href={links.github} target="_blank" rel="noreferrer">
              <Code2 size={16} />
              GitHub <ArrowUpRight size={13} />
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer">
              <BriefcaseBusiness size={16} />
              LinkedIn <ArrowUpRight size={13} />
            </a>
            <a href={links.email}>
              <Mail size={16} />
              Contacto <ArrowUpRight size={13} />
            </a>
          </div>
        </footer>
        <Dialog open={reading} onOpenChange={setReading}>
          <DialogContent className="reader">
            <DialogTitle className="reader-title">
              {cartridge
                ? 'Proyecto · lectura ampliada'
                : 'Javier Cano García · CV'}
            </DialogTitle>
            <DialogDescription>
              Backend Developer · Java & Spring Boot
            </DialogDescription>
            <a
              className="download reader-download"
              href="/Javier_Cano_CV_Backend_Java_2026.pdf"
              download
            >
              <ArrowDownToLine size={16} /> Descargar CV original
            </a>
            {!cartridge && (
              <nav className="reader-nav" aria-label="Índice del currículum">
                {sections.map((s, i) => (
                  <a
                    key={s}
                    href={`#cv-${sectionIds[i]}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById(`cv-${sectionIds[i]}`)
                        ?.scrollIntoView({
                          block: 'start',
                          behavior: 'instant',
                        });
                      document
                        .getElementById(`cv-${sectionIds[i]}`)
                        ?.focus({ preventScroll: true });
                    }}
                  >
                    {s}
                  </a>
                ))}
              </nav>
            )}
            <div className="reader-content">
              {cartridge ? (
                <ProjectContent id={cartridge} />
              ) : (
                sections.map((s, i) => (
                  <section id={`cv-${sectionIds[i]}`} tabIndex={-1} key={s}>
                    <Content section={i} />
                  </section>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={quickView} onOpenChange={setQuickView}>
          <DialogContent className="reader quick-reader">
            <DialogTitle>Javier, en un minuto.</DialogTitle>
            <DialogDescription>Backend Java · Madrid</DialogDescription>
            <div className="minute-path">
              <section>
                <span>01 / PERFIL</span>
                <h2>Java y Spring Boot.</h2>
                <p>
                  Desarrollo backend, APIs e integración de sistemas.
                  Experiencia en e-commerce y un nuevo capítulo en banca.
                </p>
              </section>
              <section>
                <span>02 / EXPERIENCIA</span>
                <h2>Del pedido a la integración.</h2>
                <p>
                  Java 21, microservicios, webhooks, AWS SQS y PostgreSQL en el
                  proyecto de PhoneHouse.
                </p>
              </section>
              <section>
                <span>03 / CÓDIGO PARA REVISAR</span>
                <h2>Backend Rescue Lab.</h2>
                <p>
                  Un laboratorio independiente de pedidos y pagos simulados:
                  problemas reproducibles, correcciones y evidencias.
                </p>
                <a
                  href="https://github.com/Cansynku/spring-backend-rescue-lab"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver el proyecto ↗
                </a>
              </section>
              <section>
                <span>04 / SIGUIENTE PASO</span>
                <h2>Hablemos.</h2>
                <a href={links.email}>Escribirme ↗</a>
                <a href="/Javier_Cano_CV_Backend_Java_2026.pdf" download>
                  Descargar CV ↓
                </a>
              </section>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={secret} onOpenChange={setSecret}>
          <DialogContent className="reader secret-reader battle-dialog">
            <DialogTitle>★ Bonus desbloqueado</DialogTitle>
            <DialogDescription>¡Javier Cano quiere combatir!</DialogDescription>
            <BattleBonus />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
