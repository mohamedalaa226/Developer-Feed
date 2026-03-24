import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BookmarkProvider } from "@/context/bookmark-context";
import { Header } from "@/components/Header";
import Feed from "@/pages/Feed";
import Bookmarks from "@/pages/Bookmarks";
import ArticlePage from "@/pages/ArticlePage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function Router() {
  return (
    <main className="min-h-screen flex flex-col w-full bg-background selection:bg-primary/20 selection:text-primary">
      <Header />
      <div className="flex-grow w-full">
        <Switch>
          <Route path="/" component={Feed} />
          <Route path="/bookmarks" component={Bookmarks} />
          <Route path="/article/:id" component={ArticlePage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </main>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BookmarkProvider>
          <WouterRouter base="/">
            <Router />
          </WouterRouter>
          <Toaster />
        </BookmarkProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
