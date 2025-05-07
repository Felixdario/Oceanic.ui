'use client'

import { Button, CircularProgress } from "@mui/material"
import { ReactNode } from "react"

interface LoadingButtonProps {
  variant?: 'text' | 'outlined' | 'contained'
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
  size?: 'small' | 'medium' | 'large'
  loading?: boolean
  children: ReactNode
  disabled?: boolean
  onClick?: () => void
}

export function LoadingButton({ 
  variant = 'contained', 
  color = 'primary', 
  size = 'medium',
  loading = false,
  children,
  disabled = false,
  ...props 
}: LoadingButtonProps) {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <CircularProgress size={20} color="inherit" />
          <span>Carregando...</span>
        </div>
      ) : children}
    </Button>
  )
} 