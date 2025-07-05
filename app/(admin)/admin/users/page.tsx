"use client";

import { useEffect, useState } from "react";
import UserList from "@/components/admin/UserList";
import UserListMobile from "@/components/admin/UserListMobile";
import FilterBar from "./_components/FilterBar";
import { VolunteerWithTutoringCount } from "@/type";
import { useFetchUsers } from '@/hooks/use-fetch-users';

export default function AdminSessionsListPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [isActive, setIsActive] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);

  const { data: volunteers, isLoading } = useFetchUsers(search, isActive, sortBy);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1000);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <>
      <main className="text-center px-2 md:px-8 flex flex-col gap-10 items-center justify-start m-auto pt-10 w-full">
        <h1 className="text-[40px] font-bold font-montserrat max-w-[600px] text-white">
          Todos los voluntarios
        </h1>
        <FilterBar
          setSearch={setSearch}
          isActive={isActive}
          setIsActive={setIsActive}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {isLoading ? (
          <div className="text-center p-20 flex flex-col items-center justify-start gap-4 m-auto text-mylightgray">
            <span className="loading loading-spinner loading-xl"></span>
            <p>Cargando...</p>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            {volunteers && !isMobile ? (
              <UserList volunteers={volunteers as VolunteerWithTutoringCount[]} />
            ) : (
              volunteers?.map((user: VolunteerWithTutoringCount) => (
                <UserListMobile key={user.id} user={user} users={volunteers} />
              ))
            )}
          </div>
        )}
      </main>
    </>
  );
}
