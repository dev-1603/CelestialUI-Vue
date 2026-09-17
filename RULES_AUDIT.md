# Cursor Rules Audit Report & Multi-Tool Alignment Strategy

> **Project:** CelestialUI-Vue  
> **Date:** August 2026  
> **Status:** Phase 1 Complete (Audit & Assessment)

---

## 1. Executive Summary

An audit of the existing `.cursor/rules/` directory was conducted against the finalized Vue 3 component library stack, Atomic Design hierarchy, quality gates (SonarQube, Oxlint, ESLint), and the finalized 5-tier testing pyramid (Vitest JSDOM, Vitest Browser Mode, Storybook Test-Runner + a11y, Lost Pixel Visual Regression, Playwright E2E).

The existing 4 MDC rule files (`code-quality.mdc`, `component-creation.mdc`, `design-principle.mdc`, `vue-library.mdc`) contain conflicting conventions, framework bleed-through (React/Svelte syntax), broken file glob scopes (`src/` instead of `lib/`), and generic filler text while missing vital stack guidelines, quality gate thresholds, and persona-driven behaviors.

---

## 2. Current Rules Coverage by File

| File Name | Intended Scope | Key Rules Covered | Activation Mode |
| :--- | :--- | :--- | :--- |
| `code-quality.mdc` | General testing & code quality | Linting on save, TDD preference, atomic commits, PR reviews, broad `>90%` coverage target. | `alwaysApply: false` |
| `component-creation.mdc` | Component scaffolding | Proposed folder structure (`C[Name].vue`, `.types.ts`, `composables/`, `styles/`, `__tests__/`, `stories/`, `README.md`). | `alwaysApply: false` |
| `design-principle.mdc` | Design & UI principles | Relative units (`rem`/`clamp`), CSS variable theming, mobile-first design, WCAG compliance. | `alwaysApply: false` |
| `vue-library.mdc` | Vue 3 development standards | `<script setup lang="ts">`, PascalCase naming, Vue Test Utils snippet, Vite build references. | `globs: ["src/**/*.{vue,ts,js}"]`<br>`alwaysApply: true` |

---

## 3. Stale, Incorrect & Broken Rules

1. **Framework Bleed-Through (Foreign APIs)**:
   - `design-principle.mdc` instructs the AI to avoid unnecessary re-renders using `memo`, `useCallback` (React APIs), and `svelte:options immutable` (Svelte API) in a pure Vue 3 project.
2. **Broken / Inverted Glob Scopes**:
   - `vue-library.mdc` sets `globs: ["src/**/*.{vue,ts,js}"]`, targeting only the demo application in `src/`. The actual component library source code lives in `lib/`, meaning this rule fails to trigger automatically on core component files.
3. **Scaffold Path Discrepancy**:
   - `component-creation.mdc` references `@components/` instead of the canonical Atomic Design path: `lib/components/{atoms,molecules,organisms,templates}/<component-name>/`.
4. **Outdated Accessibility Standard**:
   - Rules mandate **WCAG 2.1 AA**, whereas current project standards require **WCAG 2.2 AA** (focus appearance, target size, dragging movements, interactive telemetry).
5. **MDC Format Misuse**:
   - `component-creation.mdc` is authored as a one-shot copy-paste prompt template (`Component to generate: <COMPONENT_NAME> ... Return ONLY...`) rather than a continuous architectural constraint for the AI assistant.
6. **Cypress residue (resolved in Phase 2)**:
   - Cypress packages, `cypress/` tree, and Cypress CI were removed. QA is Vitest (jsdom + browser), Playwright E2E, Storybook test-runner, Lost Pixel, and SonarQube Cloud.

---

## 4. Missing Critical Stack Decisions & Conventions

### 4.1 The 5-Tier Testing Pyramid
The current rules lack precise file location conventions, commands, and authoring guidelines for the finalized QA stack:
- **Tier 1: Unit & Logic Tests (JSDOM)**
  - Path: `lib/**/__tests__/*.spec.ts`
  - Engine: Vitest (`pnpm test:unit`) + Vue Test Utils + `vitest-axe`
- **Tier 2: Real Component Browser Tests**
  - Path: `lib/**/__tests__/*.browser.spec.ts`
  - Engine: Vitest Browser Mode with Playwright Chromium (`pnpm test:browser`)
- **Tier 3: Storybook Component Stories & Interaction/A11y Tests**
  - Path: `lib/**/stories/*.stories.ts`
  - Engine: `@storybook/test-runner` + `@storybook/addon-a11y` (`pnpm test:storybook` / `pnpm test:a11y`)
- **Tier 4: Visual Regression Testing**
  - Path: `.lostpixel/baseline/`
  - Engine: Lost Pixel (`pnpm test:visual`, `lostpixel.config.ts`), Git-owned baselines (Chromatic is docs-only fallback)
- **Tier 5: End-to-End User Journey Tests**
  - Path: `e2e/*.spec.ts`
  - Engine: Playwright Test (`pnpm test:e2e`) against Vite preview (`http://localhost:4173`)

### 4.2 SonarQube Quality Gates & Static Analysis
- **Cognitive / Cyclomatic Complexity**: Maximum **≤ 8** per function (automatic gate block).
- **Zero Duplication Policy**: Zero copy-paste logic across utility and transformation functions.
- **Strict Typing**: Zero implicit `any`, no untyped public exports, strict JSDoc/TSDoc on public interfaces.
- **Dual-Linter Toolchain**: `oxlint` for rapid AST correctness (`pnpm lint:oxlint`) followed by `eslint` (`pnpm lint:eslint`).

### 4.3 Project Persona Ownership Model
No contextual guidance currently exists for how the AI should reason across different task types:
- **Architect Persona**: Owns Atomic boundaries, modularity, public API contracts (`lib/index.ts`), tree-shaking, package exports.
- **Frontend Persona**: Owns SFC implementation (`<script setup lang="ts">`), Tailwind & CSS custom properties, types, composables, WCAG 2.2 AA ARIA semantics.
- **QA Persona**: Owns test coverage across the 5 tiers, regression suite integrity, a11y assertions, synthetic test data factories.
- **DevOps/CI Persona**: Owns GitHub Actions workflows (`.github/workflows/`), CI scripts (`test:ci`, `type-check:lib`, SonarCloud token), build/preview configurations.
- **Reviewer Persona**: Acts as strict gatekeeper enforcing complexity ≤ 8, 100% test tier presence, zero dead code, conventional commit formats.

---

## 5. Redundant & Conflicting Rules

1. **Direct Contradiction on File Layout**:
   - `vue-library.mdc` specifies a flat structure: `Component.vue`, `Component.test.ts`, `index.ts`.
   - `component-creation.mdc` specifies a deep folder: `C[Component].vue`, `C[Component].types.ts`, `composables/`, `styles/`, `__tests__/C[Component].spec.ts`, `stories/C[Component].stories.ts`, `index.ts`, `README.md`.
2. **Duplicated Generic Directives**:
   - Linting, a11y, and testing requirements are repeated across 3 separate files using vague, non-actionable descriptions.
3. **Internal Self-Duplication**:
   - `design-principle.mdc` repeats its own content in a redundant "Rules Summary" section at the end of the file.

---

## 6. Length & Structure Assessment

- **Token Overhead vs Signal**: ~180 total lines containing ~60% generic best-practice filler ("write clear code", "meaningful variable names", "avoid dead code"). This consumes model context on every turn without adding repo-specific value.
- **Misconfigured Activation**: Three out of four files have `alwaysApply: false`, leaving the AI unaware of core constraints unless manually tagged. The single `alwaysApply: true` file targets the wrong directory glob (`src/**`).

---

## 7. Recommended Target Structure Across Tools

### Phase 2: Enhanced Cursor Rules (`.cursor/rules/`)
Consolidate into 3 high-signal, precisely scoped `.mdc` files:

1. **`celestial-core.mdc`** (`alwaysApply: true`):
   - Tech stack definition (Vue 3 SFC `<script setup lang="ts">`, TS, Tailwind CSS).
   - Atomic Design component hierarchy (`lib/components/{atoms,molecules,organisms,templates}`).
   - The 5 Project Personas and operational lenses.
   - SonarQube Quality Gates (complexity ≤ 8, 0 duplication, 0 untyped code).
   - Conventional commit standard (`feat|fix|refactor|test|chore`).

2. **`component-standards.mdc`** (`globs: ["lib/components/**"]`):
   - Strict component folder anatomy (`C[Name].vue`, `.types.ts`, `composables/`, `styles/`, `index.ts`, `README.md`).
   - WCAG 2.2 AA Accessibility & ARIA telemetry requirements.
   - Public API export rules (named exports, tree-shakeable packaging).

3. **`testing-strategy.mdc`** (`globs: ["**/{__tests__,e2e,stories}/**", "lib/**"]`):
   - 5-Tier Testing Pyramid rules and locations (`.spec.ts`, `.browser.spec.ts`, `.stories.ts`, `.lostpixel`, `e2e/*.spec.ts`).
   - Canonical execution commands (`pnpm test:unit`, `pnpm test:browser`, `pnpm test:storybook`, `pnpm test:visual`, `pnpm test:e2e`, `pnpm test:ci`).

---

### Phase 3: Claude Code & Antigravity Mapping

| Target Tool | File Location | Key Format / Tool-Specific Adaptations |
| :--- | :--- | :--- |
| **Cursor** | `.cursor/rules/*.mdc` | Granular file globs, frontmatter activation (`alwaysApply`), rich MDC syntax. |
| **Claude Code** | `CLAUDE.md` (root) | Monolithic, markdown-native format optimized for Claude Code CLI commands, build targets, testing workflows, and persona instructions. |
| **Antigravity** | `AGENTS.md` (root) | Antigravity-native instruction format adhering to character limits (split if >12k chars), referencing sub-rules via `@filename` or structured sections. |
