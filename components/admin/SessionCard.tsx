"use client"

import Image from "next/image";
import { SessionTypes, RegistrationStatus } from "@/generated/prisma";
import { useRouter } from "next/navigation";

interface SessionCardProps {
  session: {
    id: number;
    title: string;
    date: Date;
    description: string | null;
    location: string;
    capacity: number;
    type: SessionTypes; // (enum)
    createdAt: Date;
    volunteers: {
      // Tableau des inscriptions
      id: number;
      createdAt: Date;
      volunteerId: number;
      sessionId: number;
      status: RegistrationStatus; // (enum)
    }[];
  };
}

const SessionCard = ({ session }: SessionCardProps) => {
  const router = useRouter();

  const formattedDate = session.date
    ? new Date(session.date).toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const formattedTime = session
    ? new Date(session.date).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="w-full md:max-w-[500px] mx-auto bg-white rounded-2xl shadow-md overflow-hidden text-inter">
      <div className="relative w-full h-[150px] md:h-[250px]">
        <Image
          src="/img/photos/tutorias.jpg"
          alt="Tutorias"
          fill
          className="object-cover h-full w-full object-top"
        />
      </div>

      <div className="p-8 w-full h-auto flex flex-col gap-6">
        <h1 className="text-2xl text-mygray font-bold text-center">
          {session.title}
        </h1>

        <div className="flex flex-col justify-start items-start gap-5">
          <div className="flex items-start gap-3">
            <i className="fa-solid fa-location-dot text-myorange"></i>
            <p className="text-mygrey text-sm">{session.location}</p>
          </div>

          <div className="flex items-center gap-3">
            <i className="fa-solid fa-calendar-days text-mygray"></i>
            <p className="text-mygrey text-sm">
              {formattedDate} {formattedTime}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <i className="fa-solid fa-user-group text-mygray"></i>
            <p className="text-mygrey text-sm">
              Capacidad : {session.capacity} voluntario.a.s
            </p>
          </div>

          <div className="flex items-center gap-3">
            <i className="fa-solid fa-thumbs-up text-mygray"></i>
            <p className="text-mygrey text-sm">
              Inscritos : {session.volunteers.length} / {session.capacity}
            </p>
          </div>

          {session.description && (
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-circle-info text-mygray"></i>
              <p className="text-mygrey text-sm">{session.description}</p>
            </div>
          )}

          <button
            onClick={() => router.push(`/admin/update-session/${session.id}`)}
            className="self-center px-5 py-2 bg-myorange text-white font-semibold rounded-md"
          >
            Modificar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
