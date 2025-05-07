import Link from 'next/link';
import { ReactNode } from 'react';

interface NavItemProps {
  href: string;
  isActive: boolean;
  children: ReactNode;
  isMainItem?: boolean;
}

export function NavItem({ href, isActive, children, isMainItem = false }: NavItemProps) {
  const baseClasses = "flex items-center rounded-md hover:bg-accent hover:text-accent-foreground";
  const mainItemClasses = "w-full gap-2 p-2 text-sm font-medium";
  const subItemClasses = "h-7 px-2 text-sm";

  const classes = `${baseClasses} ${isMainItem ? mainItemClasses : subItemClasses} ${isActive ? "bg-accent text-accent-foreground" : ""
    }`;

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
} 