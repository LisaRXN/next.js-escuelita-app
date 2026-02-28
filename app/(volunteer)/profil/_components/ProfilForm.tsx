"use client";

import { useState } from "react";
import { updateProfile } from "@/actions/volunteer/update-profile";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { FormErrors } from "@/components/form/form-errors";

interface ProfilFormProps {
  firstName: string;
  lastName: string;
  phone: string;
  instagram: string | null;
  birthDate: string;
}

export default function ProfilForm({
  firstName,
  lastName,
  phone,
  instagram,
  birthDate,
}: ProfilFormProps) {
  const [formData, setFormData] = useState({
    firstName,
    lastName,
    phone,
    instagram: instagram ?? "",
    birthDate: birthDate ? birthDate.split("T")[0] : "",
  });

  const { execute, fieldErrors, isLoading } = useAction(updateProfile, {
    onSuccess: () => {
      toast.success("¡Perfil actualizado con éxito!");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white rounded-xl p-6 md:p-10 border border-zinc-200 flex flex-col gap-4 items-start"
    >
      <h2 className="text-xl font-bold text-myzinc">Mis datos personales</h2>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-myzinc mb-2">Nombre*</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            placeholder="Nombre"
            className="w-full border rounded p-2 bg-zinc-50 text-myzinc"
          />
          <FormErrors id="firstName" errors={fieldErrors} />
        </div>

        <div>
          <label className="block font-medium text-myzinc mb-2">Apellido*</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            placeholder="Apellido"
            className="w-full border rounded p-2 bg-zinc-50 text-myzinc"
          />
          <FormErrors id="lastName" errors={fieldErrors} />
        </div>
      </div>

      <div className="w-full">
        <label className="block font-medium text-myzinc mb-2">
          Número de celular*
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="900900900"
          className="w-full border rounded p-2 bg-zinc-50 text-myzinc"
        />
        <FormErrors id="phone" errors={fieldErrors} />
      </div>

      <div className="w-full">
        <label className="block font-medium text-myzinc mb-2">
          Fecha de nacimiento*
        </label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={(e) => handleChange("birthDate", e.target.value)}
          className="w-full border rounded p-2 bg-zinc-50 text-myzinc"
        />
        <FormErrors id="birthDate" errors={fieldErrors} />
      </div>

      <div className="w-full">
        <label className="block font-medium text-myzinc mb-2">
          Cuenta Instagram
        </label>
        <input
          name="instagram"
          value={formData.instagram}
          onChange={(e) => handleChange("instagram", e.target.value)}
          placeholder="@miusuario"
          className="w-full border rounded p-2 bg-zinc-50 text-myzinc"
        />
        <div className="py-2 flex items-start justify-start gap-2">
          <i className="fa-solid fa-circle-info text-mygray text-lg"></i>
          <p className="text-sm text-mygray">
            Déjala solo si aceptas que te etiquetemos en nuestras publicaciones
            o historias.
          </p>
        </div>
        <FormErrors id="instagram" errors={fieldErrors} />
      </div>

      <button
        type="submit"
        disabled={
          isLoading ||
          !formData.firstName ||
          !formData.lastName ||
          !formData.phone ||
          !formData.birthDate
        }
        className="self-end bg-myorange hover:bg-myorange/80 transition transform duration-200 focus:scale-95 text-white px-6 py-2.5 rounded disabled:opacity-60"
      >
        {isLoading ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
