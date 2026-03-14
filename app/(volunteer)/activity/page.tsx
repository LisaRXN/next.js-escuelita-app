"use client";

import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { useRef, useState } from "react";
import SessionModal from "@/components/modals/SessionModal";
import UnregisterButton from "@/components/session/UnregisterButton";

// ── Types ────────────────────────────────────────────────────────────────────

type Registration = {
  id: number;
  status: string;
  session: {
    id: number;
    title: string;
    date: string;
    location: string | null;
    type: string | null;
  };
};

type VolunteerData = {
  firstName: string;
  tutoringCount: number;
  registrations: Registration[];
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<string, string> = {
  PENDING:   "Inscrito",
  CONFIRMED: "Completado",
  CANCELLED: "Cancelado",
  NO_SHOW:   "Falta",
};

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  CONFIRMED: { bg: "#DCFCE7", color: "#16A34A" },
  CANCELLED: { bg: "#FEE2E2", color: "#DC2626" },
  NO_SHOW:   { bg: "#F3F4F6", color: "#6B7280" },
};

function getTimingBadge(dateStr: string): { label: string; color: string; bg: string } {
  const now = new Date();
  const date = new Date(dateStr);
  const diffDays = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday)                       return { label: "Hoy",      color: "#D97706", bg: "#FEF3C7" };
  if (diffDays > 0 && diffDays <= 2) return { label: "Mañana",   color: "#7C3AED", bg: "#F5F3FF" };
  if (diffDays > 0)                  return { label: "A venir",  color: "#2B797C", bg: "#E6F4F4" };
  if (diffDays > -7)                 return { label: "Reciente", color: "#6B7280", bg: "#F3F4F6" };
  return                                    { label: "Pasada",   color: "#9CA3AF", bg: "#F9FAFB" };
}

// ── AchievementCard ──────────────────────────────────────────────────────────

const MILESTONES = [
  { count: 1,  emoji: "🌱", title: "Primer paso",             color: "#65C5A9", bg: "#E6F4F4" },
  { count: 3,  emoji: "⭐", title: "Voluntario activo",       color: "#FA9F07", bg: "#FFF8E7" },
  { count: 5,  emoji: "🏅", title: "Voluntario comprometido", color: "#8B5CF6", bg: "#F5F3FF" },
  { count: 10, emoji: "🏆", title: "Voluntario dedicado",     color: "#F59E0B", bg: "#FFFBEB" },
  { count: 20, emoji: "🌟", title: "Voluntario ejemplar",     color: "#EC4899", bg: "#FDF2F8" },
];

function AchievementCard({ count, firstName }: { count: number; firstName: string }) {
  const earned = [...MILESTONES].reverse().find((m) => count >= m.count);
  const next = MILESTONES.find((m) => count < m.count);
  if (!earned) return null;

  const progress = next ? (count - earned.count) / (next.count - earned.count) : 1;

  return (
    <div
      className="rounded-2xl p-5 mb-5 border overflow-hidden relative"
      style={{ backgroundColor: earned.bg, borderColor: earned.color + "40" }}
    >
      {/* Décor */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full"
        style={{ backgroundColor: earned.color + "15" }}
      />

      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0 border-2"
          style={{ backgroundColor: earned.color + "25", borderColor: earned.color + "50" }}
        >
          {earned.emoji}
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: earned.color }}>
            Logro desbloqueado
          </p>
          <p className="text-base font-extrabold text-[#193252] mt-0.5">{earned.title}</p>
          <p className="text-xs text-zinc-500 mt-0.5">
            {count} sesión{count !== 1 ? "es" : ""} completada{count !== 1 ? "s" : ""} · ¡Gracias {firstName}!
          </p>
        </div>
      </div>

      {next ? (
        <>
          <div className="flex justify-between mb-1.5">
            <span className="text-xs text-zinc-400">Próximo: {next.emoji} {next.title}</span>
            <span className="text-xs font-bold" style={{ color: earned.color }}>{count}/{next.count}</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: earned.color + "25" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.round(progress * 100)}%`, backgroundColor: earned.color }}
            />
          </div>
        </>
      ) : (
        <p className="text-xs font-semibold text-center mt-1" style={{ color: earned.color }}>
          🎉 ¡Has alcanzado el nivel máximo!
        </p>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function VolunteerActivity() {
  const { userId } = useAuth();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [sessionSelected, setSessionSelected] = useState<number | undefined>(undefined);

  const { data: volunteer, isLoading } = useQuery<VolunteerData>({
    queryKey: ["user", userId],
    queryFn: () => fetcher(`/api/user/${userId}`),
    enabled: !!userId,
  });

  const openModal = (id: number) => {
    setSessionSelected(id);
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    setSessionSelected(undefined);
    dialogRef.current?.close();
  };

  const registrations = (volunteer?.registrations ?? [])
    .slice()
    .sort((a, b) => new Date(b.session.date).getTime() - new Date(a.session.date).getTime());

  return (
    <>
      <main className="min-h-screen bg-zinc-50 pb-10">

        {/* ══ Header ══ */}
        <div className="bg-[#193252] px-4 md:px-8 pt-8 pb-6">
          <h1 className="text-white text-3xl font-extrabold font-montserrat">Mi actividad</h1>
          <p className="text-white/60 text-sm mt-1">
            {registrations.length} sesión{registrations.length !== 1 ? "es" : ""} en total
          </p>
        </div>

        <div className="px-4 md:px-8 pt-6 max-w-3xl">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4 py-20 text-zinc-400">
              <span className="loading loading-spinner loading-xl" />
              <p>Cargando...</p>
            </div>
          ) : (
            <>
              {/* Logro */}
              {(volunteer?.tutoringCount ?? 0) >= 1 && volunteer && (
                <AchievementCard count={volunteer.tutoringCount} firstName={volunteer.firstName} />
              )}

              {/* Liste */}
              {registrations.length === 0 ? (
                <div className="text-center py-20 text-zinc-400 w-full">
                  <i className="fa-regular fa-calendar text-4xl mb-3 block" />
                  <p className="text-sm">No hay sesiones registradas</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {registrations.map((reg) => {
                    const date = new Date(reg.session.date);
                    const dateStr = date.toLocaleDateString("es-PE", {
                      weekday: "short", day: "numeric", month: "long", year: "numeric",
                    });
                    const timeStr = date.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
                    const timing = getTimingBadge(reg.session.date);
                    const statusStyle = STATUS_STYLE[reg.status];

                    return (
                      <div key={reg.id} className="bg-white rounded-2xl border border-zinc-100 p-4">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <button
                            onClick={() => openModal(reg.session.id)}
                            className="font-bold text-myzinc text-left leading-snug hover:text-myteal transition-colors"
                          >
                            {reg.session.title}
                          </button>
                          <span
                            className="text-[11px] font-bold px-2.5 py-1 rounded-lg shrink-0"
                            style={{ backgroundColor: timing.bg, color: timing.color }}
                          >
                            {timing.label}
                          </span>
                        </div>

                        <p className="text-zinc-500 text-sm capitalize">{dateStr} · {timeStr}</p>

                        {reg.session.location && (
                          <p className="text-zinc-400 text-sm mt-0.5">
                            <i className="fa-solid fa-location-dot mr-1.5" />
                            {reg.session.location}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-3">
                          {reg.status !== "PENDING" && statusStyle ? (
                            <span
                              className="text-xs font-bold px-2.5 py-1 rounded-lg"
                              style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}
                            >
                              {STATUS_LABELS[reg.status] ?? reg.status}
                            </span>
                          ) : (
                            <span />
                          )}
                          {reg.status === "PENDING" && (
                            <UnregisterButton sessionId={reg.session.id} isReduce isAdmin={false} />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {sessionSelected && (
        <SessionModal sessionId={sessionSelected} dialogRef={dialogRef} handleCloseModal={closeModal} />
      )}
    </>
  );
}
