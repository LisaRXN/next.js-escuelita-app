"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@clerk/nextjs";
import { useRef, useState } from "react";
import SessionModal from "@/components/modals/SessionModal";

// ── types ─────────────────────────────────────────────────────────────────────

const SESSION_TYPE_LABELS: Record<string, string> = {
  TUTORING: "Tutoría",
  OTHER: "Otro",
};

interface NextSession {
  id: number;
  title: string;
  date: string;
  location: string | null;
  image: string | null;
  capacity: number;
  type: string | null;
}

interface Registration {
  id: number;
  session: {
    id: number;
    title: string;
    date: string;
    type: string;
    location: string;
  };
}

interface VolunteerData {
  id: number;
  firstName: string;
  lastName: string;
  tutoringCount: number;
  isActive: boolean;
  registrations: Registration[];
}

// ── SessionCard (même design que le dashboard admin) ─────────────────────────

function SessionCard({ session, onOpen }: { session: NextSession; onOpen: (id: number) => void }) {
  const date = new Date(session.date);
  const dayNum = date.toLocaleDateString("es-PE", { day: "numeric" });
  const month = date.toLocaleDateString("es-PE", { month: "short" });
  const weekday = date.toLocaleDateString("es-PE", { weekday: "long" });
  const timeStr = date.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
  const isTutoring = session.type === "TUTORING";
  const bgColor = isTutoring ? "#2B797C" : "#193252";
  const badgeBg = isTutoring ? "#65C5A9" : "#FA9F07";

  return (
    <button
      onClick={() => onOpen(session.id)}
      className="shrink-0 w-[272px] rounded-2xl overflow-hidden border border-gray-100 hover:-translate-y-1 transition-transform duration-150 block bg-white shadow-sm text-left"
    >
      <div className="relative h-[152px] flex flex-col justify-between p-4" style={{ backgroundColor: bgColor }}>
        {session.image && session.image !== "default" && (
          <>
            <Image src={session.image} alt={session.title} fill className="object-cover" />
            <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.38)" }} />
          </>
        )}
        <div className="relative flex items-start justify-between">
          <span className="text-white text-[11px] font-bold px-2.5 py-1 rounded-lg" style={{ backgroundColor: badgeBg }}>
            {SESSION_TYPE_LABELS[session.type ?? ""] ?? session.type ?? "Otro"}
          </span>
          <span className="text-white text-[11px] font-semibold px-2 py-1 rounded-lg bg-white/15">
            {session.capacity} cupos
          </span>
        </div>
        <p className="relative text-white font-extrabold text-[17px] leading-snug line-clamp-2">{session.title}</p>
      </div>
      <div className="flex items-center gap-3 px-4 py-3 bg-white">
        <div className="flex flex-col items-center min-w-[36px]">
          <span className="text-myteal text-[22px] font-black leading-none">{dayNum}</span>
          <span className="text-mygrey text-[10px] uppercase font-semibold">{month}</span>
        </div>
        <div className="w-px h-9 bg-zinc-100" />
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <i className="fa-regular fa-clock text-gray-400 text-[11px]" />
            <span className="text-gray-400 text-[12px] truncate">{weekday} · {timeStr}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <i className="fa-solid fa-location-dot text-gray-400 text-[11px]" />
            <span className="text-gray-600 text-[12px] font-medium truncate">{session.location ?? "—"}</span>
          </div>
        </div>
        <i className="fa-solid fa-chevron-right text-gray-200 text-sm shrink-0" />
      </div>
    </button>
  );
}

// ── UpcomingSessionsCard ──────────────────────────────────────────────────────

function UpcomingSessionsCard({ registrations }: { registrations: Registration[] }) {
  const now = new Date();
  const upcoming = registrations
    .filter((r) => new Date(r.session.date) > now)
    .sort((a, b) => new Date(a.session.date).getTime() - new Date(b.session.date).getTime());

  if (upcoming.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
        <i className="fa-regular fa-calendar text-gray-200 text-3xl mb-3 block" />
        <p className="text-gray-400 text-sm">No estás inscrito/a en ninguna sesión próxima</p>
        <Link href="/activity" className="inline-block mt-3 text-myteal text-sm font-semibold hover:underline">
          Ver sesiones disponibles →
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {upcoming.map((r, i) => {
        const d = new Date(r.session.date);
        const dayNum = d.toLocaleDateString("es-PE", { day: "numeric" });
        const month = d.toLocaleDateString("es-PE", { month: "short" });
        const weekday = d.toLocaleDateString("es-PE", { weekday: "long" });
        const timeStr = d.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
        const isTutoring = r.session.type === "TUTORING";

        return (
          <div
            key={r.id}
            className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? "border-t border-gray-50" : ""}`}
          >
            {/* Bloc date */}
            <div className="flex flex-col items-center w-9 shrink-0">
              <span className="text-myteal text-[22px] font-black leading-none">{dayNum}</span>
              <span className="text-gray-400 text-[10px] uppercase font-semibold">{month}</span>
            </div>
            <div className="w-px h-9 bg-gray-100 shrink-0" />
            {/* Infos */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-myzinc truncate">{r.session.title}</p>
              <p className="text-xs text-gray-400 mt-0.5 truncate">{weekday} · {timeStr}</p>
            </div>
            {/* Badge type + lien */}
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-lg"
                style={{
                  backgroundColor: isTutoring ? "#E0F2F1" : "#FFF8E7",
                  color: isTutoring ? "#2B797C" : "#D97706",
                }}
              >
                {SESSION_TYPE_LABELS[r.session.type] ?? r.session.type}
              </span>
              <Link href="/activity" className="text-[11px] text-myteal font-semibold flex items-center gap-0.5 hover:underline">
                Ver detalles <i className="fa-solid fa-chevron-right text-[9px]" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { userId } = useAuth();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [sessionSelected, setSessionSelected] = useState<number | undefined>(undefined);

  const openModal = (id: number) => {
    setSessionSelected(id);
    dialogRef.current?.showModal();
  };
  const closeModal = () => {
    setSessionSelected(undefined);
    dialogRef.current?.close();
  };

  const { data: volunteer, isLoading: loadingUser } = useQuery<VolunteerData>({
    queryKey: ["user", userId],
    queryFn: () => fetcher(`/api/user/${userId}`),
    enabled: !!userId,
  });

  const { data: nextSessions, isLoading: loadingNext } = useQuery<NextSession[]>({
    queryKey: ["nextSessions"],
    queryFn: () => fetcher("/api/nextSessions"),  });

  const isLoading = loadingUser || loadingNext;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-32 text-gray-400">
        <span className="loading loading-spinner loading-xl" />
        <p>Cargando...</p>
      </div>
    );
  }

  const upcomingCount = (volunteer?.registrations ?? []).filter(
    (r) => new Date(r.session.date) > new Date()
  ).length;

  return (
    <>
    <div className="flex-1 bg-zinc-50 pb-10">

      {/* ── Header teal ── */}
      <div className="bg-myteal px-4 md:px-8 pt-8 pb-8">
        <p className="text-white text-sm font-medium opacity-80">¡Bienvenido/a!</p>
        <h1 className="text-white text-2xl font-bold mt-1">
          {volunteer?.firstName} {volunteer?.lastName}
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
            <p className="text-white text-xs opacity-80">Estado</p>
            <p className="text-white font-bold text-base">
              {volunteer?.isActive ? "Activo/a" : "Pendiente"}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 flex flex-col gap-6 mt-6">

        {/* ── 1. Mis próximas sesiones ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-myzinc font-bold text-lg">Mis próximas sesiones</p>
              <p className="text-gray-400 text-xs mt-0.5">Sesiones en las que estás inscrito/a</p>
            </div>
            {upcomingCount > 0 && (
              <span className="text-myteal text-sm font-semibold">
                {upcomingCount} inscrita{upcomingCount > 1 ? "s" : ""}
              </span>
            )}
          </div>
          <UpcomingSessionsCard registrations={volunteer?.registrations ?? []} />
        </div>

        {/* ── 2. Sesiones disponibles ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-myzinc font-bold text-lg">Sesiones disponibles</p>
              <p className="text-gray-400 text-xs mt-0.5">Inscríbete a una sesión</p>
            </div>
            {(nextSessions ?? []).length > 0 && (
              <Link href="/activity" className="text-myteal text-sm font-medium hover:underline">
                {nextSessions!.length} sesión{nextSessions!.length > 1 ? "es" : ""}
              </Link>
            )}
          </div>

          {loadingNext ? (
            <div className="py-4"><span className="loading loading-spinner loading-md text-myteal" /></div>
          ) : (nextSessions ?? []).length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
              <i className="fa-solid fa-calendar-xmark text-gray-200 text-3xl mb-3 block" />
              <p className="text-gray-400 text-sm">No hay sesiones próximas</p>
            </div>
          ) : (
            <div className="-mx-4 md:-mx-8 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              <div className="flex gap-4 px-4 md:px-8">
                {nextSessions!.map((s) => <SessionCard key={s.id} session={s} onOpen={openModal} />)}
              </div>
            </div>
          )}
        </div>

        {/* ── 3. Acciones rápidas ── */}
        <div>
          <p className="text-myzinc font-bold text-lg mb-3">Acciones rápidas</p>
          <div className="flex gap-3">
            <Link
              href="/activity"
              className="flex-1 bg-myteal rounded-2xl p-4 flex flex-col items-center gap-1.5 hover:bg-myteal/90 transition-colors"
            >
              <i className="fa-solid fa-calendar-check text-white text-2xl" />
              <span className="text-white font-semibold text-xs text-center">Mis sesiones</span>
            </Link>
            <Link
              href="/seguimientos"
              className="flex-1 bg-myzinc rounded-2xl p-4 flex flex-col items-center gap-1.5 hover:bg-myzinc/90 transition-colors"
            >
              <i className="fa-solid fa-clipboard-list text-white text-2xl" />
              <span className="text-white font-semibold text-xs text-center">Seguimientos</span>
            </Link>
            <Link
              href="/profil"
              className="flex-1 rounded-2xl p-4 flex flex-col items-center gap-1.5 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#FA9F07" }}
            >
              <i className="fa-solid fa-user text-white text-2xl" />
              <span className="text-white font-semibold text-xs text-center">Mi perfil</span>
            </Link>
          </div>
        </div>

      </div>
    </div>

      {sessionSelected && (
        <SessionModal sessionId={sessionSelected} dialogRef={dialogRef} handleCloseModal={closeModal} />
      )}
    </>
  );
}
