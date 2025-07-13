"use client";

import { fetchLastVolunteers } from "@/services/volunteerService";
import SessionCard from "@/components/session/SessionCard";
import Link from "next/link";
import CardTitle from "./_components/CardTitle";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { VolunteerSession } from "@/generated/prisma";
import Calendar from "@/components/session/Calendar";
import { useRef } from "react";
import { SessionWithLiders } from "@/type";

const AdminPage = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const { data: nextSessions, isLoading: loadingNextSessions } = useQuery({
    queryKey: ["nextSessions"],
    queryFn: () => fetcher(`/api/nextSessions`),
    staleTime: 0,
  });

  const { data: sessions, isLoading: loadingSessions } = useQuery<SessionWithLiders[]>({
    queryKey: ["LastSessionsWithLiders"],
    queryFn: () => fetcher("/api/lastSessionsWithLiders"),
    staleTime: 0,
  });

  const { data: volunteers, isLoading: loadingVolunteers } = useQuery({
    queryKey: ["volunteers"],
    queryFn: fetchLastVolunteers,
    select: (data) => data.slice(0, 3),
    staleTime: 0,
  });


  const prevSlide = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollBy({ left: -carousel.clientWidth, behavior: "smooth" });
    }
  };
  const nextSlide = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollBy({ left: carousel.clientWidth, behavior: "smooth" });
    }
  };

  return (
    <div className="p-2 md:p-10 text-start flex flex-col items-start m-auto min-h-screen bg-my teal pb-20">
      <div className="flex flex-col gap-2 md:flex-row items-center p-4 text-[30px] text-center md:text-start md:text-[40px] font-semibold font-montserrat max-w-[600px] text-white">
        <span>¡Coordinamos juntos!</span>
        <span className="md:text-[30px] ml-3">✨</span>
      </div>
      <p className="px-4 mb-5 text-lg text-white">
        Accede a tu espacio para gestionar sesiones, inscripciones... y
        multiplicar tu impacto.
      </p>

      {loadingSessions || loadingNextSessions || loadingVolunteers ? (
        <div className="text-center flex flex-col items-center justify-center gap-2 m-auto text-mylightgray">
          <span className="loading loading-spinner loading-xl"></span>
          <p>Cargando...</p>
        </div>
      ) : (
        <div className="flex mt-5 lg:mt-8 flex-col gap-8 lg:gap-14 items-start justify-center w-full max-w-screen-2xl m-auto">
          {/* Carousel */}
          {nextSessions?.length > 0 ? (
            <div className="relative flex items-stretch m-auto w-full h-auto xl:w-auto  md:max-w-md lg:max-w-[1000px]">
              <div
                ref={carouselRef}
                className="carousel rounded-box self-center w-full max-w-screen-lg"
              >
                {nextSessions?.map((session: VolunteerSession) => (
                  <div key={session.id} className="carousel-item px-4">
                    <SessionCard
                      isAdmin={true}
                      key={session.id}
                      title={session.title}
                      location={session.location}
                      image={session.image}
                      date={session.date}
                      sessionId={session.id}
                      shadow={true}
                    />
                  </div>
                ))}
                <div className="absolute left-0 right-0 md:-left-5 md:-right-7 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <button
                    onClick={prevSlide}
                    className="btn btn-circle w-[40px] h-[40px] md:!w-[60px] md:!h-[60px] backdrop-blur-lg bg-white/50 border-none shadow-none text-xl text-white"
                  >
                    <i className="fa-solid fa-arrow-left"></i>{" "}
                  </button>
                  <button
                    onClick={nextSlide}
                    className="btn btn-circle w-[40px] h-[40px] md:!w-[60px] md:!h-[60px] backdrop-blur-lg  bg-white/50 border-none shadow-none text-xl text-white"
                  >
                    <i className="fa-solid fa-arrow-right"></i>{" "}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-lg text-white w-full">
              No hay eventos próximos programados.
            </p>
          )}

          {/* Deux colonnes */}
          <div className="flex flex-col lg:flex-row items-start justify-center gap-8 w-full">
            {/* Colonne gauche : Sessions */}
            <div className="flex-1 gap-5 flex flex-col bg-white rounded-2xl p-3 lg:p-5 w-full max-h-[400px] lg:max-h-[725px]">
              <CardTitle
                title="¡Sigue a tus voluntarios! 💖"
                subtitle="Marca la asistencia de tus voluntarios en cada sesión"
                link="/admin/sessions/get-sessions"
              />
              <div className="border border-zinc-300 rounded-lg w-full overflow-y-auto">
                <table className="min-w-full divide-y divide-zinc-200 rounded-lg overflow-hidden">
                  <thead className="bg-mygreen/40 text-mygray">
                    <tr>
                      <th className="px-2 lg:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-2">
                          <i className="fa-solid fa-shapes"></i> Sesión
                        </span>
                      </th>
                      <th className="px-2 lg:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-2">
                          <i className="fa-solid fa-calendar"></i> Fecha
                        </span>
                      </th>
                      <th className="px-2 lg:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-2">
                          <i className="fa-solid fa-users"></i> Asistencia
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-zinc-200">
                    {sessions?.map((session: SessionWithLiders) => (
                      <tr key={session.id} className="hover:bg-zinc-50">
                        <td className="px-2 lg:px-6 py-4 whitespace-nowrap">
                          {session.type === "TUTORING"
                            ? "Tutorias"
                            : session.title.length > 15
                            ? session.title.slice(0, 15) + "..."
                            : session.title}
                        </td>
                        <td className="px-2 lg:px-6 py-4 whitespace-nowrap">
                          {new Intl.DateTimeFormat("es-ES", {
                            day: "numeric",
                            month: "numeric",
                          }).format(new Date(session.date))}
                        </td>
                        <td className="px-2 lg:px-6 py-4 whitespace-nowrap">
                          <Link
                            href={`/admin/sessions/${session.id}`}
                            className="inline-flex items-center justify-center text-myorange font-medium transition-colors duration-200 underline hover:text-orange-500"
                          >
                            Completar
                          </Link>
                          <i className="fa-solid fa-chevron-right text-[12px] text-myorange ml-1"></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Colonne droite */}
            <div className="flex-1 flex flex-col items-start justify-center gap-8 w-full ">
              {/* Calendrier */}
              <div className="gap-5 flex flex-col bg-white rounded-2xl p-3 lg:p-5 w-full h-auto">
                <CardTitle
                  title="¡Lidera una sesión! 🙌"
                  subtitle="Apúntate como líder y acompaña el grupo"
                  link="/admin/agenda"
                />
                <div className="p-2 lg:p-5 bg-zinc-50 rounded-xl">
                  {sessions && <Calendar sessions={sessions} isReduce={true} />}
                </div>
              </div>
              {/* Voluntarios */}
              <div className="gap-5 flex flex-col bg-white rounded-2xl p-3 lg:p-5 w-full h-auto">
                <CardTitle
                  title="Administra la información 👥"
                  subtitle="Edita y utiliza los datos de los voluntarios"
                  link="/admin/users"
                />
                <div className="border border-zinc-300 rounded-lg w-full overflow-x-auto">
                  <table className="min-w-full divide-y divide-zinc-200 rounded-lg overflow-hidden">
                    <thead className="bg-myorange/40 text-mygray">
                      <tr>
                        <th className="px-2 lg:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <i className="fa-solid fa-user"></i> Nombre
                          </div>
                        </th>
                        <th className="px-2 lg:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <i className="fa-solid fa-phone"></i> Número
                          </div>
                        </th>
                        <th className="px-2 lg:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <i className="fa-solid fa-envelope"></i> Email
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-zinc-200">
                      {volunteers?.map((volunteer) => (
                        <tr key={volunteer.id} className="hover:bg-zinc-50">
                          <td className="px-2 lg:px-6 py-4 whitespace-nowrap">
                            {volunteer.firstName}
                          </td>
                          <td className="px-2 lg:px-6 py-4 whitespace-nowrap">
                            {volunteer.phone}
                          </td>
                          <td className="px-2 lg:px-6 py-4 whitespace-nowrap">
                            {volunteer.email.slice(0, 10) + "..."}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default AdminPage;