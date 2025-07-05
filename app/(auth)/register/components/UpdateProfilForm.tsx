"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateVolunteer } from "@/actions/admin/update-volunteer";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { FormErrors } from "@/components/form/form-errors";

export default function UpdateProfilForm() {

  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    instagram: "",
    birthDate: "",
  });


  const router = useRouter();
  const { execute, fieldErrors } = useAction(updateVolunteer, {
    onSuccess: () => {
      toast.success(`Gracias, tu perfil esta completo!`);
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        instagram: "",
        birthDate: "",
      });
      router.push("/");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("datas", formData);
    execute(formData);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" w-full max-w-[600px] mx-auto bg-white rounded-xl p-10 border border-zinc-300 flex flex-col gap-4 items-start"
    >
      <h1 className="text-xl font-bold text-center w-full">
        ¡Solo un paso más!
      </h1>
      <p className="text-lg w-full text-center">Completa tu perfil para acceder a la plataforma.</p>
      <div className="w-full">
        <label className="block font-medium text-start mb-2">Nombre*</label>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          placeholder="Nombre"
          className="w-full border rounded p-2 bg-zinc-50"
        />
        <FormErrors id="firstName" errors={fieldErrors} />
      </div>
      <div className="w-full">
        <label className="block font-medium text-start mb-2">Apellido*</label>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          placeholder="Apellido"
          className="w-full border rounded p-2 bg-zinc-50"
        />
        <FormErrors id="lastName" errors={fieldErrors} />
      </div>
      <div className="w-full">
        <label className="block font-medium text-start mb-2">
          Número de celular*
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="900900900"
          className="w-full border rounded p-2 bg-zinc-50"
        />
        <FormErrors id="phone" errors={fieldErrors} />
      </div>
      <div className="w-full">
        <label className="block font-medium text-start mb-2">
          Fecha de nacimiento*
        </label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={(e) => handleChange("birthDate", e.target.value)}
          className="w-full border rounded p-2 bg-zinc-50"
        />
      </div>
      <div className="w-full">
        <label className="block font-medium text-start mb-2">
          Cuenta instagram
        </label>
        <input
          name="instagram"
          value={formData.instagram}
          onChange={(e) => handleChange("instagram", e.target.value)}
          placeholder="Instagram"
          className="w-full border rounded p-2 bg-zinc-50"
        />
        <div className="py-2 flex items-start justify-start gap-2 mb-2">
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
        disabled={!formData.firstName || !formData.lastName || !formData.phone || !formData.birthDate}
        className="self-end bg-myorange hover:bg-myorange/80 transition transform duration-200 focus:scale-95 text-white px-6 py-2.5 rounded"
      >
        Enviar
      </button>
    </form>
  )
}
