import { ArrowUpRight } from 'lucide-react';
import { projects, projectHighlights } from '../data/projects';

export default function BackendHighlights() {
  return (
    <section
      className="backend-highlights"
      id="backend-work"
      tabIndex={-1}
      aria-labelledby="backend-work-title"
    >
      <header className="backend-highlights-heading">
        <div>
          <span className="small-label">
            PROYECTOS PROPIOS · CÓDIGO ABIERTO
          </span>
          <h2 id="backend-work-title">Mi backend, con evidencias.</h2>
        </div>
        <p>
          Un problema concreto, una decisión explicada y código que puedes
          revisar. Elige por dónde empezar.
        </p>
      </header>
      <div className="backend-highlights-grid">
        {projectHighlights.map((highlight) => {
          const project = projects.find((item) => item.id === highlight.id);
          if (!project) return null;
          return (
            <article className="backend-highlight" key={highlight.id}>
              <span className="backend-highlight-label">{highlight.label}</span>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
              <div className="backend-highlight-stack">{project.stack}</div>
              <div className="backend-highlight-actions">
                <a
                  className="backend-highlight-case"
                  href={`?project=${project.id}#console`}
                  aria-label={`Ver caso explicado: ${project.title}`}
                >
                  Ver caso explicado{' '}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <a
                  href={project.evidence}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Evidencia en GitHub{' '}
                  <span className="sr-only">de {project.title}</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
              <small>{highlight.limit}</small>
            </article>
          );
        })}
      </div>
    </section>
  );
}
