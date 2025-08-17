# 📦 Publishing CelestialUI Vue Library

This guide will walk you through publishing your CelestialUI Vue component library to npm.

## 🚀 Quick Publish

```bash
# Build and publish in one command
yarn release
```

## 📋 Step-by-Step Publishing Guide

### 1. **Prerequisites**

#### Create npm Account
- Sign up at [npmjs.com](https://www.npmjs.com)
- Verify your email address
- Enable 2FA (recommended)

#### Login to npm
```bash
npm login
```

### 2. **Pre-Publishing Checklist**

#### ✅ **Package Configuration**
- [x] Package name: `@celestialui/vue`
- [x] Version: `1.0.0` 
- [x] License: MIT
- [x] Repository URL (update with your repo)
- [x] Keywords for discoverability
- [x] Proper peer dependencies

#### ✅ **Build Files**
```bash
# Verify build works
yarn build-lib

# Check dist folder
ls -la dist/
```

Should contain:
- `celestial-ui.es.js` (ES module)
- `celestial-ui.umd.js` (UMD module)
- `style.css` (Styles)
- `index.d.ts` (TypeScript definitions)
- Source maps

#### ✅ **Test Installation Locally**
```bash
# Create test package
npm pack

# This creates: celestialui-vue-1.0.0.tgz
# Test in another project:
# npm install /path/to/celestialui-vue-1.0.0.tgz
```

### 3. **Publishing Process**

#### **Option A: Automated Release**
```bash
# Build and publish
yarn release

# For beta releases
yarn release:beta
```

#### **Option B: Manual Steps**
```bash
# 1. Build the library
yarn build-lib

# 2. Run tests (optional but recommended)
yarn test:unit

# 3. Publish to npm
npm publish
```

### 4. **Version Management**

#### **Semantic Versioning**
- **Patch** (1.0.0 → 1.0.1): Bug fixes
- **Minor** (1.0.0 → 1.1.0): New features (backward compatible)
- **Major** (1.0.0 → 2.0.0): Breaking changes

```bash
# Update version and publish
yarn version:patch && yarn release
yarn version:minor && yarn release  
yarn version:major && yarn release
```

### 5. **First-Time Publishing**

#### **Update Package Info**
1. Update `package.json`:
   ```json
   {
     "name": "@celestialui/vue",
     "repository": {
       "type": "git",
       "url": "https://github.com/YOUR_USERNAME/celestialui-vue.git"
     },
     "homepage": "https://github.com/YOUR_USERNAME/celestialui-vue#readme",
     "bugs": {
       "url": "https://github.com/YOUR_USERNAME/celestialui-vue/issues"
     }
   }
   ```

2. Create GitHub repository and push code

#### **Publish**
```bash
# First time publishing a scoped package
npm publish --access public
```

### 6. **Post-Publishing**

#### **Verify Publication**
```bash
# Check on npm
open https://www.npmjs.com/package/@celestialui/vue

# Test installation
npm install @celestialui/vue
```

#### **Create Release on GitHub**
1. Go to your repository
2. Click "Releases" → "Create a new release"
3. Tag: `v1.0.0`
4. Title: `v1.0.0 - Initial Release`
5. Description: List features and changes

### 7. **Usage Examples**

Once published, users can install and use:

```bash
npm install @celestialui/vue
```

```typescript
// main.ts
import { createApp } from 'vue'
import CelestialUI from '@celestialui/vue'
import '@celestialui/vue/style.css'

const app = createApp(App)
app.use(CelestialUI)
app.mount('#app')
```

### 8. **Maintenance**

#### **Update Dependencies**
```bash
yarn upgrade-interactive --latest
```

#### **Republish**
```bash
# After making changes
yarn version:patch
yarn release
```

#### **Beta Releases**
```bash
# For testing new features
yarn version:prerelease --preid=beta
yarn release:beta
```

### 9. **Troubleshooting**

#### **Common Issues**

**403 Forbidden**
```bash
# Check if logged in
npm whoami

# Login again
npm login
```

**Package name taken**
```bash
# Check availability
npm view @celestialui/vue

# If taken, choose different name
# Update package.json name field
```

**Build errors**
```bash
# Clear cache and rebuild
rm -rf node_modules dist
yarn install
yarn build-lib
```

#### **Validation Commands**
```bash
# Check package contents
npm pack --dry-run

# Validate package.json
npm run lint

# Check bundle size
yarn build-lib && ls -lah dist/
```

### 10. **Continuous Deployment (Optional)**

#### **GitHub Actions**
Create `.github/workflows/publish.yml`:

```yaml
name: Publish Package

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - run: yarn install
      - run: yarn build-lib
      - run: yarn test:unit
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## 🎉 Ready to Publish!

Your CelestialUI Vue library is ready for the world. Follow the steps above and share your amazing component library with the Vue.js community!

### **Quick Commands Summary**
```bash
# Build
yarn build-lib

# Test locally
npm pack

# Publish
yarn release

# Update version
yarn version:patch && yarn release
```

Happy publishing! 🚀
