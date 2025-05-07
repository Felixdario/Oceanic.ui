export function SidebarHeader() {
  return (
    <div className="flex items-center gap-2 px-2">
      <div className="bg-primary/10 flex aspect-square size-8 items-center justify-center rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      </div>
      <div className="flex flex-col gap-0.5 leading-none">
        <span className="font-medium">Documentação</span>
        <span className="text-muted-foreground text-sm">v1.0.0</span>
      </div>
    </div>
  );
} 