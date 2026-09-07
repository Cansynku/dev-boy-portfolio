# Javier Cano · Dev Boy

Portfolio interactivo inspirado en una consola portátil clásica. Contenido basado en Javier_Cano_CV_Backend_Java_2026.pdf.

## Uso

- Arriba / abajo: elegir sección; dentro de una sección, desplazar el contenido. Izquierda / derecha: cambiar directamente de sección.
- A o Enter: abrir. B o Escape: volver al menú.
- START: perfil. SELECT: CV completo en modo lectura.
- También puedes pulsar directamente las opciones de la pantalla.
- Sonido opcional, desactivado inicialmente.
- CV original descargable y enlaces de contacto, LinkedIn y GitHub.

## Abrir la copia editable

Requiere Node.js 22.13 o posterior y npm. Desde esta carpeta:

    npm ci
    npm run dev -- --host 127.0.0.1

Abre la dirección local indicada. El sitio funciona mientras el servidor permanece abierto. No está publicado en Internet.

## Contenido y edición

- app/page.tsx: contenido, navegación y controles.
- app/globals.css: diseño adaptable, consola y modo lectura.
- app/layout.tsx: idioma y metadatos.
- public/javier.jpg: foto extraída del CV.
- public/Javier_Cano_CV_Backend_Java_2026.pdf: copia idéntica del original.
- public/favicon.svg: identificación JC.

No se han inventado proyectos, métricas ni logros. El entorno previsto del proyecto bancario mantiene esa calificación. Incluye los datos de contacto del CV; revísalos antes de una futura publicación.

## Verificación realizada

- Compilación de producción: correcta.
- TypeScript: correcto.
- Análisis estático de app/: correcto.
- Página, foto y PDF: respuesta HTTP 200.
- PDF descargable: misma huella SHA-256 que el original.
- Sin pruebas de interacción ni revisión visual en navegador en esta entrega.

El análisis global detecta incidencias preexistentes en componentes del starter que no se han modificado. La instalación informa de 11 avisos de seguridad en dependencias (1 bajo, 2 moderados y 8 altos); no se han aplicado actualizaciones forzadas. Revisar estas dependencias antes de publicar en producción.

## Segunda edición

Encendido retro breve (repetible desde POWER), transiciones entre pantallas, marcas de secciones visitadas durante la sesión, indicador de lectura, accesos laterales y experiencia en formato de línea temporal en modo lectura. Respeta la preferencia de movimiento reducido. No añade dependencias ni altera los datos del CV.

