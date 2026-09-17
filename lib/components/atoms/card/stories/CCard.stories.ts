import type { Meta, StoryObj } from '@storybook/vue3'
import CCard from '../CCard.vue'

/**
 * CCard - Highly composable, accessible container with header, body, footer, and media regions.
 *
 * The CCard component provides a flexible container for organizing content with semantic structure,
 * accessibility features, and customizable styling options.
 *
 * @example
 * ```vue
 * <CCard elevated hoverable>
 *   <template #header>
 *     <h2>Card Title</h2>
 *     <p>Subtitle</p>
 *   </template>
 *
 *   <p>Card content goes here...</p>
 *
 *   <template #footer>
 *     <button>Action</button>
 *   </template>
 * </CCard>
 * ```
 */
const meta: Meta<typeof CCard> = {
  title: 'Atoms/CCard',
  component: CCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A highly composable, accessible container component with header, body, footer, and media regions. Supports various visual variants, interactive states, and accessibility features.',
      },
    },
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['section', 'article', 'div', 'aside', 'main', 'header', 'footer'],
      description: 'Semantic HTML tag to render as',
    },
    elevated: {
      control: 'boolean',
      description: 'Whether card has elevated shadow',
    },
    outlined: {
      control: 'boolean',
      description: 'Whether card has outlined border',
    },
    hoverable: {
      control: 'boolean',
      description: 'Whether card is hoverable',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether card is interactive (clickable/focusable)',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding size',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'Border radius',
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width',
    },
    height: {
      control: 'text',
      description: 'Height',
    },
    tabIndex: {
      control: 'number',
      description: 'Tab index for keyboard navigation',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessibility label',
    },
    ariaDescribedBy: {
      control: 'text',
      description: 'Accessibility description',
    },
  },
  args: {
    as: 'section',
    elevated: false,
    outlined: false,
    hoverable: false,
    interactive: false,
    loading: false,
    padding: 'md',
    radius: 'md',
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default card with basic content
 */
export const Default: Story = {
  tags: ['a11y-smoke'],
  parameters: {
    a11y: { test: 'error' },
  },
  args: {
    children: 'This is a basic card with default styling.',
    ariaLabel: 'Basic card',
  },
}

/**
 * Card with header, body, and footer sections
 */
export const WithSections: Story = {
  args: {
    elevated: true,
  },
  render: (args) => ({
    components: { CCard },
    setup() {
      return { args }
    },
    template: `
      <CCard v-bind="args" style="width: 400px;">
        <template #header>
          <h2 style="margin: 0; font-size: 1.25rem; font-weight: 600;">Card Title</h2>
          <p style="margin: 0.5rem 0 0 0; color: #6b7280; font-size: 0.875rem;">Card subtitle</p>
        </template>

        <p>This is the main content area of the card. It can contain any type of content including text, images, forms, or other components.</p>

        <template #footer>
          <button style="padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 0.375rem; cursor: pointer;">
            Action Button
          </button>
        </template>
      </CCard>
    `,
  }),
}

/**
 * Card with media (image) section
 */
export const WithMedia: Story = {
  args: {
    elevated: true,
    radius: 'lg',
  },
  render: (args) => ({
    components: { CCard },
    setup() {
      return { args }
    },
    template: `
      <CCard v-bind="args" style="width: 400px;">
        <template #media>
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
            alt="Mountain landscape"
            style="width: 100%; height: 200px; object-fit: cover;"
          />
        </template>

        <template #header>
          <h2 style="margin: 0; font-size: 1.25rem; font-weight: 600;">Mountain Adventure</h2>
        </template>

        <p>Experience the beauty of mountain landscapes with our guided tours. Perfect for nature lovers and adventure seekers.</p>

        <template #footer>
          <button style="padding: 0.5rem 1rem; background: #10b981; color: white; border: none; border-radius: 0.375rem; cursor: pointer;">
            Book Now
          </button>
        </template>
      </CCard>
    `,
  }),
}

/**
 * Elevated card with shadow
 */
export const Elevated: Story = {
  args: {
    elevated: true,
    children: 'This card has an elevated shadow effect.',
  },
}

/**
 * Outlined card with border
 */
export const Outlined: Story = {
  args: {
    outlined: true,
    children: 'This card has an outlined border.',
  },
}

/**
 * Hoverable card with hover effects
 */
export const Hoverable: Story = {
  args: {
    hoverable: true,
    elevated: true,
    children: 'Hover over this card to see the effect.',
  },
}

/**
 * Interactive card that can be clicked
 */
export const Interactive: Story = {
  args: {
    interactive: true,
    elevated: true,
    ariaLabel: 'Clickable product card',
  },
  render: (args) => ({
    components: { CCard },
    setup() {
      return { args }
    },
    template: `
      <CCard v-bind="args" style="width: 300px; cursor: pointer;" @click="() => alert('Card clicked!')">
        <template #header>
          <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600;">Product Name</h3>
        </template>

        <p>Click this card to interact with it. It supports keyboard navigation with Enter and Space keys.</p>

        <template #footer>
          <span style="color: #10b981; font-weight: 600;">$29.99</span>
        </template>
      </CCard>
    `,
  }),
}

/**
 * Loading state with spinner
 */
export const Loading: Story = {
  args: {
    loading: true,
    elevated: true,
    children: 'This card is in a loading state.',
  },
}

/**
 * Different padding sizes
 */
export const PaddingVariants: Story = {
  render: () => ({
    components: { CCard },
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <CCard padding="none" outlined style="width: 200px;">
          <div style="background: #f3f4f6; padding: 1rem; text-align: center;">
            No Padding
          </div>
        </CCard>

        <CCard padding="sm" outlined style="width: 200px;">
          Small Padding
        </CCard>

        <CCard padding="md" outlined style="width: 200px;">
          Medium Padding (Default)
        </CCard>

        <CCard padding="lg" outlined style="width: 200px;">
          Large Padding
        </CCard>
      </div>
    `,
  }),
}

/**
 * Different border radius options
 */
export const RadiusVariants: Story = {
  render: () => ({
    components: { CCard },
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <CCard radius="none" elevated style="width: 150px;">
          No Radius
        </CCard>

        <CCard radius="sm" elevated style="width: 150px;">
          Small Radius
        </CCard>

        <CCard radius="md" elevated style="width: 150px;">
          Medium Radius
        </CCard>

        <CCard radius="lg" elevated style="width: 150px;">
          Large Radius
        </CCard>

        <CCard radius="full" elevated style="width: 150px;">
          Full Radius
        </CCard>
      </div>
    `,
  }),
}

/**
 * Different semantic HTML elements
 */
export const SemanticElements: Story = {
  render: () => ({
    components: { CCard },
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <CCard as="article" elevated style="width: 200px;">
          <template #header>
            <h2 style="margin: 0; font-size: 1rem;">Article Card</h2>
          </template>
          <p style="margin: 0;">Rendered as &lt;article&gt;</p>
        </CCard>

        <CCard as="aside" elevated style="width: 200px;">
          <template #header>
            <h2 style="margin: 0; font-size: 1rem;">Aside Card</h2>
          </template>
          <p style="margin: 0;">Rendered as &lt;aside&gt;</p>
        </CCard>

        <CCard as="main" elevated style="width: 200px;">
          <template #header>
            <h2 style="margin: 0; font-size: 1rem;">Main Card</h2>
          </template>
          <p style="margin: 0;">Rendered as &lt;main&gt;</p>
        </CCard>
      </div>
    `,
  }),
}

/**
 * Card with custom dimensions
 */
export const CustomDimensions: Story = {
  args: {
    maxWidth: '500px',
    height: '300px',
    elevated: true,
  },
  render: (args) => ({
    components: { CCard },
    setup() {
      return { args }
    },
    template: `
      <CCard v-bind="args">
        <template #header>
          <h2 style="margin: 0; font-size: 1.25rem; font-weight: 600;">Fixed Dimensions</h2>
        </template>

        <p>This card has custom max-width and height properties set.</p>
        <p>Content will be constrained to these dimensions.</p>

        <template #footer>
          <button style="padding: 0.5rem 1rem; background: #8b5cf6; color: white; border: none; border-radius: 0.375rem; cursor: pointer;">
            Custom Size
          </button>
        </template>
      </CCard>
    `,
  }),
}

/**
 * Complex card with all features
 */
export const Complex: Story = {
  args: {
    elevated: true,
    hoverable: true,
    interactive: true,
    radius: 'lg',
    padding: 'lg',
    ariaLabel: 'Product showcase card',
  },
  render: (args) => ({
    components: { CCard },
    setup() {
      return { args }
    },
    template: `
      <CCard v-bind="args" style="width: 400px;" @click="() => alert('Product card clicked!')">
        <template #media>
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=250&fit=crop"
            alt="Modern watch"
            style="width: 100%; height: 250px; object-fit: cover;"
          />
        </template>

        <template #header>
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <h2 style="margin: 0; font-size: 1.25rem; font-weight: 600;">Premium Watch</h2>
              <p style="margin: 0.25rem 0 0 0; color: #6b7280; font-size: 0.875rem;">Luxury Collection</p>
            </div>
            <span style="background: #fef3c7; color: #92400e; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 600;">
              NEW
            </span>
          </div>
        </template>

        <p>Experience luxury and precision with our premium watch collection. Crafted with attention to detail and built to last.</p>

        <ul style="margin: 1rem 0; padding-left: 1.5rem;">
          <li>Stainless steel construction</li>
          <li>Water resistant up to 100m</li>
          <li>2-year warranty</li>
        </ul>

        <template #footer>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 1.5rem; font-weight: 700; color: #1f2937;">$299.99</span>
            <button style="padding: 0.75rem 1.5rem; background: #3b82f6; color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 600;">
              Add to Cart
            </button>
          </div>
        </template>

        <template #actions>
          <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
            <button style="padding: 0.5rem; background: #f3f4f6; border: none; border-radius: 0.375rem; cursor: pointer;">
              ♡
            </button>
            <button style="padding: 0.5rem; background: #f3f4f6; border: none; border-radius: 0.375rem; cursor: pointer;">
              ↻
            </button>
            <button style="padding: 0.5rem; background: #f3f4f6; border: none; border-radius: 0.375rem; cursor: pointer;">
              ⚡
            </button>
          </div>
        </template>
      </CCard>
    `,
  }),
}
