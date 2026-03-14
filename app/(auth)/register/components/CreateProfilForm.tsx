"use client";

import { createVolunteer } from "@/actions/admin/create-volunteer";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { FormErrors } from "@/components/form/form-errors";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const INPUT = "w-full border border-zinc-200 rounded-xl px-3 py-2.5 text-sm text-myzinc bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-myteal/30 focus:border-myteal transition";
const LABEL = "block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5";

export default function CreateProfilForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { isLoaded, userId } = useAuth();

  const { execute, fieldErrors, isLoading } = useAction(createVolunteer, {
    onSuccess: () => {
      toast.success("¡Gracias, tu perfil está completo!");
      formRef.current?.reset();
      router.push("/dashboard");
    },
    onError: (error) => toast.error(error),
  });

  const onSubmit = (formData: FormData) => {
    const firstName = formData.get("firstName")?.toString().trim() || "";
    const lastName  = formData.get("lastName")?.toString().trim()  || "";
    const email     = formData.get("email")?.toString().trim()     || "";
    const phone     = formData.get("phone")?.toString().trim()     || "";
    const instagram = formData.get("instagram")?.toString().trim() || "";
    const birthDate = formData.get("birthDate")?.toString()        || "";

    if (!firstName || !lastName || !email || !phone || !birthDate) {
      toast.error("Por favor, completa todos los campos obligatorios.");
      return;
    }

    execute({ firstName, lastName, email, phone, instagram, birthDate });
  };

  if (!isLoaded || !userId) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-white/50">
        <span className="loading loading-spinner loading-lg" />
        <p className="text-sm">Cargando...</p>
      </div>
    );
  }

  return (
    <form
      action={onSubmit}
      ref={formRef}
      className="w-full bg-white rounded-2xl border border-zinc-100 p-6 flex flex-col gap-4"
    >
      {/* Nombre + Apellido */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Nombre *</label>
          <input type="text" name="firstName" placeholder="Nombre" className={INPUT} required />
          <FormErrors id="firstName" errors={fieldErrors} />
        </div>
        <div>
          <label className={LABEL}>Apellido *</label>
          <input type="text" name="lastName" placeholder="Apellido" className={INPUT} required />
          <FormErrors id="lastName" errors={fieldErrors} />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className={LABEL}>Email *</label>
        <input type="email" name="email" placeholder="correo@ejemplo.com" className={INPUT} required />
        <FormErrors id="email" errors={fieldErrors} />
      </div>

      {/* Teléfono + Fecha nacimiento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Número de celular *</label>
          <input type="tel" name="phone" placeholder="900900900" className={INPUT} required />
          <FormErrors id="phone" errors={fieldErrors} />
        </div>
        <div>
          <label className={LABEL}>Fecha de nacimiento *</label>
          <input type="date" name="birthDate" className={INPUT} required />
          <FormErrors id="birthDate" errors={fieldErrors} />
        </div>
      </div>

      {/* Instagram */}
      <div>
        <label className={LABEL}>Instagram <span className="normal-case font-normal text-zinc-300">(opcional)</span></label>
        <input type="text" name="instagram" placeholder="@usuario" className={INPUT} autoComplete="off" />
        <p className="text-xs text-zinc-400 mt-1.5 flex items-start gap-1.5">
          <i className="fa-solid fa-circle-info mt-0.5 shrink-0" />
          Déjala solo si aceptas que te etiquetemos en nuestras publicaciones o historias.
        </p>
        <FormErrors id="instagram" errors={fieldErrors} />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2.5 bg-myteal text-white rounded-xl text-sm font-semibold hover:bg-myteal/90 transition disabled:opacity-50 mt-1"
      >
        {isLoading ? "Guardando..." : "Completar perfil"}
      </button>
    </form>
  );
}
