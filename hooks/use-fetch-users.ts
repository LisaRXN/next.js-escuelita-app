import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { buildQueryParams, normalizeSearch } from "@/lib/utils";

export function useFetchUsers(search: string, isActive: string, sortBy: string = "createdAt"){
  const [debouncedSearch] = useDebounce(search, 500);
  const normalizedSearch = normalizeSearch(debouncedSearch);

  const queryString = buildQueryParams({
    search: normalizedSearch,
    isActive,
    withCounts: true,
    sortBy
  });

  return useQuery({
    queryKey: ["volunteers", normalizedSearch, isActive,sortBy ],
    queryFn: () => fetcher(`/api/users?${queryString}`),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false, // pour éviter un refetch inutile
  });
}
