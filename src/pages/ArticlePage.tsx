import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Article } from "@/types/article";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Heart, MessageSquare, Clock, ExternalLink } from "lucide-react";
import { BookmarkButton } from "@/components/BookmarkButton";

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    setIsError(false);

    fetch(`https://dev.to/api/articles/${id}`, {
      headers: { accept: "application/vnd.forem.api.v1+json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch article");
        return res.json();
      })
      .then((data: Article) => {
        setArticle(data);
        document.title = `${data.title} | DevFeed`;
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-pulse">
        <div className="h-4 w-24 bg-muted rounded mb-8" />
        <div className="h-10 w-3/4 bg-muted rounded mb-4" />
        <div className="h-10 w-1/2 bg-muted rounded mb-8" />
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-muted" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-3 w-24 bg-muted rounded" />
          </div>
        </div>
        <div className="w-full h-64 bg-muted rounded-xl mb-8" />
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 bg-muted rounded mb-3" style={{ width: `${75 + Math.random() * 25}%` }} />
        ))}
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Feed
        </Link>
        <div className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-2xl border border-dashed border-border">
          <h3 className="text-xl font-bold mb-2">Article not found</h3>
          <p className="text-muted-foreground mb-6">We couldn't load this article. It may have been removed.</p>
          <Link href="/" className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors">
            Back to Feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <ArrowLeft size={16} />
          Back to Feed
        </Link>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          View on DEV.to <ExternalLink size={12} />
        </a>
      </div>

      {article.cover_image && (
        <div className="w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden bg-muted mb-8">
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-6 text-balance">
        {article.title}
      </h1>

      <div className="flex items-center justify-between gap-4 mb-8 pb-8 border-b border-border">
        <div className="flex items-center gap-3">
          <img
            src={article.user.profile_image}
            alt={article.user.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
          />
          <div>
            <p className="font-semibold text-foreground">{article.user.name}</p>
            <p className="text-sm text-muted-foreground">{formatDate(article.published_at)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Heart size={15} className="text-destructive/80" />
            {article.public_reactions_count}
          </span>
          <span className="flex items-center gap-1.5">
            <MessageSquare size={15} />
            {article.comments_count}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={15} />
            {article.reading_time_minutes} min
          </span>
          <BookmarkButton article={article} />
        </div>
      </div>

      {article.body_html ? (
        <div
          className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: article.body_html }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-card rounded-2xl border border-dashed border-border">
          <p className="text-muted-foreground mb-4">Full article content is not available here.</p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            Read on DEV.to <ExternalLink size={16} />
          </a>
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={16} /> Back to Feed
        </Link>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          View original <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
