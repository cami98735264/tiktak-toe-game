# Juego de Triqui (Tres en Raya)

Este proyecto es una implementación moderna del clásico juego de Triqui (Tres en Raya), desarrollado como una aplicación web interactiva utilizando SvelteKit. El juego combina la estrategia tradicional del Triqui con elementos educativos de matemáticas, creando una experiencia única y desafiante.

## 🎮 Descripción del Juego

El Triqui es un juego de estrategia para dos jugadores que se juega en un tablero de 3x3. Sin embargo, esta versión añade un elemento educativo único: para colocar tu marca en el tablero, primero debes responder correctamente una pregunta de matemáticas.

### 🎯 Objetivo del Juego
El objetivo principal es formar una línea de tres símbolos iguales (X u O) en el tablero, ya sea horizontal, vertical o diagonal. Pero para poder colocar tu símbolo, debes demostrar tus habilidades matemáticas.

### ⚙️ Mecánica Principal
- Los jugadores alternan turnos para colocar sus símbolos (X u O) en el tablero
- Antes de cada jugada, el jugador debe responder una pregunta de matemáticas
- Si la respuesta es correcta, puedes colocar tu símbolo en el tablero
- Si la respuesta es incorrecta, pierdes una vida y el turno pasa al otro jugador

### ❤️ Sistema de Vidas
- Cada jugador comienza con 5 vidas
- Pierdes una vida cada vez que respondes incorrectamente una pregunta
- El juego termina cuando un jugador pierde todas sus vidas
- El jugador con vidas restantes gana automáticamente

### ⏱️ Sistema de Tiempo
- El juego tiene un límite de tiempo de 5 minutos
- Si el tiempo se agota y no hay ganador, el juego termina en empate
- El temporizador se muestra en la parte superior de la pantalla

### 🎮 Controles
- Usa las flechas del teclado o WASD para navegar por el menú
- Presiona Enter o Espacio para seleccionar una opción
- Durante el juego, haz clic en una celda para seleccionarla
- Responde las preguntas matemáticas seleccionando la opción correcta

## 🚀 Características Técnicas

- Interfaz de usuario moderna y responsiva
- Implementación del juego de Triqui con todas sus reglas
- Sistema de preguntas matemáticas integrado
- Almacenamiento persistente del estado del juego
- Desarrollado con TypeScript para mayor seguridad de tipos
- Optimizado para producción
- Diseño adaptable a diferentes dispositivos

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- npm o pnpm

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd juego-triqui
```

2. Instala las dependencias:
```bash
npm install
# o
pnpm install
```

## 🚀 Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
# o
pnpm dev
```

Esto iniciará el servidor de desarrollo en `http://localhost:5173` por defecto.

## 🏗️ Construcción

Para crear una versión de producción:

```bash
npm run build
# o
pnpm build
```

## 📦 Despliegue

El proyecto está configurado para ser desplegado en Vercel, pero también puede ser adaptado para otros entornos. Para desplegar:

1. Asegúrate de que la construcción de producción esté lista
2. Sigue las instrucciones de despliegue de tu plataforma preferida

## 🛠️ Tecnologías Utilizadas

- SvelteKit - Framework web
- TypeScript - Lenguaje de programación
- Vite - Bundler y servidor de desarrollo
- svelte-persisted-store - Para almacenamiento persistente

## 📁 Estructura del Proyecto

```
juego-triqui/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── screens/           # Pantallas principales del juego
│   │   │   │   ├── Game.svelte           # Pantalla principal del juego
│   │   │   │   ├── HowToPlay.svelte      # Pantalla de instrucciones
│   │   │   │   ├── MainMenu.svelte       # Menú principal
│   │   │   │   ├── PlayerNames.svelte    # Pantalla de nombres de jugadores
│   │   │   │   └── Settings.svelte       # Pantalla de configuración
│   │   │   ├── layout/            # Componentes de diseño
│   │   │   │   ├── LayoutGame.svelte     # Layout para la pantalla de juego
│   │   │   │   ├── LayoutSettings.svelte # Layout para la pantalla de configuración
│   │   │   │   ├── LayoutStart.svelte    # Layout para la pantalla inicial
│   │   │   │   └── LayoutSection.svelte  # Layout para secciones
│   │   │   ├── hooks/             # Hooks personalizados
│   │   │   └── ui/                # Componentes de interfaz de usuario
│   │   ├── stores/                # Almacenes de estado
│   │   │   ├── preferences.ts     # Preferencias del usuario
│   │   │   └── screens.ts         # Estado de las pantallas
│   │   ├── types/                 # Definiciones de tipos
│   │   │   └── index.ts           # Tipos globales
│   │   ├── utils/                 # Utilidades
│   │   │   └── index.ts           # Funciones de utilidad
│   │   └── index.ts               # Punto de entrada de la librería
│   ├── routes/
│   │   └── +page.svelte           # Página principal de la aplicación
│   ├── app.html                   # Plantilla HTML base
│   └── app.d.ts                   # Definiciones de tipos globales
├── static/
│   ├── assets/
│   │   ├── audios/                # Archivos de audio
│   │   ├── backgrounds/           # Fondos del juego
│   │   ├── icons/                 # Iconos
│   │   ├── logos/                 # Logos
│   │   └── questions.json         # Banco de preguntas
│   ├── fonts/                     # Fuentes personalizadas
│   └── favicon.png                # Icono de la aplicación
├── package.json                   # Dependencias y scripts
├── svelte.config.js               # Configuración de SvelteKit
├── tsconfig.json                  # Configuración de TypeScript
├── vite.config.ts                 # Configuración de Vite
└── .gitignore                     # Archivos ignorados por Git
```

## 🎯 Propósito del Proyecto

Este proyecto fue desarrollado con los siguientes objetivos:

1. **Educativo**: 
   - Combinar el aprendizaje de matemáticas con el entretenimiento
   - Fomentar el pensamiento estratégico y la resolución de problemas
   - Hacer el aprendizaje más interactivo y divertido

2. **Práctico**: 
   - Proporcionar una implementación moderna y eficiente del clásico juego de Triqui
   - Crear una experiencia de usuario fluida y atractiva
   - Mantener la simplicidad del juego original mientras se añaden elementos educativos

3. **Técnico**: 
   - Explorar conceptos como:
     - Gestión de estado en aplicaciones Svelte
     - Persistencia de datos en el navegador
     - Desarrollo de interfaces de usuario responsivas
     - Implementación de lógica de juego
     - Optimización de rendimiento

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir los cambios propuestos antes de hacer un pull request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
