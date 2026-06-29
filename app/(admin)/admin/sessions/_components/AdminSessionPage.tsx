"use client";

import VolunteerList from "@/components/admin/VolunteerList";
import CoordinatorList from "@/components/admin/CoordinatorList";
import AdminSessionDescription from "@/components/admin/AdminSessionDescription";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { RegisteredVolunteer } from "@/type";
import Link from "next/link";

const SESSION_TYPE_LABELS: Record<string, string> = {
  TUTORING: "Tutoría",
  OTHER: "Otro",
};

const AdminSessionPage = ({ sessionId }: { sessionId: number }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["sessionById", sessionId],
    queryFn: () => fetcher(`/api/sessions/${sessionId}`),
    enabled: !!sessionId,  });

  if (isNaN(sessionId) || isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="loading loading-spinner loading-xl text-myteal" />
      </div>
    );
  }

  if (!data) return null;

  const { session, registeredVolunteers } = data;
  const date = new Date(session.date);
  const confirmed = registeredVolunteers.filter((v: RegisteredVolunteer) => v.status === "CONFIRMED").length;
  const noShow = registeredVolunteers.filter((v: RegisteredVolunteer) => v.status === "NO_SHOW").length;
  const liders = registeredVolunteers.filter((v: RegisteredVolunteer) => v.isAdmin);
  const volunteers = registeredVolunteers.filter((v: RegisteredVolunteer) => !v.isAdmin);

  return (
    <div className="min-h-screen bg-mylightgray pb-10">

      {/* ── Header bg-myzinc ── */}
      <div className="bg-myzinc px-6 pt-8 pb-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-4 transition-colors"
        >
          <i className="fa-solid fa-arrow-left text-xs" />
          Sesiones
        </Link>
        <h1 className="text-white text-xl font-bold leading-snug">{session.title}</h1>
        <p className="text-white/60 text-sm mt-1 capitalize">
          {date.toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long" })}
          {" · "}
          {date.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg text-white ${session.type === "TUTORING" ? "bg-myteal" : "bg-myorange"}`}>
            {SESSION_TYPE_LABELS[session.type] ?? session.type}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-lg text-white/70 bg-white/10">
            <i className="fa-solid fa-location-dot text-[10px] mr-1.5" />
            {session.location}
          </span>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-4 gap-3 px-4 md:px-8 mt-4">
        {[
          { value: registeredVolunteers.length, label: "Inscritos", color: "#2B797C" },
          { value: confirmed, label: "Confirmados", color: "#16A34A" },
          { value: noShow, label: "No vino", color: "#D52346" },
          { value: session.capacity, label: "Capacidad", color: "#6B7280" },
        ].map(({ value, label, color }) => (
          <div key={label} className="bg-white rounded-2xl py-3 px-2 flex flex-col items-center border border-gray-100">
            <span className="text-xl font-black leading-none" style={{ color }}>{value}</span>
            <span className="text-gray-400 text-xs mt-1.5 text-center">{label}</span>
          </div>
        ))}
      </div>

      {/* ── Contenu deux colonnes ── */}
      <div className="flex flex-col lg:flex-row items-start gap-5 px-4 md:px-8 py-5 max-w-6xl mx-auto">

        {/* Colonne gauche : description */}
        <div className="w-full lg:w-[320px] shrink-0">
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <AdminSessionDescription sessionId={sessionId} />
          </div>
        </div>

        {/* Colonne droite : listes */}
        <div className="flex-1 flex flex-col gap-5 w-full min-w-0">
          <CoordinatorList sessionId={session.id} sessionDate={session.date} liders={liders} />
          <VolunteerList
            sessionId={sessionId}
            registeredVolunteers={volunteers}
            sessionTitle={session.title}
            sessionDate={session.date}
          />
        </div>

      </div>
    </div>
  );
};

export default AdminSessionPage;
