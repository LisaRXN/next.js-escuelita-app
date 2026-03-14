"use client";

import SignUpToSessionButton from "@/components/session/SignUpToSessionButton";
import UnregisterButton from "@/components/session/UnregisterButton";
import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DeleteSessionButton from "./DeleteSessionButton";

const SESSION_TYPE_LABELS: Record<string, string> = {
  TUTORING: "Tutoría",
  OTHER: "Otro",
};

interface AdminSessionDescriptionProps {
  sessionId: number;
  isAdmin?: boolean;
  handleCloseModal?: () => void;
}

const AdminSessionDescription = ({ sessionId, handleCloseModal }: AdminSessionDescriptionProps) => {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["sessionById", sessionId],
    queryFn: () => fetcher(`/api/sessions/${sessionId}`),
    enabled: !!sessionId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="loading loading-spinner loading-md text-myteal" />
      </div>
    );
  }

  if (!data || !data.userStatus) return <p className="text-sm text-gray-400">Ninguna sesión encontrada</p>;

  const session = data.session;
  const isUserRegistered = data.userStatus.isUserRegistered;
  const isSessionPassed = data.userStatus.isSessionPassed;
  const isVolunteerActive = data.userStatus.isVolunteerActive;
  const isTutoring = session.type === "TUTORING";

  const spotsLeft = session.capacity - (data.registeredVolunteers?.filter((v: { isAdmin: boolean }) => !v.isAdmin).length ?? session.volunteers?.length ?? 0);
  const isFull = spotsLeft <= 0;

  const formattedDate = new Date(session.date).toLocaleDateString("es-ES", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });
  const formattedTime = new Date(session.date).toLocaleTimeString("es-ES", {
    hour: "2-digit", minute: "2-digit", timeZone: "UTC",
  });

  return (
    <div className="flex flex-col gap-4 text-myzinc">

      {/* ── Image avec overlay ── */}
      <div className="relative h-[176px] rounded-2xl overflow-hidden bg-myzinc">
        {session.image && session.image !== "default" ? (
          <>
            <Image src={session.image} alt={session.title} fill className="object-cover object-top" />
            <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.38)" }} />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: isTutoring ? "#2B797C" : "#193252" }}
          />
        )}

        {/* Badge type */}
        <div className="absolute top-3 left-3">
          <span
            className="text-white text-[11px] font-bold px-2.5 py-1 rounded-lg"
            style={{ backgroundColor: isTutoring ? "#65C5A9" : "#FA9F07" }}
          >
            {SESSION_TYPE_LABELS[session.type] ?? session.type}
          </span>
        </div>

        {/* Titre en bas de l'image */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white font-extrabold text-base leading-snug line-clamp-2">
            {session.title}
          </p>
        </div>

        {/* Overlay "finalizada" */}
        {isSessionPassed && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
            <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/30">
              Sesión finalizada
            </span>
          </div>
        )}
      </div>

      {/* ── Info pills ── */}
      <div className="flex flex-wrap gap-2">
        {[
          { icon: "fa-calendar-days", text: formattedDate },
          { icon: "fa-clock", text: formattedTime },
          { icon: "fa-location-dot", text: session.location },
        ].map(({ icon, text }) => (
          <div key={icon} className="flex items-center gap-1.5 bg-white border border-gray-100 rounded-xl px-3 py-1.5">
            <i className={`fa-solid ${icon} text-myteal text-[11px]`} />
            <span className="text-myzinc text-xs font-medium capitalize">{text}</span>
          </div>
        ))}
      </div>

      {/* ── Capacidad ── */}
      <div className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-3 py-2.5">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-people-group text-myteal text-sm" />
          <span className="text-myzinc font-semibold text-sm">Voluntarios</span>
        </div>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-lg ${isFull ? "bg-red-50 text-myred" : "bg-green-50 text-green-700"}`}
        >
          {session.volunteers?.length ?? 0}/{session.capacity} · {isFull ? "Completo" : `${spotsLeft} cupo${spotsLeft > 1 ? "s" : ""}`}
        </span>
      </div>

      {/* ── Description ── */}
      {session.description && (
        <div className="bg-zinc-50 rounded-xl px-3 py-3 border border-gray-100">
          <p className="text-myzinc text-xs font-semibold mb-1">Descripción</p>
          <p className="text-gray-500 text-sm leading-relaxed">{session.description}</p>
        </div>
      )}

      {/* ── Status badges ── */}
      {isUserRegistered && (
        <div className="flex items-center gap-2 px-3 py-2.5 bg-mygreen/10 text-mygreen rounded-xl text-sm font-medium">
          <i className="fa-solid fa-circle-check text-sm" />
          Ya estás inscrito en esta sesión
        </div>
      )}
      {!isVolunteerActive && !isSessionPassed && (
        <div className="flex items-center gap-2 px-3 py-2.5 bg-myred/10 text-myred rounded-xl text-sm font-medium">
          <i className="fa-solid fa-lock text-sm" />
          Necesitas ser voluntario activo para inscribirte
        </div>
      )}

      {/* ── Acciones ── */}
      {!isSessionPassed && (
        <div className="flex flex-col gap-2 pt-1 border-t border-zinc-100">
          {!isUserRegistered && isVolunteerActive && (
            <SignUpToSessionButton fullWidth sessionId={session.id} />
          )}
          {isUserRegistered && (
            <UnregisterButton fullWidth sessionId={session.id} />
          )}
          <button
            onClick={() => router.push(`/admin/sessions/update-session/${sessionId}`)}
            className="w-full px-4 py-2.5 border border-zinc-200 text-myzinc text-sm font-medium rounded-2xl hover:bg-zinc-50 transition flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-pen text-xs" />
            Modificar el evento
          </button>
          <DeleteSessionButton sessionId={sessionId} handleCloseModal={handleCloseModal} />
        </div>
      )}
    </div>
  );
};

export default AdminSessionDescription;
