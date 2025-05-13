import { SearchResult } from './search-context';

const mockData: SearchResult[] = [
  {
    id: '1',
    type: 'component',
    name: 'Button',
    description: 'A reusable button component with various styles and states',
    path: '/components/ui/button.tsx',
  },
  {
    id: '2',
    type: 'variable',
    name: 'primaryColor',
    description: 'The primary color used throughout the application',
    path: '/styles/theme.ts',
  },
  {
    id: '3',
    type: 'functionality',
    name: 'handleClick',
    description: 'Event handler for button click events',
    path: '/components/ui/button.tsx',
  },
];

export async function searchContent(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return [];

  const searchTerms = query.toLowerCase().split(' ');

  return mockData.filter((item) => {
    const searchableText = `${item.name} ${item.description} ${item.type}`.toLowerCase();
    return searchTerms.every((term) => searchableText.includes(term));
  });
}

export function getSearchSuggestions(query: string): string[] {
  if (!query.trim()) return [];

  const suggestions = new Set<string>();
  const searchTerms = query.toLowerCase();

  mockData.forEach((item) => {
    if (item.name.toLowerCase().includes(searchTerms)) {
      suggestions.add(item.name);
    }
    if (item.description.toLowerCase().includes(searchTerms)) {
      suggestions.add(item.description);
    }
  });

  return Array.from(suggestions).slice(0, 5);
} 