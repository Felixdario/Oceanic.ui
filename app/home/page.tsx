"use client"

import { ArrowRight, Code, Layout, Settings, BookOpen, Sparkles } from "lucide-react"
import Link from "next/link"

const sections = [
  {
    title: "Primeiros Passos",
    icon: <Code className="h-6 w-6" />,
    description: "Comece sua jornada com nosso Design System. Aprenda a instalar, configurar e entender a estrutura do projeto para começar a desenvolver interfaces modernas.",
    features: [
      "Guia de instalação passo a passo",
      "Estrutura organizada do projeto",
      "Configuração inicial rápida"
    ],
    href: "/home/dashboard/instalacao"
  },
  {
    title: "Componentes",
    icon: <Layout className="h-6 w-6" />,
    description: "Explore nossa biblioteca completa de componentes reutilizáveis. Cada componente foi cuidadosamente projetado para ser acessível, responsivo e altamente customizável.",
    features: [
      "Componentes acessíveis WCAG",
      "Design responsivo",
      "Customização flexível"
    ],
    href: "/home/componentes"
  },
  {
    title: "API",
    icon: <Settings className="h-6 w-6" />,
    description: "Documentação detalhada da nossa API. Aprenda sobre as convenções de arquivos, funções disponíveis e como integrar nossos componentes em seu projeto.",
    features: [
      "Documentação técnica completa",
      "Convenções de código",
      "Funções utilitárias"
    ],
    href: "/home/api/componentes"
  },
  {
    title: "Arquitetura",
    icon: <BookOpen className="h-6 w-6" />,
    description: "Entenda a arquitetura do nosso Design System. Conheça nossas práticas de acessibilidade, sistema de atualização e como o compilador Next.js otimiza seu projeto.",
    features: [
      "Práticas de acessibilidade",
      "Sistema de atualização",
      "Otimização de performance"
    ],
    href: "/home/architecture/acessibilidade"
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                  <span className="block">Design System</span>
                  <span className="block text-blue-600 dark:text-blue-400">Documentação Completa</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Explore nossa documentação completa e descubra como utilizar nossos componentes reutilizáveis para criar interfaces modernas e acessíveis.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href="/home/componentes"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                    >
                      Explorar Componentes
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-full w-full flex items-center justify-center">
            <div className="relative w-[600px] h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 rounded-3xl transform -skew-x-6"></div>
              
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6 p-8">
                  {[
                    { 
                      Icon: Code, 
                      title: "Desenvolvimento",
                      href: "/home/dashboard/instalacao"
                    },
                    { 
                      Icon: Layout, 
                      title: "Componentes",
                      href: "/home/componentes"
                    },
                    { 
                      Icon: Settings, 
                      title: "API",
                      href: "/home/api/componentes"
                    },
                    { 
                      Icon: BookOpen, 
                      title: "Documentação",
                      href: "/home/architecture/acessibilidade"
                    }
                  ].map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="group relative p-6 bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
                          <item.Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {item.title}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-blue-500/10 rounded-xl transition-all duration-300"></div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-300 dark:bg-blue-700/30 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">Documentação</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Tudo que você precisa para começar
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
              Uma documentação completa e detalhada para ajudar você a construir interfaces incríveis.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {sections.map((section) => (
                <div
                  key={section.title}
                  className="relative group bg-white dark:bg-gray-800 p-8 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div>
                    <span className="rounded-lg inline-flex p-3 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 ring-4 ring-white dark:ring-gray-800">
                      {section.icon}
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      <Link href={section.href} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {section.title}
                      </Link>
                    </h3>
                    <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
                      {section.description}
                    </p>
                    <div className="mt-6 space-y-3">
                      {section.features.map((feature) => (
                        <div key={feature} className="flex items-start">
                          <div className="flex-shrink-0">
                            <Sparkles className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                          </div>
                          <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">{feature}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Link
                        href={section.href}
                        className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200"
                      >
                        Saiba mais
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            <span className="block">Pronto para começar?</span>
            <span className="block text-blue-600 dark:text-blue-400">Explore nossa documentação hoje.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/home/componentes"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
              >
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 