import { Bookmark } from "lucide-react";
import { Article } from "@/types/article";
import { useBookmarks } from "@/context/bookmark-context";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  article: Article;
  className?: string;
}

export function BookmarkButton({ article, className }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(article.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault(); // Prevent triggering any parent links
        e.stopPropagation();
        toggleBookmark(article);
      }}
      className={cn(
        "p-2 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        bookmarked
          ? "text-primary bg-primary/10 hover:bg-primary/20"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        className
      )}
      aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
      title={bookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <Bookmark
        size={18}
        className={cn(
          "transition-all duration-300",
          bookmarked ? "fill-current scale-110" : "fill-none scale-100"
        )}
      />
    </button>
  );
}
