#!/bin/bash

# CelestialUI-Vue Deployment Script
# This script provides easy deployment options for the component library

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    if ! command_exists node; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    # Check if pnpm, yarn, or npm is available (pnpm preferred)
    if command_exists pnpm; then
        PACKAGE_MANAGER="pnpm"
        print_status "Using pnpm as package manager (preferred)"
    elif command_exists yarn; then
        PACKAGE_MANAGER="yarn"
        print_status "Using yarn as package manager"
    elif command_exists npm; then
        PACKAGE_MANAGER="npm"
        print_status "Using npm as package manager"
    else
        print_error "Neither pnpm, yarn, nor npm is installed. Please install one of them first."
        exit 1
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js 18+ is required. Current version: $(node -v)"
        exit 1
    fi
    
    print_success "Prerequisites check passed"
}

# Function to build everything
build_all() {
    print_status "Building library and demo..."
    $PACKAGE_MANAGER run build
    print_success "Build completed successfully"
}

# Function to build library only
build_library() {
    print_status "Building library only..."
    $PACKAGE_MANAGER run build-lib
    print_success "Library build completed successfully"
}

# Function to build demo only
build_demo() {
    print_status "Building demo only..."
    $PACKAGE_MANAGER run build-demo
    print_success "Demo build completed successfully"
}

# Function to build Storybook only
build_storybook() {
    print_status "Building Storybook..."
    $PACKAGE_MANAGER run build-storybook
    print_success "Storybook build completed successfully"
}

# Function to deploy to GitHub Pages
deploy_github_pages() {
    print_status "Deploying to GitHub Pages..."
    
    if ! command_exists gh; then
        print_warning "GitHub CLI not found. Installing gh-pages package..."
        $PACKAGE_MANAGER install --save-dev gh-pages
        $PACKAGE_MANAGER run deploy:pages
    else
        # Use GitHub CLI if available
        gh pages deploy dist --branch gh-pages --clean
    fi
    
    print_success "GitHub Pages deployment completed"
}

# Function to deploy Storybook to GitHub Pages
deploy_storybook_github() {
    print_status "Deploying Storybook to GitHub Pages..."
    
    if ! command_exists gh; then
        print_warning "GitHub CLI not found. Installing gh-pages package..."
        $PACKAGE_MANAGER install --save-dev gh-pages
        $PACKAGE_MANAGER run deploy:storybook
    else
        # Use GitHub CLI if available
        gh pages deploy storybook-static --branch gh-pages-storybook --clean
    fi
    
    print_success "Storybook GitHub Pages deployment completed"
}

# Function to deploy to Vercel
deploy_vercel() {
    print_status "Deploying to Vercel..."
    
    if ! command_exists vercel; then
        print_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    vercel --prod
    print_success "Vercel deployment completed"
}

# Function to publish to NPM
publish_npm() {
    print_status "Publishing to NPM..."
    
    # Check if user is logged in to npm
    if ! npm whoami >/dev/null 2>&1; then
        print_error "Not logged in to npm. Please run 'npm login' first."
        exit 1
    fi
    
    # Build library first
    build_library
    
    # Publish
    npm publish
    print_success "NPM publication completed"
}

# Function to create a new release
create_release() {
    local RELEASE_TYPE=$1
    
    if [ -z "$RELEASE_TYPE" ]; then
        print_error "Release type is required. Use: patch, minor, or major"
        exit 1
    fi
    
    print_status "Creating $RELEASE_TYPE release..."
    
    # Version bump
    $PACKAGE_MANAGER run "version:$RELEASE_TYPE"
    
    # Get new version
    NEW_VERSION=$(node -p "require('./package.json').version")
    
    # Build and publish
    build_library
    npm publish
    
    # Create git tag
    git add package.json package-lock.json
    git commit -m "chore: bump version to $NEW_VERSION"
    git tag "v$NEW_VERSION"
    
    # Push changes
    git push origin main
    git push origin --tags
    
    print_success "Release v$NEW_VERSION created and published successfully"
}

# Function to show help
show_help() {
    echo "CelestialUI-Vue Deployment Script"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  build [target]     Build specified target (all, lib, demo, storybook)"
    echo "  deploy [target]    Deploy to specified target (pages, storybook, vercel)"
    echo "  publish            Publish to NPM"
    echo "  release [type]     Create a new release (patch, minor, major)"
    echo "  help               Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 build all              # Build everything"
    echo "  $0 build lib              # Build library only"
    echo "  $0 deploy pages           # Deploy to GitHub Pages"
    echo "  $0 deploy storybook       # Deploy Storybook to GitHub Pages"
    echo "  $0 deploy vercel          # Deploy to Vercel"
    echo "  $0 publish                # Publish to NPM"
    echo "  $0 release patch          # Create patch release"
    echo ""
}

# Main script logic
main() {
    local COMMAND=$1
    local TARGET=$2
    
    # Check prerequisites
    check_prerequisites
    
    case $COMMAND in
        "build")
            case $TARGET in
                "all"|"")
                    build_all
                    ;;
                "lib")
                    build_library
                    ;;
                "demo")
                    build_demo
                    ;;
                "storybook")
                    build_storybook
                    ;;
                *)
                    print_error "Invalid build target: $TARGET"
                    show_help
                    exit 1
                    ;;
            esac
            ;;
        "deploy")
            case $TARGET in
                "pages")
                    deploy_github_pages
                    ;;
                "storybook")
                    deploy_storybook_github
                    ;;
                "vercel")
                    deploy_vercel
                    ;;
                *)
                    print_error "Invalid deploy target: $TARGET"
                    show_help
                    exit 1
                    ;;
            esac
            ;;
        "publish")
            publish_npm
            ;;
        "release")
            create_release $TARGET
            ;;
        "help"|"--help"|"-h"|"")
            show_help
            ;;
        *)
            print_error "Unknown command: $COMMAND"
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
