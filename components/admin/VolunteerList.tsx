"use client";

import { useState } from "react";
import UnregisterVolunteer from "./UnregisterVolunteer";
import UpdateStatus from "./UpdateStatus";
import { RegisteredVolunteer } from "@/type";

interface VolunteerListProps {
  sessionId: number;
  registeredVolunteers: RegisteredVolunteer[];
}

const VolunteerRow = ({
  reg,
  sessionId,
}: {
  reg: RegisteredVolunteer;
  sessionId: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer hover:bg-zinc-50 transition"
      >
        <td className="px-4 py-3 text-sm font-medium text-myzinc whitespace-nowrap">
          {reg.firstName} {reg.lastName}
        </td>
        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
          <UpdateStatus registrationId={reg.registrationId} status={reg.status} />
        </td>
        <td className="px-4 py-3 text-zinc-300 text-xs text-right pr-5">
          <i className={`fa-solid fa-chevron-${isOpen ? "up" : "down"}`}></i>
        </td>
      </tr>

      {isOpen && (
        <tr className="bg-zinc-50/70">
          <td colSpan={3} className="px-6 py-3 border-t border-zinc-100">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">
                  Número
                </p>
                <p className="text-sm text-myzinc">{reg.phone || "—"}</p>
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <UnregisterVolunteer
                  sessionId={sessionId}
                  clerkUserId={reg.clerkUserId}
                />
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const VolunteerList = ({ registeredVolunteers, sessionId }: VolunteerListProps) => {
  return (
    <div className="w-full bg-white rounded-xl overflow-hidden border border-zinc-200 text-myzinc">
      <table className="w-full text-sm">
        <thead className="bg-zinc-100">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Nombre
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Asistencia
            </th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {registeredVolunteers.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-4 py-8 text-center text-mygray text-sm">
                Ningún voluntario inscrito aún.
              </td>
            </tr>
          ) : (
            registeredVolunteers.map((reg) => (
              <VolunteerRow key={reg.registrationId} reg={reg} sessionId={sessionId} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerList;
