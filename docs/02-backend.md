## módulo videos

El módulo `videos` fue estructurado siguiendo una arquitectura modular en NestJS, separando responsabilidades para mejorar la escalabilidad y mantenibilidad del sistema.

### Estructura implementada

- `dto/`: define la forma y validación de los datos de entrada y salida.
- `entities/`: representa el modelo interno del dominio del video.
- `services/`: contiene la lógica de negocio (cálculo de hype y transformación de datos).
- `controllers/`: expone el endpoint REST.
- `data/`: contiene el mock de datos simulando una API externa.

---

### Justificación de la arquitectura

- Separación clara de responsabilidades (DTO, Entity, Service, Controller)
- Facilita la escalabilidad del módulo a futuro
- Mejora la mantenibilidad y legibilidad del código

---

### Fuente de datos

Se utiliza un archivo local ubicado en:

`src/data/mock-youtube-api.json`

Este archivo simula la respuesta de un proveedor externo (API de YouTube), permitiendo desarrollar la lógica de transformación sin depender de servicios externos.


### Modelado de datos

Se implementaron DTOs y Entities para separar claramente la validación de datos externos del modelo interno de la aplicación.

#### DTOs (Data Transfer Objects)

Se crearon los siguientes DTOs:

- `VideoResponseDto`: define la estructura de salida consumida por el frontend.

Estos DTOs permiten:
- Controlar la forma de la respuesta
- Evitar exponer datos innecesarios

### Entities

Se definió `VideoEntity` como modelo interno del dominio.

Esta entidad representa el video dentro del sistema ya transformado, permitiendo desacoplar la lógica de negocio de la estructura externa del proveedor de datos.

---

#### Justificación de diseño

- Los DTOs se utilizan únicamente en la capa de entrada/salida.
- Las Entities representan el estado interno del dominio.
- La transformación entre DTO → Entity → Response se realiza en la capa de servicio.

### Interfaces para modelar datos externos
Se incorporó una capa de interfaces TypeScript para tipar correctamente la estructura del JSON simulado proveniente de una API externa (YouTube mock).

`interfaces/youtube-video.interface.ts`

- Tipar correctamente datos externos sin mezclarlos con el dominio interno
- Evitar dependencias directas de la estructura del proveedor
- Mejorar la seguridad de tipos en el servicio

### Capa de transformación (Entity Mapping)
Se implementó una función de mapeo explícito (toEntity) para convertir datos externos en un modelo interno del dominio.

#### Justificación:
- Desacoplar completamente la API externa del sistema
- Normalizar datos antes de aplicar lógica de negocio
- Evitar que cambios en la API afecten el core de la aplicación

### Lógica de negocio: Hype Level
Se implementó una métrica personalizada llamada Hype Level, utilizada para determinar la relevancia de un video.

Fórmula base: `hype = (likes + comments) / views`

Para asegurar una comparación confiable, el título del video se transforma a minúsculas antes de aplicar la validación:
`video.title.toLowerCase().includes('tutorial')`

#### Reglas adicionales:
- Si el título contiene la palabra "tutorial" (sin importar mayúsculas/minúsculas), el hype se multiplica por 2
- Si el video no tiene comentarios, el hype es automáticamente 0

#### Justificación:
- Evitar errores por diferencias de mayúsculas/minúsculas
- Asegurar consistencia en reglas de negocio
- Mejorar robustez del sistema frente a datos inconsistentes
- Permitir detección confiable de palabras clave en títulos



### Utilidad de tiempo relativo
Se creó una función personalizada getRelativeTime para transformar fechas absolutas en texto amigable.

Esta funcionalidad fue implementada en una carpeta separada:
`src/utils/relative-time.util.ts`

#### Decisión de arquitectura

Se decidió ubicar esta lógica en una carpeta utils debido a que:

- Es una función reutilizable en múltiples partes del sistema
- No pertenece ni a la capa de dominio ni a la de infraestructura
- Permite mantener el service enfocado únicamente en lógica de negocio


#### Justificación
- Cumplir la restricción de no usar librerías externas (como moment.js o date-fns)
- Mantener control total sobre el formato de presentación de fechas
- Reducir dependencias innecesarias en el proyecto
- Centralizar lógica reutilizable en una capa de utilidades (utils)

### Manejo de errores y resiliencia del sistema
Se implementó manejo de errores en la capa de carga de datos para garantizar estabilidad del servicio en caso de fallos al leer o procesar la fuente externa simulada.

### Carga de datos con control de excepciones
La lectura del archivo JSON se realiza dentro de un bloque try/catch, lo que permite capturar errores relacionados con:

- Archivo no encontrado
- JSON inválido
- Problemas de lectura del sistema de archivos

En caso de fallo, se lanza una excepción controlada:

- `InternalServerErrorException`

#### Justificación
- Evitar que el sistema colapse ante errores inesperados
- Centralizar el control de fallos en la capa de servicio
- Simular comportamiento real de APIs en producción
- Mejorar la confiabilidad del backend


### Transformación segura de datos (Entity Mapping)
La función toEntity normaliza los datos antes de ser usados en la lógica de negocio.

Se aplican conversiones y validaciones como:
- Conversión de strings a números (views, likes, comments)
- Manejo de valores opcionales
- Acceso seguro a propiedades anidadas (thumbnail)

#### Justificación
- Garantizar consistencia en el dominio interno
- Evitar errores por datos incompletos o mal formados
- Centralizar la transformación de datos externos


### Endpoint principal: getVideos
Este método es el núcleo del servicio de videos. Se encarga de transformar los datos crudos provenientes de la fuente externa en una respuesta estructurada y lista para el frontend.


#### Flujo de ejecución
1 Se cargan los datos desde la fuente local (mock de API externa)
2 Cada video se transforma a una entidad interna (VideoEntity)
3 Se calcula la métrica de negocio hypeLevel
4 Se construye la respuesta final (DTO)
5 Se ordenan los videos por relevancia

#### Transformación de datos
Cada video pasa por un proceso de normalización:

- Conversión a entidad interna
- Aplicación de lógica de negocio
- Construcción de objeto de respuesta

#### Lógica aplicada
- Se calcula el hypeLevel basado en likes, comentarios y vistas
- Se formatea la fecha a un formato relativo (ej: “Hace 2 días”)
- Se extraen únicamente los campos necesarios para el frontend

#### Ordenamiento
Los videos se ordenan de forma descendente según su hypeLevel, asegurando que los más relevantes aparezcan primero.

### Testing del módulo videos

El módulo videos cuenta con pruebas unitarias implementadas utilizando Jest dentro del ecosistema de NestJS, con el objetivo de validar la lógica de negocio y garantizar la consistencia del comportamiento del servicio.

#### Ubicación de los tests
 * `src/videos/services/videos.service.spec.ts`

Siguiendo la convención de NestJS, los archivos de prueba se ubican junto al servicio que validan, utilizando el sufijo .spec.ts.

#### Alcance de las pruebas

Se implementaron dos pruebas principales:

1. Validación del endpoint lógico getVideos()
Se verifica que:

* El método retorne datos definidos
* El resultado no esté vacío
* Los videos estén correctamente ordenados por hypeLevel en orden descendente

2. Validación de la lógica de negocio calculateHype()

Se valida el cálculo del Hype Level, el cual sigue la fórmula:

`hype = (likes + comments) / views`

#### Reglas adicionales:

* Si el título contiene la palabra "tutorial" (case-insensitive), el hype se multiplica por 2
* Si un video no tiene comentarios, el hype es automáticamente 0

Esta prueba asegura que las reglas de negocio se apliquen correctamente sin depender de la capa de presentación.
