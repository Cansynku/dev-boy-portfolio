export const projects = [
  {
    id: 'rescue',
    title: 'Backend Rescue',
    edition: 'RESCUE RED',
    stack: 'Java 21 · Spring Boot · PostgreSQL',
    repo: 'https://github.com/Cansynku/spring-backend-rescue-lab',
    description:
      'Un laboratorio de pedidos y pagos para convertir fallos reproducibles en cambios verificables.',
    challenge: '¿Qué pasa si un pago se reintenta o el proveedor no responde?',
    approach:
      'Partir de una versión con limitaciones conocidas, reproducir el problema y conservar la evidencia del antes y el después.',
    result:
      'Reintentos de pago, migraciones, validación y consultas con pruebas de regresión. La evolución se puede seguir en el código y las PRs.',
    limit:
      'Proyecto educativo independiente. Pagos simulados y datos sintéticos; no es un servicio de producción.',
    evidence:
      'https://github.com/Cansynku/spring-backend-rescue-lab/blob/main/docs/project-progress.md',
  },
  {
    id: 'devboy',
    title: 'Dev Boy',
    edition: 'CAREER BLUE',
    stack: 'React · TypeScript · CSS',
    repo: 'https://github.com/Cansynku/dev-boy-portfolio',
    description:
      'El portfolio que estás usando: un currículum que se puede explorar a los mandos.',
    challenge:
      'Presentar experiencia backend de una forma memorable sin perder el acceso al contenido.',
    approach:
      'Una pantalla compartida entre consolas, controles de teclado y una alternativa de lectura directa.',
    result:
      'CV interactivo, descarga en PDF y estadísticas voluntarias. El repositorio público conserva el historial de las versiones publicadas.',
    limit:
      'Frontend de portfolio. El código de GitHub y la web se publican por separado; no contiene servicios backend.',
    evidence: 'https://github.com/Cansynku/dev-boy-portfolio',
  },
] as const;
export type ProjectId = (typeof projects)[number]['id'];
