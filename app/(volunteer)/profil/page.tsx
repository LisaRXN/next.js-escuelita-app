"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { updateProfile } from "@/actions/volunteer/update-profile";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";

// ── composant ligne info ──────────────────────────────────────────────────────

function InfoRow({ label, icon, value, last = false }: { label: string; icon: string; value: string; last?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-3 ${!last ? "border-b border-zinc-50" : ""}`}>
      <div className="flex items-center gap-2.5">
        <i className={`${icon} text-zinc-300 w-4 text-center text-sm`} />
        <span className="text-zinc-400 text-sm">{label}</span>
      </div>
      <span className="text-myzinc text-sm font-medium text-right max-w-xs">{value || "—"}</span>
    </div>
  );
}

// ── composant champ édition ───────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

const INPUT = "w-full border border-zinc-200 rounded-xl px-3 py-2.5 text-sm text-myzinc bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-myteal/30 focus:border-myteal transition";

// ── page ──────────────────────────────────────────────────────────────────────

export default function VolunteerProfil() {
  const { isLoaded, userId, signOut } = useAuth();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", instagram: "", birthDate: "" });

  const { data: volunteer, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetcher(`/api/user/${userId}`),
    enabled: !!userId,
  });

  const { execute, isLoading: isSaving } = useAction(updateProfile, {
    onSuccess: () => {
      toast.success("¡Perfil actualizado con éxito!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setEditing(false);
    },
    onError: (err) => toast.error(err),
  });

  const startEditing = () => {
    setForm({
      firstName: volunteer?.firstName ?? "",
      lastName: volunteer?.lastName ?? "",
      phone: volunteer?.phone ?? "",
      instagram: volunteer?.instagram ?? "",
      birthDate: volunteer?.birthDate ? String(volunteer.birthDate).split("T")[0] : "",
    });
    setEditing(true);
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-32 text-zinc-400">
        <span className="loading loading-spinner loading-xl" />
        <p>Cargando...</p>
      </div>
    );
  }

  if (!volunteer) return null;

  const initials = `${volunteer.firstName?.[0] ?? ""}${volunteer.lastName?.[0] ?? ""}`.toUpperCase();
  const birthDate = volunteer.birthDate
    ? new Date(volunteer.birthDate).toLocaleDateString("es-PE", { day: "2-digit", month: "long", year: "numeric" })
    : "—";
  const memberSince = volunteer.createdAt
    ? new Date(volunteer.createdAt).toLocaleDateString("es-PE", { month: "long", year: "numeric" })
    : "—";

  return (
    <main className="min-h-screen w-full pb-10 px-4 md:px-10 pt-8">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 items-start">

        {/* ── Colonne gauche : carte profil ── */}
        <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-4">

          {/* Carte identité */}
          <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden shadow-sm">
            {/* Bandeau teal */}
            <div className="bg-myteal px-6 pt-8 pb-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-3">
                <span className="text-white text-3xl font-bold">{initials}</span>
              </div>
              <h1 className="text-white text-lg font-bold leading-tight">{volunteer.firstName} {volunteer.lastName}</h1>
              <p className="text-white/70 text-xs mt-1 truncate max-w-full">{volunteer.email}</p>
              <div className="flex items-center gap-2 mt-3">
                {volunteer.isActive ? (
                  <span className="bg-green-400/30 text-white text-xs font-medium px-3 py-1 rounded-full">Activo</span>
                ) : (
                  <span className="bg-orange-400/30 text-white text-xs font-medium px-3 py-1 rounded-full">Pendiente</span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="divide-y divide-zinc-50">
              <div className="flex items-center justify-between px-5 py-3.5">
                <span className="text-zinc-400 text-sm">Tutorías</span>
                <span className="text-myteal font-bold text-lg">{volunteer.tutoringCount ?? 0}</span>
              </div>
              <div className="flex items-center justify-between px-5 py-3.5">
                <span className="text-zinc-400 text-sm">Inscripciones</span>
                <span className="text-myteal font-bold text-lg">{volunteer.registrations?.length ?? 0}</span>
              </div>
              <div className="flex items-center justify-between px-5 py-3.5">
                <span className="text-zinc-400 text-sm">Miembro desde</span>
                <span className="text-myzinc font-medium text-xs capitalize text-right">{memberSince}</span>
              </div>
            </div>
          </div>

          {/* Cerrar sesión */}
          <button
            onClick={() => signOut()}
            className="w-full bg-white border border-red-100 rounded-2xl p-4 text-myred font-semibold text-sm hover:bg-red-50 transition"
          >
            Cerrar sesión
          </button>
        </div>

        {/* ── Colonne droite : informations ── */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-myzinc text-base">Información personal</h2>
              {!editing && (
                <button onClick={startEditing} className="text-myteal text-sm font-medium hover:text-myteal/70 transition">
                  Editar
                </button>
              )}
            </div>

            {editing ? (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Nombre">
                    <input className={INPUT} value={form.firstName} onChange={(e) => setForm(f => ({ ...f, firstName: e.target.value }))} />
                  </Field>
                  <Field label="Apellidos">
                    <input className={INPUT} value={form.lastName} onChange={(e) => setForm(f => ({ ...f, lastName: e.target.value }))} />
                  </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Teléfono">
                    <input className={INPUT} type="tel" value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="900900900" />
                  </Field>
                  <Field label="Instagram">
                    <input className={INPUT} value={form.instagram} onChange={(e) => setForm(f => ({ ...f, instagram: e.target.value }))} placeholder="@usuario" autoComplete="off" />
                  </Field>
                </div>
                <Field label="Fecha de nacimiento">
                  <input className={INPUT} type="date" value={form.birthDate} onChange={(e) => setForm(f => ({ ...f, birthDate: e.target.value }))} />
                </Field>
                <div className="flex gap-3 pt-2 justify-end">
                  <button
                    onClick={() => setEditing(false)}
                    className="px-5 py-2.5 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => execute(form)}
                    disabled={isSaving || !form.firstName || !form.lastName || !form.phone || !form.birthDate}
                    className="px-5 py-2.5 bg-myteal text-white rounded-xl text-sm font-semibold hover:bg-myteal/90 transition disabled:opacity-50"
                  >
                    {isSaving ? "Guardando..." : "Guardar cambios"}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <InfoRow label="Nombre" icon="fa-solid fa-user" value={`${volunteer.firstName} ${volunteer.lastName}`} />
                <InfoRow label="Teléfono" icon="fa-solid fa-phone" value={volunteer.phone} />
                <InfoRow label="Instagram" icon="fa-brands fa-instagram" value={volunteer.instagram ? `@${volunteer.instagram.replace(/^@/, "")}` : "—"} />
                <InfoRow label="Fecha de nacimiento" icon="fa-solid fa-cake-candles" value={birthDate} last />
              </>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
