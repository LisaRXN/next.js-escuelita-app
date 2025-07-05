"use client";

import { Volunteer } from "@/generated/prisma";
import ToggleActiveButton from "@/components/admin/ToggleActiveButton";

interface UserCardProps {
  user: Volunteer & {
    tutoringCount?: number;
  };
}
const UserCard = ({ user }: UserCardProps) => {
  

  return (
    <tr key={user.id} className="hover:bg-zinc-50">
      <td className="px-2 text-sm xl:px-6 py-4 whitespace-nowrap text-left">
        {user.firstName}
      </td>
      <td className="px-2 text-sm xl:px-6 py-4 whitespace-nowrap text-left">{user.lastName}</td>
      <td className="px-2 text-sm xl:px-6 py-4 whitespace-nowrap text-left">{user.phone}</td>
      <td className="px-2 text-sm xl:px-6 py-4 whitespace-nowrap text-left">{user.email}</td>
      <td className="px-2 text-sm xl:px-6 py-4 whitespace-nowrap text-left">
        {user.instagram || "-"}
      </td>
      <td className="px-2 text-sm xl:px-6 py-4 whitespace-nowrap text-left">
        {new Intl.DateTimeFormat("es-ES", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }).format(new Date(user.birthDate))}
      </td>
      <td className="px-2 text-sm xl:px-6 py-4 whitespace-nowrap text-left">
        {user.tutoringCount != null && user.tutoringCount >= 6 ? (
          <span className="text-mygreen font-bold">{user.tutoringCount}</span>
        ) : (
          <span className="text-orange-500 font-bold">{user.tutoringCount}</span>
        )}
      </td>
      <td className="px-2 text-sm xl:px-6 py-4 whitespace-nowrap text-left">
        {user.isActive ? (
          <span className="">Si</span>
        ) : (
          <span className="">No</span>
        )}
      </td>
      <td className="px-2 text-sm py-4 whitespace-nowrap text-left">
        <ToggleActiveButton
          user={user}
        />
      </td>
    </tr>
  );
};

export default UserCard;
