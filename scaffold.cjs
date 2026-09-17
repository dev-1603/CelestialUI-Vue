const fs = require('fs')
const path = require('path')

const components = [
  { name: 'CDialog', dir: 'dialog' },
  { name: 'CDropdownMenu', dir: 'dropdown-menu' },
  { name: 'CTabs', dir: 'tabs' },
  { name: 'CPinInput', dir: 'pin-input' }
]

const basePath = path.join(__dirname, 'lib/components/molecules')

if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath, { recursive: true })
}

components.forEach(comp => {
  const compDir = path.join(basePath, comp.dir)
  const dirs = [
    compDir,
    path.join(compDir, '__tests__'),
    path.join(compDir, 'composables'),
    path.join(compDir, 'styles')
  ]

  dirs.forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true })
  })

  // .types.ts
  fs.writeFileSync(path.join(compDir, `${comp.name}.types.ts`), `export interface ${comp.name}Props {}
export interface ${comp.name}Emits {}
`)

  // .vue
  fs.writeFileSync(path.join(compDir, `${comp.name}.vue`), `<template>
  <div :class="wrapperClasses">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { ${comp.name}Props, ${comp.name}Emits } from './${comp.name}.types'
import { use${comp.name.substring(1)}Styles } from './composables/use${comp.name.substring(1)}Styles'
import './styles/${comp.name}.css'

defineOptions({ name: '${comp.name}' })
const props = withDefaults(defineProps<${comp.name}Props>(), {})
const emit = defineEmits<${comp.name}Emits>()

const { wrapperClasses } = use${comp.name.substring(1)}Styles(props)
</script>
`)

  // composables/useStyles.ts
  fs.writeFileSync(path.join(compDir, 'composables', `use${comp.name.substring(1)}Styles.ts`), `import { computed } from 'vue'
import type { ${comp.name}Props } from '../${comp.name}.types'

export function use${comp.name.substring(1)}Styles(props: ${comp.name}Props) {
  const wrapperClasses = computed(() => ['cui-${comp.name.substring(1).toLowerCase()}'])
  return { wrapperClasses }
}
`)

  // styles/CX.css
  fs.writeFileSync(path.join(compDir, 'styles', `${comp.name}.css`), `.cui-${comp.name.substring(1).toLowerCase()} {
  /* Add styles here */
}
`)

  // index.ts
  fs.writeFileSync(path.join(compDir, 'index.ts'), `import ${comp.name} from './${comp.name}.vue'
export { ${comp.name} }
export * from './${comp.name}.types'
export * from './composables'
`)

  // composables/index.ts
  fs.writeFileSync(path.join(compDir, 'composables', 'index.ts'), `export * from './use${comp.name.substring(1)}Styles'
`)

  // __tests__
  fs.writeFileSync(path.join(compDir, '__tests__', `${comp.name}.spec.ts`), `import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ${comp.name} from '../${comp.name}.vue'

describe('${comp.name}', () => {
  it('renders correctly', () => {
    const wrapper = mount(${comp.name})
    expect(wrapper.exists()).toBe(true)
  })
})
`)
})

console.log('Scaffolded Tier 2 components')
