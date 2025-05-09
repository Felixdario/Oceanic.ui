'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, createContext, useContext } from 'react';
import '../styles/sidebar.css';
import navigation from '../config/navigation.json';
import type { NavigationSection } from '../utils/navigation';
import { useTheme } from 'next-themes';
import { useMediaQuery } from '@/hooks/use-media-query';
import { 
  Home,
  Search,
  ChevronDown,
  BookOpen,
  Layers,
  Code2,
  Building2,
  Users2,
  Menu,
  X
} from 'lucide-react';

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
}

export const SidebarContext = createContext<SidebarContextType>({
  isCollapsed: false,
  toggleSidebar: () => {},
  isMobile: false
});

export const useSidebar = () => useContext(SidebarContext);

const getIconForSection = (title: string) => {
  switch (title) {
    case "Primeiros Passos":
      return <Home className="w-5 h-5" />;
    case "Componentes":
      return <Layers className="w-5 h-5" />;
    case "API":
      return <Code2 className="w-5 h-5" />;
    case "Arquitetura":
      return <Building2 className="w-5 h-5" />;
    case "Comunidade":
      return <Users2 className="w-5 h-5" />;
    default:
      return <BookOpen className="w-5 h-5" />;
  }
};

const Sidebar = () => {
  const pathname = usePathname();
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openSection, setOpenSection] = useState<string | null>(null);
  const sections = navigation.sections as NavigationSection[];
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fechar o sidebar em telas móveis quando mudar de rota
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  // Efeito para abrir automaticamente a seção ativa
  useEffect(() => {
    const activeSection = sections.find(section => 
      section.items.some(item => isActive(item.href))
    );
    if (activeSection) {
      setOpenSection(activeSection.title);
    }
  }, [pathname]);

  const isActive = (href: string) => {
    if (!href || !pathname) return false;
    if (href === "/" && pathname === "/") return true;
    
    const normalizedHref = href.endsWith('/') ? href.slice(0, -1) : href;
    const normalizedPathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    
    return normalizedPathname === normalizedHref || normalizedPathname.startsWith(`${normalizedHref}/`);
  };

  const isSectionActive = (section: NavigationSection) => {
    return section.items.some(item => isActive(item.href));
  };

  const toggleSection = (title: string) => {
    if (!isCollapsed) {
      setOpenSection(current => current === title ? null : title);
    }
  };

  const isSectionOpen = (title: string) => openSection === title && !isCollapsed;

  if (!mounted) {
    return (
      <aside className="hidden lg:block">
        <div className="sidebar sidebar-light">
        </div>
      </aside>
    );
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const sidebarContent = (
    <div className={`sidebar ${currentTheme === 'dark' ? 'sidebar-dark' : 'sidebar-light'} ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
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
            <span>Documentação</span>
            <span>v1.0.0</span>
          </div>
        )}
        <button 
          onClick={() => isMobile ? setIsSidebarOpen(false) : setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-accent"
        >
          {!isCollapsed ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="search-container">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      )}

      <nav>
        {sections.map((section) => {
          const sectionActive = isSectionActive(section);
          return (
            <div key={section.title} className="mb-2">
              <button
                onClick={() => toggleSection(section.title)}
                className={`nav-item w-full text-left ${sectionActive ? 'active' : ''}`}
                title={isCollapsed ? section.title : undefined}
              >
                <span className="nav-icon">
                  {getIconForSection(section.title)}
                </span>
                {!isCollapsed && (
                  <>
                    {section.title}
                    <ChevronDown 
                      className={`w-4 h-4 ml-auto transform transition-transform duration-200 ${
                        isSectionOpen(section.title) ? 'rotate-180' : ''
                      }`} 
                    />
                  </>
                )}
              </button>
              {!isCollapsed && (
                <div className={`nested-items overflow-hidden transition-all duration-200 ${
                  isSectionOpen(section.title) ? 'max-h-96' : 'max-h-0'
                }`}>
                  {section.items.map((item) => {
                    const itemActive = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`nav-item ${itemActive ? 'active' : ''}`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar: () => setIsCollapsed(prev => !prev), isMobile }}>
      {isMobile ? (
        <>
          {/* Overlay para fechar o sidebar em mobile */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          
          {/* Botão do menu mobile */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-4 left-4 z-40 lg:hidden rounded-md p-2 bg-background border"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Sidebar móvel */}
          <aside 
            className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            style={{
              width: 'var(--sidebar-width)'
            }}
          >
            {sidebarContent}
          </aside>
        </>
      ) : (
        // Sidebar desktop
        <aside 
          className="hidden lg:block"
          style={{
            width: isCollapsed ? 'var(--sidebar-width-icon)' : 'var(--sidebar-width)',
            transition: 'width 0.3s ease'
          }}
        >
          {sidebarContent}
        </aside>
      )}
    </SidebarContext.Provider>
  );
};

export default Sidebar;