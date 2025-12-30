## Project-specific Copilot instructions

This repo is a small Vue 3 + Vite single-page app. The guidance below focuses on patterns and commands an AI coding agent should follow to be productive quickly.

- **Run / Build**: development uses Vite. Use the npm scripts in [package.json](package.json#L1-L40): `npm run dev` (dev), `npm run build` (production build), `npm run preview` (preview build).
- **Entrypoints**: the app is mounted in [src/main.js](src/main.js#L1-L30). Router is set up at [src/router/index.js](src/router/index.js#L1-L60) and routes map directly to SFCs in [src/components](src/components).
- **Component style**: components are Single File Components using Vue 3 `<script setup>` (see [src/App.vue](src/App.vue#L1-L80) and other SFCs). Prefer composition-style, no Vuex or Pinia present.

- **Routing conventions**: routes are declared in `src/router/index.js` using named routes (e.g., `name: 'usuarios'`). When adding routes, import the component and add a `{ path, name, component }` entry.

- **Styling**: global styles live in `src/style.css`. `App.vue` contains layout CSS for a fixed top navbar and fixed footer; follow the existing layout approach to maintain spacing (`main` margins).

- **Project dependencies**: only `vue`, `vue-router`, and Vite are used. No backend integration, no API clients, and no test framework is present — avoid adding infrastructure without user approval.

- **File & naming patterns**:
  - All view components live in `src/components`. Use PascalCase for component filenames (e.g., `XestionUsuarios.vue`).
  - Router file imports components relatively (`import X from '../components/X.vue'`). Keep that pattern.

- **Typical small tasks — how AI should implement**:
  - Add a new route and page: update [src/router/index.js](src/router/index.js#L1-L60) and create the SFC in [src/components](src/components).
  - Add a small stateful widget: create a local reactive state inside the SFC using `ref` / `reactive` and keep state local unless user requests cross-component sharing.
  - Styling tweaks: update `src/style.css` or the SFC `<style>` section. Preserve the fixed navbar/footer layout unless changing both layout and spacing consistently.

- **What not to change without asking**:
  - Do not replace the router with a different routing approach (e.g., manual hash handling) without user confirmation.
  - Do not add global state libraries (Vuex/Pinia) unless asked.

- **Examples (copy-ready snippets)**
  - Add a route (edit [src/router/index.js](src/router/index.js#L1-L60)):

```js
import NewPage from '../components/NewPage.vue'
// in routes array add:
{ path: '/new', name: 'new', component: NewPage }
```

  - Minimal component scaffold (put in `src/components/NewPage.vue`):

```vue
<template>
  <section>
    <h1>New Page</h1>
  </section>
</template>

<script setup>
// small local state or props here
</script>

<style>
/* local styles */
</style>
```

If anything here looks incomplete or you'd like the agent to follow stricter conventions (tests, linting, or a state library), tell me which direction and I will update this file.
