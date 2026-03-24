import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Article } from "@/types/article";
import { useToast } from "@/hooks/use-toast";

interface BookmarkContextType {
  bookmarks: Article[];
  isBookmarked: (id: number) => boolean;
  toggleBookmark: (article: Article) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

const STORAGE_KEY = "developer-feed-bookmarks";

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [bookmarks, setBookmarks] = useState<Article[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse bookmarks from localStorage", error);
      return [];
    }
  });

  // Sync to local storage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = (id: number) => {
    return bookmarks.some((b) => b.id === id);
  };

  const toggleBookmark = (article: Article) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === article.id);
      if (exists) {
        toast({
          title: "Removed from bookmarks",
          description: "Article has been removed from your reading list.",
          duration: 2000,
        });
        return prev.filter((b) => b.id !== article.id);
      } else {
        toast({
          title: "Added to bookmarks",
          description: "Article saved to your reading list.",
          duration: 2000,
        });
        return [...prev, article];
      }
    });
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
}
