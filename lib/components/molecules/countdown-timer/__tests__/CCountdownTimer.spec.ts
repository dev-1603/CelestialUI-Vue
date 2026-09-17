import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CCountdownTimer from '../CCountdownTimer.vue'

describe('CCountdownTimer', () => {
  let wrapper: any

  const createWrapper = (props = {}) => {
    return mount(CCountdownTimer, {
      props: {
        initialSeconds: 10,
        ...props
      }
    })
  }

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    if (wrapper) wrapper.unmount()
    vi.restoreAllMocks()
  })

  it('renders initial formatted time', () => {
    wrapper = createWrapper()
    expect(wrapper.text()).toBe('00:10')
  })

  it('formats time properly (ss format)', () => {
    wrapper = createWrapper({ format: 'ss' })
    expect(wrapper.text()).toBe('10')
  })

  it('formats time properly (text format)', () => {
    wrapper = createWrapper({ initialSeconds: 65, format: 'text' })
    expect(wrapper.text()).toBe('1m 5s')
  })

  it('starts automatically if autoStart is true', async () => {
    wrapper = createWrapper({ autoStart: true })
    
    expect(wrapper.text()).toBe('00:10')
    vi.advanceTimersByTime(1000)
    await wrapper.vm.$nextTick()
    
    expect(wrapper.text()).toBe('00:09')
    expect(wrapper.emitted('tick')?.[0]).toEqual([9])
  })

  it('does not auto start if disabled', () => {
    wrapper = createWrapper({ autoStart: true, disabled: true })
    vi.advanceTimersByTime(1000)
    expect(wrapper.emitted('tick')).toBeFalsy()
  })

  it('can be manually started, paused, and reset via exposed methods', async () => {
    wrapper = createWrapper()
    
    wrapper.vm.start()
    vi.advanceTimersByTime(2000)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toBe('00:08')
    
    wrapper.vm.pause()
    vi.advanceTimersByTime(1000)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toBe('00:08') // Should not change
    
    wrapper.vm.reset()
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toBe('00:10')
  })

  it('emits complete when reaching zero', async () => {
    wrapper = createWrapper({ initialSeconds: 2, autoStart: true })
    
    vi.advanceTimersByTime(2000)
    await wrapper.vm.$nextTick()
    
    expect(wrapper.text()).toBe('00:00')
    expect(wrapper.emitted('complete')).toBeTruthy()
  })
})
