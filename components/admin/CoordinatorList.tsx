"use client";

import { useState } from "react";
import UnregisterButton from "../session/UnregisterButton";
import { useAuth } from "@clerk/nextjs";
import { RegisteredVolunteer } from "@/type";

interface CoordinatorListProps {
  liders: RegisteredVolunteer[];
  sessionId: number;
  sessionDate: Date;
}

const LiderRow = ({
  lider,
  sessionId,
  currentUserId,
}: {
  lider: RegisteredVolunteer;
  sessionId: number;
  currentUserId: string | null | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isCurrentUser = currentUserId === lider.clerkUserId;

  return (
    <>
      <tr
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer hover:bg-zinc-50 transition"
      >
        <td className="px-4 py-3 text-sm font-medium text-myzinc whitespace-nowrap">
          {lider.firstName} {lider.lastName.slice(0, 1)}.
        </td>
        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
          {isCurrentUser && (
            <UnregisterButton sessionId={sessionId} isReduce={true} isAdmin={true} />
          )}
        </td>
        <td className="px-4 py-3 text-zinc-300 text-xs text-right pr-5">
          <i className={`fa-solid fa-chevron-${isOpen ? "up" : "down"}`}></i>
        </td>
      </tr>

      {isOpen && (
        <tr className="bg-zinc-50/70">
          <td colSpan={3} className="px-6 py-3 border-t border-zinc-100">
            <div>
              <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">
                Número
              </p>
              <p className="text-sm text-myzinc">{lider.phone || "—"}</p>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const CoordinatorList = ({ liders, sessionId }: CoordinatorListProps) => {
  const { userId } = useAuth();

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden border border-zinc-200 text-myzinc">
      <table className="w-full text-sm">
        <thead className="bg-zinc-100">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Nombre
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Acción
            </th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {liders.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-4 py-8 text-center text-mygray text-sm">
                Ningún coordinador inscrito aún.
              </td>
            </tr>
          ) : (
            liders.map((lider) => (
              <LiderRow
                key={lider.clerkUserId}
                lider={lider}
                sessionId={sessionId}
                currentUserId={userId}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CoordinatorList;
