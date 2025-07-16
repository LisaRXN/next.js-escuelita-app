"use client";

import VolunteerList from "@/components/admin/VolunteerList";
import CoordinatorList from "@/components/admin/CoordinatorList";
import CardTitle from "../../_components/CardTitle";
import AdminSessionDescription from "@/components/admin/AdminSessionDescription";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { RegisteredVolunteer } from "@/type";

interface AdminSessionPageProps {
  sessionId: number;
}
const AdminSessionPage = ({ sessionId }: AdminSessionPageProps) => {

  const { data, isLoading: loadingSession } = useQuery({
    queryKey: ["sessionById", sessionId],
    queryFn: () => fetcher(`/api/sessions/${sessionId}`),
    enabled: !!sessionId,
    staleTime: 0,
  });

  if (isNaN(sessionId) || loadingSession) {
    return (
      <div className="text-center p-20 flex flex-col items-center justify-start gap-4 m-auto text-myteal">
        <span className="loading loading-spinner loading-xl"></span>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    data && (
      <div className="min-h-screen w-full pt-5 flex flex-col lg:flex-row items-start justify-center gap-5 lg:gap-10 p-2 md:p-10 ">
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center gap-5 w-full lg:w-auto">
          <div className="gap-5 flex flex-col bg-white rounded-2xl p-3 md:p-5 w-full lg:w-auto  min-h-[250px] lg:min-w-[550px]">
            <CardTitle
              title="Detailles del evento"
              subtitle="Modifica o inscribete a la sesión"
              link=""
            />
            <AdminSessionDescription sessionId={data.session?.id} />
          </div>
        </div>
        <div className="flex-1 flex flex-col items-start justify-start gap-5 lg:gap-10 w-full">
          <div className="gap-5 flex flex-col bg-white rounded-2xl p-3 md:p-5 w-full">
            <CardTitle
              title="Lista de los coordinadores  ⭐"
              subtitle="Apuntate para liderar el grupo!"
              link=""
            />
            <CoordinatorList
              sessionId={data.session.id}
              sessionDate={data.session.date}
              liders={data.registeredVolunteers.filter(
                (vol: RegisteredVolunteer) => vol.isAdmin === true
              )}
            />
          </div>
          <div className="gap-5 flex flex-col bg-white rounded-2xl p-3 md:p-5 w-full">
            <CardTitle
              title="Lista de los voluntarios inscritos  🙋‍♂️🙋‍♀️"
              subtitle="Completa la asistencia de los voluntarios despues de la sesión"
              link=""
            />
            <VolunteerList
            sessionId={sessionId}
              registeredVolunteers={data.registeredVolunteers.filter(
                (vol: RegisteredVolunteer) => !vol.isAdmin
              )}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default AdminSessionPage;
