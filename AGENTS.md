# CelestialUI-Vue — Antigravity Workspace Directives

> **Workspace:** CelestialUI-Vue (Vue 3 Component Library)  
> **Package Manager:** `pnpm`  
> **Accessibility Standard:** WCAG 2.2 AA  

---

## 1. Modular Rule Routing
This project uses modular rule files to define precise architectural and development standards. Before writing or modifying code in this workspace:
1. Adhere to the core system directives in this file.
2. Cross-reference the specific modular rule files corresponding to your target domain:
   - **Core Rules & Quality Gates**: `.cursor/rules/celestial-core.mdc`
   - **Component Architecture & A11y** (`lib/components/**`, `lib/composables/**`): `.cursor/rules/component-standards.mdc`
   - **Testing Pyramid & Verification** (`**/{__tests__,e2e,stories}/**`, `lib/**`): `.cursor/rules/testing-strategy.mdc`

---

## 2. Tech Stack & Architectural Hierarchy
- **Framework & Language**: Vue 3 (Composition API, `<script setup lang="ts">`) + TypeScript (~5.6 strict mode).
- **Styling & Tokens**: Tailwind CSS utilities + CSS custom properties (`--color-*`, `--spacing-*`) supporting runtime theme switching (`light`, `dark`, `celestial`).
- **Atomic Design Structure (`lib/components/`)**:
  - `atoms/`: Primitive building blocks with zero internal dependencies (Button, Input, Avatar, Alert, Icon, Checkbox, Switch, Progress, Breadcrumb, Card).
  - `molecules/`: Composed multi-element units (Dialog, Dropdown, FormField, Pagination, SearchBar, Select, Tabs, Toast, Tooltip, DatePicker).
  - `organisms/`: Complex composite UI components (Accordion, DataTable, Modal, Navbar, Sidebar, FileUpload).
  - `templates/`: Page-level layout templates and layout wrappers.
- **Directory Isolation**: `lib/` contains all library source code; `src/` contains only the demo/showcase app. Never import `src/` inside `lib/`.

---

## 3. The 5 Project Personas
Operate through the appropriate engineering persona based on the task:
- **Architect**: Manages Atomic level boundaries, modularity, public API contracts in `lib/index.ts`, `package.json` subpath exports, tree-shaking, and composables.
- **Frontend Developer**: Implements SFC components (`<script setup lang="ts">`), Tailwind token classes, `.types.ts` contracts, and WCAG 2.2 AA compliant markup.
- **QA Engineer**: Designs and implements test coverage across the 5-tier pyramid (`.spec.ts`, `.browser.spec.ts`, `.a11y.spec.ts`, Storybook tests, Lost Pixel baselines, Playwright E2E).
- **DevOps / CI**: Maintains `.github/workflows/`, SonarCloud scans, and CI verification scripts (`test:ci`, `type-check:lib`).
- **Reviewer**: Strictly gates PRs for SonarQube rules, test suite completeness across all tiers, clean types, zero dead code, and conventional commits.

---

## 4. Component Deep Folder Structure
Every component must follow the deep structure:
```
lib/components/<tier>/<ComponentName>/
├── C<ComponentName>.vue          # Main SFC with <script setup lang="ts">
├── C<ComponentName>.types.ts     # TypeScript interfaces/types
├── composables/                  # Component-specific composable
│   └── use<ComponentName>.ts
├── styles/                       # CSS custom properties and styles
│   └── C<ComponentName>.css
├── __tests__/                    # 3-tier component test suite
│   ├── C<ComponentName>.spec.ts         # JSDOM unit tests (VTU + vitest-axe)
│   ├── C<ComponentName>.browser.spec.ts # Vitest Browser Mode tests (Playwright engine)
│   └── C<ComponentName>.a11y.spec.ts    # Dedicated accessibility assertions
├── stories/                      # Storybook stories & play interactions
│   └── C<ComponentName>.stories.ts
├── index.ts                      # Barrel export (component, types, composables)
└── README.md                     # Documentation and usage examples
```

---

## 5. The 5-Tier Testing Pyramid & Verification Commands
- **Tier 1 (Unit / JSDOM)**: `lib/**/__tests__/*.spec.ts` -> `pnpm test:unit`
- **Tier 2 (Browser Mode)**: `lib/**/__tests__/*.browser.spec.ts` -> `pnpm test:browser`
- **Tier 3 (Storybook / A11y)**: `lib/**/stories/*.stories.ts` -> `pnpm test:storybook` (`pnpm test:a11y`)
- **Tier 4 (Visual Regression)**: `.lostpixel/baseline/` -> `pnpm test:visual` / `pnpm test:visual:update`
- **Tier 5 (Playwright E2E)**: `e2e/*.spec.ts` -> `pnpm test:e2e` / `pnpm test:e2e:full`
- **Full CI Suite**: `pnpm test:ci` (runs `lint` -> `type-check:lib` -> `test:unit` -> `test:browser`)

---

## 6. Code Quality & Linting Division
- **`oxlint` (Speed Layer)**: `pnpm lint:oxlint` — rapid first-pass AST linting on `<script>` logic.
- **`eslint` (Authoritative CI Gateway)**: `pnpm lint:eslint` — type-aware linting & full Vue `<template>` analysis.
- *Rule*: Never substitute ESLint with oxlint; oxlint does not parse Vue `<template>` AST by design.
- **SonarQube Quality Gates**: Cognitive complexity $\le 8$, zero duplication, strict typing without `any`. *(Rollout policy: Warning-only, non-merge-blocking)*.

---

## 7. Accessibility (WCAG 2.2 AA)
- Explicit interactive telemetry (`aria-label`, `aria-expanded`, `aria-controls`, `aria-describedby`, `aria-live="polite"`).
- Keyboard portability: tab navigation, focus rings (`:focus-visible` with $\ge 3:1$ contrast), modal focus trapping + restore.
- Target size: minimum $24 \times 24\text{px}$ or sufficient spacing.
- Always pair color with text, icons, or badges to convey status.

---

## 8. Commit Conventions
Format: `<type>(<scope>): <description>`  
Types: `feat` | `fix` | `refactor` | `perf` | `test` | `docs` | `chore` | `ci`  
Scopes: `atoms` | `molecules` | `organisms` | `templates` | `composables` | `styles` | `deps` | `ci` | `docs`
