# CelestialUI-Vue — Design System Analysis Report

**Scope:** Tokens, CSS architecture, icons, type contracts, theming, config schema, and identification of a reference/inspiration design system.
**Date:** 2026-08-31

---

## TL;DR

CelestialUI-Vue is a **hand-crafted, CSS-custom-property-first design system** with **Tailwind CSS layered on top as a utility/build bridge**, **per-component BEM stylesheets**, and a **partially-implemented three-mode theme model** (`light` / `dark` / `celestial`). There is **no formal token pipeline** (no Style Dictionary, no `components.json`, no JSON Schema validation) — tokens are hand-maintained in parallel across CSS, TypeScript, and Tailwind config, which has already produced naming drift. There is **no single explicit "we copied X design system" statement** in the docs; the closest signals are a Shadcn/Radix-style code comment on the Avatar status dot and Heroicons-shaped SVGs bundled in the icon plugin. Structurally, the project most closely resembles the **Chakra UI / Radix-style "headless + token + Tailwind" pattern**, not shadcn/ui (no `components.json`, no CLI installer, no Radix primitives dependency).

---

## 1. Design Tokens

### Where tokens live (3 parallel sources of truth)

| File | Role |
|---|---|
| `lib/themes/base.css` | **Primary/runtime source** — `:root` CSS custom properties, dark-mode override block, global reset |
| `lib/themes/tokens.ts` | TypeScript **interfaces** (`DesignTokens`, `SemanticTokens`, `ColorScale`) — structural typing only |
| `lib/themes/index.ts` | JS token **objects** (`defaultTokens`, `lightTheme`, `darkTheme`, `themes` map) used by the Vue plugin |
| `lib/themes/presets.ts` | Light/dark/high-contrast preset metadata |
| `lib/themes/themes.json` | 14 curated *showcase* palettes (portfolio, SaaS, finance, etc.) — **not wired into runtime CSS** |
| `tailwind.config.js` | Maps Tailwind's `theme.extend` keys to `var(--cui-*)` |

There is **no `design-tokens/` or Style Dictionary build step** — nothing generates the CSS from a canonical JSON source; each file is edited by hand.

### Token categories present

Color (primitive 50–950 scales for `primary/gray/success/warning/danger`), semantic color (background/text/border), typography (family/size/weight/line-height), spacing, border-radius, shadow, z-index, breakpoints, transition/easing.

### Naming convention

Canonical prefix: **`--cui-*`** (e.g. `--cui-color-primary-500`, `--cui-space-4`, `--cui-radius-lg`, `--cui-shadow-sm`, `--cui-z-modal`).

**Drift already exists** and should be cleaned up:
- Rules/docs describe `--color-*` / `--spacing-*`, but code uses `--cui-color-*` / `--cui-space-*`.
- `tailwind.config.js` references vars like `--cui-spacing-xs`, `--cui-border-radius-sm`, `--cui-font-size-md` that don't exist verbatim in `base.css` (which defines `--cui-space-1`, `--cui-radius-sm`, `--cui-font-size-base`).
- Some component CSS uses short aliases never defined globally (`--cui-primary`, `--cui-surface`, `--cui-border`, `--cui-danger`).
- A second, unrelated prefix (`--celestial-progress-bg`, `--celestial-progress-fill`) appears in `CProgress.css`.

**Recommendation:** Pick one canonical prefix, generate Tailwind config and component CSS from a single JSON/TS token source (Style Dictionary or a small custom script) to eliminate drift.

---

## 2. CSS Architecture

- **Tailwind config** (`tailwind.config.js`): `content` scans `index.html`, `src/**`, `lib/**`, `.storybook/**`; `darkMode: ['selector', '[data-theme="dark"], .dark, .cui-dark']`; no plugins; full `theme.extend` bridge mapping colors/spacing/radius/fontSize/fontFamily/fontWeight/boxShadow/zIndex to `var(--cui-*)`.
- **Per-component styling** (35 CSS files under `lib/**/styles/`): base `.css` + optional `.variants.css` / `.animations.css` + `index.css` aggregator. Pattern is **BEM class names computed in a `use<Name>Styles.ts` composable** (e.g. `celestial-button--primary`) combined with **Tailwind `@apply`** inside the component's own CSS file, plus scoped CSS custom properties for a few theme-sensitive components (progress, pin-input, tabs).
- **Global layer:** `lib/themes/base.css` holds the reset, tokens, and dark-mode override block. There is **no dedicated `lib/styles/` shared directory**, despite being implied by architecture docs.
- **PostCSS:** `tailwindcss` + `autoprefixer` only, nothing custom.

This is effectively a **"Tailwind-as-token-bridge + component-scoped BEM/CSS" hybrid**, closer to how Chakra/Ant Design generate class-scoped CSS than to a pure-utility (shadcn) or pure-CSS-in-JS approach.

---

## 3. Icons

- Core: `CIcon.vue` / `CIcon.types.ts` / `useIcon.ts` / `useIconStyles.ts` / `svgLoader.ts` / `config/iconLibraryConfig.ts`, plus a Vue plugin (`lib/plugins/icon.ts`) with ~40 hardcoded Heroicons-shaped SVG paths.
- **No icon package is a dependency** in `package.json`. Instead:
  - **Material Icons** (default) and **Font Awesome 6.4** are loaded via **CDN `<link>` tags** in `.storybook/preview-head.html` — font/class-based icons (`material-icons`, `fas fa-*`).
  - Arbitrary inline SVG via `svg` prop, or a `src` URL fetched/cached by `svgLoader.ts` (no sprite sheet).
  - A small **built-in SVG registry** (`registerIcon()`) styled after Heroicons ships inside the plugin itself.
- **Contract mismatch:** `lib/types/index.ts` and the icon plugin's options type list `lucide` and `heroicons` as valid providers, but `CIcon.types.ts` only actually implements `material | fontawesome | custom`. This is a real inconsistency to fix before calling the icon API stable.

---

## 4. Contracts / Types

- **Per-component contracts:** every implemented component ships a co-located `C<Name>.types.ts` with `C<Name>Props` (JSDoc'd, literal-union variant/size types), `C<Name>Emits`, `C<Name>Slots`, and composable return types (`Use<Name>Return`, `Use<Name>StylesReturn`). 22 such files exist.
- **Shared/global contracts:** `lib/types/index.ts` — `CelestialUIOptions` (theme/icons/globalComponents config), `BaseComponentProps`, `ComponentSize`, `ComponentVariant`, plus a type re-export from `../themes/tokens`. This is thin relative to what `ARCHITECTURE.md` describes (`lib/types/components/`, `lib/types/core/` — **not implemented**).
- **Public API surface:** `lib/index.ts` re-exports every tier + composables + plugins + themes + utils and exposes a `CelestialUI` Vue plugin (`app.use(CelestialUI, options)`).
- **`package.json` exports map** provides tree-shakable subpaths: `.`, `./style.css`, `./themes/*`, `./atoms`, `./molecules`, `./organisms`, `./templates`, `./composables`, `./plugins`, `./utils`, `./components/*`. `peerDependencies` is just `vue: ^3.0.0` — a genuinely lightweight, framework-only contract (no Radix, no Headless UI, no icon lib as a peer/dependency other than `qrcode.vue`).

---

## 5. Theming

- **Mechanism:** `lib/plugins/theme.ts` (`createThemePlugin`) sets `document.documentElement.setAttribute('data-theme', theme)`; `lib/composables/useTheme.ts` injects the plugin state and exposes `setTheme` / `isDark` / `isLight`. **No `ThemeProvider` component exists** — it's plugin + composable only, not a wrapper-component pattern.
- **Three theme names are contractually supported** (`light`, `dark`, `celestial`) but implemented unevenly:
  - `light` — defaults in `:root` of `base.css`.
  - `dark` — real global support: `[data-theme="dark"]` block in `base.css`, Tailwind `dark:` variants throughout components, plus `.dark`/`.cui-dark` classes.
  - `celestial` — **no global `[data-theme="celestial"]` block exists in `base.css`**; it's only defined locally in a couple of components (e.g. `CProgress.css`) and toggled in Storybook's theme switcher. This is the biggest gap between the stated 3-theme contract and the actual implementation.
- Storybook (`.storybook/preview.ts`) has a working theme toolbar (light/dark/celestial) that sets `data-theme` + `dark`/`cui-dark` classes per story.
- The demo app's `src/pages/ThemesPage.vue` "Apply Theme" button is cosmetic and **does not call `useTheme().setTheme()`** — it doesn't actually wire the 14 `themes.json` palettes into the running app.

**Recommendation:** Either finish `celestial` as a first-class theme (add its `[data-theme="celestial"]` block to `base.css`) or demote it to "experimental" in the docs until it is.

---

## 6. Config Schema

| File | Purpose |
|---|---|
| `package.json` | `@celestial-ui/vue`; subpath exports per atomic tier; `files: ["dist","lib"]`; single runtime dep `qrcode.vue`; peer dep `vue@^3` only |
| `tsconfig.json` + `tsconfig.lib.json`/`tsconfig.app.json`/`tsconfig.node.json`/`tsconfig.vitest.json` | Project-references split; lib build is strict, scoped to `lib/**/*`, path alias `@lib/*` |
| `vite.config.ts` | Demo app build (aliases `@`→`src`, `@lib`→`lib`) |
| `vite.config.lib.ts` | Library build: dual ESM+UMD output, `vite-plugin-dts` for `.d.ts`, externalizes `vue`, extracts `style.css` |
| `tailwind.config.js` | Token→utility bridge (see §2) |
| `postcss.config.js` | `tailwindcss` + `autoprefixer` |
| `sonar-project.properties` | SonarCloud project config |

**Not present:** a `components.json` (shadcn-style CLI config), any JSON Schema for validating component/token structure, or a codegen manifest. Config is entirely hand-written, standard Vite/TS/Tailwind boilerplate — there is no design-system-specific config schema layer beyond what Tailwind/TS provide.

---

## 7. Atomic Design — actual implementation status

| Tier | Folders | Notes |
|---|---|---|
| `atoms/` | 10 | alert, avatar, breadcrumb, button, card, checkbox, icon, input, progress, switch |
| `molecules/` | 8 | countdown-timer, dialog, dropdown-menu, password-input, pin-input, social-login-button, tabs, toast (toast export currently disabled) |
| `organisms/` | 5 | all auth-focused: auth-method-dispatcher, identifier-first-resolver, mfa-challenge-panel, qr-session-canvas, user-tenant-dropdown |
| `templates/` | 0 | `templates/index.ts` is a placeholder registry only — 9 layouts planned, all `implemented: false` |

Every implemented component does follow the mandated deep folder structure (`.vue`, `.types.ts`, `composables/`, `styles/`, `__tests__/`, `stories/`, `index.ts`, `README.md`), so the *process* discipline from the rules is genuinely being followed even though the token/theme layer beneath it has drift.

---

## 8. Reference Design System — what does it actually follow?

**No explicit "inspired by ___" statement exists anywhere in the docs, rules, or code comments at the project level.** Searched: `ARCHITECTURE.md`, `PROJECT_SUMMARY.md`, `DEVELOPMENT_ROADMAP.md`, `.cursor/rules/*.mdc`, `README.md` — none name a reference system.

The only concrete signals found:

- A single code comment in `CAvatar.css`: `/* Status indicator dot (Shadcn/Radix style overlay) */` — implies the author was visually referencing **shadcn/ui / Radix** for that one detail, not the system as a whole.
- The icon plugin's bundled SVGs are stylistically **Heroicons** (outline, 24×24, stroke-based), though uncredited and not installed as a dependency.
- The demo app's leftover `src/assets/base.css` still credits Vue's official starter theme (`github.com/vuejs/theme`) — an artifact of `create-vue` scaffolding, not a deliberate design reference.

**Architecturally**, based on actual mechanisms in place (CSS custom properties as the source of truth + Tailwind consuming them via `theme.extend` + `data-theme` attribute switching + per-component scoped CSS), the closest real-world analogues are:

- **Chakra UI / Ant Design**-style "semantic token → theme object → component class" pipeline (token layer decoupled from component styling), rather than
- **shadcn/ui**'s "copy-paste primitives + `components.json` + Radix" model (no CLI, no `components.json`, no Radix dependency here), or
- **Material Design** (despite using Material Icons as a default font, there's no Material elevation/motion/typography spec being followed — it's just the icon font).

**Conclusion:** CelestialUI-Vue is a **custom, token-driven design system of its own** (`--cui-*` namespace, atomic-design folder contract, three-theme model) rather than a direct port of an existing published design system. If the goal is to formally adopt a reference system going forward, the codebase's current CSS-variable + Tailwind approach is most compatible with adopting **Radix Themes' token model** or **Chakra UI v3's semantic token/recipe system** as a naming/structure reference — both would slot in with minimal rework, versus shadcn/ui which would require adding Radix primitives and a CLI-based scaffolding model this project doesn't currently use.

---

## 9. Key Gaps / Recommendations Summary

1. **Unify token naming** — resolve `--cui-color-*` vs `--cui-*` vs `--celestial-*` drift; make `tailwind.config.js` reference only vars that actually exist in `base.css`.
2. **Add a token build step** (even a minimal script or Style Dictionary) so `base.css`, `tokens.ts`, `themes.json`, and `tailwind.config.js` stop being hand-synced in four places.
3. **Finish the `celestial` theme** globally in `base.css`, or mark it experimental in docs until it has full token coverage like `dark`.
4. **Fix the icon provider contract** — either implement `lucide`/`heroicons` providers referenced in `lib/types/index.ts`, or remove them from the type union.
5. **Wire `ThemesPage.vue`'s "Apply Theme" button** to `useTheme().setTheme()` so the 14 curated palettes in `themes.json` are actually usable at runtime.
6. **Reconcile `ARCHITECTURE.md`** with reality — it documents a deeper `lib/types/`, `lib/styles/`, and build/config tree that doesn't exist yet; either implement it or trim the doc to match current structure.
7. If a reference design system is desired going forward, **document that decision explicitly** in `ARCHITECTURE.md` (e.g. "token structure modeled after Radix Themes / Chakra UI") so future contributors have a stated north star instead of ad hoc conventions.
