import {useState} from "react";
import { Volunteer } from "@/generated/prisma";
import ToggleActiveButton from "@/components/admin/ToggleActiveButton";

interface UserListProps {
  users: Volunteer[];
  user: Volunteer & {
    tutoringCount?:number;
  };
}

export default function UserListMobile({ user }: UserListProps) {

  const [open, setOpen] = useState(false);

  return (

    <div className="border rounded-lg mb-2 overflow-hidden shadow-sm w-full max-w-[500px]">
    {/* En-tête pliable */}
    <button
      className="w-full flex items-center justify-between px-4 py-3 bg-zinc-100 hover:bg-zinc-200 transition"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center gap-2">
        <i className={`fa-solid ${user.isActive ? "fa-check text-green-600" : "fa-xmark text-red-500"}`}></i>
        <span className="font-medium text-zinc-800">{user.firstName} {user.lastName}</span>
      </div>
      <i className={`fa-solid fa-chevron-${open ? "up" : "down"} text-zinc-500`}></i>
    </button>

    {/* Détail affiché si ouvert */}
    {open && (
      <div className="px-4 py-3 bg-white text-sm text-zinc-700 space-y-2 text-start">
        <div><strong>Número:</strong> {user.phone}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Instagram:</strong> {user.instagram || "-"}</div>
        <div><strong>Fecha de nacimiento:</strong> {
          new Intl.DateTimeFormat("es-ES", {
            day: "numeric",
            month: "short",
            year: "numeric"
          }).format(new Date(user.birthDate))
        }</div>
        <div><strong>N° de tutorías:</strong>         {user.tutoringCount != null && user.tutoringCount >= 6 ? (
          <span className="text-mygreen font-bold">{user.tutoringCount}</span>
        ) : (
          <span className="text-orange-500 font-bold">{user.tutoringCount}</span>
        )}</div>
        <div><strong>Activo:</strong> {user.isActive ? "Sí" : "No"}</div>
        <div className="pt-2">
          <ToggleActiveButton user={user}  />
        </div>
      </div>
    )}
  </div>
  );
}
