'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, createContext, useContext } from 'react';
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

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [pathname, isMobile]);

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
        <div className="h-screen border-r border-transparent rounded-tr-lg rounded-br-lg">
        </div>
      </aside>
    );
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const sidebarContent = (
    <div 
      className={`h-full relative flex flex-col border-r border-transparent rounded-tr-lg rounded-br-lg text-sm transition-all duration-300 ease-in-out
        ${currentTheme === 'dark' ? 'bg-[#24304D] text-[#e5e7eb]' : 'bg-white text-[#1f2937]'}
        ${isCollapsed ? 'w-16' : 'w-full'}
        ${currentTheme === 'dark' ? 'border-r-[#24304D]' : 'border-r-[#E5E5E5]'}`}
      onMouseLeave={() => !isMobile && setIsCollapsed(true)}
    >
      <div className={`h-14 flex items-center flex-shrink-0 ${isCollapsed ? 'justify-center' : 'justify-between px-4'}`}>
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
          className="p-2 rounded-md hover:bg-[#F5F5F5] dark:hover:bg-[#1B2439] transition-colors duration-200"
        >
          {!isCollapsed ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="px-4 py-3 flex-shrink-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar"
              className={`w-full px-3 py-2 pr-9 text-sm rounded-md border
                bg-white border-[#e5e7eb] text-[#9ca3af]
                placeholder:text-[#9ca3af] focus:outline-none focus:ring-1
                ${currentTheme === 'dark'
                  ? 'focus:ring-[#4E69A6] focus:border-[#4E69A6]'
                  : 'focus:ring-[#e5e7eb] focus:border-[#e5e7eb]'
                }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9ca3af]" />
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3">
        {sections.map((section) => {
          const sectionActive = isSectionActive(section);
          return (
            <div key={section.title} className="mb-2">
              <button
                onClick={() => toggleSection(section.title)}
                className={`group flex items-center w-full text-left px-[9px] py-2 rounded-lg text-sm transition-all duration-200
                  ${sectionActive ? 
                    (currentTheme === 'dark' 
                      ? 'bg-[#1B2439] border border-[#4E69A6]' 
                      : 'bg-[#F5F5F5] border border-[#E5E5E5]'
                    ) 
                    : 'border border-transparent hover:border-[#E5E5E5] dark:hover:border-[#4E69A6]'}
                  ${currentTheme === 'dark' 
                    ? 'hover:bg-[#1B2439]' 
                    : 'hover:bg-[#F5F5F5]'
                  }`}
                title={isCollapsed ? section.title : undefined}
              >
                <span className={`text-[#6b7280] dark:text-[#9ca3af] group-hover:text-[#1f2937] dark:group-hover:text-[#e5e7eb] ${!isCollapsed && 'mr-3'}`}>
                  {getIconForSection(section.title)}
                </span>
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{section.title}</span>
                    <ChevronDown 
                      className={`w-4 h-4 transform transition-transform duration-200 text-[#6b7280] dark:text-[#9ca3af] group-hover:text-[#1f2937] dark:group-hover:text-[#e5e7eb] ${
                        isSectionOpen(section.title) ? 'rotate-180' : ''
                      }`} 
                    />
                  </>
                )}
              </button>
              {!isCollapsed && (
                <div className={`mt-1 overflow-hidden transition-all duration-200 ${
                  isSectionOpen(section.title) ? 'max-h-96' : 'max-h-0'
                }`}>
                  {section.items.map((item) => {
                    const itemActive = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`group flex items-center w-full px-3 py-2 text-[13px] rounded-lg transition-all duration-200
                          ${itemActive ? 
                            (currentTheme === 'dark' 
                              ? 'bg-[#1B2439] border border-[#4E69A6]' 
                              : 'bg-[#F5F5F5] border border-[#E5E5E5]'
                            )
                            : 'border border-transparent hover:border-[#E5E5E5] dark:hover:border-[#4E69A6]'
                          }
                          ${currentTheme === 'dark' 
                            ? 'hover:bg-[#1B2439]' 
                            : 'hover:bg-[#F5F5F5]'
                          }
                          pl-11`}
                      >
                        <span className="group-hover:text-[#1f2937] dark:group-hover:text-[#e5e7eb]">
                          {item.label}
                        </span>
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
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-4 left-4 z-40 lg:hidden rounded-md p-2 bg-background border"
          >
            <Menu className="w-4 h-4" />
          </button>

          <aside 
            className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            style={{
              width: isCollapsed ? '64px' : '256px'
            }}
          >
            {sidebarContent}
          </aside>
        </>
      ) : (
        <aside 
          className="hidden lg:block"
          style={{
            width: isCollapsed ? '64px' : '256px',
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