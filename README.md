# celestialui-vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Tests

QA pyramid (pnpm):

- `pnpm test:unit` — Vitest jsdom (CI uses `vitest run`, not watch)
- `pnpm test:browser` — Vitest Browser Mode (Playwright Chromium)
- `pnpm test:e2e` — Playwright against the demo preview (`e2e/`)
- `pnpm test:storybook` / `pnpm test:a11y` — Storybook test-runner (axe gated via addon-a11y)
- `pnpm test:visual` — Lost Pixel vs committed baselines (`.lostpixel/baseline`)
- `pnpm test:visual:update` — refresh Lost Pixel baselines

Chromatic is a **docs-only fallback** if you later want hosted visual review. It is not installed; Lost Pixel is the visual runner.

```sh
pnpm test:unit
pnpm test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
