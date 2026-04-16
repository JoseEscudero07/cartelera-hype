
## Enfoque general

La idea era construir una app que consuma datos de videos (simulados con un mock de YouTube), calcule una métrica de relevancia propia y los muestre ordenados en una interfaz. Dividí el proyecto en backend (NestJS) y frontend (React), cada uno en su carpeta, dentro del mismo repositorio.

## Decisiones técnicas principales

**NestJS para el backend** porque su estructura modular me obligó a separar bien las responsabilidades desde el principio. No era necesario para un proyecto chico, pero ayuda a que escale.

**Vite en lugar de CRA** porque arranca mucho más rápido y el hot-reload es mejor.

**Tailwind CSS v3** — intenté usar v4 pero tuve problemas de compatibilidad con Vite y PostCSS. Bajé a v3 una version mucho mas estable.

**Feature folders en el frontend** — organicé el código por dominio (`features/videos/`) en lugar de por tipo de archivo. Hace más fácil encontrar todo lo relacionado a una funcionalidad en un solo lugar.

**Sin librerías de fechas** — implementé `getRelativeTime` a mano para no agregar una dependencia solo para formatear fechas.

## Organización del proyecto

Monorepo con `backend/` y `frontend/` separados. Las decisiones técnicas las fui documentando en `docs/` a medida que avanzaba.

## Supuestos y simplificaciones

- Los datos vienen de un archivo JSON local que simula la API de YouTube. No hay autenticación ni llamadas reales.
- No hay base de datos ni paginación. El endpoint devuelve todos los videos del mock.
- Se configuró CORS en el backend para permitir la comunicación con el frontend en entorno de desarrollo.
- Solo escribí tests unitarios para la lógica de negocio del servicio de videos.

## Problemas y soluciones

**Tailwind v4 no funcionó con Vite** → bajé a v3.

**El mock tenía números como strings** → la función `toEntity` los convierte antes de usarlos en la lógica.

**Algunas imágenes del mock eran URLs inválidas** → manejé el `onError` en el componente para mostrar un fallback.

**La detección de "tutorial" en el título fallaba por mayúsculas** → apliqué `.toLowerCase()` antes de comparar.

## Uso de IA

Usé IA principalmente para tres cosas:

- Definición de la arquitectura inicial del módulo videos en NestJS, incluyendo la separación de responsabilidades entre DTOs, entities, interfaces y services.
- Apoyo en la estructuración de pruebas unitarias utilizando Jest, especialmente en la configuración inicial de casos de prueba y validación de lógica de negocio.
- Orientación en buenas prácticas de organización de código y testing

En todos los casos revisé y ajusté el output antes de integrarlo.