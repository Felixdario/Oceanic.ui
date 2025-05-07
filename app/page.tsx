import Link from "next/link"
import { ArrowRight, Code, Github, Layers, Palette, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <section className="relative overflow-hidden border-b bg-background py-20 md:py-32">
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm">
                  <span className="mr-1 rounded-full bg-primary h-2 w-2"></span>
                  <span>Versão 1.0 disponível</span>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                  Design System <br />
                  <span className="bg-gradient-to-r from-[#0000f1] to-[#4b4bff] bg-clip-text text-transparent">
                    Componentes bonitos e acessíveis
                  </span>
                </h1>
                <p className="max-w-[600px] text-xl text-muted-foreground">
                  Uma biblioteca completa de componentes para construir interfaces modernas, consistentes e acessíveis
                  com facilidade.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/componentes" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-[#24304d] text-white hover:bg-[#24304d]/90 h-11 px-8 gap-2">
                  Explorar Componentes <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-11 px-8 gap-2">
                  <Code className="h-4 w-4" /> Documentação
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Github className="h-4 w-4" />
                  <span>MIT License</span>
                </div>
                <div className="h-1 w-1 rounded-full bg-border"></div>
                <div>Atualizado regularmente</div>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0000f1]/20 to-[#4b4bff]/20 rounded-lg blur-3xl"></div>
              <div className="relative mt-24 rounded-lg border bg-card p-4 shadow-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="h-24 rounded-md bg-muted"></div>
                    <div className="h-24 rounded-md bg-muted"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-14 rounded-md bg-muted"></div>
                    <div className="h-14 rounded-md bg-muted"></div>
                    <div className="h-14 rounded-md bg-muted"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </section>

      <section className="bg-muted/40 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Construído para desenvolvedores</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tudo o que você precisa para criar aplicações modernas e acessíveis
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-card text-card-foreground shadow border-none">
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                  <Palette className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Design Consistente</h3>
                <p className="mt-2 text-muted-foreground">
                  Componentes com design consistente e acessível para criar interfaces de usuário bonitas e funcionais.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <svg className="mr-2 h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Acessibilidade integrada
                  </li>
                  <li className="flex items-center">
                    <svg className="mr-2 h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Tema claro e escuro
                  </li>
                  <li className="flex items-center">
                    <svg className="mr-2 h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Tipografia otimizada
                  </li>
                </ul>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow border-none ">
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                  <Zap className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Alta Performance</h3>
                <p className="mt-2 text-muted-foreground">
                  Componentes otimizados para performance, construídos com React e Tailwind CSS.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <svg className="mr-2 h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Zero dependências externas
                  </li>
                  <li className="flex items-center">
                    <svg className="mr-2 h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Otimizado para Server Components
                  </li>
                  <li className="flex items-center">
                    <svg className="mr-2 h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Bundle size reduzido
                  </li>
                </ul>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow border-none">
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                  <Layers className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Altamente Customizável</h3>
                <p className="mt-2 text-muted-foreground">
                  Personalize os componentes para atender às necessidades do seu projeto.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <svg className="mr-2 h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Variantes personalizáveis
                  </li>
                  <li className="flex items-center">
                    <svg className="mr-2 h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Temas configuráveis
                  </li>
                  <li className="flex items-center">
                    <svg className="mr-2 h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    API consistente
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Componentes Populares</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore nossa biblioteca de componentes prontos para uso
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Button", description: "Botões de ação com diferentes variantes e estados" },
              { name: "Card", description: "Containers flexíveis para conteúdo relacionado" },
              { name: "Dialog", description: "Janelas modais para interações focadas" },
              { name: "Form", description: "Componentes de formulário validados e acessíveis" },
              { name: "Tabs", description: "Organização de conteúdo em abas navegáveis" },
              { name: "Toast", description: "Notificações temporárias e não intrusivas" },
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

      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-xl bg-gradient-to-r from-[#0000f1] to-[#4b4bff] p-8 md:p-12 shadow-lg">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Comece a usar hoje mesmo</h2>
              <p className="mt-4 text-lg text-white/90">
                Acelere seu desenvolvimento com componentes prontos para uso e personalizáveis
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-white text-black hover:bg-white/90 h-11 px-8 gap-2">
                  <Code className="h-4 w-4" /> Documentação
                </Link>
                <Link href="/componentes" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-white/10 text-white border-white/20 hover:bg-white/20 h-11 px-8 gap-2 border">
                  Explorar Componentes <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
