import Link from "next/link";
import { Fragment } from "react";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <Fragment key={item.href}>
            {index > 0 && (
              <li className="hidden md:block">
                <span className="text-muted-foreground mx-2">/</span>
              </li>
            )}
            <li className="hidden md:block">
              {index === items.length - 1 ? (
                <span className="font-medium">{item.name}</span>
              ) : (
                <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                  {item.name}
                </Link>
              )}
            </li>
          </Fragment>
        ))}
        {items.length === 0 && (
          <li>
            <span className="font-medium">Dashboard</span>
          </li>
        )}
      </ol>
    </nav>
  );
} 