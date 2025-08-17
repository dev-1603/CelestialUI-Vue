<template>
  <div
    :class="[
      'c-radio',
      { 'c-radio--card': card },
      { 'c-radio--error': error },
      { [`c-radio--card-${cardOrientation}`]: card },
      'inline-block relative'
    ]"
  >
    <label
      :class="[
        'c-radio__label-wrapper',
        { 'c-radio__label-wrapper--card': card },
        'flex items-start cursor-pointer select-none'
      ]"
      v-bind="labelAttributes"
    >
      <input
        type="radio"
        :class="[
          'c-radio__input',
          { 'c-radio__input--hidden': true },
          'mr-2 mt-1'
        ]"
        :checked="modelValue === selectedValue"
        @change="handleChange"
        v-bind="$attrs"
      >

      <span
        v-if="!card"
        :class="[
          'c-radio__checkmark',
          { 'c-radio__checkmark--checked': modelValue === selectedValue }
        ]"
        :style="{
          '--radio-background-color': backgroundColor,
          '--radio-accent-color': accentColor
        }"
      />

      <div class="c-radio__content flex flex-col">
        <span
          v-if="label"
          class="c-radio__label font-medium text-gray-900"
        >
          {{ label }}
        </span>

        <span
          v-if="description"
          class="c-radio__description text-sm text-gray-600 mt-1"
        >
          {{ description }}
        </span>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type RadioTypes = 'card' | ''
const RadioTypesArray: RadioTypes[] = ['card', '']

interface LabelAttributes {
  help?: string
  [key: string]: any
}

export default defineComponent({
  name: 'CRadio',

  props: {
    modelValue: {
      type: [String, Number, Boolean, Object, null] as PropType<string | number | boolean | object | null>,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    labelAttributes: {
      type: Object as PropType<LabelAttributes>,
      default: () => ({}),
      validator: (value: LabelAttributes): boolean => {
        if (value.help) {
          console.warn('CRadio: `help` property of `labelAttributes` prop is deprecated. Please use `info` prop instead.')
        }
        return true
      },
    },
    description: {
      type: String,
      default: '',
    },
    selectedValue: {
      type: [String, Number, Boolean, Object],
      required: true,
    },
    error: {
      type: Boolean,
      default: false,
    },
    card: {
      type: Boolean,
      default: false,
    },
    cardRadioVisible: {
      type: Boolean,
      default: true,
    },
    cardOrientation: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'vertical',
      validator: (value: 'horizontal' | 'vertical'): boolean =>
        ['horizontal', 'vertical'].includes(value),
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    accentColor: {
      type: String,
      default: '#2196f3'
    },
    type: {
      type: String as PropType<RadioTypes>,
      default: '',
      validator: (value: RadioTypes): boolean => {
        if (value) {
          console.warn('CRadio: `type` prop is deprecated. Please use `card` prop instead.')
        }
        return RadioTypesArray.includes(value)
      },
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const handleChange = () => {
      emit('update:modelValue', props.selectedValue)
    }

    return {
      handleChange
    }
  }
})
</script>

<style lang="scss" scoped>
.c-radio {
  position: relative;
  display: inline-block;

  &__label-wrapper {
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    user-select: none;

    &--card {
      width: 100%;
      padding: 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      transition: all 0.2s ease;

      &:hover {
        border-color: var(--radio-accent-color, #2196f3);
      }
    }
  }

  &__input {
    margin-right: 0.5rem;
    margin-top: 0.25rem;

    &--hidden {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }
  }

  &__checkmark {
    position: relative;
    display: inline-block;
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
    border: 2px solid #757575;
    border-radius: 50%;
    transition: all 0.2s ease;
    background-color: var(--radio-background-color, #ffffff);

    &::after {
      content: '';
      position: absolute;
      display: none;
      top: 50%;
      left: 50%;
      width: 0.5rem;
      height: 0.5rem;
      background-color: var(--radio-accent-color, #2196f3);
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }

    &--checked {
      border-color: var(--radio-accent-color, #2196f3);

      &::after {
        display: block;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__label {
    font-weight: 500;
    color: #212121;
  }

  &__description {
    font-size: 0.875rem;
    color: #757575;
    margin-top: 0.25rem;
  }

  &--error {
    .c-radio__checkmark {
      border-color: #f44336;
    }

    .c-radio__label {
      color: #f44336;
    }
  }

  &--card-horizontal {
    .c-radio__label-wrapper {
      flex-direction: row;
      align-items: center;
    }

    .c-radio__content {
      margin-left: 1rem;
    }
  }

  &--card-vertical {
    .c-radio__label-wrapper {
      flex-direction: column;
    }

    .c-radio__content {
      margin-top: 0.5rem;
    }
  }
}
</style>
