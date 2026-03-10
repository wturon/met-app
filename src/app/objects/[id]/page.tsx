"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function ObjectDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen px-4 py-12 max-w-4xl mx-auto">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; Back to search
      </Link>

      <h1 className="font-display text-3xl font-bold mt-4 mb-8">
        Object: <span className="text-primary">{id}</span>
      </h1>

      {/* Placeholder for object detail */}
      <div className="rounded-lg bg-secondary p-8 text-muted-foreground text-sm">
        Object details will appear here
      </div>
    </div>
  );
}
