# 🎮 DEV BOY

### Javier Cano García · Portfolio interactivo

Mi recorrido profesional dentro de una consola portátil.

[**Abrir el portfolio →**](https://javier-cano-dev-boy.jcanogarcia96.chatgpt.site/) · [LinkedIn](https://www.linkedin.com/in/javier-cano-garc%C3%ADa/) · [CV en PDF](public/Javier_Cano_CV_Backend_Java_2026.pdf)

![CI](https://github.com/Cansynku/dev-boy-portfolio/actions/workflows/ci.yml/badge.svg?branch=main)

## El proyecto

Dev Boy presenta mi experiencia, tecnologías, formación y contacto en una interfaz inspirada en Game Boy y PSP, con teclado, controles táctiles, sonido opcional y modo lectura.

Soy desarrollador backend Java y Spring Boot. **Este repositorio es una aplicación React y TypeScript**: presenta mi perfil; no contiene servicios Java ni demuestra una arquitectura backend bancaria.

## Explorar

- Seis pantallas: perfil, experiencia, stack, formación, idiomas y contacto.
- Cruceta y botones A/B; sonido desactivado inicialmente.
- Modo lectura con índice y descarga del CV.
- Progreso de lectura y secciones visitadas durante la sesión.
- Dos consolas intercambiables con una pantalla compartida y preferencia guardada.
- Cartuchos de proyectos: Backend Rescue y Dev Boy, con enlaces a código y evidencias.
- Cartucho musical opcional, inserción animada y reproducción iniciada por el visitante.
- Intro de encuentro de 10 segundos, con opción de saltarla y salida ante errores de imagen.
- Vista rápida «Tengo un minuto» y bonus ilustrado desbloqueable con una pista.
- Diseño adaptable y preferencia de movimiento reducido.

| Control        | Acción                               |
| -------------- | ------------------------------------ |
| ↑ / ↓          | Elegir sección o desplazar contenido |
| ← / →          | Cambiar sección                      |
| A / Enter      | Abrir                                |
| B / Escape     | Menú                                 |
| START / SELECT | Perfil / lectura                     |

## Recorrido por el código

1. [Página principal](app/page.tsx): coordina estado, navegación y controles.
2. [Datos del CV](app/data/profile.ts) y [proyectos](app/data/projects.ts): contenido editable.
3. [Componentes](app/components) y [estilos por función](app/styles): presentación; [globals.css](app/globals.css) conserva el orden de las capas.
4. [Layout](app/layout.tsx): idioma y metadatos.
5. [Arquitectura y calidad](docs/architecture.md).
6. [GitFlow y contribución](CONTRIBUTING.md).

## Stack real

React 19 · TypeScript estricto · Vinext (APIs compatibles con Next.js sobre Vite) · Tailwind CSS 4 · Base UI / shadcn · Lucide · Cloudflare Workers / Sites.

Se conserva el catálogo de la plantilla en `components/ui/`; la página usa el diálogo y sus dependencias. No todos sus componentes y paquetes están utilizados.

## Desarrollo

Node.js 22.13 o posterior y npm 11.12.1. CI utiliza Node 22 y esa misma versión de npm para reproducir la resolución del lockfile.

```sh
git clone https://github.com/Cansynku/dev-boy-portfolio.git
cd dev-boy-portfolio
npm ci
npm run dev
```

Abre la dirección indicada. No se necesita clave de API para consultar el portfolio.

```sh
npm run check        # tipos y lint de aplicación
npm test             # política de activación de estadísticas
npm run build        # producción
npm run lint:all     # catálogo completo heredado
npm audit            # avisos actuales
```

CI ejecuta instalación reproducible, pruebas, tipos, lint de aplicación y build. Solo tiene permisos de lectura. No se declara cobertura de navegador: los checks estáticos no sustituyen pruebas de interacción.

## Recursos y reproducción local

El código, las ilustraciones y los controles del cartucho musical se incluyen. La grabación MP3 no se distribuye: para escuchar música en tu copia, aporta un archivo autorizado en `public/audio/title-screen.mp3`. Esa ruta está excluida de Git. Sin archivo, el portfolio sigue funcionando y muestra un aviso al intentar reproducirlo. No hay reproducción automática.

Consulta el [inventario de materiales](THIRD_PARTY_NOTICES.md) y la [lista de comprobaciones manuales](docs/verification.md). El bonus es una ilustración animada, no un combate jugable.

## Publicación

### Estadísticas de visitas

La integración de [Cloudflare Web Analytics](docs/analytics.md) mide solo visitas que lo permitan mediante «Privacidad y estadísticas», al pie de la web. El panel pertenece al titular y no es público. No identifica recruiters ni cuenta descargas o clics internos. Las pruebas locales y los forks están excluidos.

`feature/*` o `chore/*` → PR a `develop` → `release/*` → PR a `main` → etiqueta de versión. Hotfix desde `main`, integrado también en `develop`.

**GitHub y la web pública son independientes.** Fusionar no cambia la web. Sites publica explícitamente una versión validada en la misma dirección.

## Atribución

**© 2026 Javier Cano García. Derechos reservados sobre sus aportaciones originales.** Repositorio público para consulta y evaluación profesional; no se concede una licencia open source sobre las aportaciones propias. Reutilizarlas en otro portfolio requiere permiso, salvo los usos legales o expresamente autorizados. Consulta [propiedad y condiciones de uso](COPYRIGHT.md) y [avisos de terceros](THIRD_PARTY_NOTICES.md).

El contenido procede de mi CV; los entornos previstos se identifican como tales. Foto y PDF son material personal: sustitúyelos si adaptas el proyecto. Game Boy, Pokémon, PSP y Sony se citan como referencias de terceros; este proyecto no está afiliado a sus titulares.

Parte de una plantilla de Sites y se ha desarrollado con asistencia de IA. Los componentes de terceros conservan sus licencias; la reserva de derechos no los convierte en propiedad exclusiva de Javier.
