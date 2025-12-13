# CreditSmart - EA1: Diseño de Interfaces Web

**Estudiante:** Tu Nombre Aquí

## Descripción
Proyecto de ejemplo para la asignatura "Ingeniería Web I". Se desarrolla una interfaz web para mostrar un catálogo de productos crediticios, un simulador visual y un formulario de solicitud. Incluye versiones estática (HTML/CSS/JS) y dinámica (React).

## Estructura
- **Versión Estática:**
  - index.html
  - simulador.html
  - solicitar.html
  - styles.css
  - assets/

- **Versión React (src/):**
  - App.jsx: Componente principal con routing
  - pages/: Páginas del simulador, home y solicitud
  - components/: Componentes reutilizables
  - data/: Datos de créditos

## Requisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Cuenta de Google Firebase (para almacenar solicitudes)

## Configuración de Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/) y crea un nuevo proyecto.
2. Habilita Firestore Database.
3. En la configuración del proyecto, obtén la configuración web (apiKey, etc.).
4. Reemplaza los valores en `src/firebase.js` con tu configuración real.
5. Las solicitudes de crédito se guardarán en la colección "applications" de Firestore.

## Cómo ejecutar
### Versión Estática
Abre `index.html`, `simulador.html` o `solicitar.html` en el navegador.

### Versión React
1. Instala dependencias: `npm install`
2. Ejecuta en modo desarrollo: `npm run dev`
3. Abre http://localhost:5173 en el navegador
4. Para build de producción: `npm run build`

## Commits sugeridos
- init: Estructura inicial
- feat(index): Página principal
- feat(simulador): Página simulador
- feat(form): Formulario de solicitud
- feat(react): Integración con React
- style: Estilos y responsive
