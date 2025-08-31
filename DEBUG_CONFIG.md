# 🐛 CelestialUI-Vue Debugging Configuration

## 🚀 Quick Start Debug Commands

### Development Server
```bash
# Start development server (main command)
pnpm dev

# Expected output:
#   VITE v4.x.x  ready in xxx ms
#   ➜  Local:   http://localhost:5173/
#   ➜  Network: use --host to expose
```

### Parallel Development Setup
```bash
# Terminal 1: Main dev server
pnpm dev

# Terminal 2: Storybook (component development)
pnpm storybook

# Terminal 3: Test watch mode
pnpm test:unit --watch

# Terminal 4: Library build watch
pnpm build-lib --watch
```

## 🔧 VS Code Debug Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "🚀 Debug Vue App",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "userDataDir": "${workspaceFolder}/.vscode/chrome-debug-profile",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*",
        "webpack:///./*": "${workspaceFolder}/*",
        "/src/*": "${workspaceFolder}/src/*"
      },
      "breakOnLoad": false,
      "pathMappings": [
        {
          "url": "http://localhost:5173",
          "path": "${workspaceFolder}/src"
        }
      ]
    },
    {
      "name": "📚 Debug Storybook",
      "type": "chrome", 
      "request": "launch",
      "url": "http://localhost:6006",
      "webRoot": "${workspaceFolder}/lib",
      "userDataDir": "${workspaceFolder}/.vscode/chrome-debug-profile-storybook"
    },
    {
      "name": "🧪 Debug Vitest Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/vitest/vitest.mjs",
      "args": ["run", "--no-coverage", "--reporter=verbose"],
      "console": "integratedTerminal",
      "skipFiles": ["<node_internals>/**"],
      "env": {
        "NODE_ENV": "test"
      }
    },
    {
      "name": "🔍 Debug Single Test",
      "type": "node",
      "request": "launch", 
      "program": "${workspaceFolder}/node_modules/vitest/vitest.mjs",
      "args": ["run", "${relativeFile}", "--no-coverage"],
      "console": "integratedTerminal",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

## 🔍 VS Code Settings for Better Debugging

Create `.vscode/settings.json`:

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "vue.inlayHints.missingProps": true,
  "vue.inlayHints.inlineHandlerLeading": true,
  "vue.inlayHints.optionsWrapper": true,
  "vue.codeActions.enabled": true,
  "vue.complete.casing.tags": "kebab",
  "vue.complete.casing.props": "camel",
  "debug.allowBreakpointsEverywhere": true,
  "debug.javascript.debugByLinkOptions": "always",
  "extensions.ignoreRecommendations": false
}
```

## 🛠️ Browser DevTools Setup

### Chrome DevTools Configuration
```bash
# 1. Start dev server
pnpm dev

# 2. Open Chrome and navigate to http://localhost:5173

# 3. Open DevTools (F12 or Cmd+Option+I)

# 4. In Sources tab:
#    - Enable "Pause on caught exceptions"
#    - Enable "Pause on uncaught exceptions"
#    - Check "Enable source maps"

# 5. In Console tab:
#    - Set log level to "Verbose"
#    - Enable "Preserve log"
```

### Vue DevTools Setup
```bash
# Install Vue DevTools browser extension
# Chrome: https://chrome.google.com/webstore/detail/vuejs-devtools/
# Firefox: https://addons.mozilla.org/firefox/addon/vue-js-devtools/

# After installation:
# 1. Open browser with dev server running
# 2. Open DevTools
# 3. Look for "Vue" tab
# 4. Explore components tree, state, and events
```

## 🎯 Component Development Debug Workflow

### 1. Component Creation Debug Process
```bash
# Step 1: Create component with debugging
touch lib/components/atoms/button/CButton.vue

# Step 2: Start dev server
pnpm dev

# Step 3: Open component in browser
# Navigate to http://localhost:5173/components/button

# Step 4: Open browser DevTools
# - Check Console for any errors
# - Inspect Elements for styling
# - Vue DevTools for component state
```

### 2. Storybook Component Debug
```bash
# Step 1: Start Storybook
pnpm storybook

# Step 2: Navigate to component story
# Open http://localhost:6006

# Step 3: Debug in Storybook
# - Use Controls panel to test props
# - Check Actions panel for events
# - Use Docs panel for documentation
```

## 🧪 Testing & Debug Commands

### Unit Test Debugging
```bash
# Run all tests with verbose output
pnpm test:unit --reporter=verbose

# Run tests for specific component
pnpm test:unit CButton

# Run tests with coverage
pnpm test:unit --coverage

# Debug specific test with Node inspector
pnpm test:unit --inspect-brk CButton.spec.ts

# Watch mode for continuous debugging
pnpm test:unit --watch
```

### E2E Test Debugging
```bash
# Open Cypress in debug mode
pnpm test:e2e:dev

# Run specific E2E test
pnpm cypress run --spec "cypress/e2e/button.cy.ts"

# Run E2E tests in headed mode
pnpm cypress run --headed
```

## 🔧 Debug Utilities & Helpers

### Console Debug Helpers
Add to any Vue component:
```javascript
// In setup() function or <script setup>
import { getCurrentInstance } from 'vue'

// Debug component instance
const instance = getCurrentInstance()
console.log('Component instance:', instance)

// Debug props
console.log('Props:', props)

// Debug reactive data
console.log('Reactive data:', reactive(data))

// Performance debugging
console.time('Component render')
// ... component logic
console.timeEnd('Component render')
```

### Vue DevTools API
```javascript
// Add to main.ts for global debugging
if (import.meta.env.DEV) {
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__ = window.__VUE_DEVTOOLS_GLOBAL_HOOK__ || {}
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
}
```

## 📊 Performance Debugging

### Vite Performance Analysis
```bash
# Build with bundle analysis
pnpm build-lib

# Analyze bundle size (check package.json for bundle-analyzer script)
pnpm analyze

# Check dev server performance
pnpm dev --debug
```

### Vue Performance Debugging
```javascript
// Add to vite.config.ts for performance tracking
export default defineConfig({
  define: {
    __VUE_PROD_DEVTOOLS__: 'true'
  },
  server: {
    // Enable performance debugging
    hmr: {
      overlay: true
    }
  }
})
```

## 🚨 Common Debug Scenarios

### 1. Component Not Rendering
```bash
# Check these in order:
# 1. Browser console for errors
# 2. Vue DevTools component tree
# 3. Network tab for failed imports
# 4. Elements tab for DOM structure

# Debug commands:
pnpm dev
# Open http://localhost:5173
# F12 → Console → Look for errors
# F12 → Vue → Components → Find your component
```

### 2. Styling Issues
```bash
# Debug CSS/styling problems:
# 1. Elements tab → Computed styles
# 2. Check for CSS custom properties (--cui-*)
# 3. Verify Tailwind classes
# 4. Check component scoped styles

# Verify CSS loading:
# Network tab → CSS files should load successfully
```

### 3. Import/Export Issues
```bash
# Debug module issues:
pnpm type-check:lib
# Check TypeScript compilation errors

# Browser console will show:
# - Module not found errors
# - Import/export mismatches
# - Type errors
```

### 4. Hot Reload Not Working
```bash
# Restart dev server
# Ctrl+C to stop, then:
pnpm dev

# Clear browser cache
# DevTools → Application → Clear Storage → Clear site data

# Check file permissions (if needed)
chmod -R 755 src/ lib/
```

## 📱 Mobile Debugging

### Local Network Testing
```bash
# Start server with network access
pnpm dev --host

# Find your IP address
ipconfig getifaddr en0  # macOS WiFi
# or check Network settings

# Access from mobile device:
# http://YOUR_IP_ADDRESS:5173
```

### Remote Debugging
```bash
# For mobile Chrome debugging:
# 1. Enable USB debugging on Android
# 2. Connect device via USB
# 3. Open chrome://inspect in desktop Chrome
# 4. Select your device and page
```

## 🔗 Useful Debug URLs

When `pnpm dev` is running:

- **Main App**: http://localhost:5173
- **Component Routes**: http://localhost:5173/components/{component-name}
- **Vue DevTools**: Available in browser DevTools

When `pnpm storybook` is running:

- **Storybook**: http://localhost:6006
- **Storybook Controls**: Test component props
- **Storybook Docs**: Component documentation

## 🚀 Quick Debug Checklist

- [ ] `pnpm dev` server running
- [ ] Browser open to http://localhost:5173
- [ ] DevTools open (F12)
- [ ] Vue DevTools extension installed
- [ ] Console tab checked for errors
- [ ] Network tab verified (no failed requests)
- [ ] Vue tab showing component tree
- [ ] Source maps working (can see original files)
- [ ] Breakpoints can be set in sources
- [ ] Hot reload working (changes appear immediately)

## 🎯 Ready to Debug!

Your CelestialUI-Vue project is now configured for comprehensive debugging. Use `pnpm dev` as your main development command and follow the debugging workflows above for efficient component development!








