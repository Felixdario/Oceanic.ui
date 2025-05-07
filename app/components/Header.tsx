import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MenuButton } from "./navigation/header/MenuButton";
import { Breadcrumbs } from "./navigation/header/Breadcrumbs";
import { SearchBar } from "./navigation/header/SearchBar";
import { UserDropdown } from "./navigation/header/UserDropdown";
import { Divider } from "./navigation/header/Divider";

const Header = () => {
  const pathname = usePathname();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getBreadcrumbs = (path: string | null) => {
    if (!path) return [];

    const cleanPath = path.replace(/\/$/, '');
    const segments = cleanPath.split('/').filter(Boolean);

    return segments.map((segment, index) => {
      const name = segment.replace(/page$/i, '');
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
      const href = '/' + segments.slice(0, index + 1).join('/');

      return { name: formattedName, href };
    });
  };

  const breadcrumbs = getBreadcrumbs(pathname);

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "https://github.com/shadcn.png"
  };

  return (
    <header className={`sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-3 transition-colors duration-200 ${hasScrolled ? 'bg-background' : ''}`}>
      <div className="flex flex-1 items-center gap-2">
        <MenuButton />
        <Divider />
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="flex items-center gap-4">
        <SearchBar />
        <Divider />
        <ThemeToggle />
        <Divider />
        <UserDropdown user={mockUser} onLogout={handleLogout} />
      </div>
    </header>
  );
};

export default Header;