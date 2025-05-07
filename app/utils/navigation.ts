import navigation from '../config/navigation.json'

interface NavigationItem {
  href: string
  label: string
}

interface NavigationSection {
  title: string
  items: NavigationItem[]
}

export function findAdjacentPages(currentPath: string) {
  // Criar uma lista plana de todos os itens
  const allItems = navigation.sections.reduce<NavigationItem[]>((acc, section) => {
    return [...acc, ...section.items]
  }, [])

  // Encontrar o índice do item atual
  const currentIndex = allItems.findIndex(item => item.href === currentPath)

  // Se o item atual não for encontrado, retornar undefined para ambos
  if (currentIndex === -1) {
    return { prevPage: undefined, nextPage: undefined }
  }

  // Encontrar a página anterior (se existir)
  const prevPage = currentIndex > 0 ? allItems[currentIndex - 1] : undefined

  // Encontrar a próxima página (se existir)
  const nextPage = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : undefined

  return { prevPage, nextPage }
}

// Exportar o tipo para uso em outros arquivos
export type { NavigationItem, NavigationSection } 