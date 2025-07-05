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
  handleCloseModal?: ()=>void;
}

const AdminSessionDescription = ({
  sessionId,
  handleCloseModal
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
  // const registeredVolunteers = data.registeredVolunteers;
  // const userStatus = data.userStatus;
  const isUserRegistered = data.userStatus.isUserRegistered;
  // const isSessionInFuture24h = data.userStatus.isSessionInFuture24h;
  const isSessionPassed = data.userStatus.isSessionPassed;
  const isVolunteerActive = data.userStatus.isVolunteerActive;


  // Formattage des dates
  const formattedDate = new Date(session.date).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = new Date(session.date).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {/* Card */}
      <div className="w-full max-w-[500px] mx-auto text-inter">
        <div className="relative w-full h-[180px] md:h-[250px] rounded-md overflow-hidden mb-2">
          <Image
            src="/img/photos/tutorias.jpg"
            alt="Tutorias"
            fill
            className="object-cover h-full w-full object-top"
          />
        </div>

        {/* Titre & description */}
        <div className="p-2 md:p-8 w-full h-auto flex flex-col gap-4 md:gap-6 text-myzinc">
          <h1 className="text-3xl font-bold text-center">{session.title}</h1>
          <div className="flex flex-col justify-start items-start gap-5">
            <div className="flex items-start justify-center gap-3">
              <i className="fa-solid fa-location-dot text-myorange"></i>
              <p className="font-light text-start font-inter text-myzinc text-[14px]">
                {session.location}
              </p>
            </div>
            <div className="flex items-center justify-start gap-3">
              <i className="fa-solid fa-calendar-days text-myzinc"></i>
              <p className="font-light text-start font-inter text-myzinc text-[14px]">
                {formattedDate} {formattedTime}
              </p>
            </div>
            <div className="flex items-center justify-start gap-3">
              <i className="fa-solid fa-user-group text-myzinc"></i>
              <p className="font-light text-start font-inter text-myzinc text-[14px]">
                Capacidad : {session.capacity} voluntario.a.s
              </p>
            </div>
            <div className="flex items-center justify-start gap-3">
              <i className="fa-solid fa-thumbs-up text-myzinc"></i>
              <p className="font-light text-start font-inter text-myzinc text-[14px]">
                Inscritos : {session.volunteers.length} / {session.capacity}
              </p>
            </div>
            {session.description && (
              <div className="flex items-start justify-start gap-3">
                <i className="fa-solid  fa-circle-info text-myzinc text-lg"></i>
                <p className="font-light text-start font-inter text-myzinc text-[14px]">
                  {session.description}
                </p>
              </div>
            )}

            <div className="flex flex-col items-start justify-center gap-3 w-full">
            {/* If Non Registered */}
            {!isUserRegistered &&
              isVolunteerActive &&
              !isSessionPassed && (
                <div className="flex w-full items-center justify-center">
                  <SignUpToSessionButton
                    fullWidth={true}
                    sessionId={session.id}
                  />
                </div>
              )}
            {/* If Registered */}
            {isUserRegistered && (
              <div className="w-full flex items-center justify-center">
                <p className="font-semibold text-mygreen">
                  Ya te has inscrito en esta sesión!
                </p>
              </div>
            )}
            {/* Désinscription */}
            {isUserRegistered && !isSessionPassed && (
              <div className="w-full flex items-center justify-center">
                <UnregisterButton
                  fullWidth={true}
                  sessionId={session.id}
                />
              </div>
            )}
            {/* Modifier */}
              <div className="w-full flex items-center justify-center">
                <button
                  onClick={() =>
                    router.push(`/admin/sessions/update-session/${sessionId}`)
                  }
                  className="w-full px-5 py-2 bg-mygray text-white font-semibold rounded-md"
                >
                  Modificar el evento
                </button>
              </div>

            {/* Supprimer */}
              <div className="w-full flex items-center justify-center">
              <DeleteSessionButton sessionId={sessionId} handleCloseModal={handleCloseModal}/>
              </div>

            {!isVolunteerActive && (
              <div className="w-full flex items-center justify-center">
                <p className="text-myred">
                  Para inscribirse en esta sesión es necesario ser voluntario en
                  activo
                </p>
              </div>
            )}
          </div>

        </div>


            </div>



      </div>

      
    </>
  );
};

export default AdminSessionDescription;
