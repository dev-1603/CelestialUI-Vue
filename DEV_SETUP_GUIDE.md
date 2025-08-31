# 🚀 CelestialUI-Vue Development Setup & Debugging Guide

## 📋 Prerequisites

### Required Software
```bash
# Node.js (v18+ recommended)
node --version  # Should be 18.0.0 or higher
npm --version   # Comes with Node.js

# Or use package managers
pnpm --version  # Preferred for this project
yarn --version  # Alternative option
```

### Installation Commands
```bash
# Install Node.js (choose one method)

# Method 1: Official installer
# Download from https://nodejs.org/

# Method 2: Using Homebrew (macOS)
brew install node

# Method 3: Using fnm (Fast Node Manager)
curl -fsSL https://fnm.vercel.app/install | bash
fnm install --lts
fnm use lts-latest

# Install pnpm (recommended)
npm install -g pnpm
# or
curl -fsSL https://get.pnpm.io/install.sh | sh
```

## 🏗️ Project Setup

### 1. Clone and Install Dependencies
```bash
# Navigate to project directory
cd CelestialUI-Vue

# Install dependencies (choose one)
pnpm install    # Recommended
# or
npm install
# or  
yarn install
```

### 2. Verify Installation
```bash
# Check if dependencies installed correctly
pnpm list --depth=0

# Verify TypeScript is working
pnpm exec tsc --version

# Check Vite installation
pnpm exec vite --version
```

## 🚀 Development Modes

### 1. Demo Application Development
```bash
# Start the demo application with hot reload
pnpm dev

# Alternative commands
npm run dev
yarn dev

# Expected output:
# ➜  Local:   http://localhost:5173/
# ➜  Network: use --host to expose
```

### 2. Library Development Mode
```bash
# Watch library files for changes and rebuild
pnpm build-lib --watch

# Or run in separate terminal while demo is running
pnpm run build-lib
```

### 3. Storybook Development
```bash
# Start Storybook for component development
pnpm storybook

# Expected output:
# ➜  Local:   http://localhost:6006/
# ➜  Network: use --host to expose
```

### 4. All Development Modes (Parallel)
```bash
# Terminal 1: Demo app
pnpm dev

# Terminal 2: Storybook
pnpm storybook

# Terminal 3: Library build watch
pnpm build-lib --watch

# Terminal 4: Test watch mode
pnpm test:unit --watch
```

## 🐛 Debugging Setup

### 1. VS Code Configuration
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Vue App",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    },
    {
      "name": "Debug Storybook", 
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:6006",
      "webRoot": "${workspaceFolder}/lib"
    },
    {
      "name": "Debug Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/vitest/vitest.mjs",
      "args": ["run", "--no-coverage"],
      "console": "integratedTerminal",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

### 2. Browser DevTools Setup
```bash
# Start dev server with source maps
pnpm dev

# Open browser and navigate to http://localhost:5173
# Open DevTools (F12)
# Sources tab will show original TypeScript/Vue files
```

### 3. Vue DevTools Extension
```bash
# Install Vue DevTools browser extension
# Chrome: https://chrome.google.com/webstore/detail/vuejs-devtools/
# Firefox: https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/

# Or standalone app
npm install -g @vue/devtools
vue-devtools
```

## 🔧 Development Workflow

### Hot Reload Development
```bash
# 1. Start development server
pnpm dev

# 2. Open browser to http://localhost:5173

# 3. Edit files in src/ or lib/ directories
# 4. Save files - changes should appear immediately
# 5. Check browser console for any errors
```

### Component Development Workflow
```bash
# 1. Create new component in lib/components/
# Example: lib/components/atoms/button/CButton.vue

# 2. Add to component index
# Edit: lib/components/atoms/index.ts

# 3. Create story for Storybook
# Create: lib/components/atoms/button/CButton.stories.ts

# 4. Write tests
# Create: tests/unit/components/atoms/CButton.spec.ts

# 5. Update component registry
# Mark component as implemented in registry
```

## 🧪 Testing & Debugging

### Unit Testing
```bash
# Run all tests
pnpm test:unit

# Watch mode for development
pnpm test:unit --watch

# Run specific test file
pnpm test:unit CButton.spec.ts

# Debug specific test
pnpm test:unit --inspect-brk CButton.spec.ts
```

### E2E Testing  
```bash
# Run E2E tests
pnpm test:e2e

# Open Cypress UI for debugging
pnpm test:e2e:dev
```

### Visual Testing
```bash
# Build Storybook for visual testing
pnpm build-storybook

# Run Chromatic (if configured)
pnpm chromatic
```

## 📊 Build & Bundle Analysis

### Development Builds
```bash
# Build library for development
pnpm build-lib

# Build demo for development  
pnpm build-demo

# Build everything
pnpm build
```

### Bundle Analysis
```bash
# Analyze bundle size
pnpm build-lib

# Open dist/stats.html in browser to see bundle analysis
open dist/stats.html
```

## 🔍 Common Debugging Scenarios

### 1. Import/Export Issues
```bash
# Check TypeScript compilation
pnpm type-check:lib

# Verify imports in browser console
# Check Network tab for failed module loads
```

### 2. Style Issues
```bash
# Check if CSS is loading
# Browser DevTools > Network > CSS files

# Verify CSS custom properties
# Browser DevTools > Elements > Computed styles
# Look for --cui-* variables
```

### 3. Component Not Rendering
```bash
# Check browser console for Vue warnings
# Verify component registration in browser DevTools
# Vue DevTools > Components tab
```

### 4. Hot Reload Not Working
```bash
# Restart dev server
pnpm dev

# Check file permissions
chmod -R 755 src/ lib/

# Clear browser cache
# DevTools > Application > Clear Storage
```

## 📱 Mobile Debugging

### Local Network Access
```bash
# Start dev server with network access
pnpm dev --host

# Find your IP address
# macOS: ifconfig | grep "inet "
# Access from mobile: http://YOUR_IP:5173
```

### Mobile DevTools
```bash
# Chrome DevTools for mobile
# chrome://inspect in Chrome browser
# Enable USB debugging on Android device
```

## 🔧 Troubleshooting

### Common Issues & Solutions

#### Issue: Module not found errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### Issue: TypeScript errors
```bash
# Check TypeScript configuration
pnpm type-check

# Restart TypeScript server in VS Code
# Command Palette > TypeScript: Restart TS Server
```

#### Issue: Build failures
```bash
# Clean build directory
rm -rf dist/

# Rebuild everything
pnpm build
```

#### Issue: Storybook not loading
```bash
# Check Storybook configuration
# Verify .storybook/main.ts settings

# Clear Storybook cache
rm -rf node_modules/.cache/storybook
pnpm storybook
```

## 📝 Development Scripts Reference

```bash
# Core development
pnpm dev                    # Demo app development
pnpm storybook             # Component development
pnpm build-lib             # Library build
pnpm build-demo            # Demo build

# Testing
pnpm test:unit             # Unit tests
pnpm test:e2e              # E2E tests  
pnpm test:coverage         # Coverage report

# Code quality
pnpm lint                  # Lint code
pnpm format                # Format code
pnpm type-check            # TypeScript check

# Build & Release
pnpm build                 # Build everything
pnpm preview               # Preview build
pnpm release               # Release package
```

## 🎯 Quick Start Checklist

- [ ] Install Node.js v18+
- [ ] Install pnpm: `npm install -g pnpm`
- [ ] Clone/navigate to project: `cd CelestialUI-Vue`
- [ ] Install dependencies: `pnpm install`
- [ ] Start dev server: `pnpm dev`
- [ ] Open browser: `http://localhost:5173`
- [ ] Install Vue DevTools extension
- [ ] Start Storybook: `pnpm storybook`
- [ ] Open Storybook: `http://localhost:6006`
- [ ] Verify everything works: see demo app and Storybook running

## 🚀 You're Ready to Develop!

Once you have Node.js and pnpm installed, you can start developing components following the established patterns and architecture. The project is fully production-ready and waiting for component implementation!








