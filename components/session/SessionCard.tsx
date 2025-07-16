"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SessionModal from "@/components/modals/SessionModal";

interface SessionCardProps {
  title: string;
  location: string;
  date: string | Date;
  sessionId: number;
  image:string;
  isAdmin?: boolean;
  shadow: boolean;
}

const SessionCard = ({
  title,
  location,
  date,
  sessionId,
  image,
  isAdmin = false,
  shadow = true,
}: SessionCardProps) => {
  const router = useRouter();
  const [sessionSelected, setSessionSelected] = useState<number | undefined>(
    undefined
  );

  const dialogRef = useRef<HTMLDialogElement>(null);

  const dateFromDB = new Date(date); 

  const formattedDate = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC", // ✅ très important
  }).format(dateFromDB);

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
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleClick = () => {
    if (isAdmin) {
      router.push(`/admin/sessions/${sessionId}`);
    } else {
      handleOpenModal(sessionId);
    }
  };

  return (
    <div
      className={`flex flex-col items-center w-full md:w-[350px] h-auto rounded-lg md:rounded-2xl ${
        shadow ? "shadow-md bg-white" : "border border-zinc-300 bg-zinc-50"
      } overflow-hidden`}
    >
      <div
        onClick={handleClick}
        className="relative h-[140px] w-full cursor-pointer"
      >
        <Image
          src={image}
          alt="Tutorias"
          fill
          className="object-cover h-full w-full"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 items-start h-auto w-full">
        <span
          onClick={handleClick}
          className="md:text-[16px] font-bold cursor-pointer"
        >
          {title.length > 35 ? title.slice(0,35) + "..." : title}
        </span>
        <div className="flex items-start justify-center gap-3">
          <i className="fa-solid fa-location-dot text-myorange"></i>
          <p className="font-semibold text-mygrey text-[14px]">{location}</p>
        </div>
        <div className="flex items-center justify-start gap-3">
          <i className="fa-solid fa-calendar-days text-mygray"></i>
          <p className="font-semibold text-mygrey text-[14px]">
            {formattedDate}
          </p>
        </div>
        {isAdmin ? (
          <div className="flex w-full items-center justify-end gap-2">
            <button
              onClick={() => handleOpenModal(sessionId)}
              className="self-end text-sm px-3 md:px-5 py-2 bg-myorange hover:bg-myorange/80 text-white font-semibold rounded-md transition duration-300"
            >
              Insribirte
            </button>
            <button
              onClick={() =>
                router.push(`/admin/sessions/update-session/${sessionId}`)
              }
              className="self-end  text-sm px-3 md:px-5 py-2 bg-slate-400 hover:bg-slate-500 text-white font-semibold rounded-md transition duration-300"
            >
              Modificar
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleOpenModal(sessionId)}
            className="self-end text-sm  px-3 md:px-5 py-2 bg-myorange text-white font-semibold rounded-md"
          >
            Saber más
          </button>
        )}
      </div>

      {sessionSelected && (
        <SessionModal
          sessionId={sessionSelected}
          dialogRef={dialogRef}
          handleCloseModal={handleCloseModal}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};
export default SessionCard;
