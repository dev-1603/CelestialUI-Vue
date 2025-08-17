import { defineProps, withDefaults, defineEmits } from 'vue';

// Define the interface for the props
export interface InputProps {
  modelValue: string | number | null;
  type: string;
  id: string | null;
  name: string | undefined;
  placeholder: string | undefined;
  required: boolean;
  disabled: boolean;
  autofocus: boolean;
  autofocusDelay: number;
  icon: string | null;
  loadingIcon: string;
  leadingIcon: string | null;
  trailingIcon: string | null;
  trailing: boolean;
  leading: boolean;
  loading: boolean;
  padded: boolean;
  size: string | null;
  color: string;
  variant: string;
  inputClass: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  class: string | object | any[];
  ui?: object | {[k:string] : any}; // You can define a more specific type if needed
  modelModifiers: { trim?: boolean; lazy?: boolean; number?: boolean; nullify?: boolean };
}

// Define props using defineProps and withDefaults for default values
export const defaultProps = {
  modelValue: '',
  type: 'text',
  id: null,
  name: 'input',
  placeholder: 'Enter text',
  required: false,
  disabled: false,
  autofocus: false,
  autofocusDelay: 100,
  icon: null,
  loadingIcon: 'default-loading-icon', // Replace with your actual default loading icon
  leadingIcon: null,
  trailingIcon: null,
  trailing: false,
  leading: false,
  loading: false,
  padded: true,
  size: null,
  color: 'default-color', // Replace with your actual default color
  variant: 'default-variant', // Replace with your actual default variant
  inputClass: null,

}
export const emits = defineEmits(['update:modelValue', 'focus', 'blur', 'change', 'input', 'click', 'keydown', 'keyup', 'keypress', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave', 'input', 'focus', 'blur', 'change', 'click', 'keydown', 'keyup', 'keypress', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave'])
