import { useState } from "react";
import { useArticles } from "@/hooks/use-articles";
import { ArticleCard, ArticleCardSkeleton } from "@/components/ArticleCard";
import { TagBadge } from "@/components/TagBadge";
import { Filter, ArrowUpDown, RefreshCcw, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Feed() {
  const [activeTag, setActiveTag] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const { data: articles, isLoading, isError, refetch, isFetching } = useArticles({
    tag: activeTag,
    sort: sortOrder,
  });

  const handleTagClick = (tag: string) => {
    setActiveTag(prev => prev === tag ? undefined : tag);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
            Developer News
          </h1>
          <p className="text-muted-foreground text-lg">
            The latest articles from the tech community.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {activeTag && (
            <div className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-lg border border-border">
              <Filter size={14} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filtering by:</span>
              <TagBadge tag={activeTag} onClick={handleTagClick} active />
            </div>
          )}

          <button
            onClick={() => setSortOrder(prev => prev === "newest" ? "oldest" : "newest")}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <ArrowUpDown size={16} />
            {sortOrder === "newest" ? "Newest First" : "Oldest First"}
          </button>
        </div>
      </div>

      {/* States & Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-card rounded-2xl border border-dashed border-border">
          <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-2xl flex items-center justify-center mb-6">
            <WifiOff size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Failed to load feed</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            We couldn't reach the DEV.to API. This might be a network issue or the API might be rate-limiting.
          </p>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCcw size={18} className={cn(isFetching && "animate-spin")} />
            {isFetching ? "Retrying..." : "Try Again"}
          </button>
        </div>
      ) : articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-card rounded-2xl border border-dashed border-border">
          <div className="w-16 h-16 bg-secondary text-muted-foreground rounded-2xl flex items-center justify-center mb-6">
            <Filter size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">No articles found</h3>
          <p className="text-muted-foreground mb-6">
            We couldn't find any articles matching the tag <span className="font-mono text-foreground bg-secondary px-1 py-0.5 rounded">#{activeTag}</span>.
          </p>
          <button
            onClick={() => setActiveTag(undefined)}
            className="px-6 py-2.5 bg-secondary hover:bg-secondary/80 text-foreground rounded-xl font-medium transition-colors"
          >
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
}
