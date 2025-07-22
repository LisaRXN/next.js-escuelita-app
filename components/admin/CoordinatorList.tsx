"use client";

import UnregisterButton from "../session/UnregisterButton";
import { useAuth } from "@clerk/nextjs";
import { RegisteredVolunteer } from "@/type";


interface CoordinatorListProps {
  liders: RegisteredVolunteer[];
  sessionId: number;
  sessionDate: Date;
}

const CoordinatorList = ({
  liders,
  sessionId,
}: CoordinatorListProps) => {
  const { userId } = useAuth();

  return (
    <div className="border border-zinc-400 rounded-lg w-full overflow-x-auto text-myzinc">
      <table className="min-w-full divide-y divide-zinc-200 rounded-lg overflow-hidden">
        <thead className="bg-zinc-200 text-myzinc w-full">
          <tr>
            <th className="px-2 md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-user"></i> Nombre
              </div>
            </th>
            <th className="px-2 md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-phone"></i> Número
              </div>
            </th>
            <th className="px-2 md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider0">
              <span className="flex items-center justify-start gap-2">
                <i className="fa-solid fa-users"></i>
                <p>Asistencia</p>
              </span>
            </th>
          </tr>
        </thead>
        <tbody className=" divide-y divide-zinc-200">
          {liders.map((lider) => (
            <tr key={lider.clerkUserId} className="hover:bg-zinc-50">
              <td className="px-2 md:px-6 py-4 text-sm whitespace-nowrap">
                {lider.firstName}{" "}
                {lider.lastName.slice(0, 1)}.
              </td>
              <td className="px-2 md:px-6 py-4 text-sm whitespace-nowrap">
                {lider.phone}
              </td>
              <td className="px-2 md:px-6 py-4 text-sm whitespace-nowrap">
                {userId === lider.clerkUserId ? (
                  <UnregisterButton
                    sessionId={sessionId}
                    isReduce={true}
                  isAdmin={true}
                  />
                ) : ('')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoordinatorList;
