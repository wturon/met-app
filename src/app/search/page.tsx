"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  return (
    <div className="min-h-screen px-4 py-12 max-w-6xl mx-auto">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; Back to search
      </Link>

      <h1 className="font-display text-3xl font-bold mt-4 mb-8">
        Results for: <span className="text-primary">{q}</span>
      </h1>

      {/* Placeholder grid for future results */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="aspect-square rounded-lg bg-secondary flex items-center justify-center text-muted-foreground text-sm">
          Results will appear here
        </div>
      </div>
    </div>
  );
}
