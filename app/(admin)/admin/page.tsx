"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { useUser } from "@clerk/nextjs";

const SESSION_TYPE_LABELS: Record<string, string> = {
  TUTORING: "Tutoría",
  OTHER: "Otro",
};

/* ── Types ── */
interface NextSession {
  id: number;
  title: string;
  date: string;
  location: string | null;
  image: string | null;
  capacity: number;
  type: string | null;
}

interface PendingSession {
  id: number;
  title: string;
  date: string;
  type: string;
  location: string;
  pendingCount: number;
}

interface VolunteerData {
  id: number;
  firstName: string;
  lastName: string;
  tutoringCount: number;
  registrations: { id: number }[];
}

/* ── SessionCard — même design que le mobile ── */
function SessionCard({ session }: { session: NextSession }) {
  const date = new Date(session.date);
  const dayNum = date.toLocaleDateString("es-PE", { day: "numeric" });
  const month = date.toLocaleDateString("es-PE", { month: "short" });
  const weekday = date.toLocaleDateString("es-PE", { weekday: "long" });
  const timeStr = date.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
  const isTutoring = session.type === "TUTORING";
  const bgColor = isTutoring ? "#2B797C" : "#193252";
  const badgeBg = isTutoring ? "#65C5A9" : "#FA9F07";

  return (
    <Link
      href={`/admin/sessions/${session.id}`}
      className="shrink-0 w-[272px] rounded-2xl overflow-hidden border border-gray-100 hover:-translate-y-1 transition-transform duration-150 block bg-white shadow-sm"
    >
      {/* Header coloré */}
      <div
        className="relative h-[152px] flex flex-col justify-between p-4"
        style={{ backgroundColor: bgColor }}
      >
        {session.image && session.image !== "default" && (
          <>
            <Image
              src={session.image}
              alt={session.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.38)" }} />
          </>
        )}
        <div className="relative flex items-start justify-between">
          <span
            className="text-white text-[11px] font-bold px-2.5 py-1 rounded-lg"
            style={{ backgroundColor: badgeBg }}
          >
            {SESSION_TYPE_LABELS[session.type ?? ""] ?? session.type ?? "Otro"}
          </span>
          <span className="text-white text-[11px] font-semibold px-2 py-1 rounded-lg bg-white/15">
            {session.capacity} cupos
          </span>
        </div>
        <p className="relative text-white font-extrabold text-[17px] leading-snug line-clamp-2">
          {session.title}
        </p>
      </div>

      {/* Bas de card */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white">
        <div className="flex flex-col items-center min-w-[36px]">
          <span className="text-myteal text-[22px] font-black leading-none">{dayNum}</span>
          <span className="text-mygrey text-[10px] uppercase font-semibold">{month}</span>
        </div>
        <div className="w-px h-9 bg-mylightgray" />
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <i className="fa-regular fa-clock text-mygrey text-[11px]" />
            <span className="text-mygrey text-[12px] truncate">{weekday} · {timeStr}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <i className="fa-solid fa-location-dot text-mygrey text-[11px]" />
            <span className="text-mygray text-[12px] font-medium truncate">{session.location ?? "—"}</span>
          </div>
        </div>
        <i className="fa-solid fa-chevron-right text-gray-200 text-sm shrink-0" />
      </div>
    </Link>
  );
}

/* ── AttendanceCard avec sélecteur de mois ── */
function AttendanceCard({ sessions }: { sessions: PendingSession[] }) {
  const [offset, setOffset] = useState(0); // 0 = mois courant, -1 = précédent…

  const now = new Date();
  const targetDate = new Date(now.getFullYear(), now.getMonth() + offset, 1);
  const monthLabel = targetDate.toLocaleDateString("es-PE", { month: "long", year: "numeric" });

  const filtered = sessions.filter((s) => {
    const d = new Date(s.date);
    return d.getMonth() === targetDate.getMonth() && d.getFullYear() === targetDate.getFullYear();
  });

  const pendingCount = filtered.filter((s) => s.pendingCount > 0).length;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header navigation mois */}
      <div className=" flex items-center px-4 py-3 border-b border-myteal/10">
        <button
          onClick={() => setOffset((o) => o - 1)}
          className="p-1 hover:bg-myteal/20 rounded-lg transition-colors"
        >
          <i className="fa-solid fa-chevron-left text-myteal text-xs" />
        </button>
        <p className="flex-1 text-center text-sm font-semibold capitalize">
          {monthLabel}
        </p>
        <button
          onClick={() => setOffset((o) => o + 1)}
          disabled={offset >= 0}
          className="p-1 hover:bg-myteal/20 rounded-lg transition-colors disabled:opacity-30"
        >
          <i className="fa-solid fa-chevron-right text-myteal text-xs" />
        </button>
      </div>

      {/* Badge résumé */}
      {filtered.length > 0 && (
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-50">
          <p className="flex-1 text-xs text-gray-400">Asistencia pendiente</p>
          {pendingCount > 0 ? (
            <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-lg">
              {pendingCount} por completar
            </span>
          ) : (
            <span className="flex items-center gap-1 text-green-600 text-[10px] font-bold">
              <i className="fa-solid fa-circle-check text-xs" /> Completo
            </span>
          )}
        </div>
      )}

      {/* Liste sessions du mois */}
      {filtered.length === 0 ? (
        <div className="py-5 text-center">
          <p className="text-gray-300 text-xs">Sin sesiones este mes</p>
        </div>
      ) : (
        filtered.map((s, i) => {
          const done = s.pendingCount === 0;
          const d = new Date(s.date);
          const dayNum = d.toLocaleDateString("es-PE", { day: "numeric" });
          const month = d.toLocaleDateString("es-PE", { month: "short" });
          const weekday = d.toLocaleDateString("es-PE", { weekday: "short" });
          return (
            <Link
              key={s.id}
              href={`/admin/sessions/${s.id}`}
              className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${i > 0 ? "border-t border-gray-50" : ""}`}
            >
              {/* Bloc date */}
              <div className="flex flex-col items-center w-9 shrink-0">
                <span
                  className="text-lg font-black leading-none"
                  style={{ color: done ? "#22C55E" : "#FA9F07" }}
                >
                  {dayNum}
                </span>
                <span className="text-[10px] text-gray-400 uppercase font-semibold">{month}</span>
              </div>

              <div className="w-px h-8 bg-gray-100 shrink-0" />

              {/* Titre + weekday */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-myzinc font-semibold truncate">{s.title}</p>
                <p className="text-xs text-gray-400 capitalize">{weekday}</p>
              </div>

              {!done && (
                <span className="bg-myorange/10 text-myorange text-xs font-bold px-2 py-0.5 rounded-lg shrink-0">
                  {s.pendingCount}p
                </span>
              )}
              <i className="fa-solid fa-chevron-right text-gray-200 text-xs shrink-0" />
            </Link>
          );
        })
      )}
    </div>
  );
}

/* ── Page ── */
export default function AdminPage() {
  const { user } = useUser();

  const { data: volunteer } = useQuery<VolunteerData>({
    queryKey: ["myVolunteer", user?.id],
    queryFn: () => fetcher(`/api/user/${user!.id}`),
    enabled: !!user?.id,
  });

  const { data: nextSessions, isLoading: loadingNext } = useQuery<NextSession[]>({
    queryKey: ["nextSessions"],
    queryFn: () => fetcher("/api/nextSessions"),  });

  const { data: allPendingSessions } = useQuery<PendingSession[]>({
    queryKey: ["sessionsNeedingAttendance"],
    queryFn: () => fetcher("/api/sessionsNeedingAttendance"),  });

  return (
    <div className="min-h-screen bg-mylightgray pb-10">

      {/* ── Header bg-myteal comme l'index mobile ── */}
      <div className="bg-myteal px-6 pt-8 pb-8 md:pt-10 md:pb-10">
        <p className="text-white text-sm font-medium opacity-80">¡Bienvenido/a!</p>
        <h1 className="text-white text-2xl font-bold mt-1">
          {volunteer?.firstName ?? user?.firstName} {volunteer?.lastName ?? user?.lastName}
        </h1>
        {/* Stats chips */}
        <div className="flex flex-wrap gap-3 mt-3">
          <div className="bg-white/20 rounded-xl px-4 py-2">
            <p className="text-white text-xs opacity-80">Tutorías</p>
            <p className="text-white font-bold text-lg">{volunteer?.tutoringCount ?? 0}</p>
          </div>
          <div className="bg-white/20 rounded-xl px-4 py-2">
            <p className="text-white text-xs opacity-80">Inscripciones</p>
            <p className="text-white font-bold text-lg">{volunteer?.registrations?.length ?? 0}</p>
          </div>
          <div className="bg-white/20 rounded-xl px-4 py-2">
            <p className="text-white text-xs opacity-80">Rol</p>
            <p className="text-white font-bold text-base">Admin</p>
          </div>
        </div>
      </div>

      {/* ── 1. Sesiones disponibles ── */}
      <div className="mt-6">
        <div className="flex items-center justify-between px-4 md:px-8 mb-3">
          <div>
            <p className="text-myzinc font-bold text-lg">Sesiones disponibles</p>
            <p className="text-gray-400 text-xs mt-0.5">Próximas sesiones</p>
          </div>
          {(nextSessions ?? []).length > 0 && (
            <Link href="/admin/agenda" className="text-myteal text-sm font-medium hover:underline">
              {nextSessions!.length} sesión{nextSessions!.length > 1 ? "es" : ""}
            </Link>
          )}
        </div>

        {loadingNext ? (
          <div className="px-4 md:px-8 py-4">
            <span className="loading loading-spinner loading-md text-myteal" />
          </div>
        ) : (nextSessions ?? []).length === 0 ? (
          <div className="mx-4 md:mx-8 bg-white rounded-2xl p-8 text-center border border-gray-100">
            <i className="fa-solid fa-calendar-xmark text-gray-200 text-3xl mb-3 block" />
            <p className="text-gray-400 text-sm">No hay sesiones próximas</p>
          </div>
        ) : (
          <div
            className="flex gap-4 overflow-x-auto px-4 md:px-8 pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {nextSessions!.map((s) => (
              <SessionCard key={s.id} session={s} />
            ))}
          </div>
        )}
      </div>

      {/* ── 2. Marca la asistencia ── */}
      {(allPendingSessions ?? []).length > 0 && (
        <div className="mx-4 md:mx-8 mt-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-myteal/20 flex items-center justify-center">
              <i className="fa-solid fa-calendar-check text-myteal text-xs" />
            </div>
            <p className="text-myzinc font-bold text-lg">Marca la asistencia</p>
          </div>
          <AttendanceCard sessions={allPendingSessions!} />
        </div>
      )}

      {/* ── 3. Acciones rápidas ── */}
      <div className="mx-4 md:mx-8 mt-6">
        <p className="text-myzinc font-bold text-lg mb-3">Acciones rápidas</p>
        <div className="flex gap-3">
          <Link
            href="/admin/sessions/create-session"
            className="flex-1 bg-myteal rounded-2xl p-4 flex flex-col items-center gap-1.5 hover:bg-myteal/90 transition-colors"
          >
            <i className="fa-solid fa-circle-plus text-white text-2xl" />
            <span className="text-white font-semibold text-xs text-center">Nueva sesión</span>
          </Link>
          <Link
            href="/admin/users"
            className="flex-1 bg-myzinc rounded-2xl p-4 flex flex-col items-center gap-1.5 hover:bg-myzinc/90 transition-colors"
          >
            <i className="fa-solid fa-people-group text-white text-2xl" />
            <span className="text-white font-semibold text-xs text-center">Voluntarios</span>
          </Link>
          <Link
            href="/admin/agenda"
            className="flex-1 rounded-2xl p-4 flex flex-col items-center gap-1.5 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#FA9F07" }}
          >
            <i className="fa-solid fa-calendar-days text-white text-2xl" />
            <span className="text-white font-semibold text-xs text-center">Agenda</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
