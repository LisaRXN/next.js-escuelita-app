"use client";

import { useState } from "react";
import { Volunteer } from "@/generated/prisma";
import ToggleActiveButton from "@/components/admin/ToggleActiveButton";

interface UserCardProps {
  user: Volunteer & { tutoringCount?: number };
}

const UserCard = ({ user }: UserCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const formattedDate = new Date(user.birthDate).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <>
      {/* Main row */}
      <tr
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer hover:bg-zinc-50 transition"
      >
        <td className="px-4 py-3 text-sm font-medium text-myzinc whitespace-nowrap">
          {user.firstName} {user.lastName}
        </td>
        <td className="px-4 py-3 text-sm text-mygray max-w-[200px] truncate">
          {user.email}
        </td>
        <td className="px-4 py-3">
          {user.tutoringCount != null && user.tutoringCount >= 6 ? (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-mygreen/10 text-mygreen">
              {user.tutoringCount}
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-500">
              {user.tutoringCount ?? 0}
            </span>
          )}
        </td>
        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
          <ToggleActiveButton user={user} />
        </td>
        <td className="px-4 py-3 text-zinc-300 text-xs text-right pr-5">
          <i className={`fa-solid fa-chevron-${isOpen ? "up" : "down"}`}></i>
        </td>
      </tr>

      {/* Expanded detail row */}
      {isOpen && (
        <tr className="bg-zinc-50/70">
          <td colSpan={5} className="px-6 py-4 border-t border-zinc-100">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-sm">
              <div>
                <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">
                  Teléfono
                </p>
                <p className="text-myzinc">{user.phone || "—"}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">
                  Instagram
                </p>
                <p className="text-myzinc">{user.instagram || "—"}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">
                  Fecha de nacimiento
                </p>
                <p className="text-myzinc">{formattedDate}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default UserCard;
