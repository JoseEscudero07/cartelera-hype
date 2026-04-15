
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

