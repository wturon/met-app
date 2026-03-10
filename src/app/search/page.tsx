"use client";

import Link from "next/link";
import { Suspense, useEffect, useRef } from "react";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import { useMetSearch } from "@/modules/met/met.hooks";
import { useRecentSearches } from "@/modules/met/use-recent-searches";
import { ArtworkCard } from "@/app/search/_components/artwork-card";

const PAGE_SIZE = 20;

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
}

function SearchResults() {
  const [q] = useQueryState("q", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(0));
  const normalizedQuery = q.trim().toLowerCase();
  const previousQueryRef = useRef(normalizedQuery);

  const { addSearch } = useRecentSearches();
  const { data, isLoading, isError } = useMetSearch(normalizedQuery);

  useEffect(() => {
    if (normalizedQuery) addSearch(normalizedQuery);
  }, [normalizedQuery, addSearch]);

  const objectIDs = data?.objectIDs ?? [];
  const totalPages = Math.ceil(objectIDs.length / PAGE_SIZE);
  const maxPage = Math.max(totalPages - 1, 0);
  const safePage = Math.min(Math.max(page, 0), maxPage);
  const paginatedIDs = objectIDs.slice(
    safePage * PAGE_SIZE,
    (safePage + 1) * PAGE_SIZE,
  );

  useEffect(() => {
    if (previousQueryRef.current !== normalizedQuery && page !== 0) {
      void setPage(0);
    }
    previousQueryRef.current = normalizedQuery;
  }, [normalizedQuery, page, setPage]);

  if (!normalizedQuery) {
    return (
      <div className="min-h-screen px-4 py-12 max-w-6xl mx-auto">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; Back to search
        </Link>
        <div className="mt-8 rounded-xl border border-border bg-secondary/70 p-8">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Start with a search term
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Use terms like monet, sunflower, sun, vacuum, or tesselation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 max-w-6xl mx-auto">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; Back to search
      </Link>

      <h1 className="font-display text-3xl font-bold mt-4 mb-2">
        Results for: <span className="text-primary">{normalizedQuery}</span>
      </h1>

      {isLoading && <p className="text-muted-foreground mb-8">Searching...</p>}

      {isError && (
        <p className="text-destructive mb-8">
          Something went wrong. Please try again.
        </p>
      )}

      {data && (
        <p className="text-sm text-muted-foreground mb-8">
          {data.total} {data.total === 1 ? "result" : "results"} found
        </p>
      )}

      {data && data.total === 0 ? (
        <div className="rounded-xl border border-border bg-secondary/70 p-8 text-sm text-muted-foreground">
          No matches for{" "}
          <span className="font-medium text-foreground">{normalizedQuery}</span>
          .
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedIDs.map((id) => (
            <ArtworkCard key={id} id={id} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setPage(safePage - 1)}
            disabled={safePage === 0}
            className="rounded-md border border-border px-4 py-2 text-sm disabled:opacity-40 hover:bg-secondary transition-colors"
          >
            Previous
          </button>
          <span className="text-sm text-muted-foreground">
            Page {safePage + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage(safePage + 1)}
            disabled={safePage >= totalPages - 1}
            className="rounded-md border border-border px-4 py-2 text-sm disabled:opacity-40 hover:bg-secondary transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
