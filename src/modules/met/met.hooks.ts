import { useQuery } from "@tanstack/react-query";
import { MetService } from "./met.service";

export const useMetSearch = (query: string) => {
  const normalized = query.toLowerCase();
  return useQuery({
    queryKey: ["met", "search", normalized],
    queryFn: () => MetService.search(normalized),
    enabled: !!normalized,
  });
};

export const useMetObject = (objectID: number) => {
  return useQuery({
    queryKey: ["met", "object", objectID],
    queryFn: () => MetService.getObject(objectID),
    enabled: !!objectID,
  });
};
