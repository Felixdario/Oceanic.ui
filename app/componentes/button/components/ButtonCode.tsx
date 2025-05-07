'use client'

import { useState } from "react"
import { Button } from "@mui/material"
import { CodeBlock } from "@/components/code-block"
import { Dropdown } from "@/app/components/ui/dropdown"

type ButtonVariant = "contained" | "outlined" | "text"
type ButtonColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "inherit"
type ButtonSize = "small" | "medium" | "large"

type ButtonProps = {
  variant: ButtonVariant
  color: ButtonColor
  size: ButtonSize
  disabled: boolean
  loading: boolean
  text: string
}

const variantOptions: Array<{ value: ButtonVariant; label: string }> = [
  { value: "contained", label: "Contained" },
  { value: "outlined", label: "Outlined" },
  { value: "text", label: "Text" },
]

const colorOptions: Array<{ value: ButtonColor; label: string }> = [
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
  { value: "error", label: "Error" },
  { value: "warning", label: "Warning" },
  { value: "info", label: "Info" },
  { value: "success", label: "Success" },
]

const sizeOptions: Array<{ value: ButtonSize; label: string }> = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
]

export function ButtonCode() {
  const [buttonProps, setButtonProps] = useState<ButtonProps>({
    variant: "contained",
    color: "primary",
    size: "medium",
    disabled: false,
    loading: false,
    text: "Default"
  })

  const generateCode = (props: typeof buttonProps) => {
    return `import { Button } from "@mui/material"

const ButtonExample = () => {
  return (
    <Button
      variant="${props.variant}"
      color="${props.color}"
      size="${props.size}"${props.disabled ? '\n      disabled' : ''}      ${props.loading ? '\n      loading' : ''}
    >
      ${props.text}
    </Button>
  )
}

export default ButtonExample`
  }

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-2xl font-semibold mb-2">Código</h2>
      <p className="text-gray-600 mb-4">O código do componente Button.</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Implementação</h3>
          <CodeBlock
            code={generateCode(buttonProps)}
            language="javascript"
            title="Button.tsx"
          />
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Customização</h3>
            <div className="space-y-4">
              <Dropdown<ButtonVariant>
                label="Variante"
                options={variantOptions}
                value={buttonProps.variant}
                onChange={(value) => setButtonProps(prev => ({ ...prev, variant: value }))}
              />
              <Dropdown<ButtonColor>
                label="Cor"
                options={colorOptions}
                value={buttonProps.color}
                onChange={(value) => setButtonProps(prev => ({ ...prev, color: value }))}
              />
              <Dropdown<ButtonSize>
                label="Tamanho"
                options={sizeOptions}
                value={buttonProps.size}
                onChange={(value) => setButtonProps(prev => ({ ...prev, size: value }))}
              />
              <div>
                <label className="text-sm font-medium block mb-2">Texto</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={buttonProps.text}
                  onChange={(e) => setButtonProps(prev => ({ ...prev, text: e.target.value }))}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="disabled"
                  checked={buttonProps.disabled}
                  onChange={(e) => setButtonProps(prev => ({ ...prev, disabled: e.target.checked }))}
                />
                <label htmlFor="disabled" className="text-sm font-medium">Disabled</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="loading"
                  checked={buttonProps.loading}
                  onChange={(e) => setButtonProps(prev => ({ ...prev, loading: e.target.checked }))}
                />
                <label htmlFor="loading" className="text-sm font-medium">Loading</label>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Preview</h3>
            <div className="rounded-lg border p-8 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
              <Button
                variant={buttonProps.variant}
                color={buttonProps.color}
                size={buttonProps.size}
                disabled={buttonProps.disabled}
                loading={buttonProps.loading}
              >
                {buttonProps.text}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 