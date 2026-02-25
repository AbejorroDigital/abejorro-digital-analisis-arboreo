<div align="center">
# 🐝 Abejorro Digital: Análisis Arbóreo
  
  **Plataforma Inteligente de Análisis Sintáctico y Morfológico impulsada por IA.**
</div>

---

## 📖 Descripción

**Abejorro Digital - Análisis Arbóreo** es una herramienta educativa y técnica avanzada diseñada para desglosar la complejidad del lenguaje. Utilizando modelos de Inteligencia Artificial de última generación (Google Gemini), la aplicación transforma oraciones en representaciones visuales jerárquicas (árboles sintácticos) y proporciona un análisis morfológico detallado de cada componente.

Ideal para estudiantes de lingüística, desarrolladores interesados en procesamiento de lenguaje natural y entusiastas de la lengua española.

## ✨ Características Principales

### 🌳 Análisis Sintáctico Inteligente
- **Motor de IA (Gemini):** Análisis instantáneo de oraciones complejas.
- **Visualización Arbórea (D3.js):** Generación automática de árboles generativos interactivos.
- **Micro-análisis Morfológico:** Identificación de categorías gramaticales y funciones sintácticas.
- **Exportación Flexible:** Descarga tus análisis en formatos **PNG (alta resolución)**, **SVG** y **PDF**.

### 📚 Glosario Interactivo
- Diccionario técnico integrado con términos de sintaxis y gramática.
- Navegación fluida y diseño optimizado para el aprendizaje progresivo.

### 🧪 Laboratorio de Práctica
- Un entorno dedicado a la experimentación y validación de conocimientos.
- Desafíos y cuestionarios interactivos para potenciar la comprensión lingüística.

## 🛠️ Stack Tecnológico

La aplicación está construida con tecnologías modernas para garantizar rendimiento, escalabilidad y una experiencia de usuario premium:

- **Frontend:** [React 19](https://react.dev/) con [TypeScript](https://www.typescriptlang.org/).
- **Visualización:** [D3.js](https://d3js.org/) para el renderizado dinámico de estructuras arbóreas.
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) para una interfaz minimalista y elegante.
- **IA:** [@google/genai](https://ai.google.dev/) para la integración con Gemini 1.5.
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/) para transiciones suaves y dinámicas.
- **Iconografía:** [Lucide React](https://lucide.dev/).
- **Entorno de Desarrollo:** [Vite](https://vitejs.dev/) para compilaciones ultra-rápidas.

## 🚀 Instalación y Uso Local

### Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18 o superior).
- Una API Key de [Google AI Studio](https://aistudio.google.com/).

### Pasos para Empezar

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/AbejorroDigital/abejorro-digital-analisis-arboreo.git
   cd abejorro-digital-analisis-arboreo
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto (puedes usar `.env.example` como base):
   ```bash
   GEMINI_API_KEY=tu_clave_api_aqui
   ```

4. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`.

## 📂 Estructura del Proyecto

```text
src/
├── components/     # Componentes de la interfaz (Tree, UI, Forms)
├── services/       # Lógica de integración con la IA (Gemini)
├── data/           # Datos estáticos y glosarios
├── types/          # Definiciones de TypeScript
├── App.tsx         # Orquestador principal de la App
└── main.tsx        # Punto de entrada
```

## 🎨 Filosofía de Diseño

Abejorro Digital sigue una estética **Premium Minimalista**, priorizando la legibilidad y la claridad visual. El uso de tipografías serif para títulos y sans-serif para datos técnicos crea un equilibrio perfecto entre lo académico y lo tecnológico.

---

<div align="center">
  Desarrollado con ❤️ para la comunidad lingüística digital.
</div>

