"use client";

import Link from "next/link";
import { useMetObject } from "@/modules/met/met.hooks";

const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23FAFAFA' width='400' height='400'/%3E%3Ctext fill='%23767676' font-family='sans-serif' font-size='14' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ENo Image Available%3C/text%3E%3C/svg%3E";

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

  const imageSrc = object.primaryImageSmall || object.primaryImage || FALLBACK_IMAGE;

  return (
    <Link href={`/objects/${id}`} className="group block">
      <div className="overflow-hidden rounded-lg bg-secondary aspect-[3/4]">
        <img
          src={imageSrc}
          alt={object.title || "Artwork"}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
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
