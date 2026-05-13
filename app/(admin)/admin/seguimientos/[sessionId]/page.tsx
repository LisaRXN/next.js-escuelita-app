"use client";

import { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import SeguimientoModal from "@/components/modals/SeguimientoModal";
import { Seguimiento } from "@/generated/prisma";
import { calificacionColor, calificacionLabel, CALIFICACIONES } from "@/lib/calificacion";

// ── types ──────────────────────────────────────────────────────────────────────

type SeguimientoWithRelations = Seguimiento & {
  alumno: { nombre: string; apellidos: string };
  volunteer: { firstName: string; lastName: string } | null;
};

type RegisteredVolunteer = {
  registrationId: number;
  clerkUserId: string;
  firstName: string;
  lastName: string;
  status: string;
};

type SessionDetail = {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
};

type Group = { key: string; escuelita: string; seguimientos: SeguimientoWithRelations[] };

// ── helpers ────────────────────────────────────────────────────────────────────

const ESCUELITA_LABEL: Record<string, string> = {
  Peruanidad: "Peruanidad",
  Valle_Ecologico: "Valle Ecológico",
};

function groupByEscuelita(seguimientos: SeguimientoWithRelations[]): Group[] {
  const map = new Map<string, Group>();
  for (const s of seguimientos) {
    if (!map.has(s.escuelita)) {
      map.set(s.escuelita, { key: s.escuelita, escuelita: s.escuelita, seguimientos: [] });
    }
    map.get(s.escuelita)!.seguimientos.push(s);
  }
  return [...map.values()];
}

// ── page ───────────────────────────────────────────────────────────────────────

export default function SeguimientosSessionPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<SeguimientoWithRelations | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const toggle = (key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["session", Number(sessionId)],
    queryFn: () => fetcher(`/api/sessions/${sessionId}`),
    enabled: !!sessionId,
  });

  const session: SessionDetail | null = data?.session ?? null;
  const registeredVolunteers: RegisteredVolunteer[] = data?.registeredVolunteers ?? [];
  const seguimientos: SeguimientoWithRelations[] = data?.seguimientos ?? [];

  const groups = groupByEscuelita(seguimientos);

  // Qui a rempli son seguimiento (par clerkUserId)
  const volunteerIdsWithSeguimiento = new Set(
    seguimientos.map((s) => s.volunteerId).filter(Boolean)
  );

  const dateObj = session ? new Date(session.date) : null;
  const day = dateObj?.toLocaleDateString("es-PE", { day: "numeric" }) ?? "";
  const month = dateObj?.toLocaleDateString("es-PE", { month: "long" }) ?? "";
  const year = dateObj?.toLocaleDateString("es-PE", { year: "numeric" }) ?? "";
  const weekday = dateObj?.toLocaleDateString("es-PE", { weekday: "long" }) ?? "";

  const calStats = CALIFICACIONES.map((cal) => ({
    cal,
    count: seguimientos.filter((s) => s.calificacion === cal).length,
  })).filter((c) => c.count > 0);

  const openEdit = (s: SeguimientoWithRelations) => {
    setSelected(s); setIsCreating(false); dialogRef.current?.showModal();
  };
  const openCreate = () => {
    setSelected(null); setIsCreating(true); dialogRef.current?.showModal();
  };
  const onClose = () => {
    setSelected(null); setIsCreating(false); dialogRef.current?.close();
    queryClient.invalidateQueries({ queryKey: ["session", Number(sessionId)] });
  };

  return (
    <>
      <main className="min-h-screen w-full pb-10">

        {/* Header */}
        <div className="px-4 md:px-10 pt-8 pb-6 border-b border-zinc-100">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-600 mb-5 transition"
          >
            <i className="fa-solid fa-arrow-left text-xs" />
            <span>Volver</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex items-end gap-5">
              {/* Bloc date */}
              <div className="flex flex-col items-center justify-center w-16 h-16 bg-myteal/10 rounded-2xl flex-shrink-0">
                <span className="text-2xl font-black text-myteal leading-none">{day}</span>
                <span className="text-[10px] font-semibold text-myteal/70 uppercase tracking-wide">{month.slice(0, 3)}</span>
              </div>
              <div>
                <p className="text-xs text-zinc-400 capitalize mb-0.5">{weekday} · {year}</p>
                <h2 className="text-2xl font-extrabold text-myzinc font-montserrat leading-tight">
                  {session?.title ?? "Sesión de tutorías"}
                </h2>
                {session?.location && (
                  <p className="text-zinc-400 text-xs mt-1 flex items-center gap-1">
                    <i className="fa-solid fa-location-dot text-[10px]" />
                    {session.location}
                  </p>
                )}
              </div>
            </div>

            {/* Stats calificación */}
            {calStats.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {calStats.map(({ cal, count }) => (
                  <div key={cal} className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-100 rounded-lg px-3 py-1.5">
                    <span className={`w-2 h-2 rounded-full ${calificacionColor[cal]}`} />
                    <span className="text-myzinc text-xs font-semibold">{count}</span>
                    <span className="text-zinc-400 text-xs">{calificacionLabel[cal]}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ══ PANEL VOLONTAIRES ══ */}
        {registeredVolunteers.length > 0 && (
          <div className="px-4 md:px-10 pt-5 pb-0">
            <div className="bg-white rounded-2xl border border-zinc-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-myzinc flex items-center gap-2">
                  <i className="fa-solid fa-users text-myteal text-xs" />
                  Voluntarios presentes
                </h3>
                <span className="text-xs text-zinc-400">
                  {volunteerIdsWithSeguimiento.size}/{registeredVolunteers.length} fichas completadas
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {registeredVolunteers.map((v) => {
                  const hasFilled = volunteerIdsWithSeguimiento.has(v.clerkUserId);
                  return (
                    <div
                      key={v.registrationId}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border ${
                        hasFilled
                          ? "bg-green-50 border-green-200 text-green-700"
                          : "bg-red-50 border-red-200 text-red-600"
                      }`}
                    >
                      <i className={`fa-solid ${hasFilled ? "fa-circle-check" : "fa-circle-xmark"} text-xs`} />
                      {v.firstName} {v.lastName}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="px-4 md:px-10 pt-5 pb-4 flex items-center justify-between gap-3">
          <p className="text-zinc-400 text-sm">
            {seguimientos.length} seguimiento{seguimientos.length !== 1 ? "s" : ""}
          </p>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 text-sm px-3.5 py-2 bg-myorange text-white font-semibold rounded-xl hover:bg-myorange/80 transition"
          >
            <i className="fa-solid fa-plus text-xs" /> Nuevo seguimiento
          </button>
        </div>

        {/* Liste */}
        <div className="px-4 md:px-10 flex flex-col gap-3">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4 py-20 text-zinc-400">
              <span className="loading loading-spinner loading-xl" />
              <p>Cargando...</p>
            </div>
          ) : groups.length === 0 ? (
            <div className="text-center py-16 text-zinc-400">
              <i className="fa-solid fa-clipboard-list text-4xl mb-3 block opacity-30" />
              <p className="text-sm">No hay seguimientos para esta sesión.</p>
            </div>
          ) : (
            groups.map((group) => {
              const isOpen = expandedKeys.has(group.key);
              return (
                <div key={group.key} className="w-full bg-white rounded-xl overflow-hidden border border-zinc-200">
                  <button
                    onClick={() => toggle(group.key)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-50 transition text-left"
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <i className={`fa-solid fa-chevron-${isOpen ? "down" : "right"} text-mygray text-xs w-3`} />
                      <span className="font-semibold text-myzinc text-sm">
                        {ESCUELITA_LABEL[group.escuelita] ?? group.escuelita}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${
                          group.escuelita === "Peruanidad" ? "bg-myteal" : "bg-mygreen"
                        }`}
                      >
                        {ESCUELITA_LABEL[group.escuelita] ?? group.escuelita}
                      </span>
                    </div>
                    <span className="text-xs text-mygray whitespace-nowrap ml-2">
                      {group.seguimientos.length} alumno{group.seguimientos.length !== 1 ? "s" : ""}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-zinc-100">
                      {/* Desktop table */}
                      <div className="hidden md:block w-full text-sm">
                        <div className="grid grid-cols-[2fr_2fr_1fr_1.5fr] bg-zinc-50 px-4 py-2 text-xs font-semibold uppercase text-zinc-500">
                          <span>Alumno</span>
                          <span>Tema</span>
                          <span>Calificación</span>
                          <span>Voluntario</span>
                        </div>
                        {group.seguimientos.map((s, i) => (
                          <div
                            key={s.id}
                            onClick={() => openEdit(s)}
                            className={`grid grid-cols-[2fr_2fr_1fr_1.5fr] px-4 py-2.5 cursor-pointer hover:bg-zinc-100 transition items-center ${
                              i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"
                            }`}
                          >
                            <span className="font-medium text-myzinc">
                              {s.alumno.nombre} {s.alumno.apellidos}
                            </span>
                            <span className="truncate text-mygray">{s.tema}</span>
                            <span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${calificacionColor[s.calificacion]}`}>
                                {calificacionLabel[s.calificacion]}
                              </span>
                            </span>
                            <span className="text-mygray text-xs">
                              {s.volunteer
                                ? `${s.volunteer.firstName} ${s.volunteer.lastName}`
                                : <span className="text-zinc-300 italic">—</span>}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Mobile cards */}
                      <div className="md:hidden flex flex-col divide-y divide-zinc-100">
                        {group.seguimientos.map((s) => (
                          <div
                            key={s.id}
                            onClick={() => openEdit(s)}
                            className="px-4 py-3 flex items-center justify-between gap-3 cursor-pointer hover:bg-zinc-50 transition"
                          >
                            <div className="flex flex-col gap-0.5 min-w-0">
                              <p className="text-sm font-medium text-myzinc">
                                {s.alumno.nombre} {s.alumno.apellidos}
                              </p>
                              <p className="text-xs text-mygray truncate">{s.tema}</p>
                              {s.volunteer && (
                                <p className="text-xs text-zinc-400">{s.volunteer.firstName} {s.volunteer.lastName}</p>
                              )}
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
            })
          )}
        </div>
      </main>

      {(isCreating || selected) && (
        <SeguimientoModal
          dialogRef={dialogRef}
          onClose={onClose}
          seguimiento={selected ?? undefined}
          sessionId={isCreating ? Number(sessionId) : undefined}
          sessionDate={session?.date}
        />
      )}
    </>
  );
}
