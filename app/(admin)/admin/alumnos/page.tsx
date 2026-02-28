"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AlumnosFilterBar from "./_components/AlumnosFilterBar";
import { Alumno } from "@/generated/prisma";

export default function AlumnosPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [nivel, setNivel] = useState("");
  const [escuelita, setEscuelita] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search, nivel, escuelita]);

  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (nivel) params.set("nivel", nivel);
  if (escuelita) params.set("escuelita", escuelita);
  params.set("page", String(page));

  const { data, isLoading } = useQuery({
    queryKey: ["alumnos", search, nivel, escuelita, page],
    queryFn: () => fetcher(`/api/alumnos?${params.toString()}`),
  });

  const alumnos: Alumno[] = data?.data ?? [];
  const total: number = data?.total ?? 0;
  const totalPages: number = data?.totalPages ?? 1;

  return (
    <>
      <main className="px-2 md:px-8 pt-10 flex flex-col gap-6 items-center min-h-screen m-auto w-full">
        <div className="w-full flex flex-col gap-3 md:flex-row items-center justify-between">
          <h1 className="text-[30px] md:text-[40px] font-bold font-montserrat text-white">
            Los alumnos
            <span className="md:text-[30px] ml-3">🧒👧🏽</span>
          </h1>
          <Link
            href="/admin/alumnos/create-alumno"
            className="text-sm px-4 py-2.5 bg-myorange text-white font-semibold rounded-md hover:bg-myorange/80 transition"
          >
            + Nuevo alumno
          </Link>
        </div>

        <div className="w-full flex justify-center">
          <AlumnosFilterBar
            search={search}
            setSearch={setSearch}
            nivel={nivel}
            setNivel={setNivel}
            escuelita={escuelita}
            setEscuelita={setEscuelita}
          />
        </div>

        {isLoading ? (
          <div className="text-center p-20 flex flex-col items-center justify-start gap-4 m-auto text-mylightgray">
            <span className="loading loading-spinner loading-xl"></span>
            <p>Cargando...</p>
          </div>
        ) : alumnos.length === 0 ? (
          <p className="text-white text-lg py-10">No se encontraron alumnos.</p>
        ) : (
          <div className="w-full flex flex-col gap-4">
            <p className="text-white/70 text-sm">
              {total} alumno{total !== 1 ? "s" : ""}
            </p>

            {/* Tabla desktop */}
            <div className="hidden md:block w-full bg-white rounded-xl overflow-hidden border border-zinc-200">
              <table className="w-full text-sm text-myzinc">
                <thead className="bg-zinc-100 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-3 text-left">Nombre</th>
                    <th className="px-4 py-3 text-left">Apellidos</th>
                    <th className="px-4 py-3 text-left">DNI</th>
                    <th className="px-4 py-3 text-left">Colegio</th>
                    <th className="px-4 py-3 text-left">Nivel</th>
                    <th className="px-4 py-3 text-left">Escuelita</th>
                    <th className="px-4 py-3 text-left">Matrícula</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnos.map((alumno, i) => (
                    <tr
                      key={alumno.id}
                      onClick={() => router.push(`/admin/alumnos/${alumno.id}`)}
                      className={`cursor-pointer hover:bg-zinc-100 transition ${i % 2 === 0 ? "bg-white" : "bg-zinc-50"}`}
                    >
                      <td className="px-4 py-3 font-medium">{alumno.nombre}</td>
                      <td className="px-4 py-3">{alumno.apellidos}</td>
                      <td className="px-4 py-3 text-mygray">{alumno.dni}</td>
                      <td className="px-4 py-3">{alumno.colegio}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-zinc-100 rounded-full text-xs font-medium">
                          {alumno.nivel}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium text-white ${alumno.escuelita === "Peruanidad" ? "bg-myteal" : "bg-mygreen"}`}
                        >
                          {alumno.escuelita === "Valle_Ecologico"
                            ? "Valle Ecológico"
                            : alumno.escuelita}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-mygray">
                        {new Date(alumno.fechaMatricula).toLocaleDateString(
                          "es-PE",
                        )}
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
                  onClick={() => router.push(`/admin/alumnos/${alumno.id}`)}
                  className="bg-white rounded-xl p-4 flex flex-col gap-2 text-myzinc text-sm cursor-pointer hover:bg-zinc-50 transition"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-base">
                      {alumno.nombre} {alumno.apellidos}
                    </p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium text-white ${alumno.escuelita === "Peruanidad" ? "bg-myteal" : "bg-mygreen"}`}
                    >
                      {alumno.escuelita === "Valle_Ecologico"
                        ? "Valle Ecológico"
                        : alumno.escuelita}
                    </span>
                  </div>
                  <p className="text-mygray">DNI: {alumno.dni}</p>
                  <p>{alumno.colegio}</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-zinc-100 rounded-full text-xs font-medium">
                      {alumno.nivel}
                    </span>
                    <span className="text-mygray text-xs">
                      {new Date(alumno.fechaMatricula).toLocaleDateString(
                        "es-PE",
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pb-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 rounded bg-white text-myzinc text-sm disabled:opacity-40"
                >
                  ← Anterior
                </button>
                <span className="text-white text-sm">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 rounded bg-white text-myzinc text-sm disabled:opacity-40"
                >
                  Siguiente →
                </button>
              </div>
            )}
          </div>
        )}
      </main>

    </>
  );
}
