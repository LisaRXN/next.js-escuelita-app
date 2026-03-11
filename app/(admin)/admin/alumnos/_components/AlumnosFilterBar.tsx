"use client";

import { Dispatch, SetStateAction } from "react";

interface AlumnosFilterBarProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  nivel: string;
  setNivel: Dispatch<SetStateAction<string>>;
  escuelita: string;
  setEscuelita: Dispatch<SetStateAction<string>>;
}

const NIVELES = [
  "Nido",
  "Primaria 1°",
  "Primaria 2°",
  "Primaria 3°",
  "Primaria 4°",
  "Primaria 5°",
  "Primaria 6°",
  "Secundaria 1°",
  "Secundaria 2°",
  "Secundaria 3°",
  "Secundaria 4°",
  "Secundaria 5°",
  "Secundaria 6°",
];

const AlumnosFilterBar = ({
  search,
  setSearch,
  nivel,
  setNivel,
  escuelita,
  setEscuelita,
}: AlumnosFilterBarProps) => {
  return (
    <div className="md:mb-4 flex flex-col lg:flex-row gap-4 w-full md:w-auto m-auto">
      {/* Búsqueda */}
      <div className="flex items-center h-[50px] min-w-[300px] bg-zinc-50 rounded-full justify-between p-2 text-sm">
        <input
          className="appearance-none bg-zinc-50 p-3 rounded-full w-full border-none focus:outline-none"
          placeholder="Buscar por nombre, apellido, colegio..."
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="min-w-[40px] min-h-[40px] rounded-full bg-myorange">
          <i className="fa-solid fa-magnifying-glass text-white"></i>
        </button>
      </div>

      {/* Filtro nivel */}
      <div className="flex-1 lg:flex-none min-h-[50px] text-white w-full lg:w-auto border border-white hover:border-zinc-100 transition duration-300 rounded-xl flex items-center justify-center gap-2 px-5">
        <i className="fa-solid fa-graduation-cap text-white"></i>
        <select
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
          className="custom-select"
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

      {/* Filtro escuelita */}
      <div className="flex-1 lg:flex-none min-h-[50px] text-white w-full lg:w-auto border border-white hover:border-zinc-100 transition duration-300 rounded-xl flex items-center justify-center gap-2 px-5">
        <i className="fa-solid fa-school text-white"></i>
        <select
          value={escuelita}
          onChange={(e) => setEscuelita(e.target.value)}
          className="custom-select"
        >
          <option value="">Todas las escuelitas</option>
          <option value="Peruanidad">Peruanidad</option>
          <option value="Valle_Ecologico">Valle Ecológico</option>
        </select>
      </div>
    </div>
  );
};

export default AlumnosFilterBar;
