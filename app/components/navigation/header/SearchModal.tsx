"use client";

import { SearchResult } from "@/app/contexts/SearchContext";
import { useEffect, useRef } from "react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchResults: SearchResult[];
  searchHistory: string[];
  searchTerm: string;
  onResultClick: (path: string) => void;
  onHistoryClick: (term: string) => void;
  onSearch: (value: string) => void;
}

const popularPages = [
  {
    name: "Botões",
    description: "Componentes de botão em diferentes estilos e variações",
    path: "/home/componentes/button",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M7 12h10" />
      </svg>
    ),
  },
  {
    name: "Cards",
    description: "Componentes de card para exibição de conteúdo",
    path: "/home/componentes/card",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
      </svg>
    ),
  },
  {
    name: "Formulários",
    description: "Componentes para construção de formulários",
    path: "/home/componentes/form",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </svg>
    ),
  },
  {
    name: "Navegação",
    description: "Componentes de navegação e menu",
    path: "/home/componentes/navigation",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12h18" />
        <path d="M3 6h18" />
        <path d="M3 18h18" />
      </svg>
    ),
  },
];

export function SearchModal({
  isOpen,
  onClose,
  searchResults,
  searchHistory,
  searchTerm,
  onResultClick,
  onHistoryClick,
  onSearch,
}: SearchModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-16">
      <div
        ref={modalRef}
        className="relative bg-background rounded-lg shadow-lg w-full max-w-[600px] max-h-[80vh] overflow-hidden animate-in fade-in zoom-in-95 border border-blue-500/20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#318bff]/20 to-[#0050f1]/20 rounded-lg blur-3xl"></div>
        <div className="relative">
          <div className="p-4 border-b border-blue-500/20">
            <div className="relative">
              <svg
                className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
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
              <input
                ref={inputRef}
                type="search"
                placeholder="Buscar componentes, propriedades..."
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 pl-8"
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="max-h-[calc(80vh-4rem)] overflow-y-auto">
            {searchResults.length > 0 ? (
              <div className="p-4">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    className="group w-full text-left p-3 hover:bg-blue-500/5 rounded-md flex flex-col gap-2 mb-2 transition-all duration-200 hover:shadow-[0_0_15px_rgba(0,0,241,0.1)]"
                    onClick={() => onResultClick(result.path)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base font-medium group-hover:text-blue-500 transition-colors">{result.name}</span>
                      <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted group-hover:bg-blue-500/10 group-hover:text-blue-500/70 transition-colors">
                        {result.type}
                      </span>
                    </div>
                    {result.description && (
                      <p className="text-sm text-muted-foreground group-hover:text-blue-500/70 line-clamp-2 transition-colors">
                        {result.description}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            ) : searchHistory.length > 0 && !searchTerm ? (
              <div className="p-4">
                <div className="text-sm text-muted-foreground px-2 py-2 font-medium">
                  Histórico de busca
                </div>
                {searchHistory.map((term, index) => (
                  <button
                    key={index}
                    className="group w-full text-left p-3 hover:bg-blue-500/5 rounded-md flex items-center gap-3 mb-2 transition-all duration-200 hover:shadow-[0_0_15px_rgba(0,0,241,0.1)]"
                    onClick={() => onHistoryClick(term)}
                  >
                    <svg
                      className="h-5 w-5 text-muted-foreground group-hover:text-blue-500 transition-colors"
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
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                    <span className="text-base group-hover:text-blue-500 transition-colors">{term}</span>
                  </button>
                ))}
              </div>
            ) : !searchTerm ? (
              <div className="p-4">
                <div className="text-sm text-muted-foreground px-2 py-2 font-medium">
                  Páginas Populares
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {popularPages.map((page) => (
                    <button
                      key={page.path}
                      className="group w-full text-left p-3 hover:bg-blue-500/5 rounded-md flex flex-col gap-2 transition-all duration-200 hover:shadow-[0_0_15px_rgba(0,0,241,0.1)] border border-blue-500/20"
                      onClick={() => onResultClick(page.path)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground group-hover:text-blue-500 transition-colors">{page.icon}</span>
                        <span className="text-base font-medium group-hover:text-blue-500 transition-colors">{page.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground group-hover:text-blue-500/70 line-clamp-2 transition-colors">
                        {page.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                Nenhum resultado encontrado
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 