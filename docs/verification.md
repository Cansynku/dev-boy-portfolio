# Comprobaciones de una entrega

Esta es una lista de aceptación, no un informe de pruebas realizadas. Indicar en cada PR qué se ha comprobado y qué queda pendiente.

## Automatizadas

```sh
npm ci
npm test
npm run check
npm run build
```

Si Windows bloquea `tsgolint.exe` mediante Control de aplicaciones, no desactivar la protección. Registrar el fallo local y exigir que el job `quality` de GitHub complete el lint en Linux antes de integrar.

## Interacción

- Abrir `?project=rescue#console`, `?project=health#console` y `?project=devboy#console`: cartucho correcto, sin intro y consola enfocada. Un identificador desconocido conserva la entrada normal.
- Copiar el enlace desde consola y lectura; comprobar que corresponde al proyecto y no arrastra otros parámetros. Si el portapapeles está bloqueado, comprobar el campo de copia manual.
- En Backend Rescue, desplegar decisión y prueba con ratón y teclado; el enlace lleva a `PaymentReliabilityTest.java`. El caso explica el laboratorio, no ejecuta pagos.

- Entrar desde arriba: pista de cartuchos visible tras la intro. Pulsarla lleva a la biblioteca y enfoca el destino; desaparece al descubrirla. Cerrarla conserva el enlace de la presentación. No debe aparecer encima de lectura, vista rápida ni bonus. Revisar también móvil y movimiento reducido.

- Abrir la página: intro visible, salida automática a los 10 segundos desde la carga de imagen; botón para saltar y Escape operativos. Con movimiento reducido, acceso directo al portfolio.
- Alternar clásica/portátil: la pantalla mantiene su contenido; repetir pulsaciones durante la transición no atasca el cambio. Recargar conserva la carcasa elegida.
- Recorrer las seis secciones con teclado y controles; abrir lectura, usar su índice, cerrar y descargar PDF. Probar «Tengo un minuto».
- Insertar ambos proyectos y expulsarlos. Comprobar la animación, los enlaces y la lectura en ambas consolas.
- Con un MP3 autorizado local: pulsar el cartucho amarillo, pausar, reemplazarlo por un proyecto y ocultar la pestaña. Sin archivo, comprobar el aviso y que el CV siga disponible.
- Seguir la pista del bonus con teclado y botones, cerrar el diálogo y repetir la animación.
- Revisar escritorio y móvil: desplazamiento, texto legible, controles alcanzables y foco visible. Repetir con movimiento reducido.
- Estadísticas: desarrollo no carga el beacon; el sitio autorizado exige consentimiento y respeta DNT/GPC. No convertir pruebas propias en visitas de producción.

## Antes de publicar

Revisar el diff completo, las licencias de medios y el alcance. CI verde, PR a `develop`, release a `main` y sincronización por PR. La publicación en Sites es independiente y debe usar la versión validada.
