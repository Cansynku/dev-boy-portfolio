# Arquitectura y calidad

Dev Boy es un frontend React/TypeScript con contenido local, compilado por Vinext para Cloudflare Workers. No contiene un backend Java, base de datos ni autenticación de visitantes.

## Responsabilidades

| Ubicación                                               | Responsabilidad                                                              |
| ------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `app/page.tsx`                                          | Estado de navegación, consola seleccionada, cartucho insertado y composición |
| `app/data/profile.ts`                                   | Experiencia, tecnologías, secciones y enlaces del CV                         |
| `app/data/projects.ts`                                  | Casos de proyectos, evidencias y límites                                     |
| `app/components/cv-content.tsx`                         | Contenido compartido por pantalla y modo lectura                             |
| `app/components/portable-shell.tsx`                     | Dibujo SVG decorativo de la consola portátil                                 |
| `app/project-cartridges.tsx`                            | Biblioteca y lectura de proyectos                                            |
| `app/retro-music.tsx`                                   | Audio opcional iniciado por una acción del visitante                         |
| `app/arrival-intro.tsx`                                 | Encuentro inicial, temporizadores, salida y movimiento reducido              |
| `app/battle-bonus.tsx`                                  | Revelado de la ilustración secreta                                           |
| `app/styles/`                                           | Capas visuales importadas en orden desde `globals.css`                       |
| `app/visitor-analytics.tsx`, `lib/analytics-policy.mjs` | Consentimiento y restricciones de medición                                   |

## Estado y ciclo de vida

Ambas carcasas comparten el mismo contenido y manejadores. `section` identifica la pantalla abierta; `selected`, el menú. Cambiar de consola conserva el contenido. Solo la preferencia de carcasa y el permiso de estadísticas usan almacenamiento local; el progreso del CV vive en memoria.

La ranura admite un proyecto o música. Insertar un proyecto expulsa el musical y pausa el audio. Los temporizadores de transición se limpian al desmontar; la intro puede saltarse, respeta movimiento reducido y tiene salida de emergencia si la imagen no carga. No arranca música automáticamente.

El orden de CSS conserva la cascada del diseño validado: base, controles, lectura, consola portátil, transición, proyectos, bonus/música, ranura e intro. No reorganizar reglas entre capas sin revisar los dos formatos y sus tamaños adaptables.

## Validación y límites

El job `quality` ejecuta `npm ci`, pruebas de política de estadísticas, tipos, lint de aplicación y build. El catálogo heredado en `components/ui/` conserva sus dependencias; no se ha hecho una limpieza de paquetes ajena a esta entrega.

Las pruebas automatizadas actuales cubren la política de estadísticas, no la interacción de las consolas. Seguir [verification.md](verification.md) para revisión manual; no se declara cobertura E2E ni una auditoría completa de accesibilidad.

Vinext está en beta. GitHub y Sites publican por separado. Los forks deben usar su propio sitio y sus medios autorizados; la medición original excluye otros dominios.
