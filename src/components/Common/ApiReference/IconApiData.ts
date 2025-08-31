// Icon API data for the generic ApiReference component
export const iconApiData = {
  title: 'CIcon API Reference',
  componentProps: [
    {
      name: 'name',
      type: 'string',
      required: true,
      description: 'Icon identifier or file path'
    },
    {
      name: 'library',
      type: "'material' | 'fontawesome' | 'custom'",
      required: false,
      description: 'Icon library to use',
      default: 'material'
    },
    {
      name: 'size',
      type: "number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'",
      required: false,
      description: 'Icon size preset or custom pixels',
      default: 'md'
    },
    {
      name: 'color',
      type: 'string',
      required: false,
      description: 'Icon color (CSS color value)',
      default: 'currentColor'
    },
    {
      name: 'type',
      type: "'font' | 'svg' | 'image'",
      required: false,
      description: 'Icon rendering type',
      default: 'font'
    },
    {
      name: 'variant',
      type: "'filled' | 'outlined' | 'round' | 'sharp'",
      required: false,
      description: 'Material icon variant style'
    },
    {
      name: 'animation',
      type: "'spin' | 'pulse' | 'bounce' | 'fade'",
      required: false,
      description: 'Icon animation effect'
    },
    {
      name: 'rotate',
      type: 'number',
      required: false,
      description: 'Rotation angle in degrees'
    },
    {
      name: 'flipX',
      type: 'boolean',
      required: false,
      description: 'Flip horizontally'
    },
    {
      name: 'flipY',
      type: 'boolean',
      required: false,
      description: 'Flip vertically'
    }
  ],
  componentEvents: [
    {
      name: '@click',
      description: 'Triggered when icon is clicked',
      payload: 'MouseEvent',
      usage: '@click="handleClick"'
    },
    {
      name: '@mouseenter',
      description: 'Triggered when mouse enters icon area',
      payload: 'MouseEvent',
      usage: '@mouseenter="onHover"'
    },
    {
      name: '@mouseleave',
      description: 'Triggered when mouse leaves icon area',
      payload: 'MouseEvent',
      usage: '@mouseleave="onLeave"'
    },
    {
      name: '@error',
      description: 'Triggered when icon fails to load',
      payload: 'Error',
      usage: '@error="handleError"'
    }
  ],
  componentSlots: [
    {
      name: 'default',
      description: 'Custom icon content (overrides name prop)',
      content: 'Any Vue content',
      example: '<CIcon>\n  <CustomSVG />\n</CIcon>'
    },
    {
      name: 'fallback',
      description: 'Content shown when icon fails to load',
      content: 'Fallback UI elements',
      example: '<template #fallback>\n  ❌ Failed\n</template>'
    },
    {
      name: 'loading',
      description: 'Content shown while icon is loading',
      content: 'Loading spinner or text',
      example: '<template #loading>\n  <Spinner />\n</template>'
    }
  ],
  usageExamples: [
    {
      title: 'Basic Icon',
      code: '<CIcon name="star" size="lg" color="gold" />'
    },
    {
      title: 'SVG File Icon',
      code: '<CIcon type="svg" name="/icons/custom.svg" />'
    },
    {
      title: 'Animated Icon',
      code: '<CIcon name="refresh" animation="spin" />'
    },
    {
      title: 'Custom Content',
      code: '<CIcon><CustomSVG /></CIcon>'
    }
  ]
}
