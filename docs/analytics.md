# Estadísticas de visitas

## Estado de la integración

El sitio está registrado en la cuenta del titular y `app/analytics-config.json` contiene su token público de medición. No es una API key ni una credencial del panel. El código solo carga el beacon en producción con consentimiento expreso. Vaciar el token desactiva la integración en una siguiente publicación.

## Activación

1. En la cuenta del titular, abrir Cloudflare Web Analytics y registrar exactamente `javier-cano-dev-boy.jcanogarcia96.chatgpt.site` mediante instalación manual. No cambiar DNS ni registrar otro dominio.
2. Copiar el token del snippet a la configuración. No activar la inyección automática: debe respetarse el control de preferencias de esta aplicación.
3. Ejecutar pruebas, checks y build; seguir GitFlow y publicar explícitamente en Sites.
4. En producción, permitir estadísticas desde el pie de página y comprobar una visita en el panel privado. Puede tardar varios minutos. Una prueba propia también cuenta; registrar su hora para interpretarla.

## Alcance

Solo se carga el beacon con consentimiento expreso, host de producción exacto y token válido. DNT y Global Privacy Control prevalecen. Sin almacenamiento disponible no se activa. Retirar el permiso recarga la página para no dejar escuchas del script en memoria; no borra estadísticas ya recogidas.

Las cifras representan visitas que permiten la medición, no todas las personas que entran. Bloqueadores y muestreo pueden reducirlas. El visitante debe abrir «Privacidad y estadísticas» para permitirla; no se interrumpe la consola con un banner.

Cloudflare Web Analytics no admite eventos personalizados ni UTM: esta versión no cuenta descargas, contactos o pantallas internas como si fueran visitas. Las secciones no cambian de URL. `spa: false` evita que el índice de lectura provoque páginas vistas artificiales.

No hay un panel público ni credenciales en el repositorio. El propietario consulta el dashboard de su cuenta de Cloudflare. Las visitas anteriores a la activación no se reconstruyen.

## Fuentes y validación

- https://developers.cloudflare.com/web-analytics/get-started/
- https://developers.cloudflare.com/web-analytics/faq/
- https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/

Las pruebas de política verifican consentimiento, host, configuración y señales de privacidad. No sustituyen comprobar la recepción real del beacon y la aparición de datos en Cloudflare.
