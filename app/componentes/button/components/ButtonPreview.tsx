'use client'

import { Button, ThemeProvider } from "@mui/material"
import { theme } from "@/app/theme"
import { LoadingButton } from "@/app/componentes/button/components/LoadingButton"
import { useState } from "react"

export function ButtonPreview() {
  const [loading, setLoading] = useState(false)

  const handleLoadingClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }
  return (
    <ThemeProvider theme={theme}>
    <div className="space-y-6">
      <div className="rounded-lg border p-6">
        <h2 className="text-2xl font-semibold mb-2">Propriedades</h2>
        <p className="text-gray-600 mb-4">Lista de propriedades que o componente Button aceita.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <code className="text-sm bg-gray-100 dark:bg-gray-500 px-1 py-0.5 rounded">variant</code> - Define a aparência do botão:
            contained, outlined, text
          </li>
          <li>
            <code className="text-sm bg-gray-100 dark:bg-gray-500 px-1 py-0.5 rounded">size</code> - Define o tamanho do botão:
            small, medium, large
          </li>
          <li>
            <code className="text-sm bg-gray-100 dark:bg-gray-500 px-1 py-0.5 rounded">disabled</code> - Define se o botão está
            desabilitado
          </li>
          <li>
            <code className="text-sm bg-gray-100 dark:bg-gray-500 px-1 py-0.5 rounded">color</code> - Define a cor do botão:
            primary, secondary, error, etc
          </li>
          <li>
            <code className="text-sm bg-gray-100 dark:bg-gray-500 px-1 py-0.5 rounded">className</code> - Classes adicionais para
            estilização
          </li>
        </ul>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">Variantes</h2>
        <p className="text-gray-600 mb-4">O Button possui três variantes principais que definem seu estilo visual.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <h3 className="font-medium">Contained</h3>
            <Button variant="contained" color="primary">Contained</Button>
            <p className="text-sm text-gray-600">Botões com preenchimento sólido, usados para ações principais.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Outlined</h3>
            <Button variant="outlined" color="primary">Outlined</Button>
            <p className="text-sm text-gray-600">Botões com borda e fundo transparente, para ações secundárias.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Text</h3>
            <Button variant="text" color="primary">Text</Button>
            <p className="text-sm text-gray-600">Botões sem borda ou preenchimento, para ações terciárias.</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">Cores</h2>
        <p className="text-gray-600 mb-4">O Button suporta diferentes cores para diferentes contextos e significados.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          <Button variant="contained" color="primary">Primary</Button>
          <Button variant="contained" color="secondary">Secondary</Button>
          <Button variant="contained" color="error">Error</Button>
          <Button variant="contained" color="warning">Warning</Button>
          <Button variant="contained" color="info">Info</Button>
          <Button variant="contained" color="success">Success</Button>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">Tamanhos</h2>
        <p className="text-gray-600 mb-4">Três tamanhos diferentes disponíveis para se adequar a diferentes contextos.</p>
        <div className="flex items-center gap-4">
          <Button variant="contained" size="small">Small</Button>
          <Button variant="contained" size="medium">Medium</Button>
          <Button variant="contained" size="large">Large</Button>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">Estados</h2>
        <p className="text-gray-600 mb-4">O Button pode apresentar diferentes estados dependendo da interação ou contexto.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium">Estado Desabilitado</h3>
            <div className="flex gap-4">
              <Button variant="contained" disabled>Contained</Button>
              <Button variant="outlined" disabled>Outlined</Button>
              <Button variant="text" disabled>Text</Button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Estado de Carregamento</h3>
            <div className="flex gap-4">
            <LoadingButton 
                  variant="contained" 
                  loading={loading}
                  onClick={handleLoadingClick}
                >
                  Contained
                </LoadingButton>
                <LoadingButton 
                  variant="outlined" 
                  loading={loading}
                  onClick={handleLoadingClick}
                >
                  Outlined
                </LoadingButton>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">Boas Práticas</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">1. Hierarquia Visual</h3>
            <p className="text-gray-600 mb-2">Use diferentes variantes para estabelecer hierarquia:</p>
            <div className="flex gap-4">
              <Button variant="contained" color="primary">Salvar</Button>
              <Button variant="outlined" color="primary">Cancelar</Button>
              <Button variant="text" color="primary">Voltar</Button>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">2. Cores Significativas</h3>
            <p className="text-gray-600 mb-2">Use cores apropriadas para cada ação:</p>
            <div className="flex gap-4">
              <Button variant="contained" color="error">Deletar</Button>
              <Button variant="contained" color="success">Confirmar</Button>
              <Button variant="contained" color="warning">Atenção</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ThemeProvider>
  )
} 