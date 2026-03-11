"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import { Alumno } from "@/generated/prisma";

const NIVELES = [
  "Nido",
  "Primaria 1°", "Primaria 2°", "Primaria 3°", "Primaria 4°", "Primaria 5°", "Primaria 6°",
  "Secundaria 1°", "Secundaria 2°", "Secundaria 3°", "Secundaria 4°", "Secundaria 5°", "Secundaria 6°",
];

export default function AlumnosVolunteerPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [nivel, setNivel] = useState("");
  const [escuelita, setEscuelita] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => { setPage(1); }, [search, nivel, escuelita]);

  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (nivel) params.set("nivel", nivel);
  if (escuelita) params.set("escuelita", escuelita);
  params.set("page", String(page));

  const { data, isLoading } = useQuery({
    queryKey: ["alumnos-v", search, nivel, escuelita, page],
    queryFn: () => fetcher(`/api/alumnos?${params.toString()}`),
  });

  const alumnos: Alumno[] = data?.data ?? [];
  const total: number = data?.total ?? 0;
  const totalPages: number = data?.totalPages ?? 1;

  return (
    <main className="px-2 md:px-8 pt-10 flex flex-col gap-6 items-center min-h-screen m-auto w-full">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-[30px] md:text-[40px] font-bold font-montserrat text-white">
          Los alumnos <span className="md:text-[30px] ml-3">🧒👧🏽</span>
        </h1>
      </div>

      {/* Filtros */}
      <div className="w-full flex flex-col lg:flex-row gap-3">
        <div className="flex items-center h-[50px] flex-1 bg-zinc-50 rounded-full justify-between p-2 text-sm">
          <input
            className="appearance-none bg-zinc-50 p-3 rounded-full w-full border-none focus:outline-none"
            placeholder="Buscar por nombre, apellidos o colegio..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="min-w-[40px] min-h-[40px] rounded-full bg-myorange">
            <i className="fa-solid fa-magnifying-glass text-white"></i>
          </button>
        </div>
        <div className="flex-1 lg:flex-none min-h-[50px] text-white border border-white hover:border-zinc-100 transition rounded-xl flex items-center justify-center gap-2 px-5">
          <i className="fa-solid fa-graduation-cap text-white"></i>
          <select value={nivel} onChange={(e) => setNivel(e.target.value)} className="custom-select">
            <option value="">Todos los niveles</option>
            {NIVELES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="flex-1 lg:flex-none min-h-[50px] text-white border border-white hover:border-zinc-100 transition rounded-xl flex items-center justify-center gap-2 px-5">
          <i className="fa-solid fa-school text-white"></i>
          <select value={escuelita} onChange={(e) => setEscuelita(e.target.value)} className="custom-select">
            <option value="">Todas las escuelitas</option>
            <option value="Peruanidad">Peruanidad</option>
            <option value="Valle_Ecologico">Valle Ecológico</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center p-20 flex flex-col items-center gap-4 text-mylightgray">
          <span className="loading loading-spinner loading-xl"></span>
          <p>Cargando...</p>
        </div>
      ) : alumnos.length === 0 ? (
        <p className="text-white text-lg py-10">No se encontraron alumnos.</p>
      ) : (
        <div className="w-full flex flex-col gap-4">
          <p className="text-white/70 text-sm">{total} alumno{total !== 1 ? "s" : ""}</p>

          {/* Tabla desktop */}
          <div className="hidden md:block w-full bg-white rounded-xl overflow-hidden border border-zinc-200">
            <table className="w-full text-sm text-myzinc">
              <thead className="bg-zinc-100 text-xs uppercase font-semibold text-zinc-500">
                <tr>
                  <th className="px-4 py-3 text-left">Nombre</th>
                  <th className="px-4 py-3 text-left">Apellidos</th>
                  <th className="px-4 py-3 text-left">Colegio</th>
                  <th className="px-4 py-3 text-left">Nivel</th>
                  <th className="px-4 py-3 text-left">Escuelita</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno, i) => (
                  <tr
                    key={alumno.id}
                    onClick={() => router.push(`/alumnos/${alumno.id}`)}
                    className={`cursor-pointer hover:bg-zinc-100 transition ${i % 2 === 0 ? "bg-white" : "bg-zinc-50"}`}
                  >
                    <td className="px-4 py-3 font-medium">{alumno.nombre}</td>
                    <td className="px-4 py-3">{alumno.apellidos}</td>
                    <td className="px-4 py-3">{alumno.colegio}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-zinc-100 rounded-full text-xs font-medium">{alumno.nivel}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${alumno.escuelita === "Peruanidad" ? "bg-myteal" : "bg-mygreen"}`}>
                        {alumno.escuelita === "Valle_Ecologico" ? "Valle Ecológico" : alumno.escuelita}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards mobile */}
          <div className="md:hidden flex flex-col gap-3 w-full">
            {alumnos.map((alumno) => (
              <div
                key={alumno.id}
                onClick={() => router.push(`/alumnos/${alumno.id}`)}
                className="bg-white rounded-xl p-4 flex flex-col gap-2 text-myzinc text-sm cursor-pointer hover:bg-zinc-50 transition"
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-base">{alumno.nombre} {alumno.apellidos}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${alumno.escuelita === "Peruanidad" ? "bg-myteal" : "bg-mygreen"}`}>
                    {alumno.escuelita === "Valle_Ecologico" ? "Valle Ecológico" : alumno.escuelita}
                  </span>
                </div>
                <p>{alumno.colegio}</p>
                <span className="px-2 py-1 bg-zinc-100 rounded-full text-xs font-medium self-start">{alumno.nivel}</span>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pb-10">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 rounded bg-white text-myzinc text-sm disabled:opacity-40">← Anterior</button>
              <span className="text-white text-sm">{page} / {totalPages}</span>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 rounded bg-white text-myzinc text-sm disabled:opacity-40">Siguiente →</button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
