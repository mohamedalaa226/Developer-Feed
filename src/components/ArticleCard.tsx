import { MessageSquare, Heart, Clock } from "lucide-react";
import { Link } from "wouter";
import { Article } from "@/types/article";
import { formatDate } from "@/lib/utils";
import { BookmarkButton } from "./BookmarkButton";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/article/${article.id}`}
      className="group flex flex-col h-full bg-card rounded-2xl border border-card-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {article.cover_image && (
        <div className="w-full h-48 overflow-hidden bg-muted">
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-col flex-grow p-5 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={article.user.profile_image_90}
              alt={article.user.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-background"
              loading="lazy"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground line-clamp-1">
                {article.user.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDate(article.published_at)}
              </span>
            </div>
          </div>
          <div onClick={(e) => e.preventDefault()}>
            <BookmarkButton article={article} />
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-3 text-balance">
          {article.title}
        </h2>

        {article.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
            {article.description}
          </p>
        )}

        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/50 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5" title={`${article.public_reactions_count} reactions`}>
            <Heart size={16} className="text-destructive/80" />
            <span className="font-medium">{article.public_reactions_count}</span>
          </div>
          <div className="flex items-center gap-1.5" title={`${article.comments_count} comments`}>
            <MessageSquare size={16} />
            <span className="font-medium">{article.comments_count}</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto" title={`${article.reading_time_minutes} min read`}>
            <Clock size={16} />
            <span className="font-medium">{article.reading_time_minutes} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-card rounded-2xl border border-card-border overflow-hidden shadow-sm animate-pulse">
      <div className="w-full h-48 bg-muted" />
      <div className="flex flex-col flex-grow p-5 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-muted" />
          <div className="flex flex-col gap-2">
            <div className="h-3 w-24 bg-muted rounded-full" />
            <div className="h-2 w-16 bg-muted rounded-full" />
          </div>
        </div>
        <div className="h-6 w-full bg-muted rounded-md mb-2" />
        <div className="h-6 w-3/4 bg-muted rounded-md mb-4" />
        <div className="h-4 w-full bg-muted rounded-md mb-2" />
        <div className="h-4 w-2/3 bg-muted rounded-md mb-6" />
        <div className="flex justify-between mt-4 pt-4 border-t border-border/50">
          <div className="h-4 w-12 bg-muted rounded-full" />
          <div className="h-4 w-12 bg-muted rounded-full" />
          <div className="h-4 w-20 bg-muted rounded-full" />
        </div>
      </div>
    </div>
  );
}
