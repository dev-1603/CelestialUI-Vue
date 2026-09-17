import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CPinInput from '../CPinInput.vue'

describe('CPinInput', () => {
  let wrapper: any

  const createWrapper = (props = {}) => {
    return mount(CPinInput, {
      props: {
        modelValue: '',
        ...props
      },
      attachTo: document.body
    })
  }

  afterEach(() => {
    if (wrapper) wrapper.unmount()
  })

  it('renders correct number of inputs based on length prop', () => {
    wrapper = createWrapper({ length: 5 })
    const inputs = wrapper.findAll('input')
    expect(inputs.length).toBe(5)
  })

  it('populates inputs when modelValue is provided', () => {
    wrapper = createWrapper({ modelValue: '1234' })
    const inputs = wrapper.findAll('input')
    expect((inputs[0].element as HTMLInputElement).value).toBe('1')
    expect((inputs[3].element as HTMLInputElement).value).toBe('4')
  })

  it('emits update:modelValue when typing', async () => {
    wrapper = createWrapper()
    const inputs = wrapper.findAll('input')
    
    await inputs[0].setValue('1')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['1'])
    
    await inputs[1].setValue('2')
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual(['12'])
  })

  it('emits complete when all inputs are filled', async () => {
    wrapper = createWrapper({ modelValue: '123' }) // 3 chars filled
    const inputs = wrapper.findAll('input')
    
    await inputs[3].setValue('4')
    expect(wrapper.emitted('update:modelValue')?.pop()).toEqual(['1234'])
    expect(wrapper.emitted('complete')?.[0]).toEqual(['1234'])
  })

  it('only allows numbers when type="number"', async () => {
    wrapper = createWrapper({ type: 'number' })
    const inputs = wrapper.findAll('input')
    
    await inputs[0].setValue('a')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    
    await inputs[0].setValue('1')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })
})
