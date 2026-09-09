import Image from 'next/image';
import { experience, skills, links } from '../data/profile';

export default function Content({ section }: { section: number }) {
  if (section === 0)
    return (
      <>
        <div className="profile-line">
          <Image
            src="/javier.jpg"
            alt="Javier Cano García"
            width={90}
            height={100}
            unoptimized
          />
          <div>
            <span className="eyebrow">PLAYER 01</span>
            <h2>
              Javier Cano
              <br />
              García
            </h2>
          </div>
        </div>
        <p className="role">Backend Developer · Java & Spring Boot</p>
        <p>
          Desarrollador backend con más de 3 años de experiencia en desarrollo
          de software. Especializado en Java y Spring Boot, APIs REST,
          microservicios e integración de sistemas.
        </p>
        <p>
          Experiencia en proyectos enterprise, metodologías ágiles y buenas
          prácticas de desarrollo.
        </p>
        <div className="lcd-tags">
          <span>Madrid, España</span>
          <span>Java 21</span>
          <span>Spring Boot</span>
        </div>
      </>
    );
  if (section === 1)
    return (
      <>
        <h2>Experiencia</h2>
        {experience.map((e) => (
          <article className="job" key={e.company}>
            <span className="eyebrow">{e.date}</span>
            <h3>{e.role}</h3>
            <strong>{e.company}</strong>
            <p className="client">{e.client} · Madrid · Remoto</p>
            <ul>
              {e.body.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="stack-note">{e.stack}</p>
          </article>
        ))}
      </>
    );
  if (section === 2)
    return (
      <>
        <h2>Stack técnico</h2>
        <p>Herramientas y competencias recogidas en mi CV.</p>
        {skills.map(([title, list]) => (
          <article className="skill-group" key={title}>
            <h3>{title}</h3>
            <div className="lcd-tags">
              {list.split(', ').map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </article>
        ))}
      </>
    );
  if (section === 3)
    return (
      <>
        <span className="eyebrow">SEP 2022 — JUL 2024</span>
        <h2>Desarrollo de Aplicaciones Multiplataforma</h2>
        <h3>Grado Superior · Universidad Francisco de Vitoria</h3>
        <p>Madrid, España</p>
        <p>
          Formación en desarrollo de aplicaciones, bases de datos, programación
          orientada a objetos, seguridad, usabilidad y calidad del software.
        </p>
        <div className="lcd-callout">
          Modalidad dual con 9 meses de prácticas en empresa real.
        </div>
      </>
    );
  if (section === 4)
    return (
      <>
        <h2>Sin barreras de idioma.</h2>
        <article className="job">
          <span className="eyebrow">ES</span>
          <h3>Español</h3>
          <p>Nativo.</p>
        </article>
        <article className="job">
          <span className="eyebrow">EN</span>
          <h3>Inglés</h3>
          <p>
            Nivel alto. Dos años viviendo y trabajando en Irlanda, con uso
            diario del idioma en entornos laborales y atención al público.
          </p>
        </article>
      </>
    );
  return (
    <>
      <span className="eyebrow">CONTINUE?</span>
      <h2>Hablemos.</h2>
      <p>
        ¿Un proyecto backend, una oportunidad o una conversación sobre
        tecnología?
      </p>
      <div className="contact-list">
        <a href={links.email}>jcanogarcia96@gmail.com ↗</a>
        <a href="tel:+34695721814">+34 695 721 814 ↗</a>
        <a href={links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <a href={links.github} target="_blank" rel="noreferrer">
          GitHub · Cansynku ↗
        </a>
      </div>
      <p>Madrid, España</p>
      <a
        className="lcd-download"
        href="/Javier_Cano_CV_Backend_Java_2026.pdf"
        download
      >
        ↓ Descargar CV en PDF
      </a>
    </>
  );
}
