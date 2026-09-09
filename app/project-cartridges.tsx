'use client';
import type { ReactNode } from 'react';

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
    <section className="cartridge-library" aria-label="Cartuchos de proyectos">
      <div className="library-heading">
        <div>
          <span className="small-label">ELIGE TU SIGUIENTE MISIÓN</span>
          <h2>Cada cartucho, una aventura.</h2>
        </div>
        <p>
          Rojo y verde para explorar proyectos. Amarillo para ponerle música.
        </p>
      </div>
      <div className="cartridge-shelf">
        {children}
        {projects.map((project, index) => (
          <button
            key={project.id}
            className={`project-cartridge cartridge-${project.id}`}
            aria-pressed={active === project.id}
            onClick={() => onInsert(project.id)}
          >
            <span className="cartridge-ridges" aria-hidden="true" />
            <span className="cartridge-emboss">DEV BOY · PROJECT PAK</span>
            <span className="cartridge-label">
              <span className="cartridge-edition">{project.edition}</span>
              <strong>{project.title}</strong>
              <span className="cartridge-art" aria-hidden="true">
                {index === 0 ? '{ ⚡ }' : 'JC_'}
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
