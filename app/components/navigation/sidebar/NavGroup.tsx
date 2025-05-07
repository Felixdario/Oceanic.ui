import { ReactNode } from 'react';
import { NavItem } from './NavItem';

interface NavGroupProps {
  title: string;
  href: string;
  isActive: boolean;
  children: ReactNode;
}

export function NavGroup({ title, href, isActive, children }: NavGroupProps) {
  return (
    <li className="group">
      <NavItem href={href} isActive={isActive} isMainItem>
        {title}
      </NavItem>
      <ul className="ml-3.5 flex flex-col gap-1 border-l px-2.5 py-0.5">
        {children}
      </ul>
    </li>
  );
} 