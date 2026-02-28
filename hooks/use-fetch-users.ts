import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { buildQueryParams, normalizeSearch } from "@/lib/utils";
import { VolunteerWithTutoringCount } from "@/type";

interface UsersResponse {
  data: VolunteerWithTutoringCount[];
  total: number;
  totalPages: number;
  page: number;
}

export function useFetchUsers(
  search: string,
  isActive: string,
  sortBy: string = "createdAt",
  page: number = 1,
) {
  const [debouncedSearch] = useDebounce(search, 500);
  const normalizedSearch = normalizeSearch(debouncedSearch);

  const queryString = buildQueryParams({
    search: normalizedSearch,
    isActive,
    withCounts: true,
    sortBy,
    page,
  });

  return useQuery<UsersResponse>({
    queryKey: ["volunteers", normalizedSearch, isActive, sortBy, page],
    queryFn: () => fetcher(`/api/users?${queryString}`),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}
