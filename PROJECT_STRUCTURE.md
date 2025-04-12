# TheFlames Project Structure

This document provides an overview of the project structure and organization of TheFlames application.

## Root Files

- `eslint.config.js`: Modern flat ESLint configuration file
- `index.html`: HTML entry point for the Vite application
- `package.json`: Project dependencies and scripts
- `README.md`: Project documentation
- `tailwind.config.js`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration file
- `tsconfig.node.json`: TypeScript configuration for Node.js
- `vite.config.ts`: Vite bundler configuration

## Source Structure

The project source code is organized in the following structure:

### Core Files

- `src/App.scss`: Main application styles
- `src/App.tsx`: Main application component
- `src/main.tsx`: Application entry point

### Assets (`src/assets/`)

Contains all static assets such as images, animations, and JSON files used in the application:

- SVG files: Logo, background images, icons
- PNG/JPG files: Background images, UI elements
- JSON files: Animation configurations
- Lottie animations
- Media files (webm, gif)

### Components (`src/components/`)

Reusable UI components organized into:

- **Common**: Shared components used across the application

  - **PreLoader**: Loading screen component

- **Layout**: Components defining the application structure

  - **Footer**: Application footer component

- **UI**: Individual UI elements
  - **AnimatedFlames**: Animated flames component
  - **CustomToggle**: Toggle UI component
  - **FlamesLogo**: Logo component

### Features (`src/features/`)

Larger feature modules that encapsulate domain-specific functionality.

### Library (`src/lib/`)

Utility code, services, hooks, and constants:

- **Constants**: Application-wide constant values
- **Hooks**: Custom React hooks
- **Services**: API services and data providers
- **Utils**: Utility functions
  - **Animations**: Animation utilities (framer, gsap, lenis)
  - **Keyboard Navigation**: Keyboard event handling
  - **Toast**: Toast notification utilities

### Pages (`src/pages/`)

Application pages/views:

- **FlamesMain**: Main application page
- **GamePlay**: Game play page
- **LobyMain**: Lobby page
- **ManualBoard**: Manual board interface
- **MobileViewError**: Mobile error page
- **NotFound**: 404 page
- **UserProfile**: User profile page

### Styles (`src/styles/`)

Global styling files:

- `_theme.scss`: Theme variables and overrides
- `index.scss`: Main style entry point

### Types (`src/types/`)

TypeScript type definitions:

- `env.d.ts`: Environment variable typings
- `index.ts`: Shared type definitions

### Utilities (`src/utilities/`)

Additional utility functions:

- **Keyboard Navigation**: Keyboard event utilities
- **Toast**: Toast notification components

## Path Aliases

The application uses the following path aliases for easier imports:

- `@/*`: `./*` (Root project directory)
- `@src/*`: `./src/*` (Source directory)
- `@os/theflames-src/*`: `./src/*`
- `@assets/*`: `./src/assets/*`
- `@styles/*`: `./src/styles/*`
- `@components/*`: `./src/components/*`
- `@features/*`: `./src/features/*`
- `@lib/*`: `./src/lib/*`
- `@hooks/*`: `./src/lib/hooks/*`
- `@services/*`: `./src/lib/services/*`
- `@constants/*`: `./src/lib/constants/*`
- `@utils/*`: `./src/lib/utils/*`
- `@utilities/*`: `./src/utilities/*`
- `@pages/*`: `./src/pages/*`
- `@types/*`: `./src/types/*`
