"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface Property {
  name: string;
  description: string;
  type?: string;
  options?: string[];
}

interface Variant {
  name: string;
  description: string;
  example?: Record<string, unknown>;
}

interface MockData {
  name: string;
  description: string;
  properties?: Property[];
  variants?: Variant[];
}

export interface SearchResult {
  id: string;
  type: 'component' | 'property' | 'variant';
  name: string;
  description?: string;
  path: string;
}

interface SearchContextType {
  searchResults: SearchResult[];
  searchHistory: string[];
  isSearching: boolean;
  search: (term: string) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const mockDataCache: Record<string, MockData> = {};

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const mockFiles = [
      'button', 'card', 'chip', 'alert', 'badge', 
      'avatar', 'checkbox', 'accordion'
    ];

    mockFiles.forEach(async (file) => {
      try {
        const response = await fetch(`/api/mocks/${file}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        mockDataCache[file] = data;
      } catch (error) {
        console.error(`Error loading mock data for ${file}:`, error);
      }
    });
  }, []);

  const search = useCallback(async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results: SearchResult[] = [];
      const searchTerm = term.toLowerCase();

      Object.entries(mockDataCache).forEach(([file, data]) => {
        if (data.name.toLowerCase().includes(searchTerm)) {
          results.push({
            id: `${file}-component`,
            type: 'component',
            name: data.name,
            description: data.description,
            path: `/home/componentes/${file}`
          });
        }

        if (data.properties) {
          data.properties.forEach((prop: Property) => {
            if (prop.name.toLowerCase().includes(searchTerm)) {
              results.push({
                id: `${file}-${prop.name}`,
                type: 'property',
                name: prop.name,
                description: prop.description,
                path: `/home/componentes/${file}#${prop.name}`
              });
            }
          });
        }

        if (data.variants) {
          data.variants.forEach((variant: Variant) => {
            if (variant.name.toLowerCase().includes(searchTerm)) {
              results.push({
                id: `${file}-${variant.name}`,
                type: 'variant',
                name: variant.name,
                description: variant.description,
                path: `/home/componentes/${file}#${variant.name}`
              });
            }
          });
        }
      });

      setSearchResults(results);
      
      if (term.trim()) {
        setSearchHistory(prev => {
          const newHistory = [term, ...prev.filter(t => t !== term)].slice(0, 5);
          return newHistory;
        });
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
  }, []);

  return (
    <SearchContext.Provider value={{
      searchResults,
      searchHistory,
      isSearching,
      search,
      clearSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
} 