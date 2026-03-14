"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Alumno } from "@/generated/prisma";

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

const NIVELES = [
  "Nido",
  "Primaria 1°", "Primaria 2°", "Primaria 3°", "Primaria 4°", "Primaria 5°", "Primaria 6°",
  "Secundaria 1°", "Secundaria 2°", "Secundaria 3°", "Secundaria 4°", "Secundaria 5°", "Secundaria 6°",
];

export default function AlumnosPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [nivel, setNivel] = useState("");
  const [escuelita, setEscuelita] = useState("");
  const [sexo, setSexo] = useState<"" | "M" | "F">("");
  const [page, setPage] = useState(1);

  useEffect(() => { setPage(1); }, [search, nivel, escuelita, sexo]);

  const { data: peruanidadData } = useQuery({
    queryKey: ["alumnos-count-peruanidad"],
    queryFn: () => fetcher(`/api/alumnos?escuelita=Peruanidad&page=1`),
  });
  const { data: valleData } = useQuery({
    queryKey: ["alumnos-count-valle"],
    queryFn: () => fetcher(`/api/alumnos?escuelita=Valle_Ecologico&page=1`),
  });

  const counts = {
    Peruanidad: peruanidadData?.total ?? 0,
    Valle_Ecologico: valleData?.total ?? 0,
  };

  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (nivel) params.set("nivel", nivel);
  if (escuelita) params.set("escuelita", escuelita);
  if (sexo) params.set("sexo", sexo);
  params.set("page", String(page));

  const { data, isLoading } = useQuery({
    queryKey: ["alumnos", search, nivel, escuelita, sexo, page],
    queryFn: () => fetcher(`/api/alumnos?${params.toString()}`),
  });

  const alumnos: Alumno[] = data?.data ?? [];
  const total: number = data?.total ?? 0;
  const totalPages: number = data?.totalPages ?? 1;
  const hasFilters = !!(search || nivel || escuelita || sexo);

  return (
    <main className="px-4 md:px-8 pt-8 flex flex-col gap-6 min-h-screen w-full">

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
          const isActive = escuelita === e;
          return (
            <button
              key={e}
              onClick={() => setEscuelita(isActive ? "" : e)}
              className="relative text-left rounded-xl px-4 py-3 overflow-hidden transition-transform hover:-translate-y-0.5 duration-150 flex items-center gap-3"
              style={{ backgroundColor: cfg.color, opacity: escuelita && !isActive ? 0.5 : 1 }}
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
      <div className="flex flex-col gap-3">
        <div className="flex items-center h-[50px] bg-zinc-50 rounded-full justify-between p-2 text-sm max-w-lg">
          <input
            className="appearance-none bg-transparent p-3 rounded-full w-full border-none focus:outline-none"
            placeholder="Buscar por nombre, apellido, colegio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="min-w-[40px] min-h-[40px] rounded-full bg-myorange">
            <i className="fa-solid fa-magnifying-glass text-white"></i>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Pills sexo */}
          {([
            { value: "" as const, label: "Todos" },
            { value: "M" as const, label: "Niños" },
            { value: "F" as const, label: "Niñas" },
          ]).map(({ value, label }) => {
            const active = sexo === value;
            return (
              <button
                key={value || "all-sexo"}
                onClick={() => setSexo(value)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border transition ${
                  active
                    ? "bg-myzinc text-white border-myzinc"
                    : "bg-transparent text-zinc-500 border-zinc-300 hover:border-zinc-500"
                }`}
              >
                {label}
              </button>
            );
          })}

          <div className="w-px h-6 bg-zinc-300 mx-1" />

          {/* Nivel select */}
          <div className="text-zinc-600 border border-zinc-300 hover:border-zinc-500 transition rounded-xl flex items-center gap-2 px-4 py-2">
            <i className="fa-solid fa-graduation-cap text-sm"></i>
            <select value={nivel} onChange={(e) => setNivel(e.target.value)} className="custom-select text-sm text-zinc-600">
              <option value="">Todos los niveles</option>
              <option value="Nido">Nido</option>
              <optgroup label="Primaria">
                {NIVELES.filter((n) => n.startsWith("Primaria")).map((n) => <option key={n} value={n}>{n}</option>)}
              </optgroup>
              <optgroup label="Secundaria">
                {NIVELES.filter((n) => n.startsWith("Secundaria")).map((n) => <option key={n} value={n}>{n}</option>)}
              </optgroup>
            </select>
          </div>

          {/* Limpiar filtros */}
          {hasFilters && (
            <button
              onClick={() => { setSearch(""); setNivel(""); setEscuelita(""); setSexo(""); }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm text-zinc-500 hover:text-zinc-700 border border-zinc-300 hover:border-zinc-400 transition"
            >
              <i className="fa-solid fa-xmark text-xs"></i>
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

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
            <div className="flex items-center justify-center gap-2 pb-10 mt-4">
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
