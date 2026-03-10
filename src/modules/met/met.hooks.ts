import { useQuery } from "@tanstack/react-query";
import { MetService } from "./met.service";

export const useMetSearch = (query: string) => {
  return useQuery({
    queryKey: ["met", "search", query],
    queryFn: () => MetService.search(query),
    enabled: !!query,
  });
};

export const useMetObject = (objectID: number) => {
  return useQuery({
    queryKey: ["met", "object", objectID],
    queryFn: () => MetService.getObject(objectID),
    enabled: !!objectID,
  });
};

// export const useMetDepartments = () => {
//   return useQuery({
//     queryKey: ["met", "departments"],
//     queryFn: () => MetService.getDepartments(),
//   });
// };
