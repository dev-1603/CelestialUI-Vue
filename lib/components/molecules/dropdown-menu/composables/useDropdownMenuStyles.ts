import { computed } from 'vue'
import type { CDropdownMenuProps } from '../CDropdownMenu.types'

export function useDropdownMenuStyles(props: CDropdownMenuProps) {
  const wrapperClasses = computed(() => ['cui-dropdown-wrapper'])
  
  const menuClasses = computed(() => [
    'cui-dropdown-menu',
    `cui-dropdown-menu--${props.placement || 'bottom-start'}`
  ])

  const getItemClasses = (item: any) => [
    'cui-dropdown-item',
    {
      'cui-dropdown-item--disabled': item.disabled,
      'cui-dropdown-item--divider': item.divider
    }
  ]

  return { wrapperClasses, menuClasses, getItemClasses }
}
