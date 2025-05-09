"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ComponentesPage() {
  return (
    <div>
      <div className="w-full">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Componentes Populares</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore nossa biblioteca de componentes prontos para uso [Ainda em desenvolvimento]
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Accordion", description: "Painéis expansíveis para organizar conteúdo" },
              { name: "Alert", description: "Mensagens de alerta para feedback ao usuário" },
              { name: "Avatar", description: "Representação visual de usuários ou entidades" },
              { name: "Badge", description: "Indicadores de status ou contagem" },
              { name: "Button", description: "Botões de ação com diferentes variantes e estados" },
              { name: "Card", description: "Containers flexíveis para conteúdo relacionado" },
              { name: "Checkbox", description: "Seleção de opções em formulários" },
              { name: "Chip", description: "Elementos compactos para representar entradas ou atributos" },
            ].map((component) => (
              <Link key={component.name} href={`/componentes/${component.name.toLowerCase()}`}>
                <div className="rounded-lg border bg-card text-card-foreground shadow h-full transition-all hover:shadow-md">
                  <div className="flex h-full flex-col p-6">
                    <div className="mb-4 h-32 rounded-md bg-muted flex items-center justify-center">
                      <span className="text-2xl font-semibold text-muted-foreground/60">{component.name}</span>
                    </div>
                    <h3 className="text-lg font-semibold">{component.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground flex-grow">{component.description}</p>
                    <div className="mt-4 flex items-center text-sm text-blue-500">
                      Ver detalhes
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/componentes" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-[#24304d] text-white hover:bg-[#24304d]/90 h-11 px-8 gap-2">
              Ver todos os componentes <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}
