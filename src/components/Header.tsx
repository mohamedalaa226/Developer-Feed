import { Link, useLocation } from "wouter";
import { Code2, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookmarks } from "@/context/bookmark-context";

export function Header() {
  const [location] = useLocation();
  const { bookmarks } = useBookmarks();

  const navItems = [
    { href: "/", label: "Feed", icon: Code2 },
    { href: "/bookmarks", label: "Bookmarks", icon: Bookmark, badge: bookmarks.length },
  ];

  return (
    <header className="sticky top-0 z-50 glass w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            
            <a href="http://localhost:5173/" className="text-xl font-bold tracking-tight text-foreground hidden sm:block">
              DevFeed
            </a>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = location === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "text-foreground bg-secondary shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <Icon size={18} className={isActive ? "text-primary" : ""} />
                  <span>{item.label}</span>
                  
                  {/* Badge for bookmarks */}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-bold bg-primary text-primary-foreground rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
