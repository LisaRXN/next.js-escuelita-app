"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateSession } from "@/actions/admin/update-session";
import { deleteSession } from "@/actions/admin/delete-session";
import { useAction } from "@/hooks/use-action";
import { FormErrors } from "@/components/form/form-errors";
import Image from "next/image";
import { VolunteerSession } from "@/app/generated/prisma";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query"; 

interface UpdateSessionFormProps {
  session: VolunteerSession;
}

const UpdateSessionForm = ({ session }: UpdateSessionFormProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const router = useRouter();

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    sessionId: session.id,
    title: session.title,
    date: formatDateForInput(session.date),
    location: session.location,
    description: session.description,
    capacity: session.capacity,
  });

  function formatDateForInput(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toISOString().slice(0, 16);
  }

  const {
    execute: executeUpdate,
    fieldErrors,
    isLoading,
  } = useAction(updateSession, {
    onSuccess: (data) => {
      toast.success(`¡Evento "${data.title}" modificado!`);
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      queryClient.invalidateQueries({ queryKey: ["nextSessions"] });
      queryClient.invalidateQueries({ queryKey: ["sessionsWithLiders"] });
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeDelete, isLoading: isLoadingDelete } = useAction(
    deleteSession,
    {
      onSuccess: (data) => {
        toast.success(`Sesión "${data.title}" suprimida !`);
        queryClient.invalidateQueries({ queryKey: ["sessions"] });
        queryClient.invalidateQueries({ queryKey: ["nextSessions"] });
        queryClient.invalidateQueries({ queryKey: ["sessionsWithLiders"] });
        router.push("/admin/get-sessions");
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onDelete = () => {
    alert(
      "¿Estás seguro de que quieres eliminar esta sesión? Esta acción no se puede deshacer."
    );
    executeDelete({ id: session.id });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeUpdate(formData);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = (id: number) => {
    setSelectedImage(id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-10 max-w-xl mx-auto text-myzinc">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Modificación del evento
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Titulo del evento*</label>
          <input
            name="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full border rounded p-2 bg-zinc-100"
            required
          />
          <FormErrors id="title" errors={fieldErrors} />
        </div>

        <div>
          <label className="block font-medium mb-2">Fecha del evento*</label>
          <input
            name="date"
            type="datetime-date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="w-full border rounded p-2 bg-zinc-100"
            required
          />
          <FormErrors id="date" errors={fieldErrors} />
        </div>
        <div>
          <label className="block font-medium mb-2">Dirección*</label>
          <input
            name="location"
            type="text"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="w-full border rounded p-2 bg-zinc-100"
            required
          />
          <FormErrors id="location" errors={fieldErrors} />
        </div>

        <div>
          <label className="block font-medium mb-2">Capacidad*</label>
          <input
            name="capacity"
            type="number"
            min={1}
            value={formData.capacity}
            onChange={(e) => handleChange("capacity", parseInt(e.target.value))}
            className="w-full border rounded p-2 bg-zinc-100"
            required
          />
          <FormErrors id="capacity" errors={fieldErrors} />
        </div>

        <div>
          <label className="block font-medium mb-2">Descripción*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full border rounded p-2 bg-zinc-100 h-32"
          />
          <FormErrors id="description" errors={fieldErrors} />
        </div>

        <div>
          <label className="block font-medium mb-2">Elegir una imagen</label>
          <div className="flex items-center justify-start w-full gap-2 lg:gap-5 mb-8">
            <div
              onClick={() => handleImageSelect(1)}
              className={`${
                selectedImage === 1 ? "border-4 border-zinc-100" : ""
              } relative w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-xl overflow-hidden`}
            >
              <Image
                src="/img/photos/tutorias.jpg"
                fill
                className="w-full h-full object-cover p-2 rounded-xl"
                alt="Sesión de tutorias"
              />
            </div>
            <div
              onClick={() => handleImageSelect(2)}
              className={`${
                selectedImage === 2 ? "border-4 border-zinc-100" : ""
              } relative w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-xl overflow-hidden`}
            >
              <Image
                src="/img/photos/tutorias.jpg"
                fill
                className="w-full h-full object-cover p-2 rounded-xl"
                alt="Sesión de tutorias"
              />
            </div>
            <div
              onClick={() => handleImageSelect(3)}
              className={`${
                selectedImage === 3 ? "border-4 border-zinc-100" : ""
              } relative w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-xl overflow-hidden`}
            >
              <Image
                src="/img/photos/tutorias.jpg"
                fill
                className="w-full h-full object-cover p-2 rounded-xl"
                alt="Sesión de tutorias"
              />
            </div>
            <div
              onClick={() => handleImageSelect(4)}
              className={`${
                selectedImage === 4 ? "border-4 border-zinc-100" : ""
              } relative w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-xl overflow-hidden`}
            >
              <Image
                src="/img/photos/tutorias.jpg"
                fill
                className="w-full h-full object-cover p-2 rounded-xl"
                alt="Sesión de tutorias"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-mygreen w-full text-white py-2 rounded hover:bg-mygreen/80 disabled:opacity-50"
          >
            Modificar evento
          </button>
          <button
            onClick={onDelete}
            disabled={isLoadingDelete}
            className="bg-myred w-full text-white py-2 rounded hover:bg-myred/80 disabled:opacity-50"
          >
            Suprimir evento
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSessionForm;
