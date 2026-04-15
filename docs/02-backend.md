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

- `VideoInputDto`: define la estructura del JSON de entrada proveniente del mock de YouTube.
- `VideoResponseDto`: define la estructura de salida consumida por el frontend.

Estos DTOs permiten:
- Validar la data de entrada
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