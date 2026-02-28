"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import SeguimientoModal from "@/components/modals/SeguimientoModal";
import { Seguimiento } from "@/generated/prisma";
import { calificacionColor, calificacionLabel, CALIFICACIONES } from "@/lib/calificacion";

type SeguimientoWithAlumno = Seguimiento & {
  alumno: { nombre: string; apellidos: string };
};

type Group = {
  key: string;
  fechaSesion: string;
  escuelita: "Peruanidad" | "Valle_Ecologico";
  seguimientos: SeguimientoWithAlumno[];
};

function groupSeguimientos(seguimientos: SeguimientoWithAlumno[]): Group[] {
  const map = new Map<string, Group>();
  for (const s of seguimientos) {
    const dateKey = new Date(s.fechaSesion).toISOString().split("T")[0];
    const key = `${dateKey}_${s.escuelita}`;
    if (!map.has(key)) {
      map.set(key, { key, fechaSesion: dateKey, escuelita: s.escuelita as "Peruanidad" | "Valle_Ecologico", seguimientos: [] });
    }
    map.get(key)!.seguimientos.push(s);
  }
  return [...map.values()].sort((a, b) => b.fechaSesion.localeCompare(a.fechaSesion));
}

export default function SeguimientosVolunteerPage() {
  const [search, setSearch] = useState("");
  const [escuelita, setEscuelita] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => { setExpandedKeys(new Set()); }, [search, escuelita, calificacion]);

  const toggle = (key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const params = new URLSearchParams({ all: "true" });
  if (search) params.set("search", search);
  if (escuelita) params.set("escuelita", escuelita);
  if (calificacion) params.set("calificacion", calificacion);

  const { data, isLoading } = useQuery({
    queryKey: ["seguimientos-v", search, escuelita, calificacion],
    queryFn: () => fetcher(`/api/seguimientos?${params.toString()}`),
  });

  const seguimientos: SeguimientoWithAlumno[] = data?.data ?? [];
  const total: number = data?.total ?? 0;
  const stats: { calificacion: string; _count: { calificacion: number } }[] = data?.statsByCalificacion ?? [];
  const groups = groupSeguimientos(seguimientos);

  return (
    <>
      <main className="px-2 md:px-8 pt-10 flex flex-col gap-6 items-center min-h-screen m-auto w-full pb-10">
        {/* Header */}
        <div className="w-full flex flex-col gap-3 md:flex-row items-center justify-between">
          <h1 className="text-[30px] md:text-[40px] font-bold font-montserrat text-white">
            Seguimientos <span className="md:text-[30px] ml-2">📋</span>
          </h1>
          <button
            onClick={() => { setShowModal(true); dialogRef.current?.showModal(); }}
            className="text-sm px-4 py-2.5 bg-myorange text-white font-semibold rounded-md hover:bg-myorange/80 transition"
          >
            + Nuevo seguimiento
          </button>
        </div>

        {/* Stats */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="col-span-2 md:col-span-3 lg:col-span-1 bg-white/10 rounded-xl p-4 text-white flex flex-col gap-1">
            <p className="text-3xl font-bold">{total}</p>
            <p className="text-sm opacity-80">Total sesiones</p>
          </div>
          {CALIFICACIONES.map((cal) => {
            const stat = stats.find((s) => s.calificacion === cal);
            const count = stat?._count?.calificacion ?? 0;
            return (
              <div key={cal} className="bg-white/10 rounded-xl p-4 text-white flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${calificacionColor[cal]}`} />
                  <p className="text-2xl font-bold">{count}</p>
                </div>
                <p className="text-xs opacity-80">{calificacionLabel[cal]}</p>
              </div>
            );
          })}
        </div>

        {/* Filtros */}
        <div className="w-full flex flex-col lg:flex-row gap-3">
          <div className="flex items-center h-[50px] flex-1 bg-zinc-50 rounded-full justify-between p-2 text-sm">
            <input
              className="appearance-none bg-zinc-50 p-3 rounded-full w-full border-none focus:outline-none"
              placeholder="Buscar por alumno o tema..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="min-w-[40px] min-h-[40px] rounded-full bg-myorange">
              <i className="fa-solid fa-magnifying-glass text-white"></i>
            </button>
          </div>
          <div className="flex-1 lg:flex-none min-h-[50px] text-white border border-white hover:border-zinc-100 transition rounded-xl flex items-center justify-center gap-2 px-5">
            <i className="fa-solid fa-school text-white"></i>
            <select value={escuelita} onChange={(e) => setEscuelita(e.target.value)} className="custom-select">
              <option value="">Todas las escuelitas</option>
              <option value="Peruanidad">Peruanidad</option>
              <option value="Valle_Ecologico">Valle Ecológico</option>
            </select>
          </div>
          <div className="flex-1 lg:flex-none min-h-[50px] text-white border border-white hover:border-zinc-100 transition rounded-xl flex items-center justify-center gap-2 px-5">
            <i className="fa-solid fa-star text-white"></i>
            <select value={calificacion} onChange={(e) => setCalificacion(e.target.value)} className="custom-select">
              <option value="">Todas las calificaciones</option>
              {CALIFICACIONES.map((cal) => (
                <option key={cal} value={cal}>{calificacionLabel[cal]}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Liste groupée — lecture seule */}
        {isLoading ? (
          <div className="text-center p-20 flex flex-col items-center gap-4 text-mylightgray">
            <span className="loading loading-spinner loading-xl"></span>
            <p>Cargando...</p>
          </div>
        ) : groups.length === 0 ? (
          <p className="text-white text-lg py-10">No se encontraron seguimientos.</p>
        ) : (
          <div className="w-full flex flex-col gap-3">
            {groups.map((group) => {
              const isOpen = expandedKeys.has(group.key);
              const dateLabel = new Date(group.fechaSesion + "T12:00:00").toLocaleDateString("es-PE", {
                weekday: "long", day: "numeric", month: "long", year: "numeric",
              });
              return (
                <div key={group.key} className="w-full bg-white rounded-xl overflow-hidden border border-zinc-200">
                  <button
                    onClick={() => toggle(group.key)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-50 transition text-left"
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <i className={`fa-solid fa-chevron-${isOpen ? "down" : "right"} text-mygray text-xs w-3`}></i>
                      <span className="font-semibold text-myzinc capitalize text-sm">{dateLabel}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${group.escuelita === "Peruanidad" ? "bg-myteal" : "bg-mygreen"}`}>
                        {group.escuelita === "Valle_Ecologico" ? "Valle Ecológico" : group.escuelita}
                      </span>
                    </div>
                    <span className="text-xs text-mygray whitespace-nowrap ml-2">
                      {group.seguimientos.length} alumno{group.seguimientos.length !== 1 ? "s" : ""}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-zinc-100">
                      {/* Desktop */}
                      <div className="hidden md:block w-full text-sm">
                        <div className="grid grid-cols-[2fr_2fr_1fr_2fr] bg-zinc-50 px-4 py-2 text-xs font-semibold uppercase text-zinc-500">
                          <span>Alumno</span>
                          <span>Tema</span>
                          <span>Calificación</span>
                          <span>Observación</span>
                        </div>
                        {group.seguimientos.map((s, i) => (
                          <div
                            key={s.id}
                            className={`grid grid-cols-[2fr_2fr_1fr_2fr] px-4 py-2.5 items-center ${i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"}`}
                          >
                            <span className="font-medium text-myzinc">{s.alumno.nombre} {s.alumno.apellidos}</span>
                            <span className="truncate text-mygray">{s.tema}</span>
                            <span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${calificacionColor[s.calificacion]}`}>
                                {calificacionLabel[s.calificacion]}
                              </span>
                            </span>
                            <span className="truncate text-mygray text-xs">{s.observacion || "—"}</span>
                          </div>
                        ))}
                      </div>

                      {/* Mobile */}
                      <div className="md:hidden flex flex-col divide-y divide-zinc-100">
                        {group.seguimientos.map((s) => (
                          <div key={s.id} className="px-4 py-3 flex items-center justify-between gap-3">
                            <div className="flex flex-col gap-0.5 min-w-0">
                              <p className="text-sm font-medium text-myzinc">{s.alumno.nombre} {s.alumno.apellidos}</p>
                              <p className="text-xs text-mygray truncate">{s.tema}</p>
                            </div>
                            <span className={`shrink-0 px-2 py-1 rounded-full text-xs font-medium text-white ${calificacionColor[s.calificacion]}`}>
                              {calificacionLabel[s.calificacion]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {showModal && (
        <SeguimientoModal
          dialogRef={dialogRef}
          onClose={() => { setShowModal(false); dialogRef.current?.close(); }}
        />
      )}
    </>
  );
}
