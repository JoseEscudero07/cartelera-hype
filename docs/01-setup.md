## Setup del Proyecto — Cartelera Hype

## Objetivo

Definir la estructura inicial del proyecto y establecer las bases para el desarrollo del backend y frontend, manteniendo una organización clara y escalable.

## Estructura del repositorio
Se adoptó una arquitectura de monorepo, separando backend y frontend en carpetas independientes bajo un mismo repositorio:

cartelera-hype/
├── backend/
├── frontend/
├── docs/
├── DECISIONS.md/
└── README.md/

Esta decisión permite centralizar todo el proyecto en un único repositorio, facilitar la ejecución y revisión del código y mantener una organización clara por responsabilidades.



## Configuración de puertos
Se configuraron puertos distintos para evitar conflictos al ejecutar ambos servicios simultáneamente:
Backend http://localhost:3000
Frontend http://localhost:5173

##  Comunicación entre servicios
El frontend consumirá los datos desde el backend a través del siguiente endpoint:
GET /api/videos
Se habilitará CORS en el backend para permitir la comunicación entre ambas aplicaciones.

## Documentación
Las decisiones técnicas y el proceso de desarrollo se registran en archivos dentro de la carpeta docs/. Esto permite documentar el razonamiento detrás de cada implementación, mantener un registro contextualizado del progreso y facilitar la revisión del proyecto.

## Manejo de variables de entorno

Se definió el uso de archivos `.env` para la configuración del proyecto (por ejemplo, el puerto del frontend).

Se incluye un archivo `.env.example` con los valores necesarios para facilitar la ejecución del proyecto por parte de terceros.

