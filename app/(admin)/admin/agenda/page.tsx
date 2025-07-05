"use client";

import Calendar from "@/components/session/Calendar";
import { fetcher } from "@/lib/fetcher";
import { SessionWithLiders } from "@/type";
import { useQuery } from "@tanstack/react-query";

const AgendaPage = () => {
  const { data: sessions, isLoading } = useQuery<SessionWithLiders[]>({
    queryKey: ["sessionsWithLiders"],
    queryFn: () => fetcher("/api/sessionsWithLiders"),
    staleTime: 0,
  });

  if (isLoading) {
    return (
      <div className="pt-20 text-center flex flex-col items-center justify-center gap-2 m-auto text-mylightgray">
        <span className="loading loading-spinner loading-xl"></span>
        <p>Cargando...</p>
      </div>
    );
  }
  return (
    <>
      <main className="p-2 md:p-10 flex flex-col items-start justify-start bg-myteal min-h-screen max-w-screen-2xl m-auto">
        <h1 className="p-4 text-[30px] md:text-[40px] font-bold font-montserrat mb-3 md:mb-6 max-w-[600px] text-white">
          Mis próximos acompañamientos 👥
        </h1>
        <p className="px-4 mb-10 text-lg max-w-[600px] text-justify text-white">
        ¡Cada sesión es una oportunidad para inspirar y acompañar con corazón!
        </p>
        {sessions && (
          <div className="bg-zinc-50 rounded-lg p-2 lg:p-5 w-full  h-auto">
            <Calendar sessions={sessions} />
          </div>
        )}
      </main>
    </>
  );
};

export default AgendaPage;
