# 🎮 DEV BOY

### Javier Cano García · Portfolio interactivo

Mi recorrido profesional dentro de una consola portátil.

[**Abrir el portfolio →**](https://javier-cano-dev-boy.jcanogarcia96.chatgpt.site/) · [LinkedIn](https://www.linkedin.com/in/javier-cano-garc%C3%ADa/) · [CV en PDF](public/Javier_Cano_CV_Backend_Java_2026.pdf)

![CI](https://github.com/Cansynku/dev-boy-portfolio/actions/workflows/ci.yml/badge.svg?branch=main)

## El proyecto

Dev Boy presenta mi experiencia, tecnologías, formación y contacto en una interfaz inspirada en Game Boy, con teclado, controles táctiles, sonido opcional y modo lectura.

Soy desarrollador backend Java y Spring Boot. **Este repositorio es una aplicación React y TypeScript**: presenta mi perfil; no contiene servicios Java ni demuestra una arquitectura backend bancaria.

## Explorar

- Seis pantallas: perfil, experiencia, stack, formación, idiomas y contacto.
- Cruceta y botones A/B; sonido desactivado inicialmente.
- Modo lectura con índice y descarga del CV.
- Progreso de lectura y secciones visitadas durante la sesión.
- Diseño adaptable y preferencia de movimiento reducido.

| Control        | Acción                               |
| -------------- | ------------------------------------ |
| ↑ / ↓          | Elegir sección o desplazar contenido |
| ← / →          | Cambiar sección                      |
| A / Enter      | Abrir                                |
| B / Escape     | Menú                                 |
| START / SELECT | Perfil / lectura                     |

## Recorrido por el código

1. [Página principal](app/page.tsx): contenido, estado y controles.
2. [Estilos](app/globals.css): consola y diseño adaptable.
3. [Layout](app/layout.tsx): idioma y metadatos.
4. [Arquitectura y calidad](docs/architecture.md).
5. [GitFlow y contribución](CONTRIBUTING.md).

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
npm run build        # producción
npm run lint:all     # catálogo completo heredado
npm audit            # avisos actuales
```

CI ejecuta instalación reproducible, tipos, lint de aplicación y build. Solo tiene permisos de lectura. No se declara cobertura de navegador: los checks estáticos no sustituyen pruebas de interacción.

## Publicación

`feature/*` o `chore/*` → PR a `develop` → `release/*` → PR a `main` → etiqueta de versión. Hotfix desde `main`, integrado también en `develop`.

**GitHub y la web pública son independientes.** Fusionar no cambia la web. Sites publica explícitamente una versión validada en la misma dirección.

## Atribución

El contenido procede de mi CV; los entornos previstos se identifican como tales. Foto y PDF son material personal: sustitúyelos si adaptas el proyecto. Game Boy es una marca de Nintendo; este proyecto no está afiliado a Nintendo.

Parte de una plantilla de Sites y se ha desarrollado con asistencia de IA. No se añade una licencia global sobre contenido personal o materiales de terceros; se conservan los derechos y licencias aplicables.
