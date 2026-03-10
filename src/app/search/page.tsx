"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import { useMetSearch } from "@/modules/met/met.hooks";
import { ArtworkCard } from "@/components/artwork-card";

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

  const { data, isLoading, isError } = useMetSearch(q);

  const objectIDs = data?.objectIDs ?? [];
  const totalPages = Math.ceil(objectIDs.length / PAGE_SIZE);
  const paginatedIDs = objectIDs.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="min-h-screen px-4 py-12 max-w-6xl mx-auto">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; Back to search
      </Link>

      <h1 className="font-display text-3xl font-bold mt-4 mb-2">
        Results for: <span className="text-primary">{q}</span>
      </h1>

      {isLoading && (
        <p className="text-muted-foreground mb-8">Searching...</p>
      )}

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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedIDs.map((id) => (
          <ArtworkCard key={id} id={id} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setPage((p) => (p ?? 0) - 1)}
            disabled={page === 0}
            className="rounded-md border border-border px-4 py-2 text-sm disabled:opacity-40 hover:bg-secondary transition-colors"
          >
            Previous
          </button>
          <span className="text-sm text-muted-foreground">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => (p ?? 0) + 1)}
            disabled={page >= totalPages - 1}
            className="rounded-md border border-border px-4 py-2 text-sm disabled:opacity-40 hover:bg-secondary transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
