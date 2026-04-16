# Cartelera Hype

Proyecto full-stack (backend + frontend) que consume una API de videos y muestra los resultados en una interfaz web.

---

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

---

## Clonar el proyecto

```bash
git clone <URL_DEL_REPOSITORIO>
cd cartelera-hype

```

## Backend
### Instalar dependencias
``` cd backend
    npm install
```
### Ejecutar backend
`npm run start`

El backend corre en:
`http://localhost:3000`

## Frontend
### Instalar dependencias
```cd frontend
    npm install
```
### Ejecutar frontend
`npm run dev`

El frontend corre por defecto en:
`http://localhost:5173`

## Variables de entorno (Frontend)
Crear archivo .env dentro de /frontend:
`VITE_API_URL=http://localhost:3000`
También puedes usar `.env.example` como referencia.

Si no se define un archivo .env, la aplicación utiliza por defecto:
`http://localhost:3000`
Esto permite que el proyecto funcione sin configuración adicional en entorno local.
