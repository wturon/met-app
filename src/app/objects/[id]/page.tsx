"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
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
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const heroImage = activeImage || data?.primaryImage || "";

  // Compose location string from non-empty geo fields
  const geoFields = data
    ? [data.city, data.state, data.county, data.region, data.subregion, data.locale, data.locus, data.country]
    : [];
  const locationString = geoFields.filter(Boolean).join(", ");
  const locationLabel = data?.geographyType ? `${data.geographyType}: ` : "";

  // Check if sections have content
  const hasDateOrigin = data && (
    data.period || data.dynasty || data.reign || data.culture || data.objectDate || locationString || data.excavation || data.river
  );

  const hasArtist = data && data.artistDisplayName;

  const hasTags = data && data.tags && data.tags.length > 0;

  const hasGalleryLinks = data && (
    data.GalleryNumber || data.objectURL || data.objectWikidata_URL
  );

  const hasAdditionalImages = data && data.additionalImages && data.additionalImages.length > 0;

  // Artist life dates
  const artistDates = data && data.artistBeginDate && data.artistEndDate
    ? `${data.artistBeginDate}–${data.artistEndDate}`
    : data?.artistBeginDate || data?.artistEndDate || "";

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
            {heroImage ? (
              <div className="relative w-full max-h-[600px] aspect-[4/3] rounded-lg bg-secondary overflow-hidden">
                <Image
                  src={heroImage}
                  alt={data.title}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="w-full aspect-[4/3] rounded-lg bg-secondary/80 flex flex-col items-center justify-center gap-3 text-muted-foreground/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-16 h-16"
                >
                  <rect x="8" y="12" width="48" height="40" rx="3" />
                  <path d="M8 42l14-12 10 8 8-6 16 12" />
                  <circle cx="24" cy="26" r="5" />
                </svg>
                <span className="text-sm tracking-wide">No image available for this artwork</span>
              </div>
            )}

            {/* Additional Images Thumbnails */}
            {hasAdditionalImages && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                {data.primaryImage && (
                  <button
                    onClick={() => setActiveImage(null)}
                    className={`relative w-16 h-16 rounded shrink-0 overflow-hidden border-2 transition-colors ${
                      !activeImage ? "border-primary" : "border-transparent hover:border-muted-foreground/40"
                    }`}
                  >
                    <Image
                      src={data.primaryImage}
                      alt={`${data.title} - main`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                )}
                {data.additionalImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-16 h-16 rounded shrink-0 overflow-hidden border-2 transition-colors ${
                      activeImage === img ? "border-primary" : "border-transparent hover:border-muted-foreground/40"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${data.title} - image ${i + 2}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Title Block */}
            {data.objectName && (
              <p className="text-sm text-muted-foreground mt-8 uppercase tracking-wide">
                {data.objectName}
              </p>
            )}
            <h1 className={`font-display text-3xl font-bold ${data.objectName ? "mt-1" : "mt-8"}`}>
              {data.title}
            </h1>
            {(data.artistDisplayName || data.objectDate) && (
              <p className="text-lg text-muted-foreground mt-2">
                {[data.artistDisplayName, data.objectDate]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}

            {/* Badges */}
            {(data.isHighlight || data.isPublicDomain) && (
              <div className="flex gap-2 mt-3">
                {data.isHighlight && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-white">
                    Highlight
                  </span>
                )}
                {data.isPublicDomain && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                    Public Domain
                  </span>
                )}
              </div>
            )}

            {/* Section: Details */}
            <div className="border-t border-border pt-8 mt-8">
              <h2 className="font-display text-lg font-semibold mb-4">Details</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <MetadataItem label="Department" value={data.department} />
                <MetadataItem label="Classification" value={data.classification} />
                <MetadataItem label="Object Name" value={data.objectName} />
                <MetadataItem label="Medium" value={data.medium} />
                <MetadataItem label="Dimensions" value={data.dimensions} />
                <MetadataItem label="Accession Number" value={data.accessionNumber} />
                <MetadataItem label="Credit Line" value={data.creditLine} />
                <MetadataItem label="Repository" value={data.repository} />
              </dl>
            </div>

            {/* Section: Date & Origin */}
            {hasDateOrigin && (
              <div className="border-t border-border pt-8 mt-8">
                <h2 className="font-display text-lg font-semibold mb-4">Date &amp; Origin</h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  <MetadataItem label="Date" value={data.objectDate} />
                  <MetadataItem label="Period" value={data.period} />
                  <MetadataItem label="Dynasty" value={data.dynasty} />
                  <MetadataItem label="Reign" value={data.reign} />
                  <MetadataItem label="Culture" value={data.culture} />
                  {locationString && (
                    <MetadataItem
                      label="Location"
                      value={`${locationLabel}${locationString}`}
                    />
                  )}
                  <MetadataItem label="Excavation" value={data.excavation} />
                  <MetadataItem label="River" value={data.river} />
                </dl>
              </div>
            )}

            {/* Section: The Artist */}
            {hasArtist && (
              <div className="border-t border-border pt-8 mt-8">
                <h2 className="font-display text-lg font-semibold mb-4">The Artist</h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  <MetadataItem label="Name" value={data.artistDisplayName} />
                  <MetadataItem label="Role" value={data.artistRole} />
                  <MetadataItem label="Bio" value={data.artistDisplayBio} />
                  <MetadataItem label="Nationality" value={data.artistNationality} />
                  <MetadataItem label="Life Dates" value={artistDates} />
                </dl>
                {data.artistWikidata_URL && (
                  <a
                    href={data.artistWikidata_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-sm text-primary hover:underline"
                  >
                    View artist on Wikidata &rarr;
                  </a>
                )}
              </div>
            )}

            {/* Section: Tags */}
            {hasTags && (
              <div className="border-t border-border pt-8 mt-8">
                <h2 className="font-display text-lg font-semibold mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {data.tags!.map((tag) => (
                    <span
                      key={tag.term}
                      className="text-xs px-3 py-1 rounded-full bg-secondary text-foreground"
                    >
                      {tag.term}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Section: Gallery & Links */}
            {hasGalleryLinks && (
              <div className="border-t border-border pt-8 mt-8">
                <h2 className="font-display text-lg font-semibold mb-4">Gallery &amp; Links</h2>
                {data.GalleryNumber && (
                  <p className="text-sm text-foreground mb-3">
                    On view in Gallery {data.GalleryNumber}
                  </p>
                )}
                <div className="flex flex-wrap gap-4">
                  {data.objectURL && (
                    <a
                      href={data.objectURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      View on metmuseum.org &rarr;
                    </a>
                  )}
                  {data.objectWikidata_URL && (
                    <a
                      href={data.objectWikidata_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      View on Wikidata &rarr;
                    </a>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
