"use client";

import {
  AlumnosFilters as Filters,
  EDAD_RANGES,
  ESTATUS_OPTIONS,
  NIVELES,
  hasActiveFilters,
} from "@/lib/alumnos-filters";

interface Props {
  filters: Filters;
  patch: (partial: Partial<Filters>) => void;
  onClear: () => void;
}

const pill = (active: boolean) =>
  `px-3.5 py-1.5 rounded-full text-sm font-semibold border transition ${
    active
      ? "bg-myzinc text-white border-myzinc"
      : "bg-transparent text-zinc-500 border-zinc-300 hover:border-zinc-500"
  }`;

const AlumnosFilters = ({ filters, patch, onClear }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Recherche */}
      <div className="flex items-center h-[50px] bg-zinc-50 rounded-full justify-between p-2 text-sm max-w-lg">
        <input
          className="appearance-none bg-transparent p-3 rounded-full w-full border-none focus:outline-none"
          placeholder="Buscar por nombre, apellido, colegio..."
          value={filters.search}
          onChange={(e) => patch({ search: e.target.value })}
        />
        <button className="min-w-[40px] min-h-[40px] rounded-full bg-myorange">
          <i className="fa-solid fa-magnifying-glass text-white"></i>
        </button>
      </div>

      {/* Sexo */}
      <div className="flex flex-wrap items-center gap-2">
        {([
          { value: "" as const, label: "Todos" },
          { value: "M" as const, label: "Niños" },
          { value: "F" as const, label: "Niñas" },
        ]).map(({ value, label }) => (
          <button
            key={value || "all-sexo"}
            onClick={() => patch({ sexo: value })}
            className={pill(filters.sexo === value)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Selects + toggle */}
      <div className="grid grid-cols-1 sm:flex sm:flex-wrap sm:items-center gap-2">
        {/* Edad */}
        <div className="text-zinc-600 border border-zinc-300 hover:border-zinc-500 transition rounded-xl flex items-center gap-2 px-4 py-2 w-full sm:w-auto">
          <i className="fa-solid fa-cake-candles text-sm"></i>
          <select
            value={EDAD_RANGES.find((r) => filters.edadMin === r.min && filters.edadMax === r.max)?.label ?? ""}
            onChange={(e) => {
              const r = EDAD_RANGES.find((x) => x.label === e.target.value);
              patch({ edadMin: r?.min ?? null, edadMax: r?.max ?? null });
            }}
            className="custom-select text-sm text-zinc-600 flex-1 sm:flex-none"
          >
            <option value="">Todas las edades</option>
            {EDAD_RANGES.map((r) => (
              <option key={r.label} value={r.label}>{r.label} años</option>
            ))}
          </select>
        </div>

        {/* Nivel */}
        <div className="text-zinc-600 border border-zinc-300 hover:border-zinc-500 transition rounded-xl flex items-center gap-2 px-4 py-2 w-full sm:w-auto">
          <i className="fa-solid fa-graduation-cap text-sm"></i>
          <select
            value={filters.nivel}
            onChange={(e) => patch({ nivel: e.target.value })}
            className="custom-select text-sm text-zinc-600 flex-1 sm:flex-none"
          >
            <option value="">Todos los niveles</option>
            <option value="Nido">Nido</option>
            <optgroup label="Primaria">
              {NIVELES.filter((n) => n.startsWith("Primaria")).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </optgroup>
            <optgroup label="Secundaria">
              {NIVELES.filter((n) => n.startsWith("Secundaria")).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Estado de matriculación */}
        <div className="text-zinc-600 border border-zinc-300 hover:border-zinc-500 transition rounded-xl flex items-center gap-2 px-4 py-2 w-full sm:w-auto">
          <i className="fa-solid fa-clipboard-check text-sm"></i>
          <select
            value={filters.estatus}
            onChange={(e) => patch({ estatus: e.target.value as Filters["estatus"] })}
            className="custom-select text-sm text-zinc-600 flex-1 sm:flex-none"
          >
            {ESTATUS_OPTIONS.map((o) => (
              <option key={o.value || "all-estatus"} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Autorización de imagen */}
        <div className="text-zinc-600 border border-zinc-300 hover:border-zinc-500 transition rounded-xl flex items-center gap-2 px-4 py-2 w-full sm:w-auto">
          <i className="fa-solid fa-camera text-sm"></i>
          <select
            value={filters.autorizacionImagen}
            onChange={(e) => patch({ autorizacionImagen: e.target.value as Filters["autorizacionImagen"] })}
            className="custom-select text-sm text-zinc-600 flex-1 sm:flex-none"
          >
            <option value="">Imagen: todos</option>
            <option value="true">Con autorización</option>
            <option value="false">Sin autorización</option>
          </select>
        </div>

        {/* Limpiar */}
        {hasActiveFilters(filters) && (
          <button
            onClick={onClear}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl sm:rounded-full text-sm text-zinc-500 hover:text-zinc-700 border border-zinc-300 hover:border-zinc-400 transition w-full sm:w-auto"
          >
            <i className="fa-solid fa-xmark text-xs"></i>
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
};

export default AlumnosFilters;
