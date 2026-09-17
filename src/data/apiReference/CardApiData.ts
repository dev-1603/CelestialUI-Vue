// API Reference Data for CCard Component
import type { ApiReferenceData } from './index'

export const cardApiData: ApiReferenceData = {
  title: 'CCard Component API',
  componentProps: [
    {
      name: 'variant',
      type: 'CardVariant',
      required: false,
      description: 'Visual style variant of the card',
      default: 'default'
    },
    {
      name: 'size',
      type: 'CardSize',
      required: false,
      description: 'Size of the card component',
      default: 'md'
    },
    {
      name: 'elevation',
      type: 'CardElevation',
      required: false,
      description: 'Shadow elevation level',
      default: 'sm'
    },
    {
      name: 'rounded',
      type: 'CardRounded',
      required: false,
      description: 'Border radius of the card',
      default: 'md'
    },
    {
      name: 'padding',
      type: 'CardPadding',
      required: false,
      description: 'Internal padding of the card',
      default: 'md'
    },
    {
      name: 'hoverable',
      type: 'boolean',
      required: false,
      description: 'Whether the card has hover effects',
      default: 'false'
    },
    {
      name: 'clickable',
      type: 'boolean',
      required: false,
      description: 'Whether the card is clickable',
      default: 'false'
    },
    {
      name: 'loading',
      type: 'boolean',
      required: false,
      description: 'Whether the card is in a loading state',
      default: 'false'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      description: 'Whether the card is disabled',
      default: 'false'
    }
  ],
  componentEvents: [
    {
      name: 'click',
      description: 'Emitted when the card is clicked (only when clickable is true)',
      payload: 'MouseEvent',
      usage: '@click="handleCardClick"'
    },
    {
      name: 'hover',
      description: 'Emitted when the card is hovered',
      payload: 'MouseEvent',
      usage: '@hover="handleCardHover"'
    }
  ],
  componentSlots: [
    {
      name: 'default',
      description: 'Main content of the card',
      content: 'Card body content'
    },
    {
      name: 'header',
      description: 'Card header content',
      content: 'Title, actions, or other header elements'
    },
    {
      name: 'footer',
      description: 'Card footer content',
      content: 'Actions, metadata, or other footer elements'
    },
    {
      name: 'media',
      description: 'Media content (image, video, etc.)',
      content: 'Media elements displayed at the top of the card'
    },
    {
      name: 'actions',
      description: 'Action buttons or controls',
      content: 'Buttons or other interactive elements'
    },
    {
      name: 'loading',
      description: 'Custom loading state content',
      content: 'Custom loading spinner or skeleton content'
    }
  ],
  usageExamples: [
    {
      title: 'Basic Card',
      code: `<CCard>
  <template #header>
    <h3>Card Title</h3>
  </template>
  <template #default>
    <p>This is the card content.</p>
  </template>
  <template #footer>
    <CButton variant="primary">Action</CButton>
  </template>
</CCard>`
    },
    {
      title: 'Card with Media',
      code: `<CCard hoverable>
  <template #media>
    <img src="https://example.com/image.jpg" alt="Card image" />
  </template>
  <template #header>
    <h3>Media Card</h3>
  </template>
  <template #default>
    <p>Card with image content.</p>
  </template>
</CCard>`
    },
    {
      title: 'Clickable Card',
      code: `<CCard 
  clickable 
  hoverable 
  @click="handleCardClick"
>
  <template #default>
    <h3>Clickable Card</h3>
    <p>Click anywhere on this card.</p>
  </template>
</CCard>`
    },
    {
      title: 'Loading Card',
      code: `<CCard loading>
  <template #loading>
    <div class="animate-pulse">
      <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div class="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </template>
</CCard>`
    },
    {
      title: 'Card with Custom Styling',
      code: `<CCard 
  variant="outlined" 
  elevation="lg" 
  rounded="xl"
  padding="lg"
>
  <template #default>
    <h3>Custom Styled Card</h3>
    <p>Card with custom variant, elevation, and padding.</p>
  </template>
</CCard>`
    }
  ]
}



