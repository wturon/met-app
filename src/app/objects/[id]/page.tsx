"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMetObject } from "@/modules/met/met.hooks";
import { Skeleton } from "@/components/ui/skeleton";

function MetadataItem({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </dt>
      <dd className="text-sm text-foreground mt-1">{value}</dd>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <>
      <Skeleton className="w-full aspect-[4/3] rounded-lg" />
      <Skeleton className="h-9 w-2/3 mt-8" />
      <Skeleton className="h-5 w-1/2 mt-3" />
      <Skeleton className="h-4 w-1/3 mt-2" />
      <div className="grid grid-cols-2 gap-6 mt-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-3 w-20 mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </>
  );
}

export default function ObjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const objectID = Number(id);
  const isValidId = !isNaN(objectID) && objectID > 0;
  const { data, isLoading, isError } = useMetObject(objectID);

  const geography = [data?.city, data?.country].filter(Boolean).join(", ");

  return (
    <div className="min-h-screen px-4 py-12 max-w-4xl mx-auto">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; Back to search
      </Link>

      <div className="mt-6">
        {!isValidId ? (
          <div className="rounded-lg bg-secondary p-8 text-muted-foreground text-sm">
            Invalid artwork ID.
          </div>
        ) : isLoading ? (
          <LoadingSkeleton />
        ) : isError || !data ? (
          <div className="rounded-lg bg-secondary p-8 text-muted-foreground text-sm">
            Could not load this artwork.
          </div>
        ) : (
          <>
            {/* Hero Image */}
            {data.primaryImage ? (
              <div className="relative w-full max-h-[600px] aspect-[4/3] rounded-lg bg-secondary overflow-hidden">
                <Image
                  src={data.primaryImage}
                  alt={data.title}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="w-full aspect-[4/3] rounded-lg bg-secondary flex items-center justify-center">
                <span className="text-muted-foreground text-sm">
                  No image available
                </span>
              </div>
            )}

            {/* Title & Artist */}
            <h1 className="font-display text-3xl font-bold mt-8">
              {data.title}
            </h1>
            {(data.artistDisplayName || data.objectDate) && (
              <p className="text-lg text-muted-foreground mt-2">
                {[data.artistDisplayName, data.objectDate]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
            {data.artistDisplayBio && (
              <p className="text-sm text-muted-foreground mt-1">
                {data.artistDisplayBio}
              </p>
            )}

            {/* Metadata Grid */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mt-10">
              <MetadataItem label="Department" value={data.department} />
              <MetadataItem label="Classification" value={data.classification} />
              <MetadataItem label="Medium" value={data.medium} />
              <MetadataItem label="Dimensions" value={data.dimensions} />
              <MetadataItem label="Period" value={data.period} />
              <MetadataItem label="Culture" value={data.culture} />
              <MetadataItem label="Geography" value={geography} />
              <MetadataItem label="Credit Line" value={data.creditLine} />
            </dl>

            {/* Link to Met */}
            {data.objectURL && (
              <a
                href={data.objectURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-10 text-sm text-primary hover:underline"
              >
                View on metmuseum.org &rarr;
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
}
