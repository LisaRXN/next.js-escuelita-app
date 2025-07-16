"use client";

import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { useEffect, useRef, useState } from "react";
import SessionModal from "@/components/modals/SessionModal";
import SessionList from "./_components/sessionList";
import SessionListMobile from "./_components/sessionListMobile";

export default function VolunteerActivity() {
  const { isLoaded, userId } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [sessionSelected, setSessionSelected] = useState<number | undefined>(
    undefined
  );
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { data: volunteerWithSession, isLoading: loadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetcher(`/api/user/${userId}`),
    enabled: !!userId,
  });

  useEffect(() => {
    if (sessionSelected !== undefined) {
      dialogRef.current?.showModal();
    }
  }, [sessionSelected]);

  const handleOpenModal = (sessionId: number) => {
    setSessionSelected(sessionId);
  };
  const handleCloseModal = () => {
    setSessionSelected(undefined);
    dialogRef.current?.close();
  };
  

  useEffect(() => {
    setIsMobile(window.innerWidth < 1000);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isLoaded) return null;

  if (loadingUser)
    return (
      <main className="text-center p-20 flex flex-col items-center justify-start gap-4 m-auto text-mylightgray">
        <span className="loading loading-spinner loading-xl"></span>
        <p>Cargando...</p>
      </main>
    );

  return (
    <main className="p-2 md:p-10 flex flex-col items-start justify-start bg-myteal min-h-screen max-w-screen-2xl m-auto">
      <h1 className="p-4 text-[40px] font-bold font-montserrat mb-3 md:mb-6 max-w-[600px] text-white">
        Mis proximos eventos ✨
      </h1>
      <p className="px-4 mb-10 text-lg max-w-[600px] text-justify text-white">
        Recuerde que puedes cancelar con al menos {" "}
        <span className="text-myorange">24 horas de antelación</span>. Tras 3
        cancelaciones tardías, tendremos que dar por terminado el voluntariado.
      </p>

      {!volunteerWithSession && (
        <p className="py-5 w-full text-center text-white text-lg">
          No te has inscrito en ningua sesión !
        </p>
      )}

      <div className="self-start rounded-lg overflow-hidden w-full md:w-auto mx-auto text-myzinc bg-white mb-5 md:mb-10 flex items-center justify-start">
        <div 
        className={` ${volunteerWithSession?.tutoringCount >= 6 ? 'bg-mygreen' : 'bg-myorange'} flex-1  text-white p-5 flex items-center justify-start gap-2`}>
          <i className="fa-solid fa-hand-holding-heart"></i>
          <p>Tutorías completadas:</p>
        </div>
        <span className="bg-white text-myzinc p-5 w-auto">
          {volunteerWithSession?.tutoringCount}
        </span>
      </div>

      {!isMobile ? (
        <SessionList
          volunteerWithSession={volunteerWithSession}
          handleOpenModal={handleOpenModal}
        />
      ) : (
        <SessionListMobile
          volunteerWithSession={volunteerWithSession}
          handleOpenModal={handleOpenModal}
        />
      )}
      {sessionSelected && (
        <SessionModal sessionId={sessionSelected} dialogRef={dialogRef} handleCloseModal={handleCloseModal} />
      )}
    </main>
  );
}
