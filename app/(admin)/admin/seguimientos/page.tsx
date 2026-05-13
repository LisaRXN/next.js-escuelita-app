"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import SeguimientoModal from "@/components/modals/SeguimientoModal";
import { Seguimiento } from "@/generated/prisma";
import { calificacionLabel, CALIFICACIONES } from "@/lib/calificacion";

// ── types ────────────────────────────────────────────────────────────────────

type SeguimientoWithAlumno = Seguimiento & {
  alumno: { nombre: string; apellidos: string };
};
type SessionData = {
  id: number;
  title: string;
  date: string;
  image: string;
  location?: string;
};
type StatItem = { calificacion: string; _count: { calificacion: number } };

// ── constantes ────────────────────────────────────────────────────────────────

const ESCUELITA_LABEL: Record<string, string> = {
  Peruanidad: "Peruanidad",
  Valle_Ecologico: "Valle Ecológico",
};

const CAL_COLORS: Record<string, { bg: string; bar: string; text: string }> = {
  Excelente:            { bg: "#F0FDF4", bar: "#16A34A", text: "#15803D" },
  Bueno:                { bg: "#ECFDF5", bar: "#10B981", text: "#059669" },
  Regular:              { bg: "#FFFBEB", bar: "#F59E0B", text: "#D97706" },
  Con_dificultad:       { bg: "#FFF7ED", bar: "#F97316", text: "#EA580C" },
  Con_mucha_dificultad: { bg: "#FEF2F2", bar: "#EF4444", text: "#DC2626" },
};

// ── page ──────────────────────────────────────────────────────────────────────

function getMonthKey(date: Date) {
  return { year: date.getFullYear(), month: date.getMonth() };
}

export default function SeguimientosPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"seguimientos" | "estadisticas">("seguimientos");
  const [escuelitaFilter, setEscuelitaFilter] = useState<string>("");
  const [selectedSeguimiento, setSelectedSeguimiento] = useState<SeguimientoWithAlumno | null>(null);
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

  // ── données ──
  const { data, isLoading: loadingSegs } = useQuery({
    queryKey: ["seguimientos"],
    queryFn: () => fetcher(`/api/seguimientos?all=true`),
  });
  const { data: peruanidadData } = useQuery({
    queryKey: ["seguimientos-peruanidad"],
    queryFn: () => fetcher(`/api/seguimientos?all=true&escuelita=Peruanidad`),
    enabled: tab === "estadisticas",
  });
  const { data: valleData } = useQuery({
    queryKey: ["seguimientos-valle"],
    queryFn: () => fetcher(`/api/seguimientos?all=true&escuelita=Valle_Ecologico`),
    enabled: tab === "estadisticas",
  });
  const { data: sessionsData, isLoading: loadingSessions } = useQuery({
    queryKey: ["sessions"],
    queryFn: () => fetcher(`/api/sessions`),
  });

  const seguimientos: SeguimientoWithAlumno[] = data?.data ?? [];
  const total: number = data?.total ?? 0;
  const stats: StatItem[] = data?.statsByCalificacion ?? [];
  const sessions: SessionData[] = sessionsData ?? [];

  // KPIs
  const positiveCount = stats
    .filter((s) => s.calificacion === "Excelente" || s.calificacion === "Bueno")
    .reduce((acc, s) => acc + s._count.calificacion, 0);
  const positiveRate = total > 0 ? Math.round((positiveCount / total) * 100) : 0;
  const difficultCount = stats
    .filter((s) => s.calificacion === "Con_dificultad" || s.calificacion === "Con_mucha_dificultad")
    .reduce((acc, s) => acc + s._count.calificacion, 0);

  // Compter les seguimientos par session (par sessionId ou par date si pas de sessionId)
  const segsBySession = new Map<number, SeguimientoWithAlumno[]>();
  const segsByDate = new Map<string, SeguimientoWithAlumno[]>();
  for (const s of seguimientos) {
    if (s.sessionId) {
      if (!segsBySession.has(s.sessionId)) segsBySession.set(s.sessionId, []);
      segsBySession.get(s.sessionId)!.push(s);
    } else {
      const dateKey = new Date(s.fechaSesion).toISOString().split("T")[0];
      if (!segsByDate.has(dateKey)) segsByDate.set(dateKey, []);
      segsByDate.get(dateKey)!.push(s);
    }
  }

  // Filtrer les sessions par mois affiché + escuelita
  const filteredSessions = sessions.filter((session) => {
    const d = new Date(session.date);
    if (d.getFullYear() !== viewDate.year || d.getMonth() !== viewDate.month) return false;
    if (!escuelitaFilter) return true;
    const segs = segsBySession.get(session.id) ??
      segsByDate.get(session.date.split("T")[0]) ?? [];
    return segs.some((s) => s.escuelita === escuelitaFilter);
  });

  // Stats par escuelita
  const escuelitaStats = [
    { key: "Peruanidad", total: peruanidadData?.total ?? 0, stats: (peruanidadData?.statsByCalificacion ?? []) as StatItem[] },
    { key: "Valle_Ecologico", total: valleData?.total ?? 0, stats: (valleData?.statsByCalificacion ?? []) as StatItem[] },
  ];

  const topCal = stats.length > 0
    ? [...stats].sort((a, b) => b._count.calificacion - a._count.calificacion)[0]
    : null;

  // Modal
  const openCreate = (sessionId: number) => {
    setSelectedSeguimiento(null);
    setOpenSessionId(sessionId);
    dialogRef.current?.showModal();
  };
  const onClose = () => {
    setSelectedSeguimiento(null);
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
              <p className="text-white/60 text-sm mt-1">Estadísticas globales</p>
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

          {/* Onglets */}
          <div className="flex gap-1">
            {(["seguimientos", "estadisticas"] as const).map((t) => {
              const label = t === "seguimientos" ? "Seguimientos" : "Estadísticas";
              const active = tab === t;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-t-xl transition ${
                    active ? "bg-zinc-50 text-myzinc" : "text-white/60 hover:text-white/90"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ══ ONGLET SEGUIMIENTOS ══ */}
        {tab === "seguimientos" && (
          <div className="px-4 md:px-8 pt-6 flex flex-col gap-5">
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

            {/* Grille de sessions */}
            {isLoading ? (
              <div className="flex flex-col items-center gap-4 py-20 text-zinc-400">
                <span className="loading loading-spinner loading-xl" />
                <p>Cargando...</p>
              </div>
            ) : filteredSessions.length === 0 ? (
              <p className="text-zinc-500 text-lg py-10">No hay sesiones registradas.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredSessions.map((session) => {
                  const segs = segsBySession.get(session.id) ??
                    segsByDate.get(session.date.split("T")[0]) ?? [];
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

                      {/* Contenu cliquable (navigue vers détail) */}
                      <button
                        onClick={() => router.push(`/admin/seguimientos/${session.id}`)}
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
                      <div className="relative z-20 p-4 flex flex-col gap-1.5 pointer-events-none">
                        {hasSeguimientos ? (
                          <span className="px-2.5 py-1 rounded-lg text-xs font-bold text-white self-start" style={{ backgroundColor: "rgba(0,0,0,0.25)" }}>
                            {segs.length} seg.
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-lg text-xs font-bold text-white self-start" style={{ backgroundColor: "rgba(239,68,68,0.4)" }}>
                            Sin seguimientos
                          </span>
                        )}
                      </div>

                      {/* Bouton Nuevo (z-index au-dessus du bouton nav) */}
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
        )}

        {/* ══ ONGLET ESTADÍSTICAS ══ */}
        {tab === "estadisticas" && (
          <div className="px-4 md:px-8 pt-6 flex flex-col gap-5 max-w-4xl">

            {/* Distribución por calificación */}
            <div className="bg-white rounded-2xl border border-zinc-100 p-5">
              <h2 className="font-bold text-myzinc text-base mb-5">Distribución por calificación</h2>
              <div className="flex flex-col gap-4">
                {CALIFICACIONES.map((cal) => {
                  const stat = stats.find((s) => s.calificacion === cal);
                  const count = stat?._count.calificacion ?? 0;
                  const pct = total > 0 ? (count / total) * 100 : 0;
                  const colors = CAL_COLORS[cal];
                  return (
                    <div key={cal}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-semibold text-zinc-600">{calificacionLabel[cal]}</span>
                        <span className="text-sm font-bold" style={{ color: colors.text }}>
                          {count} <span className="font-normal text-zinc-400">({Math.round(pct)}%)</span>
                        </span>
                      </div>
                      <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: colors.bar }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Par escuelita */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {escuelitaStats.map(({ key, total: t, stats: s }) => {
                const pos = s
                  .filter((x) => x.calificacion === "Excelente" || x.calificacion === "Bueno")
                  .reduce((acc, x) => acc + x._count.calificacion, 0);
                const rate = t > 0 ? Math.round((pos / t) * 100) : 0;
                const isPeruanidad = key === "Peruanidad";
                const accentBg = isPeruanidad ? "#EEF2FF" : "#F0FDF4";
                const accentColor = isPeruanidad ? "#4F46E5" : "#16A34A";
                return (
                  <div key={key} className="bg-white rounded-2xl border border-zinc-100 p-5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                      style={{ backgroundColor: accentBg }}
                    >
                      <i className="fa-solid fa-school text-sm" style={{ color: accentColor }} />
                    </div>
                    <p className="text-xs font-semibold text-zinc-400 mb-1">{ESCUELITA_LABEL[key]}</p>
                    <p className="text-3xl font-black text-myzinc">{t}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">registros</p>
                    <div className="mt-3 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${rate}%`, backgroundColor: accentColor }}
                      />
                    </div>
                    <p className="text-xs text-zinc-400 mt-1.5">{rate}% positivos</p>
                  </div>
                );
              })}
            </div>

            {/* Top calificación */}
            {topCal && (() => {
              const colors = CAL_COLORS[topCal.calificacion] ?? CAL_COLORS["Regular"];
              const pct = total > 0 ? Math.round((topCal._count.calificacion / total) * 100) : 0;
              return (
                <div
                  className="rounded-2xl p-5 flex items-center gap-4 border"
                  style={{ backgroundColor: colors.bg, borderColor: colors.bar + "40" }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: colors.bar + "25" }}
                  >
                    <i className="fa-solid fa-arrow-trend-up text-xl" style={{ color: colors.bar }} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 mb-0.5">Calificación más frecuente</p>
                    <p className="text-lg font-extrabold" style={{ color: colors.text }}>
                      {calificacionLabel[topCal.calificacion]}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {topCal._count.calificacion} registros · {pct}% del total
                    </p>
                  </div>
                </div>
              );
            })()}

          </div>
        )}
      </main>

      {(selectedSeguimiento || openSessionId !== null) && (
        <SeguimientoModal
          dialogRef={dialogRef}
          onClose={onClose}
          seguimiento={selectedSeguimiento ?? undefined}
          sessionId={openSessionId ?? undefined}
          sessionDate={openSessionId !== null
            ? sessions.find((s) => s.id === openSessionId)?.date
            : undefined}
        />
      )}
    </>
  );
}
