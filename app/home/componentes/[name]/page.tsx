"use client"

import { useState, useEffect } from "react"
import { DocPagination } from "@/app/components/ui/doc-pagination"
import { findAdjacentPages } from "@/app/utils/navigation"
import { TabPreview } from "./components/TabPreview"
import { TabCode } from "./components/TabCode"
import { useParams } from "next/navigation"
import { ComponentData } from "./data"
import { AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ComponentPage() {
  const [activeTab, setActiveTab] = useState("preview")
  const [componentData, setComponentData] = useState<ComponentData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const componentName = params.name as string
  const { prevPage, nextPage } = findAdjacentPages(`/componentes/${componentName}`)

  useEffect(() => {
    if (componentName) {
      import(`@/app/mocks/${componentName}.json`)
        .then((data) => {
          setComponentData(data.default)
        })
        .catch(() => {
          setError("Componente não encontrado")
        })
    }
  }, [componentName])

  if (error) {
    return (
      <div className="min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <div className="flex items-center">
                  <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-gray-50">
                    {error}
                  </h1>
                </div>
                <p className="mt-2 text-base text-gray-500">
                  O componente que você está procurando não existe ou não está disponível.
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link
                  href="/home/componentes"
                  className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Ver todos os componentes
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Voltar para Home
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (!componentData) return null

  return (
    <div className="container mx-auto space-y-8 pt-4 pb-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{componentData.name}</h1>
        <p className="text-lg text-muted-foreground">{componentData.description}</p>
      </div>

      <div>
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("preview")}
            className={`border-b-2 py-4 px-1 text-sm font-medium ${activeTab === "preview"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`border-b-2 py-4 px-1 text-sm font-medium ${activeTab === "code"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
          >
            Código
          </button>
        </nav>
      </div>

      <div className="mt-6">
        <div className={activeTab === "preview" ? "" : "hidden"}>
          <TabPreview data={componentData} />
        </div>

        <div className={activeTab === "code" ? "" : "hidden"}>
          <TabCode data={componentData} />
        </div>
      </div>

      <DocPagination
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </div>
  )
} 