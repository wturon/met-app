"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SUGGESTED_TERMS = ["monet", "sunflower", "sun", "vacuum", "tesselation"];

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="font-display text-5xl font-bold text-foreground mb-2">
        Explore the Met
      </h1>
      <p className="text-muted-foreground mb-8">
        Search the Metropolitan Museum of Art collection
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artworks..."
            className="flex-1 rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-accent transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2 justify-center">
        {SUGGESTED_TERMS.map((term) => (
          <button
            key={term}
            onClick={() => router.push(`/search?q=${encodeURIComponent(term)}`)}
            className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
