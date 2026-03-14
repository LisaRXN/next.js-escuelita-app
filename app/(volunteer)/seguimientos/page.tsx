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
type Registration = { id: number; session: { date: string } };

// ── helpers ────────────────────────────────────────────────────────────────────

function groupByDate(seguimientos: SeguimientoWithAlumno[]) {
  const map = new Map<string, SeguimientoWithAlumno[]>();
  for (const s of seguimientos) {
    const key = new Date(s.fechaSesion).toISOString().split("T")[0];
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(s);
  }
  return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
}

function matchSession(dateKey: string, sessions: SessionData[]) {
  return sessions.find((s) => s.date.split("T")[0] === dateKey);
}

// ── constantes ─────────────────────────────────────────────────────────────────

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

// ── page ───────────────────────────────────────────────────────────────────────

export default function SeguimientosVolunteerPage() {
  const router = useRouter();
  const { userId } = useAuth();
  const [escuelitaFilter, setEscuelitaFilter] = useState<string>("");
  const [isCreating, setIsCreating] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Données
  const { data: userData } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetcher(`/api/user/${userId}`),
    enabled: !!userId,
  });
  const { data, isLoading } = useQuery({
    queryKey: ["seguimientos-v"],
    queryFn: () => fetcher("/api/seguimientos?all=true"),
  });
  const { data: sessionsData } = useQuery({
    queryKey: ["sessions"],
    queryFn: () => fetcher("/api/sessions"),
  });

  const allSeguimientos: SeguimientoWithAlumno[] = data?.data ?? [];
  const sessions: SessionData[] = sessionsData ?? [];
  const registrations: Registration[] = userData?.registrations ?? [];

  // Filtrer : uniquement les dates où le volunteer est inscrit
  const myDates = useMemo(() => {
    return new Set(registrations.map((r) => r.session.date.split("T")[0]));
  }, [registrations]);

  const mySeguimientos = useMemo(() => {
    return allSeguimientos.filter((s) => myDates.has(new Date(s.fechaSesion).toISOString().split("T")[0]));
  }, [allSeguimientos, myDates]);

  // Groupes par date filtrés
  const allGroups = useMemo(() => groupByDate(mySeguimientos), [mySeguimientos]);
  const groups = escuelitaFilter
    ? allGroups.filter(([, segs]) => segs.some((s) => s.escuelita === escuelitaFilter))
    : allGroups;

  // KPIs calculés côté client depuis les données filtrées
  const total = mySeguimientos.length;
  const positiveCount = mySeguimientos.filter(
    (s) => s.calificacion === "Excelente" || s.calificacion === "Bueno"
  ).length;
  const positiveRate = total > 0 ? Math.round((positiveCount / total) * 100) : 0;
  const difficultCount = mySeguimientos.filter(
    (s) => s.calificacion === "Con_dificultad" || s.calificacion === "Con_mucha_dificultad"
  ).length;

  // Modal
  const openCreate = () => { setIsCreating(true); dialogRef.current?.showModal(); };
  const onClose = () => { setIsCreating(false); dialogRef.current?.close(); };

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
            <button
              onClick={openCreate}
              className="flex items-center gap-2 text-sm px-4 py-2.5 bg-myorange text-white font-semibold rounded-xl hover:bg-myorange/80 transition self-start sm:self-auto"
            >
              <i className="fa-solid fa-plus" /> Nuevo seguimiento
            </button>
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

        {/* ══ SEGUIMIENTOS ══ */}
        <div className="bg-zinc-50 min-h-[60vh] px-4 md:px-8 pt-6 flex flex-col gap-5">
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
            ) : groups.length === 0 ? (
              <div className="text-center py-20 text-zinc-400">
                <i className="fa-solid fa-clipboard-list text-4xl mb-3 block" />
                <p className="text-sm">No hay seguimientos registrados</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {groups.map(([dateKey, segs]) => {
                  const session = matchSession(dateKey, sessions);
                  const hasImage = !!(session?.image && session.image !== "default");
                  const date = new Date(dateKey + "T12:00:00");
                  const day = date.toLocaleDateString("es-PE", { day: "numeric" });
                  const monthYear = date.toLocaleDateString("es-PE", { month: "short", year: "numeric" });
                  const weekday = date.toLocaleDateString("es-PE", { weekday: "long" });
                  const escuelitas = [...new Set(segs.map((s) => s.escuelita))];
                  const onlyPeruanidad = escuelitas.every((e) => e === "Peruanidad");
                  const cardBg = onlyPeruanidad ? "#FA9F07" : "#2B797C";
                  const overlayColor = onlyPeruanidad ? "rgba(250,159,7,0.6)" : "rgba(43,121,124,0.6)";
                  return (
                    <button
                      key={dateKey}
                      onClick={() => router.push(`/seguimientos/${dateKey}`)}
                      className="relative rounded-2xl overflow-hidden min-h-[180px] flex flex-col justify-between p-4 text-left hover:-translate-y-0.5 transition-transform duration-150"
                      style={hasImage
                        ? { backgroundImage: `url(${session!.image})`, backgroundSize: "cover", backgroundPosition: "center" }
                        : { backgroundColor: cardBg }}
                    >
                      {hasImage && <div className="absolute inset-0" style={{ backgroundColor: overlayColor }} />}
                      <div className="relative">
                        <p className="text-white/70 text-xs capitalize mb-1">{weekday}</p>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-white text-4xl font-black leading-none">{day}</span>
                          <span className="text-white/85 text-xs font-semibold uppercase">{monthYear}</span>
                        </div>
                      </div>
                      <div className="relative flex flex-col gap-1.5">
                        <div className="flex flex-wrap gap-1">
                          {escuelitas.map((e) => (
                            <span key={e} className="px-2 py-0.5 rounded-md text-xs font-semibold text-white" style={{ backgroundColor: "rgba(255,255,255,0.22)" }}>
                              {ESCUELITA_LABEL[e]}
                            </span>
                          ))}
                        </div>
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold text-white self-start" style={{ backgroundColor: "rgba(0,0,0,0.22)" }}>
                          {segs.length} seg.
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
      </main>

      {isCreating && (
        <SeguimientoModal dialogRef={dialogRef} onClose={onClose} />
      )}
    </>
  );
}
