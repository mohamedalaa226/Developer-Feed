import { useQuery } from "@tanstack/react-query";
import { Article } from "@/types/article";

interface UseArticlesParams {
  tag?: string;
  sort?: "newest" | "oldest";
}

export function useArticles({ tag, sort = "newest" }: UseArticlesParams = {}) {
  return useQuery({
    queryKey: ["articles", tag],
    queryFn: async (): Promise<Article[]> => {
      const url = new URL("https://dev.to/api/articles");
      url.searchParams.set("per_page", "30");
      if (tag) {
        url.searchParams.set("tag", tag);
      }

      const res = await fetch(url.toString(), {
        headers: {
          accept: "application/vnd.forem.api.v1+json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch articles: ${res.status} ${res.statusText}`);
      }

      return res.json();
    },
    // We do client-side sorting because the Dev.to API's state=rising etc. is unpredictable for purely date-based sorting
    select: (data) => {
      if (!data) return [];
      
      const sorted = [...data].sort((a, b) => {
        const dateA = new Date(a.published_at).getTime();
        const dateB = new Date(b.published_at).getTime();
        return sort === "newest" ? dateB - dateA : dateA - dateB;
      });
      
      return sorted;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
