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

        <table className="min-w-full divide-y divide-zinc-200 rounded-lg overflow-hidden p-2">
        <thead className="bg-zinc-200 text-myzinc">
          <tr>
            <th className="px-2 lg:px-4 py-3 text-left text-xs xl:text-sm font-bold uppercase tracking-wider">Nombre</th>
            <th className="px-2 lg:px-4 py-3 text-left text-xs xl:text-sm font-bold uppercase tracking-wider">Apellido</th>
            <th className="px-2 lg:px-4 py-3 text-left text-xs xl:text-sm font-bold uppercase tracking-wider"><i className="fa-solid fa-phone"></i></th>
            <th className="px-2 lg:px-4 py-3 text-left text-xs xl:text-sm font-bold uppercase tracking-wider"><i className="fa-solid fa-envelope"></i></th>
            <th className="px-2 lg:px-4 py-3 text-left text-xs xl:text-sm font-bold uppercase tracking-wider"><i className="fa-brands fa-instagram"></i></th>
            <th className="px-2 lg:px-4 py-3 text-left text-xs xl:text-sm font-bold uppercase tracking-wider"><i className="fa-solid fa-cake-candles"></i></th>
            <th className="px-2 lg:px-4 py-3 text-left text-xs xl:text-sm font-bold uppercase tracking-wider"><i className="fa-solid fa-pencil"></i></th>
            <th className="px-2 lg:px-4 py-3 text-left text-xs xl:text-sm font-bold uppercase tracking-wider">Acción</th>
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
