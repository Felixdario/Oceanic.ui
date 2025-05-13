"use client";

import { useSearch } from "@/app/contexts/SearchContext";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { useDebounce } from "@/app/hooks/useDebounce";
import { SearchModal } from "./SearchModal";

interface SearchBarProps {
  onSearch?: (term: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const { searchResults, searchHistory, search, clearSearch } = useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const debouncedSearch = useDebounce((...args: unknown[]) => {
    const value = args[0] as string;
    search(value);
  }, 300);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    debouncedSearch(value);
    onSearch?.(value);
  }, [debouncedSearch, onSearch]);

  const handleResultClick = useCallback((path: string) => {
    router.push(path);
    setIsOpen(false);
    clearSearch();
  }, [router, clearSearch]);

  const handleHistoryClick = useCallback((term: string) => {
    handleSearch(term);
  }, [handleSearch]);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-9 w-full items-center gap-2 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors hover:bg-accent"
      >
        <svg
          className="h-4 w-4 text-muted-foreground"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span className="text-muted-foreground">Buscar componentes, propriedades...</span>
      </button>

      <SearchModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        searchResults={searchResults}
        searchHistory={searchHistory}
        searchTerm={searchTerm}
        onResultClick={handleResultClick}
        onHistoryClick={handleHistoryClick}
        onSearch={handleSearch}
      />
    </div>
  );
} 