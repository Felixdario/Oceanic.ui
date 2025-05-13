import React, { createContext, useContext, useState, useEffect } from 'react';
import { searchContent, getSearchSuggestions } from './search-service';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchHistory: string[];
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  searchResults: SearchResult[];
  suggestions: string[];
  isLoading: boolean;
}

export interface SearchResult {
  id: string;
  type: 'component' | 'variable' | 'functionality';
  name: string;
  description: string;
  path: string;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const [results, newSuggestions] = await Promise.all([
          searchContent(searchQuery),
          getSearchSuggestions(searchQuery),
        ]);
        setSearchResults(results);
        setSuggestions(newSuggestions);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const addToHistory = (query: string) => {
    if (!query.trim()) return;
    
    const newHistory = [query, ...searchHistory.filter(q => q !== query)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchHistory,
        addToHistory,
        clearHistory,
        searchResults,
        suggestions,
        isLoading,
      }}
    >
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