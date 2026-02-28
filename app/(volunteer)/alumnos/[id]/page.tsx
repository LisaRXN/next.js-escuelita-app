"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { Alumno, Seguimiento } from "@/generated/prisma";
import { calificacionColor, calificacionLabel, CALIFICACIONES } from "@/lib/calificacion";
import { useRef, useState } from "react";
import Link from "next/link";
import SeguimientoModal from "@/components/modals/SeguimientoModal";

type SeguimientoWithAlumno = Seguimiento & {
  alumno: { nombre: string; apellidos: string };
};

export default function AlumnoDetailVolunteerPage() {
  const { id } = useParams<{ id: string }>();

  const seguimientoDialogRef = useRef<HTMLDialogElement>(null);
  const [showSeguimientoModal, setShowSeguimientoModal] = useState(false);

  const { data: alumnoData, isLoading } = useQuery({
    queryKey: ["alumno-v", id],
    queryFn: () => fetcher(`/api/alumnos/${id}`),
  });

  const { data: seguimientosData } = useQuery({
    queryKey: ["seguimientos-alumno-v", parseInt(id)],
    queryFn: () => fetcher(`/api/seguimientos?alumnoId=${id}&all=true`),
    enabled: !!id,
  });

  const alumno: Alumno | undefined = alumnoData?.data;
  const seguimientos: SeguimientoWithAlumno[] = seguimientosData?.data ?? [];

  const total = seguimientos.length;
  const lastSession = seguimientos[0];
  const byCalificacion: Record<string, number> = {};
  for (const s of seguimientos) {
    byCalificacion[s.calificacion] = (byCalificacion[s.calificacion] ?? 0) + 1;
  }
  const mostFrequent = Object.entries(byCalificacion).sort((a, b) => b[1] - a[1])[0]?.[0];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-xl text-white"></span>
      </div>
    );
  }

  if (!alumno) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-white text-lg">Alumno no encontrado.</p>
        <Link href="/alumnos" className="text-sm text-white/70 hover:text-white underline">Volver a la lista</Link>
      </div>
    );
  }

  const initials = `${alumno.nombre[0]}${alumno.apellidos[0]}`.toUpperCase();

  return (
    <>
      <main className="px-2 md:px-8 pt-10 pb-16 max-w-4xl mx-auto w-full">

        <Link href="/alumnos" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition">
          <i className="fa-solid fa-arrow-left text-xs"></i>
          Volver a la lista
        </Link>

        {/* Hero */}
        <div className="bg-white rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-full bg-myorange flex items-center justify-center text-white text-xl font-bold shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-myzinc">{alumno.nombre} {alumno.apellidos}</h1>
            <div className="flex items-center gap-2 mt-1 flex-wrap text-sm text-mygray">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${alumno.escuelita === "Peruanidad" ? "bg-myteal" : "bg-mygreen"}`}>
                {alumno.escuelita === "Valle_Ecologico" ? "Valle Ecológico" : alumno.escuelita}
              </span>
              <span>{alumno.nivel}</span>
              <span className="text-zinc-300">·</span>
              <span className="truncate">{alumno.colegio}</span>
            </div>
          </div>
        </div>

        {/* Grid: Info + Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div className="bg-white rounded-2xl p-5">
            <h2 className="text-xs font-semibold text-mygray uppercase tracking-widest mb-4">Información personal</h2>
            <dl className="flex flex-col gap-3 text-sm">
              {[
                { label: "Sexo", value: alumno.sexo === "M" ? "Masculino" : "Femenino" },
                { label: "Fecha de nacimiento", value: new Date(alumno.fechaNacimiento).toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" }) },
                { label: "Fecha de matrícula", value: new Date(alumno.fechaMatricula).toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" }) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-1.5 border-b border-zinc-50 last:border-0">
                  <dt className="text-mygray">{label}</dt>
                  <dd className="font-medium text-myzinc">{String(value)}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-4 flex flex-col gap-1">
                <p className="text-3xl font-bold text-myzinc">{total}</p>
                <p className="text-xs text-mygray">Sesiones totales</p>
              </div>
              <div className="bg-white rounded-2xl p-4 flex flex-col gap-1 justify-center">
                {mostFrequent ? (
                  <>
                    <span className={`self-start px-2 py-1 rounded-full text-xs font-medium text-white ${calificacionColor[mostFrequent]}`}>
                      {calificacionLabel[mostFrequent]}
                    </span>
                    <p className="text-xs text-mygray mt-1">Calificación más frecuente</p>
                  </>
                ) : (
                  <p className="text-xs text-mygray">Sin sesiones aún</p>
                )}
              </div>
            </div>
            {lastSession && (
              <div className="bg-white rounded-2xl p-4">
                <p className="text-xs text-mygray uppercase font-semibold tracking-wider mb-2">Última sesión</p>
                <p className="text-sm font-medium text-myzinc truncate">{lastSession.tema}</p>
                <p className="text-xs text-mygray mt-0.5">
                  {new Date(lastSession.fechaSesion).toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Distribution */}
        {total > 0 && (
          <div className="bg-white rounded-2xl p-5 mb-5">
            <h2 className="text-xs font-semibold text-mygray uppercase tracking-widest mb-4">Distribución de calificaciones</h2>
            <div className="flex flex-col gap-3">
              {CALIFICACIONES.map((cal) => {
                const count = byCalificacion[cal] ?? 0;
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={cal} className="flex items-center gap-3">
                    <span className="text-xs text-mygray w-32 shrink-0">{calificacionLabel[cal]}</span>
                    <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${calificacionColor[cal]}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-mygray w-16 text-right shrink-0">
                      {count} <span className="text-zinc-300">({pct}%)</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Historial — lecture seule */}
        <div className="bg-white rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold text-mygray uppercase tracking-widest">
              Historial de sesiones <span className="font-normal text-zinc-400">({total})</span>
            </h2>
            <button
              onClick={() => { setShowSeguimientoModal(true); seguimientoDialogRef.current?.showModal(); }}
              className="text-sm px-3 py-1.5 bg-myorange text-white rounded-lg hover:bg-myorange/80 transition"
            >
              + Nuevo
            </button>
          </div>

          {seguimientos.length === 0 ? (
            <p className="text-mygray text-sm text-center py-8">Sin seguimientos aún.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {seguimientos.map((s) => (
                <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-myzinc truncate">{s.tema}</p>
                    <p className="text-xs text-mygray mt-0.5">
                      {new Date(s.fechaSesion).toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                  <span className={`shrink-0 px-2 py-1 rounded-full text-xs font-medium text-white ${calificacionColor[s.calificacion]}`}>
                    {calificacionLabel[s.calificacion]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {showSeguimientoModal && (
        <SeguimientoModal
          dialogRef={seguimientoDialogRef}
          defaultAlumnoId={alumno.id}
          defaultEscuelita={alumno.escuelita as "Peruanidad" | "Valle_Ecologico"}
          onClose={() => { setShowSeguimientoModal(false); seguimientoDialogRef.current?.close(); }}
        />
      )}
    </>
  );
}
