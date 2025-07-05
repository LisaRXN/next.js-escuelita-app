export function buildQueryParams(filters: {
  isActive?: string;
  search?: string;
  withCounts?: boolean;
  sortBy: string;
}) {
  const params = new URLSearchParams();

  if (filters.isActive && filters.isActive !== "all") {
    params.set("isActive", filters.isActive);
  }

  if (filters.search !== undefined) {
    params.set("search", filters.search);
  }

  if (filters.withCounts) {
    params.set("withCounts", "true");
  }

  if (filters.sortBy) {
    params.set("sortBy", filters.sortBy);
  }

  return params.toString();
}

export function normalizeSearch(value: string) {
  return value.trim();
}

export function isSessionInLessThan24h(sessionDate: Date) {
  const now = new Date();
  const diffHours =
    (new Date(sessionDate).getTime() - now.getTime()) / (1000 * 60 * 60);

  const isSessionInFuture24h = diffHours <= 24;

  return isSessionInFuture24h;
}
