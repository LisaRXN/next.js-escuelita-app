"use client";

import Link from "next/link";
import CreateSessionForm from "../_components/CreateSessionForm";

export default function AdminSessionsCreatePage() {
  return (
    <main className="min-h-screen bg-zinc-50 pb-10">
      <div className="bg-[#193252] px-4 md:px-8 pt-8 pb-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-4 transition-colors"
        >
          <i className="fa-solid fa-arrow-left text-xs" />
          Volver
        </Link>
        <h1 className="text-white text-3xl font-extrabold font-montserrat">Nueva sesión</h1>
        <p className="text-white/60 text-sm mt-1">Completa los campos para crear la sesión</p>
      </div>
      <div className="px-4 md:px-8 pt-6 max-w-2xl">
        <CreateSessionForm />
      </div>
    </main>
  );
}
