import type { Meta, StoryObj } from '@storybook/vue3'
import CIcon from '../CIcon.vue'
import type { CIconProps } from '../CIcon.types'

const meta: Meta<typeof CIcon> = {
  title: 'Atoms/CIcon',
  component: CIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# CIcon Component

A headless, versatile icon component supporting multiple icon libraries and rendering methods.

## Features

- **Multiple Libraries**: Support for Material Icons, Font Awesome, and custom icons
- **Multiple Types**: Font icons, SVG icons, and image icons
- **Accessibility**: Built-in ARIA support and keyboard navigation
- **Customizable**: Extensive styling and theming options
- **Animations**: Built-in animation support (spin, pulse, bounce, fade)
- **Responsive**: Size variants and custom sizing
- **Interactive**: Clickable icons with proper focus states

## Icon Libraries

### Material Icons
- Variants: filled, outlined, round, sharp, two-tone
- Usage: Set \`library="material"\` and \`name="icon_name"\`

### Font Awesome
- Styles: solid, regular, light, thin, duotone, brands
- Usage: Set \`library="fontawesome"\` and \`name="icon-name"\`

### Custom SVG
- Direct SVG content or external SVG files
- Usage: Set \`type="svg"\` and provide \`svg\` prop or \`src\`

### Image Icons
- Any image format (PNG, JPG, WebP, etc.)
- Usage: Set \`type="image"\` and provide \`src\`
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    library: {
      control: 'select',
      options: ['material', 'fontawesome', 'custom'],
      description: 'Icon library to use'
    },
    type: {
      control: 'select',
      options: ['font', 'svg', 'image'],
      description: 'Type of icon rendering'
    },
    name: {
      control: 'text',
      description: 'Icon name/identifier'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Icon size'
    },
    color: {
      control: 'select',
      options: ['inherit', 'current', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Icon color'
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'round', 'sharp', 'two-tone'],
      description: 'Material Icons variant'
    },
    style: {
      control: 'select',
      options: ['solid', 'regular', 'light', 'thin', 'duotone', 'brands'],
      description: 'Font Awesome style'
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the icon is clickable'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the icon is disabled'
    },
    loading: {
      control: 'boolean',
      description: 'Whether the icon is in loading state'
    },
    animation: {
      control: 'select',
      options: [undefined, 'spin', 'pulse', 'bounce', 'fade'],
      description: 'Icon animation'
    },
    flipX: {
      control: 'boolean',
      description: 'Flip horizontally'
    },
    flipY: {
      control: 'boolean',
      description: 'Flip vertically'
    },
    rotate: {
      control: 'number',
      description: 'Rotation angle in degrees'
    },
    inlineSvg: {
      control: 'boolean',
      description: 'Whether to load external SVG files inline (allows customization)'
    },
    cacheSvg: {
      control: 'boolean',
      description: 'Whether to cache loaded SVG content'
    },
    loadTimeout: {
      control: 'number',
      description: 'Timeout for SVG loading in milliseconds'
    }
  }
}

export default meta

type Story = StoryObj<typeof CIcon>

// Default story
export const Default: Story = {
  args: {
    library: 'material',
    type: 'font',
    name: 'star',
    size: 'md',
    color: 'inherit'
  }
}

// Material Icons examples
export const MaterialIcons: Story = {
  render: () => ({
    components: { CIcon },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <div style="text-align: center;">
          <CIcon library="material" name="home" size="lg" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">home</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="star" size="lg" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">star</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="favorite" size="lg" color="error" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">favorite</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="settings" size="lg" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">settings</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="search" size="lg" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">search</div>
        </div>
      </div>
    `
  })
}

// Material Icons variants
export const MaterialIconVariants: Story = {
  render: () => ({
    components: { CIcon },
    template: `
      <div style="display: flex; gap: 2rem; align-items: center;">
        <div style="text-align: center;">
          <CIcon library="material" variant="filled" name="star" size="xl" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">Filled</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" variant="outlined" name="star" size="xl" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">Outlined</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" variant="round" name="star" size="xl" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">Round</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" variant="sharp" name="star" size="xl" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">Sharp</div>
        </div>
      </div>
    `
  })
}

// Font Awesome examples (Note: Requires Font Awesome to be loaded)
export const FontAwesome: Story = {
  render: () => ({
    components: { CIcon },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <div style="text-align: center;">
          <CIcon library="fontawesome" style="solid" name="house" size="lg" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">house (solid)</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="fontawesome" style="regular" name="star" size="lg" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">star (regular)</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="fontawesome" style="solid" name="heart" size="lg" color="error" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">heart (solid)</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="fontawesome" style="brands" name="github" size="lg" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">github (brands)</div>
        </div>
      </div>
    `
  })
}

// SVG Icons
export const SVGIcons: Story = {
  render: () => ({
    components: { CIcon },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <CIcon
          type="svg"
          :svg="'<path d=\\"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z\\"/>'"
          size="xl"
          color="warning"
          viewBox="0 0 24 24"
        />
        <CIcon
          type="svg"
          :svg="'<path d=\\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\\"/>'"
          size="xl"
          color="error"
          viewBox="0 0 24 24"
        />
      </div>
    `
  })
}

// Size variants
export const Sizes: Story = {
  render: () => ({
    components: { CIcon },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <div style="text-align: center;">
          <CIcon library="material" name="star" size="xs" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">xs</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="star" size="sm" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">sm</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="star" size="md" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">md</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="star" size="lg" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">lg</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="star" size="xl" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">xl</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="star" size="2xl" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">2xl</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="star" size="3xl" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">3xl</div>
        </div>
      </div>
    `
  })
}

// Colors
export const Colors: Story = {
  render: () => ({
    components: { CIcon },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <div style="text-align: center;">
          <CIcon library="material" name="circle" size="xl" color="primary" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">primary</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="circle" size="xl" color="secondary" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">secondary</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="circle" size="xl" color="success" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">success</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="circle" size="xl" color="warning" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">warning</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="circle" size="xl" color="error" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">error</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="circle" size="xl" color="info" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">info</div>
        </div>
      </div>
    `
  })
}

// Clickable icons
export const Clickable: Story = {
  render: () => ({
    components: { CIcon },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <CIcon
          library="material"
          name="thumb_up"
          size="lg"
          color="primary"
          clickable
          @click="handleClick('like')"
        />
        <CIcon
          library="material"
          name="favorite"
          size="lg"
          color="error"
          clickable
          @click="handleClick('favorite')"
        />
        <CIcon
          library="material"
          name="share"
          size="lg"
          color="info"
          clickable
          @click="handleClick('share')"
        />
        <CIcon
          library="material"
          name="bookmark"
          size="lg"
          color="warning"
          clickable
          @click="handleClick('bookmark')"
        />
      </div>
    `,
    methods: {
      handleClick(action: string) {
        alert(`Clicked ${action} icon!`)
      }
    }
  })
}

// Animations
export const Animations: Story = {
  render: () => ({
    components: { CIcon },
    template: `
      <div style="display: flex; gap: 2rem; align-items: center;">
        <div style="text-align: center;">
          <CIcon library="material" name="refresh" size="xl" animation="spin" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">Spin</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="favorite" size="xl" color="error" animation="pulse" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">Pulse</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="arrow_upward" size="xl" color="success" animation="bounce" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">Bounce</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="lightbulb" size="xl" color="warning" animation="fade" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">Fade</div>
        </div>
      </div>
    `
  })
}

// Transforms
export const Transforms: Story = {
  render: () => ({
    components: { CIcon },
    template: `
      <div style="display: flex; gap: 2rem; align-items: center;">
        <div style="text-align: center;">
          <CIcon library="material" name="arrow_forward" size="xl" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">Normal</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="arrow_forward" size="xl" :rotate="90" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">Rotate 90°</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="arrow_forward" size="xl" :rotate="180" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">Rotate 180°</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="arrow_forward" size="xl" flipX />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">Flip X</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="arrow_forward" size="xl" flipY />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">Flip Y</div>
        </div>
      </div>
    `
  })
}

// States
export const States: Story = {
  render: () => ({
    components: { CIcon },
    template: `
      <div style="display: flex; gap: 2rem; align-items: center;">
        <div style="text-align: center;">
          <CIcon library="material" name="settings" size="xl" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">Normal</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="settings" size="xl" disabled />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">Disabled</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="settings" size="xl" loading />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">Loading</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="settings" size="xl" clickable />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">Clickable</div>
        </div>
      </div>
    `
  })
}

// Custom sizing
export const CustomSizing: Story = {
  render: () => ({
    components: { CIcon },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <div style="text-align: center;">
          <CIcon library="material" name="star" :size="16" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">16px</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="star" :size="32" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">32px</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="star" :size="48" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">48px</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="star" size="4rem" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">4rem</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="star" size="3em" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">3em</div>
        </div>
      </div>
    `
  })
}

// External SVG Loading
export const ExternalSVG: Story = {
  render: () => ({
    components: { CIcon },
    template: `
      <div style="display: flex; gap: 2rem; align-items: center;">
        <div style="text-align: center;">
          <CIcon
            type="svg"
            src="https://www.svgrepo.com/show/13695/star.svg"
            :size="48"
            color="warning"
            inline-svg
            cache-svg
          />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">External SVG (Inline)</div>
        </div>
        <div style="text-align: center;">
          <CIcon
            type="image"
            src="https://www.svgrepo.com/show/13695/star.svg"
            :size="48"
            alt="Star icon"
          />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">External SVG (Image)</div>
        </div>
      </div>
    `
  })
}

// SVG with custom styling
export const CustomizableExternalSVG: Story = {
  render: () => ({
    components: { CIcon },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <CIcon
          src="https://www.svgrepo.com/show/13695/star.svg"
          :size="40"
          color="primary"
          inline-svg
        />
        <CIcon
          src="https://www.svgrepo.com/show/13695/star.svg"
          :size="40"
          color="error"
          inline-svg
        />
        <CIcon
          src="https://www.svgrepo.com/show/13695/star.svg"
          :size="40"
          color="success"
          inline-svg
        />
        <CIcon
          src="https://www.svgrepo.com/show/13695/star.svg"
          :size="40"
          color="#ff6b35"
          inline-svg
        />
      </div>
    `
  })
}

// Pixel-perfect sizing
export const PixelSizing: Story = {
  render: () => ({
    components: { CIcon },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <div style="text-align: center;">
          <CIcon library="material" name="star" :size="12" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">12px</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="star" :size="16" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">16px</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="star" :size="20" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">20px</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="star" :size="24" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">24px</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="star" :size="32" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">32px</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="star" :size="48" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">48px</div>
        </div>
        <div style="text-align: center;">
          <CIcon library="material" name="star" :size="64" />
          <div style="font-size: 0.75rem; margin-top: 0.25rem;">64px</div>
        </div>
      </div>
    `
  })
}
