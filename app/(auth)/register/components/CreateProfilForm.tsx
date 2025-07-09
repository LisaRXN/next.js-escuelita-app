"use client";

import { createVolunteer } from "@/actions/admin/create-volunteer";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { FormErrors } from "@/components/form/form-errors";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function CreateProfilForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { isLoaded, userId } = useAuth();

  const { execute, fieldErrors, isLoading } = useAction(createVolunteer, {
    onSuccess: () => {
      toast.success("Gracias, tu perfil está completo!");
      formRef.current?.reset();
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(error);
    },
  })

  // const { execute, fieldErrors, isLoading } = useCreateVolunteer( {
  //   onSuccess: () => {
  //     toast.success("Gracias, tu perfil está completo!");
  //     formRef.current?.reset();
  //     router.push("/");
  //   },
  //   onError: (error) => {
  //     toast.error(error);
  //   },
  // });

  const onSubmit = (formData: FormData) => {
    const firstName = formData.get("firstName")?.toString().trim() || "";
    const lastName = formData.get("lastName")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const phone = formData.get("phone")?.toString().trim() || "";
    const instagram = formData.get("instagram")?.toString().trim() || "";
    const birthDate = formData.get("birthDate")?.toString() || "";

    if (!firstName || !lastName || !email || !phone || !birthDate) {
      toast.error("Por favor, completa todos los campos obligatorios.");
      return;
    }

    execute({ firstName, lastName, email, phone, instagram, birthDate });
  };

  if (!isLoaded || !userId) {
      return (
        <main className="text-center p-20 flex flex-col items-center justify-start gap-4 m-auto text-mylightgray">
          <span className="loading loading-spinner loading-xl"></span>
          <p>Cargando...</p>
        </main>
      );
    }

  return (
    <form
      action={onSubmit}
      ref={formRef}
      className="w-full max-w-[600px] mx-auto bg-white rounded-xl p-8 md:p-10 border border-zinc-300 flex flex-col gap-4 items-start text-myzinc"
    >
      <h1 className="text-xl font-bold text-center w-full">
        ¡Solo un paso más!
      </h1>
      <p className="text-lg w-full text-center">
        Completa tu perfil para acceder a la plataforma.
      </p>

      <div className="w-full">
        <label className="block font-medium text-start mb-2">Nombre*</label>
        <input
          type="text"
          name="firstName"
          placeholder="Nombre"
          className="w-full border rounded p-2 bg-zinc-100"
        />
        <FormErrors id="firstName" errors={fieldErrors} />
      </div>

      <div className="w-full">
        <label className="block font-medium text-start mb-2">Apellido*</label>
        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          className="w-full border rounded p-2 bg-zinc-100"
        />
        <FormErrors id="lastName" errors={fieldErrors} />
      </div>

      <div className="w-full">
        <label className="block font-medium text-start mb-2">Email*</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border rounded p-2 bg-zinc-100"
        />
        <FormErrors id="email" errors={fieldErrors} />
      </div>

      <div className="w-full">
        <label className="block font-medium text-start mb-2">
          Número de celular*
        </label>
        <input
          type="tel"
          name="phone"
          placeholder="900900900"
          className="w-full border rounded p-2 bg-zinc-100"
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
          className="w-full border rounded p-2 bg-zinc-100"
        />
        <FormErrors id="birthDate" errors={fieldErrors} />
      </div>

      <div className="w-full">
        <label className="block font-medium text-start mb-2">
          Cuenta Instagram
        </label>
        <input
          type="text"
          name="instagram"
          placeholder="Instagram"
          className="w-full border rounded p-2 bg-zinc-100"
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
        disabled={isLoading}
        type="submit"
        aria-label="Enviar formulario"
        className="self-end bg-myorange hover:bg-myorange/80 transition transform duration-200 focus:scale-95 text-white px-6 py-2.5 rounded"
      >
        Enviar
      </button>
    </form>
  );
}