"use client";

import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetcher } from "@/lib/fetcher";
import { SessionWithLiders } from "@/type";
import CreateSessionModal from "@/components/modals/CreateSessionModal";
import SignUpToSessionButton from "@/components/session/SignUpToSessionButton";
import UnregisterButton from "@/components/session/UnregisterButton";
import { useUser } from "@clerk/nextjs";

// ── types ─────────────────────────────────────────────────────────────────────

type CoordinatorSession = {
  id: number;
  title: string;
  date: string;
  location: string;
  capacity: number;
  coordinators: { id: number; firstName: string; lastName: string; registrationId: number }[];
  coordinatorCount: number;
  isUserRegistered: boolean;
};

// ── constantes ────────────────────────────────────────────────────────────────

const TYPE_LABEL: Record<string, string> = { TUTORING: "Tutoría", OTHER: "Actividad" };
const TYPE_DOT: Record<string, string> = { TUTORING: "bg-myteal", OTHER: "bg-myorange" };
const TYPE_BADGE: Record<string, string> = {
  TUTORING: "bg-teal-50 text-myteal",
  OTHER: "bg-orange-50 text-myorange",
};
const WEEKDAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

// ── helpers calendrier ────────────────────────────────────────────────────────

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstWeekday(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return (day + 6) % 7;
}

// ── composant principal ───────────────────────────────────────────────────────

export default function AgendaPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useUser();
  const today = new Date();

  const [tab, setTab] = useState<"agenda" | "coordinador">("agenda");

  // ── état vue agenda ──
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // ── état vue coordinador ──
  const [coordYear, setCoordYear] = useState(today.getFullYear());
  const [coordMonth, setCoordMonth] = useState(today.getMonth());

  // ── données ──
  const { data: sessions, isLoading } = useQuery<SessionWithLiders[]>({
    queryKey: ["sessionsWithLiders"],
    queryFn: () => fetcher("/api/sessionsWithLiders"),  });

  const { data: coordSessions, isLoading: isLoadingCoord } = useQuery<CoordinatorSession[]>({
    queryKey: ["coordinator-agenda"],
    queryFn: () => fetcher("/api/sessions/coordinator-agenda"),    enabled: tab === "coordinador",
  });

  const allSessions = sessions ?? [];

  // ─────────────────────────────────────────────────────────────────────────────
  // VUE AGENDA
  // ─────────────────────────────────────────────────────────────────────────────

  const sessionsByDate = allSessions.reduce<Record<string, SessionWithLiders[]>>((acc, s) => {
    const key = s.date.split("T")[0];
    if (!acc[key]) acc[key] = [];
    acc[key].push(s);
    return acc;
  }, {});

  const monthSessions = allSessions
    .filter((s) => {
      const d = new Date(s.date);
      return d.getUTCFullYear() === year && d.getUTCMonth() === month;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1);
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1);
    setSelectedDay(null);
  };

  const monthLabel = new Date(year, month, 1).toLocaleDateString("es-PE", { month: "long", year: "numeric" });
  const totalDays = getDaysInMonth(year, month);
  const firstWeekday = getFirstWeekday(year, month);
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];
  const selectedDateKey = selectedDay
    ? `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`
    : null;
  const displayedSessions = selectedDay ? (sessionsByDate[selectedDateKey!] ?? []) : monthSessions;

  const openCreate = (day?: number) => {
    const d = day ?? today.getDate();
    setModalDate(`${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`);
    setIsModalOpen(true);
    dialogRef.current?.showModal();
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // VUE COORDINADOR
  // ─────────────────────────────────────────────────────────────────────────────

  const coordMonthLabel = new Date(coordYear, coordMonth, 1).toLocaleDateString("es-PE", {
    month: "long", year: "numeric",
  });
  const prevCoordMonth = () => {
    if (coordMonth === 0) { setCoordYear(y => y - 1); setCoordMonth(11); } else setCoordMonth(m => m - 1);
  };
  const nextCoordMonth = () => {
    if (coordMonth === 11) { setCoordYear(y => y + 1); setCoordMonth(0); } else setCoordMonth(m => m + 1);
  };

  const coordMonthSessions = (coordSessions ?? []).filter((s) => {
    const d = new Date(s.date);
    return d.getUTCFullYear() === coordYear && d.getUTCMonth() === coordMonth;
  });

  const isAdmin = user?.publicMetadata?.role === "admin" ||
    (coordSessions ?? []).some((s) => s.isUserRegistered !== undefined);

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <>
      <main className="min-h-screen w-full pb-10">
        {/* ── Header ── */}
        <div className="bg-myzinc px-4 md:px-10 pt-8 pb-0">
          <h1 className="text-white text-3xl font-extrabold font-montserrat">Agenda</h1>
          <div className="flex items-center gap-5 mt-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-myteal" />
              <span className="text-white/60 text-xs">Tutoría</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-myorange" />
              <span className="text-white/60 text-xs">Actividad</span>
            </div>
          </div>

          {/* Onglets */}
          <div className="flex gap-1">
            {(["agenda", "coordinador"] as const).map((t) => {
              const label = t === "agenda" ? "Agenda" : "Calendario Coordinador";
              const active = tab === t;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-t-xl transition ${
                    active
                      ? "bg-zinc-50 text-myzinc"
                      : "text-white/60 hover:text-white/90"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            ONGLET AGENDA
        ══════════════════════════════════════════════════════════════════════ */}
        {tab === "agenda" && (
          <>
            {/* Calendrier */}
            <div className="bg-zinc-50 border-b border-zinc-100 px-4 md:px-10 py-5">
              <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth} className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:bg-zinc-200 hover:text-myzinc transition">
                  <i className="fa-solid fa-chevron-left text-xs" />
                </button>
                <span className="text-myzinc font-bold text-sm capitalize">{monthLabel}</span>
                <button onClick={nextMonth} className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:bg-zinc-200 hover:text-myzinc transition">
                  <i className="fa-solid fa-chevron-right text-xs" />
                </button>
              </div>
              <div className="grid grid-cols-7 mb-1">
                {WEEKDAYS.map((d) => (
                  <div key={d} className="text-center text-[10px] font-bold text-zinc-400 uppercase py-1">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-1">
                {cells.map((day, i) => {
                  if (!day) return <div key={`empty-${i}`} />;
                  const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const daySessions = sessionsByDate[dateKey] ?? [];
                  const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                  const isSelected = selectedDay === day;
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(isSelected ? null : day)}
                      className="flex flex-col items-center py-1 rounded-xl transition hover:bg-zinc-200 group"
                    >
                      <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold transition ${isSelected ? "bg-myzinc text-white" : isToday ? "text-myteal font-extrabold" : "text-myzinc"}`}>
                        {day}
                      </span>
                      {daySessions.length > 0 && (
                        <div className="flex items-center gap-0.5 mt-0.5 flex-wrap justify-center max-w-[28px]">
                          {daySessions.slice(0, 3).map((s) => (
                            <span key={s.id} className={`w-1.5 h-1.5 rounded-full ${TYPE_DOT[s.type] ?? "bg-zinc-400"}`} />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Liste sessions */}
            <div className="px-4 md:px-10 pt-5">
              {isLoading ? (
                <div className="flex flex-col items-center gap-4 py-16 text-zinc-400">
                  <span className="loading loading-spinner loading-xl" />
                  <p>Cargando...</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-myzinc font-bold text-base capitalize">
                      {selectedDay
                        ? new Date(year, month, selectedDay).toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long" })
                        : `${monthLabel} · ${displayedSessions.length} sesión${displayedSessions.length !== 1 ? "es" : ""}`}
                    </p>
                    <button
                      onClick={() => openCreate(selectedDay ?? undefined)}
                      className="flex items-center gap-2 text-sm px-3.5 py-2 bg-myorange text-white font-semibold rounded-xl hover:bg-myorange/80 transition"
                    >
                      <i className="fa-solid fa-plus text-xs" /> Nueva sesión
                    </button>
                  </div>
                  {displayedSessions.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 py-12 text-zinc-400">
                      <i className="fa-regular fa-calendar text-3xl" />
                      <p className="text-sm">No hay sesiones{selectedDay ? " este día" : " este mes"}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {displayedSessions.map((s) => {
                        const d = new Date(s.date);
                        return (
                          <button key={s.id} onClick={() => router.push(`/admin/sessions/${s.id}`)}
                            className="w-full bg-white rounded-2xl px-4 py-3 flex items-center gap-4 border border-zinc-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 text-left"
                          >
                            <div className="flex flex-col items-center w-9 flex-shrink-0">
                              <span className="text-myteal font-bold text-lg leading-none">{d.getUTCDate()}</span>
                              <span className="text-zinc-400 text-[10px] capitalize">{d.toLocaleDateString("es-PE", { weekday: "short", timeZone: "UTC" })}</span>
                            </div>
                            <div className="w-px h-8 bg-zinc-100 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-myzinc font-semibold text-sm truncate">{s.title}</p>
                              <p className="text-zinc-400 text-xs mt-0.5">
                                {TYPE_LABEL[s.type]}
                                {s.liders?.length > 0 && <> · {s.liders.map((l) => l.firstName).join(", ")}</>}
                              </p>
                            </div>
                            <span className={`flex-shrink-0 text-[10px] font-semibold px-2 py-1 rounded-full ${TYPE_BADGE[s.type] ?? "bg-zinc-100 text-zinc-500"}`}>
                              {TYPE_LABEL[s.type]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            ONGLET CALENDARIO COORDINADOR
        ══════════════════════════════════════════════════════════════════════ */}
        {tab === "coordinador" && (
          <div className="px-4 md:px-10 pt-6">
            {/* Navigation mois */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevCoordMonth} className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:bg-zinc-100 hover:text-myzinc transition">
                <i className="fa-solid fa-chevron-left text-xs" />
              </button>
              <div className="text-center">
                <p className="text-myzinc font-bold text-base capitalize">{coordMonthLabel}</p>
                <p className="text-zinc-400 text-xs mt-0.5">
                  {coordMonthSessions.length} tutoría{coordMonthSessions.length !== 1 ? "s" : ""}
                </p>
              </div>
              <button onClick={nextCoordMonth} className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:bg-zinc-100 hover:text-myzinc transition">
                <i className="fa-solid fa-chevron-right text-xs" />
              </button>
            </div>

            {isLoadingCoord ? (
              <div className="flex flex-col items-center gap-4 py-16 text-zinc-400">
                <span className="loading loading-spinner loading-xl" />
                <p>Cargando...</p>
              </div>
            ) : coordMonthSessions.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-16 text-zinc-400">
                <i className="fa-regular fa-calendar text-3xl" />
                <p className="text-sm capitalize">No hay tutorías en {coordMonthLabel}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {coordMonthSessions.map((s) => {
                  const d = new Date(s.date);
                  const dateStr = d.toLocaleDateString("es-PE", {
                    weekday: "long", day: "numeric", month: "long", timeZone: "UTC",
                  });
                  const isPast = new Date(s.date) < today;
                  const hasCoords = s.coordinatorCount > 0;

                  return (
                    <div
                      key={s.id}
                      className={`bg-white rounded-2xl border overflow-hidden transition-all ${
                        s.isUserRegistered ? "border-myteal shadow-sm shadow-teal-100" : "border-zinc-100"
                      } ${isPast ? "opacity-60" : ""}`}
                    >
                      {/* En-tête de la card */}
                      <div className="flex items-start gap-4 p-4">
                        {/* Bloc date */}
                        <div className="flex flex-col items-center justify-center w-14 h-14 bg-myteal/10 rounded-xl flex-shrink-0">
                          <span className="text-2xl font-black text-myteal leading-none">{d.getUTCDate()}</span>
                          <span className="text-[10px] font-semibold text-myteal/70 uppercase tracking-wide">
                            {d.toLocaleDateString("es-PE", { month: "short", timeZone: "UTC" })}
                          </span>
                        </div>

                        {/* Infos session */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-myzinc font-bold text-sm capitalize">{dateStr}</p>
                              <p className="text-zinc-500 text-sm truncate mt-0.5">{s.title}</p>
                              {s.location && (
                                <p className="text-zinc-400 text-xs mt-1 flex items-center gap-1">
                                  <i className="fa-solid fa-location-dot text-[10px]" />
                                  {s.location}
                                </p>
                              )}
                            </div>
                            {/* Badge coordinateurs */}
                            <div className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl ${hasCoords ? "bg-myteal/10" : "bg-zinc-100"}`}>
                              <i className={`fa-solid fa-user-check text-xs ${hasCoords ? "text-myteal" : "text-zinc-400"}`} />
                              <span className={`text-xs font-bold ${hasCoords ? "text-myteal" : "text-zinc-400"}`}>
                                {s.coordinatorCount}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Liste des coordinateurs */}
                      {s.coordinatorCount > 0 && (
                        <div className="px-4 pb-3 flex flex-wrap gap-2">
                          {s.coordinators.map((c) => (
                            <span
                              key={c.id}
                              className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-100 rounded-full px-2.5 py-1"
                            >
                              <span className="w-5 h-5 rounded-full bg-myteal/15 text-myteal text-[9px] font-bold flex items-center justify-center flex-shrink-0">
                                {c.firstName[0]}{c.lastName[0]}
                              </span>
                              <span className="text-zinc-600 text-xs font-medium">
                                {c.firstName} {c.lastName}
                              </span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Bouton inscription */}
                      {!isPast && (
                        <div className={`px-4 pb-4 pt-2 flex items-center justify-end gap-2 border-t ${s.isUserRegistered ? "border-teal-100" : "border-zinc-100"}`}>
                          {s.isUserRegistered ? (
                            <>
                              <span className="flex items-center gap-1.5 text-myteal text-xs font-semibold flex-1">
                                <i className="fa-solid fa-circle-check" /> Inscrito/a
                              </span>
                              <UnregisterButton sessionId={s.id} isReduce isAdmin />
                            </>
                          ) : (
                            <SignUpToSessionButton sessionId={s.id} compact />
                          )}
                        </div>
                      )}

                      {isPast && (
                        <div className="px-4 pb-4 pt-1 border-t border-zinc-100">
                          <span className="text-zinc-400 text-xs">Sesión pasada</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {isModalOpen && (
        <CreateSessionModal
          date={modalDate}
          dialogRef={dialogRef}
          handleCloseModal={() => {
            setIsModalOpen(false);
            dialogRef.current?.close();
            queryClient.invalidateQueries({ queryKey: ["sessionsWithLiders"] });
          }}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}
