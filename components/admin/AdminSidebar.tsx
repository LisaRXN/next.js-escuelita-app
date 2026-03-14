"use client";

import { useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "fa-house", exact: true },
  { href: "/admin/agenda", label: "Agenda", icon: "fa-calendar-days" },
  { href: "/admin/alumnos", label: "Los alumnos", icon: "fa-users" },
  { href: "/admin/seguimientos", label: "Seguimientos", icon: "fa-clipboard-list" },
  { href: "/admin/users", label: "Los voluntarios", icon: "fa-people-group" },
  { href: "/admin/profil", label: "Mi perfil", icon: "fa-circle-user" },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const pathname = usePathname();

  const close = () => setIsOpen(false);

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo + greeting */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <Link href="/admin" onClick={close}>
          <Image src="/img/logos/logo.png" width={44} height={44} alt="La Escuelita ONG" />
        </Link>
        <div className="min-w-0">
          <p className="text-xs text-white/50 leading-none mb-0.5">Hola,</p>
          <p className="text-sm font-semibold text-white truncate">{user?.firstName} !</p>
        </div>
      </div>

      {/* Crear evento */}
      <div className="px-4 py-4 border-b border-white/10">
        <Link
          href="/admin/sessions/create-session"
          onClick={close}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-myorange hover:bg-myorange/80 text-white text-sm font-semibold rounded-xl transition"
        >
          <i className="fa-solid fa-plus text-xs"></i>
          Crear evento
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-3 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon, exact }) => {
          const active = isActive(href, exact ?? false);
          return (
            <Link
              key={href}
              href={href}
              onClick={close}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-white/10 text-white border-l-[3px] border-myorange pl-[9px]"
                  : "text-white/60 hover:bg-white/5 hover:text-white border-l-[3px] border-transparent pl-[9px]"
              }`}
            >
              <i className={`fa-solid ${icon} w-4 text-center text-[13px]`}></i>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/10 flex items-center gap-3">
        <UserButton
          appearance={{ elements: { avatarBox: { height: 34, width: 34 } } }}
        />
        <p className="text-xs text-white/40 truncate">{user?.primaryEmailAddress?.emailAddress}</p>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Mobile top bar ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-myzinc z-40 flex items-center justify-between px-4 shadow-md">
        <button
          onClick={() => setIsOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition"
        >
          <i className="fa-solid fa-bars text-white text-lg"></i>
        </button>
        <Link href="/admin">
          <Image src="/img/logos/logo.png" width={40} height={40} alt="La Escuelita ONG" />
        </Link>
        <UserButton appearance={{ elements: { avatarBox: { height: 34, width: 34 } } }} />
      </div>

      {/* ── Backdrop (mobile) ── */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={close}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-myzinc z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
