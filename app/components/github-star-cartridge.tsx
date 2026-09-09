export default function GitHubStarCartridge() {
  return (
    <div className="star-cartridge-holder">
      <a
        className="project-cartridge cartridge-leaf"
        href="https://github.com/Cansynku/dev-boy-portfolio"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir Dev Boy en GitHub para dejar una estrella (nueva pestaña)"
        aria-describedby="github-star-help"
      >
        <span className="cartridge-ridges" aria-hidden="true" />
        <span className="cartridge-emboss">DEV BOY · COMMUNITY PAK</span>
        <span className="cartridge-label leaf-label">
          <span className="cartridge-edition">EDICIÓN VERDE ESTRELLA</span>
          <strong>Hazlo crecer</strong>
          <svg
            className="leaf-star-art"
            viewBox="0 0 160 120"
            aria-hidden="true"
          >
            <path
              d="M76 102C18 96 12 54 30 16C71 15 112 39 97 83Z"
              fill="#318645"
              stroke="#174a32"
              strokeWidth="3"
            />
            <path
              d="M75 100C124 95 149 58 139 27C108 25 78 49 75 100Z"
              fill="#8edb52"
              stroke="#174a32"
              strokeWidth="3"
            />
            <path
              d="M79 105L42 32M79 105L126 41M59 67L35 62M67 81L74 55"
              fill="none"
              stroke="#d8efa0"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              className="leaf-star"
              d="M86 22L97 43L120 47L103 64L106 89L85 77L63 88L67 64L50 46L74 43Z"
              fill="#ffe681"
              stroke="#735328"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M78 54V60M93 54V60M80 67Q86 72 92 67"
              fill="none"
              stroke="#735328"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M131 91V103M125 97H137M22 33V41M18 37H26"
              stroke="#fff8c1"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <span className="cartridge-tech">TU ESTRELLA, UN NUEVO BROTE</span>
        </span>
        <span className="cartridge-bottom">★ APOYAR EN GITHUB ↗</span>
      </a>
      <p id="github-star-help" className="star-cartridge-help">
        ¿Te ha gustado? Abre el repo y pulsa <strong>Star ★</strong> en GitHub.
        <span>Gracias por acompañar esta aventura.</span>
      </p>
    </div>
  );
}
