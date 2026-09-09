import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import type { Alumno } from "@/generated/prisma";

// ── Types ───────────────────────────────────────────────────────────────────

export type SexoFilter = "" | "M" | "F";
export type EstatusFilter = "" | "Inscrito" | "EnEspera" | "Cancelado";
/** "" = sin filtro, "true" / "false" = filtrar por autorización de imagen */
export type AutorizacionFilter = "" | "true" | "false";

export interface AlumnosFilters {
  search: string;
  nivel: string;
  escuelita: string;
  sexo: SexoFilter;
  estatus: EstatusFilter;
  autorizacionImagen: AutorizacionFilter;
  /** Bornes de la tranche d'âge sélectionnée (null = pas de borne) */
  edadMin: number | null;
  edadMax: number | null;
}

export const EMPTY_ALUMNOS_FILTERS: AlumnosFilters = {
  search: "",
  nivel: "",
  escuelita: "",
  sexo: "",
  estatus: "",
  autorizacionImagen: "",
  edadMin: null,
  edadMax: null,
};

// ── Constantes partagées ─────────────────────────────────────────────────────

export const NIVELES = [
  "Nido",
  "Primaria 1°", "Primaria 2°", "Primaria 3°", "Primaria 4°", "Primaria 5°", "Primaria 6°",
  "Secundaria 1°", "Secundaria 2°", "Secundaria 3°", "Secundaria 4°", "Secundaria 5°", "Secundaria 6°",
] as const;

export const EDAD_RANGES: { label: string; min: number; max: number | null }[] = [
  { label: "3-5", min: 3, max: 5 },
  { label: "6-8", min: 6, max: 8 },
  { label: "9-11", min: 9, max: 11 },
  { label: "12-14", min: 12, max: 14 },
  { label: "15+", min: 15, max: null },
];

export const ESTATUS_OPTIONS: { value: EstatusFilter; label: string }[] = [
  { value: "", label: "Todos los estados" },
  { value: "Inscrito", label: "Inscrito" },
  { value: "EnEspera", label: "En espera" },
  { value: "Cancelado", label: "Cancelado" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Construit les query params à partir des filtres (n'ajoute que les valeurs actives). */
export function buildAlumnosParams(
  filters: Partial<AlumnosFilters>,
  extra?: { page?: number; all?: boolean }
): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.nivel) params.set("nivel", filters.nivel);
  if (filters.escuelita) params.set("escuelita", filters.escuelita);
  if (filters.sexo) params.set("sexo", filters.sexo);
  if (filters.estatus) params.set("estatus", filters.estatus);
  if (filters.autorizacionImagen) params.set("autorizacionImagen", filters.autorizacionImagen);
  if (filters.edadMin != null) params.set("edadMin", String(filters.edadMin));
  if (filters.edadMax != null) params.set("edadMax", String(filters.edadMax));
  if (extra?.all) params.set("all", "true");
  if (extra?.page != null) params.set("page", String(extra.page));
  return params;
}

/** True si au moins un filtre est actif. */
export function hasActiveFilters(filters: AlumnosFilters): boolean {
  return !!(
    filters.search ||
    filters.nivel ||
    filters.escuelita ||
    filters.sexo ||
    filters.estatus ||
    filters.autorizacionImagen ||
    filters.edadMin != null ||
    filters.edadMax != null
  );
}

export interface AlumnosResponse {
  data: Alumno[];
  total: number;
  totalPages: number;
  page: number;
}

/**
 * Hook partagé de requête des alumnos (filtrage serveur).
 * `keepPreviousData` évite le flicker au changement de page/filtre.
 */
export function useAlumnos(filters: Partial<AlumnosFilters>, page: number) {
  const params = buildAlumnosParams(filters, { page });
  const key = params.toString();
  return useQuery<AlumnosResponse>({
    queryKey: ["alumnos", key],
    queryFn: () => fetcher(`/api/alumnos?${key}`),
    placeholderData: keepPreviousData,
  });
}
