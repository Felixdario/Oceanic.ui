export type MUIComponentType = string

export interface ComponentData {
  name: string
  description: string
  component: {
    type: string
    import: string
    defaultProps: ComponentProps
  }
  labels: {
    preview: string
    code: string
    properties: string
    propertiesDescription: string
    variants: string
    variantsDescription: string
    colors: string
    colorsDescription: string
    sizes: string
    sizesDescription: string
    states: string
    statesDescription: string
    bestPractices: string
    customization: string
    implementation: string
    variant: string
    color: string
    size: string
    text: string
    disabled: string
    loading: string
  }
  properties: {
    name: string
    type: 'string' | 'boolean'
    description: string
    options?: string[]
  }[]
  variants: Array<{
    name: string
    description: string
    example: Record<string, string | boolean | number>
  }>
  colors: {
    name: string
    value: string
  }[]
  sizes: Array<{
    name: string
    value: string
    example: Record<string, string | boolean | number>
  }>
  states: Array<{
    name: string
    description: string
    examples: Array<{
      variant?: string
      color?: string
      severity?: string
      text?: string
      disabled?: boolean
      loading?: boolean
      [key: string]: unknown
    }>
  }> | {
    [key: string]: {
      description: string
      examples: Array<{
        variant?: string
        color?: string
        severity?: string
        text?: string
        disabled?: boolean
        loading?: boolean
        [key: string]: unknown
      }>
    }
  }
  bestPractices: Array<{
    title: string
    description: string
    examples: Array<Record<string, string | boolean | number>>
  }>
  codeExample: {
    import: string
    component: string
    props: string[]
    defaultText: string
  }
}

export type ComponentProps = {
  variant?: string
  color?: string
  size?: string
  text?: string
  disabled?: boolean
  loading?: boolean
  sx?: {
    width?: number
    height?: number
  }
  [key: string]: unknown
} 