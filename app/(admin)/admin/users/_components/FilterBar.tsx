"use client";

import { Dispatch, SetStateAction } from "react";

interface FilterBarProps {
  setSearch: Dispatch<SetStateAction<string>>;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  isActive: string;
  setIsActive: Dispatch<SetStateAction<string>>;
}

const FilterBar = ({
  setSearch,
  isActive,
  setIsActive,
  sortBy,
  setSortBy,
}: FilterBarProps) => {
  return (
    <div className="mb-4 flex flex-col lg:flex-row gap-4">
      <div className="flex items-center h-[60px] min-w-[350px] bg-zinc-50 rounded-full justify-between p-2">
        <input
          className="appearance-none bg-zinc-50 p-4 rounded-full w-full border-none focus:outline-none focus:none"
          placeholder="Busca por nombre, appellido..."
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="min-w-[50px] min-h-[50px] rounded-full bg-myorange">
          <i className="fa-solid fa-magnifying-glass text-white"></i>
        </button>
      </div>

      <div className="flex-1 lg:flex-none min-h-[60px] text-white w-full lg:w-auto border border-white hover:border-zinc-100 transition duration-300 rounded-xl flex items-center justify-center gap-2 px-5">
        <i className="fa-solid fa-sliders text-white"></i>{" "}
        <select
          value={isActive}
          onChange={(e) => setIsActive(e.target.value)}
          className="custom-select"
        >
          <option value="all">Todos</option>
          <option value="true">Activos</option>
          <option value="false">Inactivos</option>
        </select>
      </div>
      <div className="flex-1 lg:flex-none min-h-[60px] text-white w-full lg:w-auto border border-white hover:border-zinc-100 transition duration-300 rounded-xl flex items-center justify-center gap-2 px-5">
        <i className="fa-solid fa-arrow-down-wide-short text-white"></i>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="custom-select"
        >
          <option value="createdAt">Más Recientes</option>
          <option value="firstName">Ordernar por nombre</option>
          <option value="lastName">Ordernar por appellido</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
