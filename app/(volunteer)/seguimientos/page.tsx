"use client";

import { useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import SeguimientoModal from "@/components/modals/SeguimientoModal";
import { Seguimiento } from "@/generated/prisma";

// ── types ──────────────────────────────────────────────────────────────────────

type SeguimientoWithAlumno = Seguimiento & {
  alumno: { nombre: string; apellidos: string };
};
type SessionData = { id: number; title: string; date: string; image: string; location?: string };
type Registration = { id: number; session: { id: number; date: string } };

// ── constantes ─────────────────────────────────────────────────────────────────

const ESCUELITA_LABEL: Record<string, string> = {
  Peruanidad: "Peruanidad",
  Valle_Ecologico: "Valle Ecológico",
};

// ── page ───────────────────────────────────────────────────────────────────────

function getMonthKey(date: Date) {
  return { year: date.getFullYear(), month: date.getMonth() };
}

export default function SeguimientosVolunteerPage() {
  const router = useRouter();
  const { userId } = useAuth();
  const [escuelitaFilter, setEscuelitaFilter] = useState<string>("");
  const [openSessionId, setOpenSessionId] = useState<number | null>(null);
  const [viewDate, setViewDate] = useState(() => getMonthKey(new Date()));
  const dialogRef = useRef<HTMLDialogElement>(null);

  const now = new Date();
  const isCurrentMonth = viewDate.year === now.getFullYear() && viewDate.month === now.getMonth();
  const monthLabel = new Date(viewDate.year, viewDate.month, 1)
    .toLocaleDateString("es-PE", { month: "long", year: "numeric" });

  const goToPrevMonth = () =>
    setViewDate((prev) =>
      prev.month === 0
        ? { year: prev.year - 1, month: 11 }
        : { year: prev.year, month: prev.month - 1 }
    );
  const goToNextMonth = () =>
    setViewDate((prev) =>
      prev.month === 11
        ? { year: prev.year + 1, month: 0 }
        : { year: prev.year, month: prev.month + 1 }
    );

  const { data: userData } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetcher(`/api/user/${userId}`),
    enabled: !!userId,
  });
  const { data, isLoading: loadingSegs } = useQuery({
    queryKey: ["seguimientos-v"],
    queryFn: () => fetcher("/api/seguimientos?all=true"),
  });
  const { data: sessionsData, isLoading: loadingSessions } = useQuery({
    queryKey: ["sessions"],
    queryFn: () => fetcher("/api/sessions"),
  });

  const allSeguimientos: SeguimientoWithAlumno[] = data?.data ?? [];
  const allSessions: SessionData[] = sessionsData ?? [];
  const registrations: Registration[] = userData?.registrations ?? [];

  // Sessions où le volontaire est inscrit
  const mySessionIds = useMemo(
    () => new Set(registrations.map((r) => r.session.id)),
    [registrations]
  );
  const mySessions = useMemo(
    () => allSessions.filter((s) => mySessionIds.has(s.id)),
    [allSessions, mySessionIds]
  );

  // Seguimientos groupés par sessionId
  const segsBySession = useMemo(() => {
    const map = new Map<number, SeguimientoWithAlumno[]>();
    const byDate = new Map<string, SeguimientoWithAlumno[]>();
    for (const s of allSeguimientos) {
      if (s.sessionId) {
        if (!map.has(s.sessionId)) map.set(s.sessionId, []);
        map.get(s.sessionId)!.push(s);
      } else {
        const key = new Date(s.fechaSesion).toISOString().split("T")[0];
        if (!byDate.has(key)) byDate.set(key, []);
        byDate.get(key)!.push(s);
      }
    }
    return { map, byDate };
  }, [allSeguimientos]);

  // Filtrer par mois affiché + escuelita
  const filteredSessions = useMemo(() => {
    return mySessions.filter((session) => {
      const d = new Date(session.date);
      if (d.getFullYear() !== viewDate.year || d.getMonth() !== viewDate.month) return false;
      if (!escuelitaFilter) return true;
      const segs = segsBySession.map.get(session.id) ??
        segsBySession.byDate.get(session.date.split("T")[0]) ?? [];
      return segs.some((s) => s.escuelita === escuelitaFilter);
    });
  }, [mySessions, escuelitaFilter, segsBySession, viewDate]);

  // KPIs (seguimientos de mes sessions)
  const mySeguimientos = useMemo(() => {
    const result: SeguimientoWithAlumno[] = [];
    for (const session of mySessions) {
      const segs = segsBySession.map.get(session.id) ??
        segsBySession.byDate.get(session.date.split("T")[0]) ?? [];
      result.push(...segs);
    }
    return result;
  }, [mySessions, segsBySession]);

  const total = mySeguimientos.length;
  const positiveCount = mySeguimientos.filter(
    (s) => s.calificacion === "Excelente" || s.calificacion === "Bueno"
  ).length;
  const positiveRate = total > 0 ? Math.round((positiveCount / total) * 100) : 0;
  const difficultCount = mySeguimientos.filter(
    (s) => s.calificacion === "Con_dificultad" || s.calificacion === "Con_mucha_dificultad"
  ).length;

  // Modal
  const openCreate = (sessionId: number) => {
    setOpenSessionId(sessionId);
    dialogRef.current?.showModal();
  };
  const onClose = () => {
    setOpenSessionId(null);
    dialogRef.current?.close();
  };

  const isLoading = loadingSegs || loadingSessions;

  return (
    <>
      <main className="min-h-screen w-full pb-10">

        {/* ══ HEADER DARK avec KPIs ══ */}
        <div className="bg-[#193252] px-4 md:px-8 pt-8 pb-0">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-5">
            <div>
              <h1 className="text-white text-3xl font-extrabold font-montserrat">Seguimientos</h1>
              <p className="text-white/60 text-sm mt-1">Mis sesiones de tutoría</p>
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-white/60 text-xs mb-1">Total registros</p>
              <p className="text-white text-3xl font-black">{total}</p>
            </div>
            <div className="rounded-2xl p-4" style={{ backgroundColor: "rgba(101,197,169,0.25)" }}>
              <p className="text-white/60 text-xs mb-1">Resultados positivos</p>
              <p className="text-3xl font-black" style={{ color: "#65C5A9" }}>{positiveRate}%</p>
            </div>
            <div className="rounded-2xl p-4" style={{ backgroundColor: "rgba(239,68,68,0.2)" }}>
              <p className="text-white/60 text-xs mb-1">Con dificultad</p>
              <p className="text-3xl font-black" style={{ color: "#FCA5A5" }}>{difficultCount}</p>
            </div>
          </div>

          {/* Onglet */}
          <div className="flex gap-1">
            <button className="px-4 py-2.5 text-sm font-semibold rounded-t-xl bg-zinc-50 text-myzinc">
              Seguimientos
            </button>
          </div>
        </div>

        {/* ══ SESSIONS ══ */}
        <div className="bg-zinc-50 min-h-[60vh] px-4 md:px-8 pt-6 flex flex-col gap-5">
          {/* Navigation mensuelle */}
          <div className="flex items-center gap-3">
            <button
              onClick={goToPrevMonth}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-500 hover:bg-zinc-100 transition"
            >
              <i className="fa-solid fa-chevron-left text-xs" />
            </button>
            <span className="text-sm font-semibold text-myzinc capitalize min-w-[130px] text-center">
              {monthLabel}
            </span>
            {!isCurrentMonth && (
              <button
                onClick={goToNextMonth}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-500 hover:bg-zinc-100 transition"
              >
                <i className="fa-solid fa-chevron-right text-xs" />
              </button>
            )}
            {isCurrentMonth && <div className="w-8" />}
          </div>

          {/* Filtres escuelita */}
          <div className="flex items-center gap-2 flex-wrap">
            {(["", "Peruanidad", "Valle_Ecologico"] as const).map((e) => (
              <button
                key={e || "all"}
                onClick={() => setEscuelitaFilter(e)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border transition ${
                  escuelitaFilter === e
                    ? "bg-myzinc text-white border-myzinc"
                    : "bg-transparent text-zinc-600 border-zinc-300 hover:border-zinc-500"
                }`}
              >
                {e === "" ? "Todas" : ESCUELITA_LABEL[e]}
              </button>
            ))}
          </div>

          {/* Grille */}
          {isLoading ? (
            <div className="flex flex-col items-center gap-4 py-20 text-zinc-400">
              <span className="loading loading-spinner loading-xl" />
              <p>Cargando...</p>
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="text-center py-20 text-zinc-400">
              <i className="fa-solid fa-clipboard-list text-4xl mb-3 block" />
              <p className="text-sm">No hay sesiones registradas</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredSessions.map((session) => {
                const segs = segsBySession.map.get(session.id) ??
                  segsBySession.byDate.get(session.date.split("T")[0]) ?? [];
                const hasImage = !!(session.image && session.image !== "default");
                const date = new Date(session.date);
                const day = date.toLocaleDateString("es-PE", { day: "numeric" });
                const monthYear = date.toLocaleDateString("es-PE", { month: "short", year: "numeric" });
                const weekday = date.toLocaleDateString("es-PE", { weekday: "long" });
                const hasSeguimientos = segs.length > 0;
                const cardBg = hasSeguimientos ? "#2B797C" : "#64748B";
                const overlayColor = hasSeguimientos ? "rgba(43,121,124,0.6)" : "rgba(100,116,139,0.65)";

                return (
                  <div
                    key={session.id}
                    className="relative rounded-2xl overflow-hidden min-h-[180px] flex flex-col justify-between text-left"
                  >
                    {/* Fond */}
                    <div
                      className="absolute inset-0"
                      style={hasImage
                        ? { backgroundImage: `url(${session.image})`, backgroundSize: "cover", backgroundPosition: "center" }
                        : { backgroundColor: cardBg }}
                    />
                    {hasImage && <div className="absolute inset-0" style={{ backgroundColor: overlayColor }} />}

                    {/* Zone cliquable navigue vers détail */}
                    <button
                      onClick={() => router.push(`/seguimientos/${session.id}`)}
                      className="absolute inset-0 z-10"
                      aria-label={`Ver seguimientos de la sesión ${session.title}`}
                    />

                    {/* Info */}
                    <div className="relative z-20 p-4 pointer-events-none">
                      <p className="text-white/70 text-xs capitalize mb-1">{weekday}</p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-white text-4xl font-black leading-none">{day}</span>
                        <span className="text-white/85 text-xs font-semibold uppercase">{monthYear}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="relative z-20 p-4 pointer-events-none">
                      {hasSeguimientos ? (
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold text-white self-start" style={{ backgroundColor: "rgba(0,0,0,0.25)" }}>
                          {segs.length} seg.
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: "rgba(239,68,68,0.4)" }}>
                          Pendiente
                        </span>
                      )}
                    </div>

                    {/* Bouton Nuevo */}
                    <button
                      onClick={(e) => { e.stopPropagation(); openCreate(session.id); }}
                      className="absolute top-3 right-3 z-30 w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/35 text-white transition"
                      title="Nuevo seguimiento"
                    >
                      <i className="fa-solid fa-plus text-xs" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {openSessionId !== null && (
        <SeguimientoModal
          dialogRef={dialogRef}
          onClose={onClose}
          sessionId={openSessionId}
          sessionDate={allSessions.find((s) => s.id === openSessionId)?.date}
        />
      )}
    </>
  );
}
