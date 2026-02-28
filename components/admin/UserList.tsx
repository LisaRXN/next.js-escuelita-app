import React from "react";
import { Volunteer } from "@/generated/prisma";
import UserCard from "./UserCard";

interface UserListProps {
  volunteers: (Volunteer & { tutoringCount?: number })[];
}

export default function UserList({ volunteers }: UserListProps) {
  if (!volunteers || volunteers.length === 0) {
    return <p className="text-mylightgray">Aucun utilisateur trouvé.</p>;
  }

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden border border-zinc-200">
      <table className="w-full text-sm">
        <thead className="bg-zinc-100">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Nombre
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Email
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Sesiones
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Estado
            </th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {volunteers.map((volunteer) => (
            <UserCard key={volunteer.id} user={volunteer} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
