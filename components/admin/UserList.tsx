import React from "react";
import { Volunteer } from "@/generated/prisma";
import UserCard from "./UserCard";


interface UserListProps {
  volunteers: Volunteer[];
}

export default function UserList({ volunteers }: UserListProps) {

  
 
    if (!volunteers || volunteers.length === 0) {
      return <p className="text-mylightgray">Aucun utilisateur trouvé.</p>;
    }


  return (
      <div className="space-y-10">

        <table className="min-w-full divide-y divide-zinc-200 rounded-lg overflow-hidden">
        <thead className="bg-zinc-200 text-myzinc">
          <tr>
            <th className="px-2 lg:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Nombre</th>
            <th className="px-2 lg:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Apellido</th>
            <th className="px-2 lg:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Número</th>
            <th className="px-2 lg:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Email</th>
            <th className="px-2 lg:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Instagram</th>
            <th className="px-2 lg:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Fecha de nacimiento</th>
            <th className="px-2 lg:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">N° de tutorias</th>
            <th className="px-2 lg:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Activo</th>
            <th className="px-2 lg:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Acción</th>
          </tr>
        </thead>  
        <tbody className="bg-white divide-y divide-zinc-200">
          {volunteers?.map((volunteer) => (
            <UserCard key={volunteer.id} user={volunteer} />
          ))}
        </tbody>
        </table>
        </div>
  
  );
}
