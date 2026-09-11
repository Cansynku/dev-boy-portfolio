'use client';
import type { ReactNode } from 'react';
import GitHubStarCartridge from './components/github-star-cartridge';

import { projects, type ProjectId } from './data/projects';
export type { ProjectId } from './data/projects';

export function ProjectContent({ id }: { id: ProjectId }) {
  const project = projects.find((p) => p.id === id)!;
  return (
    <article className="project-story">
      <span className="eyebrow">PROJECT CARTRIDGE / {project.edition}</span>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <p className="project-stack">{project.stack}</p>
      <h3>El reto</h3>
      <p>{project.challenge}</p>
      <h3>Cómo lo abordo</h3>
      <p>{project.approach}</p>
      <h3>Qué puedes revisar</h3>
      <p>{project.result}</p>
      <p>
        <a href={project.repo} target="_blank" rel="noreferrer">
          Explorar repositorio ↗
        </a>
      </p>
      <p>
        <a href={project.evidence} target="_blank" rel="noreferrer">
          Ver decisiones y evidencias ↗
        </a>
      </p>
      <p className="project-limit">{project.limit}</p>
      {id === 'health' && (
        <nav
          className="health-evidence"
          aria-label="Ejemplos del método de revisión"
        >
          <a
            href="https://github.com/Cansynku/spring-backend-rescue-lab/blob/main/docs/backend-health-check-lab-example.md"
            target="_blank"
            rel="noreferrer"
          >
            Informe de ejemplo ↗
          </a>
          <a
            href="https://github.com/Cansynku/spring-backend-rescue-lab/blob/main/docs/alfio-review-pilot.md"
            target="_blank"
            rel="noreferrer"
          >
            Piloto estático de Alf.io ↗
          </a>
        </nav>
      )}
    </article>
  );
}

export default function ProjectCartridges({
  children,
  active,
  onInsert,
  onEject,
}: {
  children?: ReactNode;
  active: ProjectId | null;
  onInsert: (id: ProjectId) => void;
  onEject: () => void;
}) {
  return (
    <section
      id="cartridges"
      tabIndex={-1}
      className="cartridge-library"
      aria-label="Cartuchos de proyectos"
    >
      <div className="library-heading">
        <div>
          <span className="small-label">
            RUTA 02 · ELIGE TU SIGUIENTE MISIÓN
          </span>
          <h2>Cada cartucho, una aventura.</h2>
        </div>
        <p>
          Proyectos para explorar, música para acompañarte y una estrella para
          seguir creciendo.
        </p>
      </div>
      <div className="cartridge-shelf">
        {children}
        <GitHubStarCartridge />
        {projects.map((project) => (
          <button
            key={project.id}
            className={`project-cartridge cartridge-${project.id}`}
            aria-pressed={active === project.id}
            onClick={() => onInsert(project.id)}
          >
            <span className="cartridge-ridges" aria-hidden="true" />
            <span className="cartridge-emboss">
              DEV BOY · {project.id === 'health' ? 'REVIEW' : 'PROJECT'} PAK
            </span>
            <span className="cartridge-label">
              <span className="cartridge-edition">{project.edition}</span>
              <strong>{project.title}</strong>
              <span className="cartridge-art" aria-hidden="true">
                {project.id === 'rescue'
                  ? '{ ⚡ }'
                  : project.id === 'health'
                    ? 'HC✓'
                    : 'JC_'}
                <i>★</i>
              </span>
              <span className="cartridge-tech">{project.stack}</span>
              <span className="cartridge-seal">
                JC
                <br />
                ORIGINAL
              </span>
            </span>
            <span className="cartridge-bottom">
              {active === project.id ? 'INSERTADO ✓' : 'INSERTAR ▾'}
            </span>
          </button>
        ))}
      </div>
      {active && (
        <button className="eject-cartridge" onClick={onEject}>
          Expulsar cartucho · volver al CV
        </button>
      )}
    </section>
  );
}
