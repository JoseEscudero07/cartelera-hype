
## Frontend – Arquitectura y decisiones

### Tecnologías utilizadas

* React (con Vite)
* TypeScript
* Tailwind CSS

---

### Elección del entorno: Vite

El frontend fue creado utilizando Vite como herramienta de desarrollo.

#### Justificación

* Arranque del servidor significativamente más rápido
* Mejor experiencia de desarrollo mediante Hot Module Replacement
* Configuración más ligera en comparación con Create React App
* Herramienta alineada con tendencias actuales del ecosistema React

---

### Elección de Tailwind CSS

Se utilizó Tailwind CSS como framework de estilos.

#### Justificación

* Permite construir interfaces rápidamente mediante clases utilitarias
* Reduce la necesidad de escribir CSS personalizado
* Facilita la consistencia visual en la interfaz

---

### Decisión técnica: uso de Tailwind CSS v3

Inicialmente se intentó utilizar Tailwind CSS v4, sin embargo se presentaron inconvenientes en la integración con Vite y PostCSS.

#### Decisión tomada

Se optó por utilizar Tailwind CSS v3, versión estable y ampliamente soportada.

#### Justificación

* Mayor compatibilidad con el ecosistema actual
* Configuración más simple y predecible
* Reducción de problemas de integración

---

### Estructura del proyecto

Se adoptó una arquitectura basada en features, organizando el código por dominio funcional.

```
src/
├── features/
│   └── videos/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── types/
│       └── index.ts
├── shared/
│   ├── components/
│   ├── utils/
│   └── hooks/
└── pages/
```

#### Justificación

* Separación clara de responsabilidades por dominio
* Facilita la escalabilidad del proyecto
* Mejora la mantenibilidad del código
* Permite reutilización mediante el módulo shared

---
### Consumo de API y capa de servicios

Se implementó una capa de servicios encargada de la comunicación con el backend.

#### Archivo principal:
`features/videos/services/videos.service.ts`

#### Responsabilidades
* Realizar la petición HTTP al backend (/api/videos)
* Manejar errores de red
* Centralizar la lógica de acceso a datos

#### Justificación
* Separación entre lógica de datos y presentación
* Facilita el mantenimiento y cambios futuros en la API
* Permite reutilización en diferentes componentes

### Manejo de estado con Custom Hook

Se implementó el hook personalizado useVideos para gestionar el estado de los datos.

#### Estados manejados
* videos: lista de videos obtenidos
* loading: indica si la petición está en curso
* error: captura errores en la solicitud

#### Justificación
* Encapsula la lógica de obtención de datos
* Evita duplicación de lógica en componentes
* Mejora la legibilidad y organización del código


### Manejo de estados de carga y error

Se implementó control explícito de estados de carga y error en la interfaz.

#### Comportamiento
* Durante la carga → se muestra un mensaje de loading
* En caso de error → se muestra un mensaje controlado al usuario
* En caso exitoso → se renderiza la información

### Justificación
* Mejora la experiencia de usuario
* Evita pantallas en blanco
* Permite manejar fallos de red de forma controlada


### Manejo de errores en imágenes
Se implementó una validación en la carga de imágenes mediante el evento onError de React.

#### Comportamiento
* Si la imagen carga correctamente → se renderiza normalmente
* Si la imagen falla → se muestra un contenedor alternativo

#### Justificación
* Evita layouts rotos por imágenes inválidas
* Mejora la robustez de la interfaz
* Mantiene consistencia visual


### Video destacado (“La Joya de la Corona”)
Se implementó un componente especial para resaltar el video con mayor hypeLevel.

#### Implementación
* El backend entrega los videos ordenados por relevancia
* El frontend selecciona el primer elemento como destacado
* Se renderiza mediante un componente independiente (FeaturedVideo)

#### Justificación
* Mejora la jerarquía visual
* Destaca el contenido más relevante
* Permite escalabilidad en la presentación (cambios futuros sin afectar el resto del sistema)

### Validación de orden en frontend
Aunque el backend entrega los datos ordenados, el frontend realiza una validación adicional.

#### Implementación
Se aplica un ordenamiento por hypeLevel antes de renderizar

#### Justificación
* Evita depender completamente del backend
* Asegura consistencia en la UI
* Protege ante posibles cambios o errores en el servicio

### Uso de utilidades compartidas
Se implementaron utilidades reutilizables en el módulo shared.

Ejemplo:
* logger

#### Justificación
* Centraliza funcionalidades comunes
* Facilita integración futura con herramientas externas
* Mejora la trazabilidad en desarrollo


### Variables de entorno en el frontend (Vite)
El frontend fue configurado utilizando variables de entorno para manejar configuraciones externas como la URL del backend, evitando valores hardcodeados dentro del código fuente.

#### Archivos de configuración
El proyecto incluye:
* `.env.example` → plantilla con las variables necesarias
* `.env` → archivo local con valores reales (no se sube al repositorio) por el .gitignore

#### Ejemplo de .env.example
`VITE_API_URL=http://localhost:3000`

#### Uso en el código
const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const getVideos = async () => {
  const res = await fetch(`${API_URL}/api/videos`);
  return res.json();
};

#### Propósito del fallback
`http://localhost:3000`
Esto permite que la aplicación funcione incluso si no existe archivo .env.

#### Justificación
* Evita hardcoding de URLs del backend
* Permite cambiar entornos sin modificar código
* Facilita despliegues en producción (Vercel, Netlify, etc.)
* Mejora la colaboración en equipo
* Define contrato claro mediante .env.example

