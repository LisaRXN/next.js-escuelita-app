"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Alumno } from "@/generated/prisma";
import {
  AlumnosFilters as Filters,
  EMPTY_ALUMNOS_FILTERS,
  buildAlumnosParams,
  useAlumnos,
} from "@/lib/alumnos-filters";
import AlumnosFilters from "./_components/AlumnosFilters";

const ESCUELITA_CONFIG = {
  Peruanidad: {
    color: "#FA9F07",
    light: "#FFF8E7",
    icon: "fa-flag",
    description: "La más cercana · Historia y cultura viva",
    label: "Peruanidad",
  },
  Valle_Ecologico: {
    color: "#2B797C",
    light: "#E6F4F4",
    icon: "fa-leaf",
    description: "La más lejana · Entre el verde y la naturaleza",
    label: "Valle Ecológico",
  },
} as const;

export default function AlumnosPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>(EMPTY_ALUMNOS_FILTERS);
  const [page, setPage] = useState(1);

  const patch = (partial: Partial<Filters>) => setFilters((f) => ({ ...f, ...partial }));

  // Debounce de la recherche : l'input reste réactif, la requête attend 300ms.
  const [debouncedSearch] = useDebounce(filters.search, 300);
  const queryFilters: Filters = { ...filters, search: debouncedSearch };

  // Reset page dès qu'un filtre change.
  const filtersKey = buildAlumnosParams(queryFilters).toString();
  useEffect(() => { setPage(1); }, [filtersKey]);

  // Compteurs par escuelita (cards) — une seule requête groupBy, indépendante des filtres.
  const { data: stats } = useQuery({
    queryKey: ["alumnos-stats"],
    queryFn: () => fetcher(`/api/alumnos/stats`),
  });

  const counts = {
    Peruanidad: stats?.counts?.Peruanidad ?? 0,
    Valle_Ecologico: stats?.counts?.Valle_Ecologico ?? 0,
  };

  const { data, isLoading } = useAlumnos(queryFilters, page);

  const alumnos: Alumno[] = data?.data ?? [];
  const total: number = data?.total ?? 0;
  const totalPages: number = data?.totalPages ?? 1;

  return (
    <main className="px-4 md:px-8 pt-8 pb-10 flex flex-col gap-6 min-h-screen w-full">

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-myzinc font-montserrat">Los alumnos</h1>
          <p className="text-zinc-500 text-sm mt-1">
            {counts.Peruanidad + counts.Valle_Ecologico} alumnos en total
          </p>
        </div>
        <Link
          href="/admin/alumnos/create-alumno"
          className="flex items-center gap-2 text-sm px-4 py-2.5 bg-myorange text-white font-semibold rounded-xl hover:bg-myorange/80 transition self-start sm:self-auto"
        >
          <i className="fa-solid fa-plus"></i> Nuevo alumno
        </Link>
      </div>

      {/* Escuelita cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {(["Peruanidad", "Valle_Ecologico"] as const).map((e) => {
          const cfg = ESCUELITA_CONFIG[e];
          const isActive = filters.escuelita === e;
          return (
            <button
              key={e}
              onClick={() => patch({ escuelita: isActive ? "" : e })}
              className="relative text-left rounded-xl px-4 py-3 overflow-hidden transition-transform hover:-translate-y-0.5 duration-150 flex items-center gap-3"
              style={{ backgroundColor: cfg.color, opacity: filters.escuelita && !isActive ? 0.5 : 1 }}
            >
              {/* Cercle décoratif */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />

              {/* Icône */}
              <div className="relative w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                <i className={`fa-solid ${cfg.icon} text-white text-sm`}></i>
              </div>

              {/* Texte */}
              <div className="relative flex-1 min-w-0">
                <p className="text-white font-bold text-sm">{cfg.label}</p>
                <p className="text-white/70 text-xs">{cfg.description}</p>
              </div>

              {/* Compteur */}
              <span className="relative flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                <i className="fa-solid fa-users text-xs"></i>
                {counts[e]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filtres */}
      <AlumnosFilters
        filters={filters}
        patch={patch}
        onClear={() => setFilters(EMPTY_ALUMNOS_FILTERS)}
      />

      {/* Résultats */}
      {isLoading ? (
        <div className="flex flex-col items-center gap-4 py-20 text-zinc-400">
          <span className="loading loading-spinner loading-xl"></span>
          <p>Cargando...</p>
        </div>
      ) : alumnos.length === 0 ? (
        <p className="text-zinc-500 text-lg py-10">No se encontraron alumnos.</p>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-zinc-500 text-sm">{total} alumno{total !== 1 ? "s" : ""}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {alumnos.map((alumno) => {
              const cfg = ESCUELITA_CONFIG[alumno.escuelita as keyof typeof ESCUELITA_CONFIG];
              return (
                <button
                  key={alumno.id}
                  onClick={() => router.push(`/admin/alumnos/${alumno.id}`)}
                  className="bg-white rounded-2xl p-4 flex items-center gap-3 text-left hover:-translate-y-0.5 transition-transform duration-150 border border-zinc-100 shadow-sm"
                >
                  {/* Avatar initiales */}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-extrabold"
                    style={{ backgroundColor: cfg?.light ?? "#F3F4F6", color: cfg?.color ?? "#485668" }}
                  >
                    {alumno.nombre[0]}{alumno.apellidos[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-myzinc font-bold text-sm truncate">
                      {alumno.apellidos}, {alumno.nombre}
                    </p>
                    <p className="text-zinc-500 text-xs truncate mt-0.5">
                      {alumno.colegio} · {alumno.nivel}
                    </p>
                    <p className="text-zinc-400 text-xs mt-0.5">DNI: {alumno.dni}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 rounded-lg bg-white text-myzinc text-sm disabled:opacity-40">← Anterior</button>
              <span className="text-zinc-600 text-sm">{page} / {totalPages}</span>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg bg-white text-myzinc text-sm disabled:opacity-40">Siguiente →</button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
