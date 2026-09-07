# Arquitectura y calidad

`app/page.tsx` es un componente cliente con contenido estático. `selected` representa el menú y `section` la pantalla abierta. Cruceta y teclado comparten manejadores. Progreso y secciones visitadas son estado en memoria de la sesión.

La página compone menú, contenido de seis secciones y diálogo de lectura. El diálogo reutiliza Base UI. Web Audio genera sonidos si el visitante los activa. Foto y PDF se sirven desde `public/`. Vinext compila con el adaptador Cloudflare.

## Decisiones

Contenido local para seis secciones, sin CMS ni base de datos. Estado compartido para controles coherentes. Modo lectura para acceder directamente al CV. Una página por el tamaño actual: separar datos y navegación será razonable al incorporar idiomas o ampliar comportamiento.

## Límites y checks

Vinext está en beta. No hay backend Java, autenticación, persistencia ni pruebas E2E. Etiquetas accesibles y movimiento reducido no equivalen a una auditoría de accesibilidad.

El job `quality` instala con `npm ci` y ejecuta tipos, lint de aplicación y build. `lint:app` cubre `app`, `lib`, diálogo y botón. `lint:all` mantiene visibles incidencias de accesibilidad, tipos y efectos React del catálogo heredado que no usa esta página; no se desactivan reglas globales para ocultarlas.

El 7 de septiembre de 2026, `npm audit` devolvió cero vulnerabilidades conocidas en el entorno consultado. Es una observación puntual, no una garantía futura. Sustituye el recuento desactualizado del README anterior.

Próximos pasos razonables: pruebas de navegación al ampliar comportamiento y evaluación del catálogo heredado como cambio independiente. No se declara cobertura sin medirla.
