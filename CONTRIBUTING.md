# GitFlow y contribución

- `main`: versión estable; entrada mediante PR.
- `develop`: integración.
- `feature/*`, `fix/*`, `chore/*`: parten de `develop` y regresan por PR.
- `release/*`: estabilización desde `develop`, PR a `main` y sincronización de vuelta.
- `hotfix/*`: desde `main`, integrado también en `develop`.

Usar commits claros (`feat:`, `fix:`, `docs:`, `chore:`), merge commits y correo privado de GitHub. No reescribir ramas compartidas. En un proyecto individual no se simulan revisores: revisar el diff y exigir CI.

Antes de integrar: `npm ci`, `npm run check`, `npm run build` y revisión del diff. Si cambia la interfaz, comprobar teclado, controles, diálogo, móvil/escritorio, PDF y movimiento reducido. Informar de pruebas pendientes; CI no incluye navegador.

Para una release: rama `release/x.y.z`, changelog, PR a `main`, checks correctos, merge y etiqueta anotada `vx.y.z`. Sincronizar cambios exclusivos hacia `develop` por PR.

GitHub no despliega automáticamente. Publicar en Sites requiere una acción explícita desde el código validado. `.openai/hosting.json` identifica el sitio; no contiene credenciales ni concede acceso. Los forks necesitan su propio sitio.

Este historial público comienza con una importación limpia para no exponer correos corporativos de commits anteriores. La copia original de Sites se conserva separada. El trabajo público futuro debe partir de este repositorio; seleccionar explícitamente este checkout al publicar.
