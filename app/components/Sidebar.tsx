'use client'

import { usePathname } from 'next/navigation';
import { NavGroup } from './navigation/sidebar/NavGroup';
import { NavItem } from './navigation/sidebar/NavItem';
import { SidebarHeader } from './navigation/sidebar/SidebarHeader';
import navigation from '../config/navigation.json';
import type { NavigationSection } from '../utils/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/") return true;
    if (href === "#") return false;
    return pathname?.startsWith(href) ?? false;
  };
  
  const sections = navigation.sections as NavigationSection[];
  const gettingStartedSection = sections.find(s => s.title === "Primeiros Passos");
  const componentsSection = sections.find(s => s.title === "Componentes");
  const apiSection = sections.find(s => s.title === "API");
  const architectureSection = sections.find(s => s.title === "Arquitetura");
  const communitySection = sections.find(s => s.title === "Comunidade");

  return (
    <div className="flex flex-col relative lg:inset-y-0 bg-background border-r">
      <div className="flex flex-col flex-1 gap-4 p-4">
        <SidebarHeader />

        <nav className="flex-1">
          <ul className="flex flex-col gap-1">
            <NavGroup title="Início" href="/dashboard" isActive={isActive("/dashboard")}>
              {gettingStartedSection?.items.map((item) => (
                <li key={item.href}>
                  <NavItem href={item.href} isActive={isActive(item.href)}>
                    {item.label}
                  </NavItem>
                </li>
              ))}
            </NavGroup>

            <NavGroup title="Components" href="/componentes" isActive={isActive("/componentes")}>
              {componentsSection?.items.map((item) => (
                <li key={item.href}>
                  <NavItem href={item.href} isActive={isActive(item.href)}>
                    {item.label}
                  </NavItem>
                </li>
              ))}
            </NavGroup>

            <NavGroup title="Referência da API" href="/api" isActive={isActive("/api")}>
              {apiSection?.items.map((item) => (
                <li key={item.href}>
                  <NavItem href={item.href} isActive={isActive(item.href)}>
                    {item.label}
                  </NavItem>
                </li>
              ))}
            </NavGroup>

            <NavGroup title="Arquitetura" href="/architecture" isActive={isActive("/architecture")}>
              {architectureSection?.items.map((item) => (
                <li key={item.href}>
                  <NavItem href={item.href} isActive={isActive(item.href)}>
                    {item.label}
                  </NavItem>
                </li>
              ))}
            </NavGroup>

            <NavGroup title="Comunidade" href="/community" isActive={isActive("/community")}>
              {communitySection?.items.map((item) => (
                <li key={item.href}>
                  <NavItem href={item.href} isActive={isActive(item.href)}>
                    {item.label}
                  </NavItem>
                </li>
              ))}
            </NavGroup>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;