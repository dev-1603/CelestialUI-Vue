import type { IconLibraryConfig } from '../CIcon.types'

/**
 * Configuration for different icon libraries
 * This defines the CSS classes and patterns for each supported icon library
 */
export const iconLibraryConfig: IconLibraryConfig = {
  material: {
    baseClass: 'material-icons',
    variants: {
      filled: 'material-icons',
      outlined: 'material-icons-outlined',
      round: 'material-icons-round',
      sharp: 'material-icons-sharp',
      'two-tone': 'material-icons-two-tone'
    },
    sizes: {
      xs: 'md-12',
      sm: 'md-14',
      md: 'md-18',
      lg: 'md-24',
      xl: 'md-36',
      '2xl': 'md-48',
      '3xl': 'md-64'
    }
  },
  fontawesome: {
    baseClass: 'fa',
    styles: {
      solid: 'fas',
      regular: 'far',
      light: 'fal',
      thin: 'fat',
      duotone: 'fad',
      brands: 'fab'
    },
    sizes: {
      xs: 'fa-xs',
      sm: 'fa-sm',
      md: 'fa-lg',
      lg: 'fa-xl',
      xl: 'fa-2xl',
      '2xl': 'fa-3xl',
      '3xl': 'fa-4xl'
    }
  },
  custom: {
    baseClass: 'custom-icon',
    sizes: {
      xs: 'icon-xs',
      sm: 'icon-sm',
      md: 'icon-md',
      lg: 'icon-lg',
      xl: 'icon-xl',
      '2xl': 'icon-2xl',
      '3xl': 'icon-3xl'
    }
  }
}

/**
 * Get the icon library configuration
 */
export function getIconLibraryConfig(): IconLibraryConfig {
  return iconLibraryConfig
}

/**
 * Get configuration for a specific library
 */
export function getLibraryConfig(library: keyof IconLibraryConfig) {
  return iconLibraryConfig[library]
}

/**
 * Common Material Icons names for easy reference
 */
export const materialIcons = {
  // Navigation
  home: 'home',
  menu: 'menu',
  close: 'close',
  arrowBack: 'arrow_back',
  arrowForward: 'arrow_forward',
  arrowUpward: 'arrow_upward',
  arrowDownward: 'arrow_downward',

  // Actions
  add: 'add',
  remove: 'remove',
  edit: 'edit',
  delete: 'delete',
  save: 'save',
  cancel: 'cancel',
  check: 'check',
  clear: 'clear',

  // Content
  copy: 'content_copy',
  cut: 'content_cut',
  paste: 'content_paste',
  undo: 'undo',
  redo: 'redo',

  // Communication
  email: 'email',
  phone: 'phone',
  message: 'message',
  chat: 'chat',

  // Media
  play: 'play_arrow',
  pause: 'pause',
  stop: 'stop',
  volumeUp: 'volume_up',
  volumeDown: 'volume_down',
  volumeMute: 'volume_mute',

  // File
  folder: 'folder',
  file: 'insert_drive_file',
  download: 'download',
  upload: 'upload',

  // Social
  share: 'share',
  like: 'thumb_up',
  favorite: 'favorite',

  // UI
  search: 'search',
  filter: 'filter_list',
  sort: 'sort',
  settings: 'settings',
  info: 'info',
  warning: 'warning',
  error: 'error',
  success: 'check_circle'
} as const

/**
 * Common Font Awesome icons for easy reference
 */
export const fontAwesomeIcons = {
  // Navigation
  home: 'house',
  menu: 'bars',
  close: 'xmark',
  arrowLeft: 'arrow-left',
  arrowRight: 'arrow-right',
  arrowUp: 'arrow-up',
  arrowDown: 'arrow-down',

  // Actions
  add: 'plus',
  remove: 'minus',
  edit: 'pen',
  delete: 'trash',
  save: 'floppy-disk',
  cancel: 'ban',
  check: 'check',
  clear: 'eraser',

  // Content
  copy: 'copy',
  cut: 'scissors',
  paste: 'paste',
  undo: 'rotate-left',
  redo: 'rotate-right',

  // Communication
  email: 'envelope',
  phone: 'phone',
  message: 'message',
  chat: 'comments',

  // Media
  play: 'play',
  pause: 'pause',
  stop: 'stop',
  volumeHigh: 'volume-high',
  volumeLow: 'volume-low',
  volumeMute: 'volume-xmark',

  // File
  folder: 'folder',
  file: 'file',
  download: 'download',
  upload: 'upload',

  // Social
  share: 'share',
  like: 'thumbs-up',
  heart: 'heart',

  // UI
  search: 'magnifying-glass',
  filter: 'filter',
  sort: 'arrow-up-down',
  settings: 'gear',
  info: 'circle-info',
  warning: 'triangle-exclamation',
  error: 'circle-xmark',
  success: 'circle-check'
} as const
