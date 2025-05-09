"use client"

import { useState, useEffect } from "react"
import { DocPagination } from "@/app/components/ui/doc-pagination"
import { findAdjacentPages } from "@/app/utils/navigation"
import { TabPreview } from "./components/TabPreview"
import { TabCode } from "./components/TabCode"
import { useParams } from "next/navigation"
import { ComponentData } from "./data"

export default function ComponentPage() {
  const [activeTab, setActiveTab] = useState("preview")
  const [componentData, setComponentData] = useState<ComponentData | null>(null)
  const params = useParams()
  const componentName = params.name as string
  const { prevPage, nextPage } = findAdjacentPages(`/componentes/${componentName}`)

  useEffect(() => {
    import(`@/app/mocks/${componentName}.json`).then((data) => {
      setComponentData(data.default)
    })
  }, [componentName])

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