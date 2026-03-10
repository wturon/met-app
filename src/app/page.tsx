"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecentSearches } from "@/modules/met/use-recent-searches";

const SUGGESTED_TERMS = ["monet", "sunflower", "sun", "vacuum", "tesselation"];

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const trimmedQuery = query.trim();
  const { searches: recentSearches } = useRecentSearches();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (trimmedQuery) {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_10%,rgba(228,0,43,0.14),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(152,41,50,0.12),transparent_38%),linear-gradient(to_bottom,#ffffff_0%,#fafafa_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-20 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-float-slow"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-16 -z-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl animate-float-slow [animation-delay:1.5s]"
      />

      <div className="w-full max-w-2xl">
        <h1 className="font-display text-5xl font-bold text-foreground mb-2 text-center animate-rise-in [animation-delay:60ms]">
          Explore the Met
        </h1>
        <p className="text-muted-foreground mb-8 text-center animate-rise-in [animation-delay:120ms]">
          Search the Metropolitan Museum of Art collection
        </p>

        <form onSubmit={handleSubmit} className="w-full animate-rise-in [animation-delay:180ms]">
          <div className="flex gap-2 rounded-xl border border-border/70 bg-background/90 p-2 shadow-sm backdrop-blur">
            <div className="relative flex-1">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search artworks..."
                className="w-full rounded-lg border border-transparent bg-transparent py-2.5 pl-9 pr-3 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground/90 focus-visible:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/12"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent"
            >
              Search
            </button>
          </div>
        </form>

        <p
          aria-live="polite"
          className={`mt-2 text-sm transition-colors animate-rise-in [animation-delay:240ms] ${
            trimmedQuery ? "text-foreground/75" : "text-muted-foreground"
          }`}
        >
          {trimmedQuery
            ? "Press Enter to search."
            : "Try monet, sunflower, sun, vacuum, or tesselation."}
        </p>

        {recentSearches.length > 0 && (
          <div className="mt-6 animate-rise-in [animation-delay:300ms]">
            <p className="text-xs text-muted-foreground mb-2 text-center">
              Recent searches
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {recentSearches.map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-sm text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-7 flex flex-wrap justify-center gap-2 animate-rise-in [animation-delay:300ms]">
          {SUGGESTED_TERMS.map((term, index) => (
            <button
              key={term}
              onClick={() => router.push(`/search?q=${encodeURIComponent(term)}`)}
              className="animate-rise-in rounded-full border border-border bg-background/85 px-3.5 py-1.5 text-sm text-muted-foreground shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-secondary hover:text-foreground"
              style={{ animationDelay: `${340 + index * 50}ms` }}
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
