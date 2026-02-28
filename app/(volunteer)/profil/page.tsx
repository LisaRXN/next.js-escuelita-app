"use client";

import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import ProfilForm from "./_components/ProfilForm";

export default function VolunteerProfil() {
  const { isLoaded, userId } = useAuth();

  const { data: volunteer, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetcher(`/api/user/${userId}`),
    enabled: !!userId,
  });

  if (!isLoaded || isLoading) {
    return (
      <main className="text-center p-20 flex flex-col items-center justify-start gap-4 m-auto text-mylightgray">
        <span className="loading loading-spinner loading-xl"></span>
        <p>Cargando...</p>
      </main>
    );
  }

  return (
    <main className="p-2 md:p-10 flex flex-col items-start justify-start bg-myteal min-h-screen max-w-screen-2xl m-auto">
      <h1 className="p-4 text-[40px] font-bold font-montserrat mb-3 md:mb-6 text-white">
        Mi perfil
      </h1>

      <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
        {/* Stat card */}
        <div className="w-full lg:w-auto lg:min-w-[260px] flex flex-col gap-4">
          <div className="bg-white rounded-xl p-6 border border-zinc-200 flex flex-col gap-3">
            <h2 className="text-lg font-bold text-myzinc">Mi actividad</h2>
            <div
              className={`p-1 rounded-lg overflow-hidden flex items-center justify-start ${volunteer?.tutoringCount >= 6 ? "bg-mygreen" : "bg-myorange"}`}
            >
              <div className="flex-1 text-white p-4 flex items-center gap-2 text-sm font-medium">
                <i className="fa-solid fa-hand-holding-heart"></i>
                <span>Tutorías completadas</span>
              </div>
              <span className="bg-white text-myzinc font-bold p-4 text-lg rounded-md">
                {volunteer?.tutoringCount ?? 0}
              </span>
            </div>
            {volunteer?.tutoringCount >= 6 && (
              <p className="text-sm text-mygreen font-medium">
                ¡Felicidades! Has alcanzado las 6 tutorías. 🎉
              </p>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="w-full">
          {volunteer && (
            <ProfilForm
              firstName={volunteer.firstName}
              lastName={volunteer.lastName}
              phone={volunteer.phone}
              instagram={volunteer.instagram}
              birthDate={volunteer.birthDate}
            />
          )}
        </div>
      </div>
    </main>
  );
}
