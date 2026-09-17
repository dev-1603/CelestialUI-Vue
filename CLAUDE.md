# CelestialUI-Vue — Claude Code Guide & Project Instructions

> **Project:** CelestialUI-Vue (Vue 3 Component Library)  
> **Package Manager:** `pnpm`  
> **Accessibility Standard:** WCAG 2.2 AA  

---

## 1. Modular Rule Routing
This repository uses modular rule files to govern development standards. Before writing or modifying code:
1. Review this root `CLAUDE.md` for global commands, tech stack, and persona context.
2. Read and apply the specific rule files matching the filepaths you are working on:
   - **Core Standards & Quality Gates**: `.cursor/rules/celestial-core.mdc`
   - **Component Authoring & A11y** (`lib/components/**`, `lib/composables/**`): `.cursor/rules/component-standards.mdc`
   - **Testing & QA** (`**/{__tests__,e2e,stories}/**`, `lib/**`): `.cursor/rules/testing-strategy.mdc`

---

## 2. Essential CLI Commands

```bash
# --- Verification & CI ---
pnpm test:ci            # Run full CI suite: lint -> type-check:lib -> test:unit -> test:browser
pnpm lint               # Dual-linter check: oxlint (speed) + eslint (authoritative)
pnpm lint:oxlint        # Fast first-pass logic linting on <script> and TS
pnpm lint:eslint        # Full authoritative Vue template & type-aware linting
pnpm type-check:lib     # Verify library TypeScript declaration types (tsconfig.lib.json)

# --- Testing Pyramid ---
pnpm test:unit          # Tier 1: Unit & logic tests (Vitest JSDOM)
pnpm test:unit:watch    # Interactive unit test watch mode
pnpm test:browser       # Tier 2: Real component browser tests (Vitest Browser + Playwright)
pnpm test:storybook     # Tier 3: Storybook interaction & automated a11y tests
pnpm test:visual        # Tier 4: Lost Pixel visual regression check against baselines
pnpm test:visual:update # Update Lost Pixel visual baseline screenshots
pnpm test:e2e           # Tier 5: Playwright E2E smoke tests (Chromium)
pnpm test:e2e:full      # Playwright full cross-browser E2E (Chromium, Firefox, WebKit)

# --- Development & Build ---
pnpm dev                # Start Vite showcase development server
pnpm storybook          # Start Storybook development server (port 6006)
pnpm build-lib          # Build production component library bundle (ESM + CJS)
pnpm build-storybook    # Build static Storybook artifacts for testing/deployment
```

---

## 3. Tech Stack & Atomic Design Hierarchy

- **Vue 3**: Composition API with `<script setup lang="ts">`.
- **TypeScript**: Strict typing (~5.6).
- **Styling**: Tailwind CSS utility classes paired with CSS custom properties (`--color-*`, `--spacing-*`) for runtime theming (`light`, `dark`, `celestial`).
- **Hierarchy (`lib/components/`)**:
  - `atoms/`: Primitive building blocks with zero internal dependencies (Button, Input, Avatar, Alert, Icon, Checkbox, Switch, Progress, Breadcrumb, Card).
  - `molecules/`: Compositions of atoms (Dialog, Dropdown, FormField, Pagination, SearchBar, Select, Tabs, Toast, Tooltip, DatePicker).
  - `organisms/`: Complex UI sections (Accordion, DataTable, Modal, Navbar, Sidebar, FileUpload).
  - `templates/`: Page-level layout structures and grid scaffolding.
- **Directory Isolation**: `src/` is exclusively for the demo app; library components in `lib/` must NEVER import from `src/`.

---

## 4. The 5 Project Personas & Ownership Split

When approaching tasks, adopt the appropriate persona lens:
1. **Architect**: Owns Atomic hierarchy boundaries, public API contracts in `lib/index.ts`, subpath exports in `package.json`, tree-shakability, and composable abstractions.
2. **Frontend Developer**: Owns SFC implementation (`<script setup lang="ts">`), Tailwind token styling, TypeScript types (`.types.ts`), and WCAG 2.2 AA accessible markup.
3. **QA Engineer**: Owns test design and coverage across all 5 test tiers (`.spec.ts`, `.browser.spec.ts`, `.a11y.spec.ts`, Storybook tests, Lost Pixel baselines, Playwright E2E).
4. **DevOps / CI**: Owns GitHub Actions workflows (`.github/workflows/`), SonarCloud scan setup, and deployment previews.
5. **Reviewer**: Strict gatekeeper enforcing SonarQube thresholds, ensuring all 5 test tiers are present for new components, zero dead code, and conventional commits.

---

## 5. Component Deep Folder Structure (Mandatory)

Every component must follow the deep structure:
```
lib/components/<tier>/<ComponentName>/
├── C<ComponentName>.vue          # Main Vue 3 SFC (<script setup lang="ts">)
├── C<ComponentName>.types.ts     # TypeScript interfaces for props, emits, slots
├── composables/                  # Component composable (e.g. use<ComponentName>.ts)
│   └── use<ComponentName>.ts
├── styles/                       # Component CSS custom properties & overrides
│   └── C<ComponentName>.css
├── __tests__/                    # Component test suites
│   ├── C<ComponentName>.spec.ts         # JSDOM unit tests (Vue Test Utils + vitest-axe)
│   ├── C<ComponentName>.browser.spec.ts # Vitest Browser Mode tests (Playwright engine)
│   └── C<ComponentName>.a11y.spec.ts    # Dedicated accessibility tests
├── stories/                      # Storybook stories with play interaction tests
│   └── C<ComponentName>.stories.ts
├── index.ts                      # Barrel export (component, types, composable)
└── README.md                     # Documentation, API reference, and examples
```

---

## 6. Code Quality & Linter Division

### Dual-Linter Architecture
- **`oxlint` (Speed Layer)**: Fast first-pass AST linting on `<script>` JS/TS logic (`pnpm lint:oxlint`). Used as pre-commit / on-save speed gate.
- **`eslint` (Authoritative CI Gateway)**: Full type-aware and template-aware linting (`pnpm lint:eslint`).
- **RULE**: Never replace ESLint with oxlint. `oxlint` cannot parse or lint Vue `<template>` blocks by design.

### SonarQube Quality Gates (Warning-Only Policy)
- **Cognitive / Cyclomatic Complexity**: Maximum **≤ 8** per function.
- **Zero Duplication**: Extract duplicated transformation or utility code into `lib/utils/`.
- **Strict Typing**: Zero implicit `any`, no untyped public exports.
- **Rollout Status**: Warning-only for initial rollout — flagged in SonarCloud/reviews, not merge-blocking.

---

## 7. Accessibility (WCAG 2.2 AA)

- All interactive elements must carry explicit ARIA telemetry (`aria-label`, `aria-expanded`, `aria-controls`, `aria-describedby`, `aria-live`).
- Sequential keyboard navigation (never positive `tabindex`). Focus rings must use `:focus-visible` with contrast $\ge 3:1$.
- Modals/Dialogs must trap keyboard focus and restore focus to trigger element on close.
- Target size must meet WCAG 2.2 AA minimum ($24 \times 24\text{px}$ or adequate spacing).
- Never rely solely on color to convey information.

---

## 8. Conventional Commits

Format: `<type>(<scope>): <description>`
- **Types**: `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `chore`, `ci`
- **Scopes**: `atoms`, `molecules`, `organisms`, `templates`, `composables`, `styles`, `deps`, `ci`, `docs`
