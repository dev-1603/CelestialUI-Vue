# CCard

A highly composable, accessible container component with header, body, footer, and media regions.

## Features

- **Semantic HTML**: Uses proper semantic elements (header, main, footer)
- **Accessibility**: Full ARIA support, keyboard navigation, screen reader friendly
- **Flexible Layout**: Multiple slots for different content regions
- **Visual Variants**: Elevated, outlined, hoverable, and interactive states
- **Responsive**: Mobile-first design with responsive padding and sizing
- **Customizable**: Support for custom dimensions, styling, and semantic elements
- **Loading States**: Built-in loading indicator with proper accessibility

## Usage

### Basic Usage

```vue
<template>
  <CCard>
    <p>Basic card content</p>
  </CCard>
</template>
```

### With All Sections

```vue
<template>
  <CCard elevated hoverable>
    <template #header>
      <h2>Card Title</h2>
      <p>Subtitle</p>
    </template>

    <p>Main content goes here...</p>

    <template #footer>
      <button>Action Button</button>
    </template>
  </CCard>
</template>
```

### With Media

```vue
<template>
  <CCard elevated radius="lg">
    <template #media>
      <img src="image.jpg" alt="Description" />
    </template>

    <template #header>
      <h2>Media Card</h2>
    </template>

    <p>Content below the media</p>
  </CCard>
</template>
```

### Interactive Card

```vue
<template>
  <CCard
    interactive
    elevated
    hoverable
    aria-label="Clickable product card"
    @click="handleCardClick"
  >
    <template #header>
      <h2>Product Name</h2>
    </template>

    <p>Click this card to view details</p>
  </CCard>
</template>
```

## Props

| Prop              | Type                                       | Default     | Description                                       |
| ----------------- | ------------------------------------------ | ----------- | ------------------------------------------------- |
| `as`              | `string`                                   | `'section'` | Semantic HTML tag to render as                    |
| `elevated`        | `boolean`                                  | `false`     | Whether card has elevated shadow                  |
| `outlined`        | `boolean`                                  | `false`     | Whether card has outlined border                  |
| `hoverable`       | `boolean`                                  | `false`     | Whether card is hoverable                         |
| `interactive`     | `boolean`                                  | `false`     | Whether card is interactive (clickable/focusable) |
| `loading`         | `boolean`                                  | `false`     | Loading state                                     |
| `padding`         | `'none' \| 'sm' \| 'md' \| 'lg'`           | `'md'`      | Padding size                                      |
| `radius`          | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'md'`      | Border radius                                     |
| `maxWidth`        | `string \| number`                         | `undefined` | Maximum width                                     |
| `height`          | `string \| number`                         | `undefined` | Height                                            |
| `tabIndex`        | `number`                                   | `undefined` | Tab index for keyboard navigation                 |
| `ariaLabel`       | `string`                                   | `undefined` | Accessibility label                               |
| `ariaDescribedBy` | `string`                                   | `undefined` | Accessibility description                         |
| `class`           | `string`                                   | `undefined` | Custom CSS class                                  |
| `style`           | `string \| object`                         | `undefined` | Custom CSS styles                                 |

## Slots

| Slot      | Description                                       |
| --------- | ------------------------------------------------- |
| `header`  | Header content (title, subtitle, avatar, actions) |
| `default` | Main content/body                                 |
| `media`   | Media content (images, videos, etc.)              |
| `footer`  | Footer content (buttons, links, CTA)              |
| `overlay` | Overlay content (skeleton, loader)                |
| `actions` | Secondary actions                                 |

## Events

| Event        | Description                                   |
| ------------ | --------------------------------------------- |
| `click`      | Emitted when card is clicked (if interactive) |
| `focus`      | Emitted when card receives focus              |
| `blur`       | Emitted when card loses focus                 |
| `keydown`    | Emitted on keyboard events                    |
| `mouseenter` | Emitted when mouse enters card                |
| `mouseleave` | Emitted when mouse leaves card                |

## Accessibility

- **ARIA Support**: Proper role, labels, and descriptions
- **Keyboard Navigation**: Enter and Space key activation for interactive cards
- **Focus Management**: Proper tabindex and focus ring styles
- **Screen Reader**: Semantic HTML structure with proper heading hierarchy
- **Loading States**: aria-busy and loading indicators with proper labeling

## Styling

The component uses CSS custom properties and Tailwind classes for styling. Key classes:

- `.celestial-card` - Base card styles
- `.celestial-card--elevated` - Shadow elevation
- `.celestial-card--outlined` - Border outline
- `.celestial-card--hoverable` - Hover effects
- `.celestial-card--interactive` - Interactive state
- `.celestial-card--loading` - Loading state

## Examples

### Product Card

```vue
<CCard elevated hoverable interactive>
  <template #media>
    <img src="product.jpg" alt="Product" />
  </template>
  
  <template #header>
    <h2>Product Name</h2>
    <p>$29.99</p>
  </template>
  
  <p>Product description...</p>
  
  <template #footer>
    <button>Add to Cart</button>
  </template>
</CCard>
```

### Article Card

```vue
<CCard as="article" outlined>
  <template #header>
    <h2>Article Title</h2>
    <p>By Author Name</p>
  </template>
  
  <p>Article excerpt...</p>
  
  <template #footer>
    <a href="/article">Read More</a>
  </template>
</CCard>
```

### Loading Card

```vue
<CCard loading elevated>
  <template #header>
    <h2>Loading...</h2>
  </template>
  
  <p>Content is being loaded</p>
</CCard>
```

## Best Practices

1. **Use semantic elements**: Choose appropriate `as` prop values for your content
2. **Provide accessibility labels**: Always include `aria-label` for interactive cards
3. **Maintain heading hierarchy**: Use proper heading levels in header slots
4. **Keep content focused**: Each card should have a clear purpose and focused content
5. **Consider loading states**: Use loading prop for async content
6. **Test keyboard navigation**: Ensure interactive cards work with keyboard only
