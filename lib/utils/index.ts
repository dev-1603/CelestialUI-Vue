// Utility functions for CelestialUI

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function generateId(prefix = 'cui'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

export function focusNextElement(currentElement?: Element): void {
  const focusableElements = Array.from(
    document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute('disabled')) as HTMLElement[]

  const currentIndex = currentElement
    ? focusableElements.indexOf(currentElement as HTMLElement)
    : -1
  const nextIndex = (currentIndex + 1) % focusableElements.length
  focusableElements[nextIndex]?.focus()
}

export function focusPreviousElement(currentElement?: Element): void {
  const focusableElements = Array.from(
    document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute('disabled')) as HTMLElement[]

  const currentIndex = currentElement
    ? focusableElements.indexOf(currentElement as HTMLElement)
    : -1
  const previousIndex = currentIndex <= 0
    ? focusableElements.length - 1
    : currentIndex - 1
  focusableElements[previousIndex]?.focus()
}








