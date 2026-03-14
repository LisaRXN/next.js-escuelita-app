"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { Alumno } from "@/generated/prisma";

// ── Config ────────────────────────────────────────────────────────────────────

type Escuelita = "Peruanidad" | "Valle_Ecologico";

const ESCUELITA_CONFIG: Record<Escuelita, {
  color: string;
  light: string;
  icon: string;
  label: string;
  description: string;
}> = {
  Peruanidad: {
    color: "#FA9F07",
    light: "#FFF8E7",
    icon: "fa-flag",
    label: "Peruanidad",
    description: "Historia, cultura y tradiciones peruanas",
  },
  Valle_Ecologico: {
    color: "#2B797C",
    light: "#E6F4F4",
    icon: "fa-leaf",
    label: "Valle Ecológico",
    description: "Medio ambiente y educación ecológica",
  },
};

// ── Escuelita home card ───────────────────────────────────────────────────────

function EscuelitaCard({
  escuelita,
  count,
  onSelect,
}: {
  escuelita: Escuelita;
  count: number;
  onSelect: () => void;
}) {
  const cfg = ESCUELITA_CONFIG[escuelita];

  return (
    <button
      onClick={onSelect}
      className="relative text-left rounded-3xl p-6 overflow-hidden hover:-translate-y-0.5 transition-transform duration-150 w-full"
      style={{ backgroundColor: cfg.color }}
    >
      {/* Cercles déco */}
      <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />
      <div className="absolute -bottom-5 right-10 w-20 h-20 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

      {/* Icône */}
      <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
        <i className={`fa-solid ${cfg.icon} text-white text-xl`} />
      </div>

      {/* Texte */}
      <p className="relative text-white text-2xl font-extrabold mb-1">{cfg.label}</p>
      <p className="relative text-white/75 text-sm mb-5">{cfg.description}</p>

      {/* Footer */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
          <i className="fa-solid fa-users text-white text-sm" />
          <span className="text-white font-bold text-sm">{count} alumno{count !== 1 ? "s" : ""}</span>
        </div>
        <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
          <i className="fa-solid fa-arrow-right text-white text-sm" />
        </div>
      </div>
    </button>
  );
}

// ── EscuelitaListView ─────────────────────────────────────────────────────────

function EscuelitaListView({
  escuelita,
  onBack,
}: {
  escuelita: Escuelita;
  onBack: () => void;
}) {
  const cfg = ESCUELITA_CONFIG[escuelita];
  const [search, setSearch] = useState("");
  const [filterSexo, setFilterSexo] = useState<"" | "M" | "F">("");
  const [filterNivel, setFilterNivel] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["alumnos-list", escuelita],
    queryFn: () => fetcher(`/api/alumnos?escuelita=${escuelita}&all=true`),
  });

  const allAlumnos: Alumno[] = data?.data ?? [];

  const availableNiveles = useMemo(() => {
    const set = new Set(allAlumnos.map((a) => a.nivel).filter(Boolean));
    return Array.from(set).sort();
  }, [allAlumnos]);

  const filtered = useMemo(() => {
    return allAlumnos.filter((a) => {
      if (filterSexo && a.sexo !== filterSexo) return false;
      if (filterNivel && a.nivel !== filterNivel) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !a.nombre.toLowerCase().includes(q) &&
          !a.apellidos.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
  }, [allAlumnos, filterSexo, filterNivel, search]);

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header coloré */}
      <div className="px-4 md:px-8 pt-8 pb-6" style={{ backgroundColor: cfg.color }}>
        <button onClick={onBack} className="flex items-center gap-2 text-white/80 hover:text-white transition mb-4 text-sm font-medium">
          <i className="fa-solid fa-arrow-left" />
          Atrás
        </button>
        <p className="text-white/75 text-xs font-medium uppercase tracking-wide">Escuelita</p>
        <h1 className="text-white text-2xl font-extrabold mt-0.5">{cfg.label}</h1>
        <p className="text-white/70 text-sm mt-1">{data?.total ?? 0} alumno{(data?.total ?? 0) !== 1 ? "s" : ""}</p>
      </div>

      {/* Search */}
      <div className="px-4 md:px-8 py-4 bg-white border-b border-zinc-100">
        <div className="flex items-center h-[44px] bg-zinc-50 rounded-full border border-zinc-200 px-4 gap-2 max-w-lg">
          <i className="fa-solid fa-magnifying-glass text-zinc-400 text-sm" />
          <input
            className="flex-1 bg-transparent text-sm text-myzinc placeholder:text-zinc-400 focus:outline-none"
            placeholder="Buscar por nombre o apellido..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-zinc-400 hover:text-zinc-600">
              <i className="fa-solid fa-xmark text-xs" />
            </button>
          )}
        </div>
      </div>

      {/* Filtros */}
      <div className="px-4 md:px-8 pt-3 pb-1 flex flex-col gap-2">
        {/* Sexo pills */}
        <div className="flex flex-wrap gap-2">
          {([
            { value: "" as const, label: "Todos" },
            { value: "M" as const, label: "Niños" },
            { value: "F" as const, label: "Niñas" },
          ]).map(({ value, label }) => {
            const active = filterSexo === value;
            return (
              <button
                key={value || "all-sexo"}
                onClick={() => setFilterSexo(value)}
                className="px-3.5 py-1.5 rounded-full text-sm font-semibold border transition"
                style={{
                  backgroundColor: active ? cfg.color : "white",
                  borderColor: active ? cfg.color : "#E5E7EB",
                  color: active ? "white" : "#485668",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Nivel pills — uniquement si plusieurs */}
        {availableNiveles.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {[{ value: "", label: "Todos los niveles" }, ...availableNiveles.map((n) => ({ value: n, label: n }))].map(({ value, label }) => {
              const active = filterNivel === value;
              return (
                <button
                  key={value || "all-nivel"}
                  onClick={() => setFilterNivel(value)}
                  className="px-3.5 py-1.5 rounded-full text-sm font-semibold border transition"
                  style={{
                    backgroundColor: active ? cfg.color : "white",
                    borderColor: active ? cfg.color : "#E5E7EB",
                    color: active ? "white" : "#485668",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {/* Résumé + clear */}
        {(filterSexo || filterNivel) && (
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 text-xs">{filtered.length} alumno{filtered.length !== 1 ? "s" : ""}</span>
            <button
              onClick={() => { setFilterSexo(""); setFilterNivel(""); }}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 bg-zinc-100 rounded-lg px-2 py-1 transition"
            >
              <i className="fa-solid fa-xmark text-[10px]" />
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Liste */}
      <div className="px-4 md:px-8 py-4">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4 py-20 text-zinc-400">
            <span className="loading loading-spinner loading-xl" />
            <p>Cargando...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-zinc-400">
            <i className="fa-solid fa-user-slash text-3xl mb-3 block" />
            <p className="text-sm">No se encontraron alumnos</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((alumno) => (
              <div
                key={alumno.id}
                className="bg-white rounded-2xl p-4 flex items-center gap-3 border border-zinc-100 shadow-sm"
              >
                {/* Avatar */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-extrabold"
                  style={{ backgroundColor: cfg.light, color: cfg.color }}
                >
                  {alumno.nombre[0]}{alumno.apellidos[0]}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-myzinc font-bold text-sm truncate">
                    {alumno.apellidos}, {alumno.nombre}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-500">
                      {new Date(alumno.fechaNacimiento).toLocaleDateString("es-PE")}
                    </span>
                    <span
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-md"
                      style={{ backgroundColor: cfg.light, color: cfg.color }}
                    >
                      {alumno.nivel}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Page principale ───────────────────────────────────────────────────────────

export default function AlumnosVolunteerPage() {
  const [selectedEscuelita, setSelectedEscuelita] = useState<Escuelita | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["alumnos-home"],
    queryFn: () => fetcher("/api/alumnos?all=true"),
  });

  if (selectedEscuelita) {
    return (
      <EscuelitaListView
        escuelita={selectedEscuelita}
        onBack={() => setSelectedEscuelita(null)}
      />
    );
  }

  const allAlumnos: Alumno[] = data?.data ?? [];
  const countFor = (e: Escuelita) => allAlumnos.filter((a) => a.escuelita === e).length;

  return (
    <main className="min-h-screen w-full bg-zinc-50">
      {/* Header */}
      <div className="bg-[#193252] px-4 md:px-8 pt-8 pb-6">
        <h1 className="text-white text-2xl font-extrabold">Alumnos</h1>
        <p className="text-white/60 text-sm mt-1">
          {data?.total ?? 0} alumno{(data?.total ?? 0) !== 1 ? "s" : ""} en total
        </p>
      </div>

      <div className="px-4 md:px-8 py-6">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4 py-20 text-zinc-400">
            <span className="loading loading-spinner loading-xl" />
            <p>Cargando...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            {(["Peruanidad", "Valle_Ecologico"] as Escuelita[]).map((e) => (
              <EscuelitaCard
                key={e}
                escuelita={e}
                count={countFor(e)}
                onSelect={() => setSelectedEscuelita(e)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
