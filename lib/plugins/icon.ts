import type { App } from 'vue'
import type { IconConfig } from '../types'

export function createIconPlugin(config: IconConfig) {
  return {
    install(app: App) {
      // Provide icon config globally
      app.provide('icon-config', config)

      // Setup icon system based on provider
      setupIconProvider(config)

      // Add global icon utilities
      app.config.globalProperties.$icon = {
        config,
        setProvider: (provider: IconConfig['provider']) => {
          config.provider = provider
          setupIconProvider(config)
        },
        setFormat: (format: IconConfig['format']) => {
          config.format = format
          setupIconProvider(config)
        },
        addCustomIcon: (name: string, icon: string) => {
          if (!config.customIcons) {
            config.customIcons = {}
          }
          config.customIcons[name] = icon
        }
      }
    }
  }
}

function setupIconProvider(config: IconConfig) {
  switch (config.provider) {
    case 'fontawesome':
      setupFontAwesome(config)
      break
    case 'material':
      setupMaterialIcons(config)
      break
    case 'heroicons':
      setupHeroicons(config)
      break
    case 'lucide':
      setupLucide(config)
      break
    case 'custom':
      setupCustomIcons(config)
      break
  }
}

function setupFontAwesome(config: IconConfig) {
  // Load FontAwesome CSS if not already loaded
  if (!document.querySelector('link[href*="fontawesome"]')) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    document.head.appendChild(link)
  }

  // Set default prefix if not provided
  if (!config.prefix) {
    config.prefix = 'fas'
  }
}

function setupMaterialIcons(config: IconConfig) {
  // Load Material Icons CSS if not already loaded
  if (!document.querySelector('link[href*="material-icons"]')) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons'
    document.head.appendChild(link)
  }

  // Also load Material Icons Outlined if needed
  if (!document.querySelector('link[href*="Material+Icons+Outlined"]')) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined'
    document.head.appendChild(link)
  }
}

function setupHeroicons(config: IconConfig) {
  // Heroicons are typically used as SVG components
  // This would typically be handled by importing the icon components
  console.log('Heroicons setup - typically handled via component imports')
}

function setupLucide(config: IconConfig) {
  // Lucide icons are typically used as SVG components
  // This would typically be handled by importing the icon components
  console.log('Lucide setup - typically handled via component imports')
}

function setupCustomIcons(config: IconConfig) {
  // Custom icons setup - nothing special needed
  // Icons are provided via config.customIcons
  console.log('Custom icons setup complete')
}

// Icon mapping utilities
export const iconMappings = {
  // Common icon names mapped to different providers
  common: {
    // Navigation
    'chevron-left': {
      fontawesome: 'chevron-left',
      material: 'chevron_left',
      heroicons: 'chevron-left',
      lucide: 'chevron-left'
    },
    'chevron-right': {
      fontawesome: 'chevron-right',
      material: 'chevron_right',
      heroicons: 'chevron-right',
      lucide: 'chevron-right'
    },
    'chevron-up': {
      fontawesome: 'chevron-up',
      material: 'keyboard_arrow_up',
      heroicons: 'chevron-up',
      lucide: 'chevron-up'
    },
    'chevron-down': {
      fontawesome: 'chevron-down',
      material: 'keyboard_arrow_down',
      heroicons: 'chevron-down',
      lucide: 'chevron-down'
    },

    // Actions
    'plus': {
      fontawesome: 'plus',
      material: 'add',
      heroicons: 'plus',
      lucide: 'plus'
    },
    'minus': {
      fontawesome: 'minus',
      material: 'remove',
      heroicons: 'minus',
      lucide: 'minus'
    },
    'times': {
      fontawesome: 'times',
      material: 'close',
      heroicons: 'x-mark',
      lucide: 'x'
    },
    'check': {
      fontawesome: 'check',
      material: 'check',
      heroicons: 'check',
      lucide: 'check'
    },

    // Status
    'check-circle': {
      fontawesome: 'check-circle',
      material: 'check_circle',
      heroicons: 'check-circle',
      lucide: 'check-circle'
    },
    'exclamation-circle': {
      fontawesome: 'exclamation-circle',
      material: 'error',
      heroicons: 'exclamation-circle',
      lucide: 'alert-circle'
    },
    'exclamation-triangle': {
      fontawesome: 'exclamation-triangle',
      material: 'warning',
      heroicons: 'exclamation-triangle',
      lucide: 'alert-triangle'
    },
    'info-circle': {
      fontawesome: 'info-circle',
      material: 'info',
      heroicons: 'information-circle',
      lucide: 'info'
    },

    // Common UI
    'search': {
      fontawesome: 'search',
      material: 'search',
      heroicons: 'magnifying-glass',
      lucide: 'search'
    },
    'heart': {
      fontawesome: 'heart',
      material: 'favorite',
      heroicons: 'heart',
      lucide: 'heart'
    },
    'star': {
      fontawesome: 'star',
      material: 'star',
      heroicons: 'star',
      lucide: 'star'
    },
    'home': {
      fontawesome: 'home',
      material: 'home',
      heroicons: 'home',
      lucide: 'home'
    },
    'user': {
      fontawesome: 'user',
      material: 'person',
      heroicons: 'user',
      lucide: 'user'
    },
    'settings': {
      fontawesome: 'cog',
      material: 'settings',
      heroicons: 'cog-6-tooth',
      lucide: 'settings'
    },
    'menu': {
      fontawesome: 'bars',
      material: 'menu',
      heroicons: 'bars-3',
      lucide: 'menu'
    },

    // Loading
    'spinner': {
      fontawesome: 'spinner',
      material: 'refresh',
      heroicons: 'arrow-path',
      lucide: 'loader-2'
    },

    // Media
    'play': {
      fontawesome: 'play',
      material: 'play_arrow',
      heroicons: 'play',
      lucide: 'play'
    },
    'pause': {
      fontawesome: 'pause',
      material: 'pause',
      heroicons: 'pause',
      lucide: 'pause'
    },
    'stop': {
      fontawesome: 'stop',
      material: 'stop',
      heroicons: 'stop',
      lucide: 'square'
    }
  }
}

// Get mapped icon name for provider
export function getIconName(iconName: string, provider: IconConfig['provider']): string {
  const mapping = iconMappings.common[iconName as keyof typeof iconMappings.common]
  if (mapping && mapping[provider]) {
    return mapping[provider]
  }
  return iconName
}

// Icon utilities
export const iconUtils = {
  // Check if icon exists in provider
  hasIcon: (iconName: string, provider: IconConfig['provider']): boolean => {
    const mappedName = getIconName(iconName, provider)
    return !!mappedName
  },

  // Get all available icons for provider (this would typically come from the provider's API)
  getAvailableIcons: (provider: IconConfig['provider']): string[] => {
    // This is a placeholder - in a real implementation, this would
    // return the actual list of available icons for the provider
    return Object.keys(iconMappings.common)
  },

  // Preload icon fonts/assets
  preloadIcons: (provider: IconConfig['provider']): Promise<void> => {
    return new Promise((resolve) => {
      switch (provider) {
        case 'fontawesome':
          // Check if FontAwesome is loaded
          if (document.fonts && document.fonts.check) {
            const checkFont = () => {
              if (document.fonts.check('16px "Font Awesome 6 Free"')) {
                resolve()
              } else {
                setTimeout(checkFont, 100)
              }
            }
            checkFont()
          } else {
            // Fallback - just wait a bit
            setTimeout(resolve, 1000)
          }
          break

        case 'material':
          // Check if Material Icons is loaded
          if (document.fonts && document.fonts.check) {
            const checkFont = () => {
              if (document.fonts.check('16px "Material Icons"')) {
                resolve()
              } else {
                setTimeout(checkFont, 100)
              }
            }
            checkFont()
          } else {
            setTimeout(resolve, 1000)
          }
          break

        default:
          resolve()
      }
    })
  }
}
