"use client";

import { useState, useCallback } from "react";

const STORAGE_KEY = "met-recent-searches";
const MAX_ITEMS = 8;

function readStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useRecentSearches() {
  const [searches, setSearches] = useState<string[]>(readStorage);

  const addSearch = useCallback((query: string) => {
    setSearches((prev) => {
      const deduped = [query, ...prev.filter((s) => s !== query)].slice(
        0,
        MAX_ITEMS,
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(deduped));
      return deduped;
    });
  }, []);

  return { searches, addSearch };
}
