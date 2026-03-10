"use client";

import Image from "next/image";
import Link from "next/link";
import { useMetObject } from "@/modules/met/met.hooks";

function ImagePlaceholder() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-secondary/80 text-muted-foreground/60 gap-3 p-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10"
      >
        <rect x="8" y="12" width="48" height="40" rx="3" />
        <path d="M8 42l14-12 10 8 8-6 16 12" />
        <circle cx="24" cy="26" r="5" />
      </svg>
      <span className="text-xs tracking-wide">No preview</span>
    </div>
  );
}

export function ArtworkCard({ id }: { id: number }) {
  const { data: object, isLoading, isError } = useMetObject(id);

  if (isLoading) {
    return (
      <div className="animate-pulse rounded-lg bg-secondary aspect-[3/4]" />
    );
  }

  if (isError || !object) {
    return (
      <div className="rounded-lg bg-secondary aspect-[3/4] flex items-center justify-center text-muted-foreground text-sm">
        Failed to load
      </div>
    );
  }

  const imageSrc = object.primaryImageSmall || object.primaryImage;

  return (
    <Link href={`/objects/${id}`} className="group block">
      <div className="overflow-hidden rounded-lg bg-secondary aspect-[3/4] relative">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={object.title || "Artwork"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {object.title || "Untitled"}
        </h3>
        {object.artistDisplayName && (
          <p className="text-xs text-muted-foreground line-clamp-1">
            {object.artistDisplayName}
          </p>
        )}
        {object.objectDate && (
          <p className="text-xs text-muted-foreground">{object.objectDate}</p>
        )}
      </div>
    </Link>
  );
}
