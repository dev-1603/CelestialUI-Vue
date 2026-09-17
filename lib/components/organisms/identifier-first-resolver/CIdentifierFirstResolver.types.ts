export interface CIdentifierFirstResolverProps {
  initialIdentifier?: string
  loading?: boolean
  error?: string
  disabled?: boolean
  label?: string
  placeholder?: string
}

export interface CIdentifierFirstResolverEmits {
  (e: 'resolve', identifier: string): void
}
