interface SearchBarProps {
  onSearch?: (term: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <form className="w-full" onSubmit={(e) => e.preventDefault()}>
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
          type="search"
          placeholder="Buscar..."
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-8"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
    </form>
  );
} 