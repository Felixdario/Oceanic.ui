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
  const allItems = navigation.sections.reduce<NavigationItem[]>((acc, section) => {
    return [...acc, ...section.items]
  }, [])

  const currentIndex = allItems.findIndex(item => item.href === currentPath)

  if (currentIndex === -1) {
    return { prevPage: undefined, nextPage: undefined }
  }

  const prevPage = currentIndex > 0 ? allItems[currentIndex - 1] : undefined

  const nextPage = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : undefined

  return { prevPage, nextPage }
}

export type { NavigationItem, NavigationSection } 