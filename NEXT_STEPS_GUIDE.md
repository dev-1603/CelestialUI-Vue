# 🚀 Next Steps Guide - Complete CI/CD Setup (pnpm)

## ✅ **What's Already Complete**

Your CelestialUI-Vue project now has:
- ✅ **Multiple CI/CD workflows** covering all 5 requested steps
- ✅ **pnpm support** in all GitHub Actions workflows
- ✅ **Base URL configuration** for GitHub Pages deployment
- ✅ **Storybook integration** with proper routing
- ✅ **Vercel deployment** configuration
- ✅ **Local deployment scripts** supporting pnpm, npm, and yarn
- ✅ **Comprehensive documentation**

## 🔧 **Next Steps Required**

### **Step 1: Set Up GitHub Secrets**

Go to your repository → `Settings` → `Secrets and variables` → `Actions` and add:

#### **Required Secrets:**
- `NPM_TOKEN` - Your NPM authentication token
  - Get from: https://www.npmjs.com/settings/tokens
  - Requires publish permissions for `@celestial-ui/vue`

#### **Optional Secrets (for Vercel):**
- `VERCEL_TOKEN` - Your Vercel authentication token
- `ORG_ID` - Your Vercel organization ID
- `PROJECT_ID` - Your Vercel project ID

#### **Optional Secrets (for external repo deployment):**
- `DEPLOY_KEY` - SSH private key for external GitHub Pages repo
  - Only needed if deploying to `dev-1603/dev-1603.github.io`

### **Step 2: Enable GitHub Pages**

1. Go to your repository → `Settings` → `Pages`
2. Set source to `GitHub Actions`
3. Choose the `github-pages` environment
4. Save the configuration

### **Step 3: Choose Your Primary Workflow**

You now have **two workflow options**:

#### **Option A: Single Comprehensive Workflow (Recommended)**
- **File**: `.github/workflows/release-and-deploy.yml`
- **Covers**: All 5 steps in one workflow
- **Best for**: Simple setup, single workflow management

#### **Option B: Multiple Specialized Workflows**
- **Files**: Multiple `.yml` files in `.github/workflows/`
- **Covers**: Each step in separate, focused workflows
- **Best for**: Complex requirements, separate concerns

**Recommendation**: Start with **Option A** for simplicity.

### **Step 4: Test Your Setup**

#### **Local Testing with pnpm:**
```bash
# Test builds (using pnpm - preferred)
pnpm run build-lib
pnpm run build-demo
pnpm run build-storybook

# Or use npm if preferred
npm run build-lib
npm run build-demo
npm run build-storybook

# Test deployment script
./scripts/deploy.sh help
./scripts/deploy.sh build all
```

#### **First GitHub Actions Run:**
1. Push to `main` branch
2. Go to `Actions` tab
3. Watch the workflow run
4. Check for any errors

### **Step 5: First Deployment**

#### **Deploy to GitHub Pages:**
```bash
# Option 1: Use pnpm scripts (preferred)
pnpm run pnpm:deploy:pages

# Option 2: Use npm scripts
npm run deploy:pages

# Option 3: Use deployment script
./scripts/deploy.sh deploy pages
```

#### **Deploy Storybook:**
```bash
# Option 1: Use pnpm scripts (preferred)
pnpm run pnpm:deploy:storybook

# Option 2: Use npm scripts
npm run deploy:storybook

# Option 3: Use deployment script
./scripts/deploy.sh deploy storybook
```

### **Step 6: Create Your First Release**

```bash
# Bump version (using pnpm)
pnpm run version:patch  # v1.0.0 → v1.0.1

# Or using npm
npm run version:patch

# Push changes and tag
git push origin main
git push origin --tags

# The workflow will automatically:
# 1. Build the library
# 2. Publish to NPM
# 3. Create GitHub release
# 4. Deploy to all platforms
```

## 🌐 **Expected Deployment URLs**

Once deployed, your components will be available at:

- **Demo Application**: `https://dev-1603.github.io/CelestialUI-Vue`
- **Storybook**: `https://dev-1603.github.io/CelestialUI-Vue/storybook`
- **Vercel** (if configured): `https://celestialui-vue.vercel.app`

## 🔍 **Verification Checklist**

### **Before First Push:**
- [ ] GitHub secrets are configured
- [ ] GitHub Pages is enabled
- [ ] Base URLs are set in configs
- [ ] Local builds work with pnpm
- [ ] Deployment scripts work

### **After First Push:**
- [ ] GitHub Actions workflow runs successfully
- [ ] Demo deploys to GitHub Pages
- [ ] Storybook deploys to GitHub Pages
- [ ] No build errors in logs
- [ ] URLs are accessible

### **After First Release:**
- [ ] Package publishes to NPM
- [ ] GitHub release is created
- [ ] All assets are downloadable
- [ ] Version is correct

## 🛠️ **Troubleshooting Common Issues**

### **Build Fails:**
```bash
# Check TypeScript errors
pnpm run type-check

# Check build locally
pnpm run build-lib
pnpm run build-demo
```

### **Deployment Fails:**
- Verify GitHub secrets are correct
- Check GitHub Pages permissions
- Ensure base URLs match repository name

### **NPM Publish Fails:**
- Verify `NPM_TOKEN` has publish permissions
- Check if version already exists
- Ensure package.json is valid

### **Storybook Issues:**
- Check base URL configuration
- Verify static assets are built
- Check routing configuration

### **pnpm-specific Issues:**
- Ensure `pnpm-lock.yaml` is committed
- Check if `pnpm` is available in CI environment
- Verify all dependencies are properly installed

## 📚 **Configuration Files Summary**

### **Updated Files:**
- `vite.config.ts` - Added base URL for GitHub Pages
- `.storybook/main.ts` - Added base URL and static config
- `package.json` - Added pnpm deployment scripts and homepage
- `vercel.json` - Vercel deployment configuration

### **New Files:**
- `.github/workflows/release-and-deploy.yml` - Main workflow (pnpm-ready)
- `.github/workflows/ci-cd.yml` - Alternative workflow (pnpm-ready)
- `.github/workflows/test.yml` - Test suite (pnpm-ready)
- `.github/workflows/release.yml` - Release management
- `.github/workflows/vercel-deploy.yml` - Vercel deployment
- `.github/workflows/pages.yml` - GitHub Pages
- `scripts/deploy.sh` - Local deployment script (pnpm-aware)
- `CI_CD_SETUP.md` - Comprehensive setup guide
- `SETUP_SUMMARY.md` - Quick reference
- `NEXT_STEPS_GUIDE.md` - This guide

## 🎯 **Quick Start Commands (pnpm)**

```bash
# 1. Test everything locally with pnpm
pnpm run build

# 2. Deploy to GitHub Pages
pnpm run pnpm:deploy:pages

# 3. Deploy Storybook
pnpm run pnpm:deploy:storybook

# 4. Create release
pnpm run version:patch
git push origin main --tags

# 5. Use deployment script (auto-detects pnpm)
./scripts/deploy.sh help
./scripts/deploy.sh deploy all
```

## 🚀 **You're Ready to Deploy with pnpm!**

Your CI/CD pipeline is now fully configured with **pnpm support**:

- ✅ **Automated building** and testing using pnpm
- ✅ **NPM publishing** on releases
- ✅ **GitHub Pages deployment** for demo and Storybook
- ✅ **Vercel deployment** option
- ✅ **Local deployment** scripts with pnpm detection
- ✅ **Comprehensive documentation**

**Next action**: Push to main branch to trigger your first automated deployment with pnpm! 🎉

## 📞 **Need Help?**

1. **Check this guide** for step-by-step instructions
2. **Review workflow logs** in GitHub Actions tab
3. **Test locally** using pnpm commands
4. **Check configuration** files for base URLs and settings
5. **Create an issue** with detailed error logs if needed

## 🔄 **pnpm vs npm Commands Reference**

| Action | pnpm Command | npm Command |
|--------|--------------|-------------|
| Install | `pnpm install` | `npm install` |
| Build | `pnpm run build` | `npm run build` |
| Build Library | `pnpm run build-lib` | `npm run build-lib` |
| Build Demo | `pnpm run build-demo` | `npm run build-demo` |
| Build Storybook | `pnpm run build-storybook` | `npm run build-storybook` |
| Deploy Pages | `pnpm run pnpm:deploy:pages` | `npm run deploy:pages` |
| Deploy Storybook | `pnpm run pnpm:deploy:storybook` | `npm run deploy:storybook` |
| Test | `pnpm run test` | `npm run test` |
| Lint | `pnpm run lint` | `npm run lint` |
