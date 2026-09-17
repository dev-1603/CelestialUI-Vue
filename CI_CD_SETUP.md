# CI/CD Pipeline Setup Guide

This document provides comprehensive instructions for setting up and using the CI/CD pipeline for CelestialUI-Vue.

## 🚀 Overview

The CI/CD pipeline consists of multiple workflows that handle:
1. **Building the library** - Type checking, building, and testing
2. **Publishing to NPM** - Automated releases when tags are pushed
3. **Deploying to GitHub Pages** - Demo application and Storybook
4. **Vercel deployment** - Alternative deployment option
5. **Testing** - Unit tests, E2E tests, and linting

## 📋 Prerequisites

### Required Secrets

Add these secrets to your GitHub repository (`Settings > Secrets and variables > Actions`):

#### For NPM Publishing:
- `NPM_TOKEN` - Your NPM authentication token
  - Get from: https://www.npmjs.com/settings/tokens
  - Requires publish permissions

#### For Vercel Deployment (Optional):
- `VERCEL_TOKEN` - Your Vercel authentication token
- `ORG_ID` - Your Vercel organization ID
- `PROJECT_ID` - Your Vercel project ID

#### For GitHub Pages:
- `GITHUB_TOKEN` - Automatically provided by GitHub

#### For SonarQube Cloud:
- `SONAR_TOKEN` - SonarQube Cloud token (scan job in `test.yml`)
- Set `sonar.organization` and `sonar.projectKey` in `sonar-project.properties` (placeholders until you create the project)


## 🔧 Workflow Files

### 1. Main CI/CD Pipeline (`ci-cd.yml`)
- **Triggers**: Push to main/develop, PRs, releases
- **Jobs**:
  - Build library
  - Build demo
  - Build Storybook
  - Publish to NPM (on tags)
  - Deploy to GitHub Pages
  - Deploy Storybook to gh-pages branch

### 2. Test Suite (`test.yml`)
- **Triggers**: Push to main/develop, PRs
- **Node**: 20 only
- **Jobs**: quality (lint, `type-check:lib`, unit + coverage), Vitest browser, Storybook build + test-runner, Playwright Chromium (all browsers on `main`), Lost Pixel, SonarQube Cloud (`SONAR_TOKEN`)

### 3. Release Management (`release.yml`)
- **Triggers**: Push tags (v*)
- **Jobs**: Create GitHub releases with assets

### 4. Vercel Deployment (`vercel-deploy.yml`)
- **Triggers**: Push to main/develop, PRs
- **Jobs**: Deploy to Vercel

### 5. GitHub Pages (`pages.yml`)
- **Triggers**: Push to main, manual dispatch
- **Jobs**: Dedicated GitHub Pages deployment

## 🚀 Usage

### Automatic Deployment

The pipeline runs automatically on:
- **Push to main**: Deploys to GitHub Pages and Vercel
- **Push to develop**: Runs tests and builds
- **Pull Requests**: Runs tests and builds
- **Tags (v*)**: Publishes to NPM and creates releases

### Manual Deployment

#### Deploy to GitHub Pages:
```bash
npm run deploy:pages
```

#### Deploy Storybook:
```bash
npm run deploy:storybook
```

#### Deploy to Vercel:
```bash
npm run deploy:vercel
```

#### Deploy All:
```bash
npm run deploy:all
```

### Creating Releases

1. **Version bump**:
   ```bash
   npm run version:patch  # v1.0.0 -> v1.0.1
   npm run version:minor  # v1.0.0 -> v1.1.0
   npm run version:major  # v1.0.0 -> v2.0.0
   ```

2. **Push tag**:
   ```bash
   git push origin --tags
   ```

3. **Pipeline automatically**:
   - Builds the library
   - Publishes to NPM
   - Creates GitHub release
   - Deploys to GitHub Pages

## 🌐 Deployment URLs

### GitHub Pages
- **Demo**: `https://dev-1603.github.io/CelestialUI-Vue`
- **Storybook**: `https://dev-1603.github.io/CelestialUI-Vue/storybook`

### Vercel (if configured)
- **Demo**: `https://celestialui-vue.vercel.app`
- **Storybook**: `https://celestialui-vue.vercel.app/storybook`

## 📁 File Structure

```
.github/
├── workflows/
│   ├── ci-cd.yml          # Main pipeline
│   ├── test.yml           # Test suite
│   ├── release.yml        # Release management
│   ├── vercel-deploy.yml  # Vercel deployment
│   └── pages.yml          # GitHub Pages
├── vercel.json            # Vercel configuration
└── CI_CD_SETUP.md         # This guide
```

## 🔍 Monitoring

### GitHub Actions
- View workflow runs: `Actions` tab in repository
- Check logs for each job
- Monitor deployment status

### NPM
- Check published versions: `npm view @celestial-ui/vue versions`
- Verify package contents

### GitHub Pages
- Check deployment status in repository settings
- View deployment logs

## 🛠️ Troubleshooting

### Common Issues

1. **NPM publish fails**:
   - Verify `NPM_TOKEN` has publish permissions
   - Check if version already exists
   - Ensure package.json is valid

2. **GitHub Pages deployment fails**:
   - Check repository permissions
   - Verify GitHub Pages is enabled
   - Check build logs for errors

3. **Vercel deployment fails**:
   - Verify Vercel secrets are correct
   - Check Vercel project configuration
   - Ensure Vercel CLI is properly configured

### Debugging

1. **Check workflow logs**:
   - Go to Actions tab
   - Click on failed workflow
   - Expand failed job
   - Review step logs

2. **Local testing**:
   ```bash
   npm run build-lib
   npm run build-demo
   npm run build-storybook
   ```

3. **Verify secrets**:
   - Check secret names match workflow files
   - Ensure secrets have correct values
   - Verify secret permissions

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vercel Documentation](https://vercel.com/docs)
- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

## 🤝 Contributing

When contributing to the CI/CD pipeline:

1. Test changes locally first
2. Use feature branches for changes
3. Update this documentation
4. Test workflows in a fork before PR
5. Ensure backward compatibility

## 📞 Support

For CI/CD related issues:
1. Check this documentation
2. Review workflow logs
3. Check GitHub Actions documentation
4. Create an issue with detailed error logs
