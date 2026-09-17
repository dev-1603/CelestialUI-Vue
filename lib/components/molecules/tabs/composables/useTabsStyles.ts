import { computed } from 'vue'
import type { CTabsProps } from '../CTabs.types'

export function useTabsStyles(props: CTabsProps) {
  const wrapperClasses = computed(() => [
    'cui-tabs',
    `cui-tabs--${props.orientation || 'horizontal'}`,
    `cui-tabs--${props.variant || 'line'}`,
    {
      'cui-tabs--scrollable': props.scrollable
    }
  ])

  const tabListClasses = computed(() => [
    'cui-tab-list'
  ])

  const getTabClasses = (item: any, isActive: boolean) => [
    'cui-tab',
    {
      'cui-tab--active': isActive,
      'cui-tab--disabled': item.disabled
    }
  ]

  return { wrapperClasses, tabListClasses, getTabClasses }
}
