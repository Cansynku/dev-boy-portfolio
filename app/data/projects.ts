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
      'Pagos sin duplicados, navegación por páginas y 73 pruebas PostgreSQL correctas en la verificación local de septiembre de 2026. La evolución se puede seguir en el código y las PRs.',
    limit:
      'Proyecto educativo independiente. Pagos simulados y datos sintéticos; no es un servicio de producción.',
    evidence:
      'https://github.com/Cansynku/spring-backend-rescue-lab/blob/main/docs/project-progress.md',
  },
  {
    id: 'health',
    title: 'Backend Health Check',
    edition: 'REVIEW VIOLET',
    stack: 'Método de revisión · Piloto',
    repo: 'https://github.com/Cansynku/spring-backend-rescue-lab',
    description:
      'Un método para revisar un flujo backend y convertir la evidencia en acciones concretas.',
    challenge:
      '¿Qué podemos demostrar sobre un problema y qué falta por comprobar?',
    approach:
      'Acotar un flujo, revisar código y pruebas, separar hallazgos de hipótesis y proponer una corrección con criterios de aceptación.',
    result:
      'Checklist reutilizable, plantilla de informe y ejemplo del laboratorio. El piloto de Alf.io compara dos caminos de reserva mediante lectura de código.',
    limit:
      'Método de revisión en fase de piloto, no un escáner automático. Alf.io es código abierto de terceros: el análisis fue estático, sin reproducción dinámica ni corrección upstream. Sin clientes ni ingresos validados.',
    evidence:
      'https://github.com/Cansynku/spring-backend-rescue-lab/blob/main/docs/backend-health-check-checklist.md',
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
