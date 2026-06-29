"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Données considérées "fraîches" 1 min : pas de refetch au remontage/navigation.
      // La fraîcheur après une modif reste garantie par invalidateQueries (qui refetch
      // quel que soit le staleTime).
      staleTime: 60 * 1000,
      // Cache conservé 5 min après qu'une query n'est plus utilisée.
      gcTime: 5 * 60 * 1000,
      // Évite un refetch à chaque retour sur l'onglet.
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}