"use client";

import SignUpToSessionButton from "@/components/session/SignUpToSessionButton";
import UnregisterButton from "@/components/session/UnregisterButton";
import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DeleteSessionButton from "./DeleteSessionButton";

interface AdminSessionDescriptionProps {
  sessionId: number;
  isAdmin?: boolean;
  handleCloseModal?: () => void;
}

const AdminSessionDescription = ({
  sessionId,
  handleCloseModal,
}: AdminSessionDescriptionProps) => {
  const router = useRouter();

  const { data, isLoading: loadingSession } = useQuery({
    queryKey: ["sessionById"],
    queryFn: () => fetcher(`/api/sessions/${sessionId}`),
    enabled: !!sessionId,
  });

  if (loadingSession) {
    return (
      <div className="text-center p-20 flex flex-col items-center justify-start gap-4 m-auto text-myteal">
        <span className="loading loading-spinner loading-xl"></span>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!data || !data.userStatus) return <p>Ninguna sesión encontrada</p>;

  const session = data.session;
  const isUserRegistered = data.userStatus.isUserRegistered;
  const isSessionPassed = data.userStatus.isSessionPassed;
  const isVolunteerActive = data.userStatus.isVolunteerActive;

  // Formattage des dates
  const formattedDate = new Date(session.date).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // ✅ très important

  });

  const formattedTime = new Date(session.date).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC", // ✅ très important

  });

  return (
    <div className="w-full flex flex-col gap-4 text-myzinc">
      {/* Image */}
      <div className="relative w-full h-[180px] rounded-xl overflow-hidden">
        <Image
          src={session.image}
          alt={session.title}
          fill
          className="object-cover object-top"
        />
        {isSessionPassed && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/30">
              Sesión finalizada
            </span>
          </div>
        )}
      </div>

      {/* Title */}
      <h1 className="text-xl font-bold font-montserrat">{session.title}</h1>

      {/* Info items */}
      <div className="flex flex-col gap-2.5">
        {[
          { icon: "fa-location-dot", color: "text-myorange", text: session.location },
          { icon: "fa-calendar-days", color: "text-myzinc", text: `${formattedDate} · ${formattedTime}` },
          { icon: "fa-user-group", color: "text-myzinc", text: `Capacidad: ${session.capacity} voluntario.a.s` },
          { icon: "fa-circle-check", color: session.volunteers.length >= session.capacity ? "text-myred" : "text-mygreen",
            text: `Inscritos: ${session.volunteers.length} / ${session.capacity}` },
        ].map(({ icon, color, text }) => (
          <div key={icon} className="flex items-start gap-3">
            <i className={`fa-solid ${icon} ${color} w-4 text-center mt-0.5 shrink-0`}></i>
            <p className="text-sm text-myzinc">{text}</p>
          </div>
        ))}
        {session.description && (
          <div className="flex items-start gap-3">
            <i className="fa-solid fa-circle-info text-mygray w-4 text-center mt-0.5 shrink-0"></i>
            <p className="text-sm text-mygray">{session.description}</p>
          </div>
        )}
      </div>

      {/* Status badge */}
      {isUserRegistered && (
        <div className="flex items-center gap-2 px-3 py-2 bg-mygreen/10 text-mygreen rounded-lg text-sm font-medium">
          <i className="fa-solid fa-circle-check"></i>
          Ya estás inscrito en esta sesión
        </div>
      )}
      {!isVolunteerActive && !isSessionPassed && (
        <div className="flex items-center gap-2 px-3 py-2 bg-myred/10 text-myred rounded-lg text-sm font-medium">
          <i className="fa-solid fa-lock"></i>
          Necesitas ser voluntario activo para inscribirte
        </div>
      )}
      {isSessionPassed && (
        <div className="flex items-center gap-2 px-3 py-2 bg-zinc-100 text-mygray rounded-lg text-sm font-medium">
          <i className="fa-solid fa-clock-rotate-left"></i>
          Esta sesión ya ha pasado
        </div>
      )}

      {/* Actions */}
      {!isSessionPassed && (
        <div className="flex flex-col gap-2 pt-1 border-t border-zinc-100">
          {!isUserRegistered && isVolunteerActive && (
            <SignUpToSessionButton fullWidth={true} sessionId={session.id} />
          )}
          {isUserRegistered && (
            <UnregisterButton fullWidth={true} sessionId={session.id} />
          )}
          <button
            onClick={() => router.push(`/admin/sessions/update-session/${sessionId}`)}
            className="w-full px-4 py-2 border border-zinc-200 text-myzinc text-sm font-medium rounded-lg hover:bg-zinc-50 transition flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-pen text-xs"></i>
            Modificar el evento
          </button>
          <DeleteSessionButton sessionId={sessionId} handleCloseModal={handleCloseModal} />
        </div>
      )}
    </div>
  );
};

export default AdminSessionDescription;
