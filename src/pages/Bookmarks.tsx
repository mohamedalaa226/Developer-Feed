import { useBookmarks } from "@/context/bookmark-context";
import { ArticleCard } from "@/components/ArticleCard";
import { Bookmark, Search } from "lucide-react";
import { Link } from "wouter";

export default function Bookmarks() {
  const { bookmarks } = useBookmarks();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
          <Bookmark className="text-primary" size={32} />
          Your Reading List
        </h1>
        <p className="text-muted-foreground text-lg">
          Articles you've saved for later ({bookmarks.length}).
        </p>
      </div>

      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Reverse to show newest bookmarks first */}
          {[...bookmarks].reverse().map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-card rounded-3xl border border-dashed border-border/60">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 ring-8 ring-primary/5">
            <Bookmark size={36} className="fill-none" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">Nothing saved yet</h3>
          <p className="text-muted-foreground text-lg max-w-md mb-8 text-balance">
            Your reading list is empty. Explore the feed and click the bookmark icon on any article to save it here.
          </p>
          <Link 
            href="/"
            className="flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <Search size={18} />
            Discover Articles
          </Link>
        </div>
      )}
    </div>
  );
}
