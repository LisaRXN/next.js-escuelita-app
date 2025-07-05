"use client";

import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import SessionCard from "@/components/session/SessionCard";
import { VolunteerSession } from "@/generated/prisma";
import CardTitle from "../(admin)/admin/_components/CardTitle";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { RegistrationWithSession } from "@/type";
import CalendarVolunteer from "./_components/CalendarVolunteer";
import SessionModal from "@/components/modals/sessionModal";
import ActivityCard from "@/components/session/ActivityCard";

const VolunteerPage = () => {
  const { userId } = useAuth();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [sessionSelected, setSessionSelected] = useState<number | undefined>(
    undefined
  );
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { data: nextSessions, isLoading: loadingNextSessions } = useQuery({
    queryKey: ["nextSessions"],
    queryFn: () => fetcher(`/api/nextSessions`),
  });

  const { data: sessions, isLoading: loadingSessions } = useQuery({
    queryKey: ["sessions"],
    queryFn: () => fetcher(`/api/nextSessions`),
  });

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
    <div className="p-2 md:p-10 text-start flex flex-col items-start min-h-screen bg-myteal pb-20 max-w-screen-2xl m-auto">
      <div className="flex flex-col gap-2 lg:flex-row items-center p-4 text-[30px] text-center md:text-start md:text-[40px] font-semibold font-montserrat mb-4 max-w-[600px] text-white">
        <span>¡Los niños esperan por ti!</span>
        <span className="md:text-[30px] ml-3">🌈</span>
      </div>
      <p className="px-4 mb-10 md:mb-14 text-lg text-white">
        ¡Únete y marca la diferencia! Apuntarse es fácil y el impacto, enorme.
      </p>

      {loadingSessions || loadingNextSessions || loadingUser ? (
        <div className="text-center flex flex-col items-center justify-center gap-2 m-auto text-mylightgray">
          <span className="loading loading-spinner loading-xl"></span>
          <p>Cargando...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8 lg:gap-14 items-start justify-center w-full max-w-screen-2xl m-auto">
          {/* Carousel */}
          <div className="relative flex items-stretch m-auto w-full h-auto md:w-auto">
            <div
              ref={carouselRef}
              className="carousel rounded-box self-center w-full max-w-screen-lg"
            >
              {nextSessions?.map((session: VolunteerSession) => (
                <div key={session.id} className="carousel-item px-4">
                  <SessionCard
                    isAdmin={false}
                    key={session.id}
                    title={session.title}
                    location={session.location}
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

          <div className="flex-1 flex flex-col md:flex-row items-start justify-center gap-8 w-full ">
            <div className="gap-5 flex flex-col bg-white rounded-2xl p-3 md:p-5 w-full h-auto max-h-[500px] overflow-y-auto">
              <CardTitle
                title="Reserva tu proxima visita! 💖"
                subtitle="Recuerda que los cupos son limitados!"
                link="/agenda"
              />
              <div className="p-2 md:p-10 bg-zinc-50 rounded-xl ">
                <CalendarVolunteer sessions={sessions} isReduce={true} />
              </div>
            </div>
            <div className="gap-5 flex flex-col bg-white rounded-2xl p-3 md:p-5 w-full max-h-[400px] lg:max-h-[500px]">
              <CardTitle
                title="Mi actividad ✨"
                subtitle="Vea todas las sesiones en las que ha participado."
                link="/profil"
              />
              <ActivityCard volunteerWithSession={volunteerWithSession} handleOpenModal={handleOpenModal} />
            </div>
          </div>
        </div>
      )}

      {sessionSelected && (
        <SessionModal sessionId={sessionSelected} dialogRef={dialogRef} />
      )}
    </div>
  );
};

export default VolunteerPage;
