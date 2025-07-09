"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateSession } from "@/actions/admin/update-session";
import { useAction } from "@/hooks/use-action";
import { FormErrors } from "@/components/form/form-errors";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query"; 
import sessionImages from "@/public/data/images.json";
import { VolunteerSession } from "@/generated/prisma";
import DeleteSessionButton from "@/components/admin/DeleteSessionButton";
import { DateTime } from "luxon";

interface UpdateSessionFormProps {
  session: VolunteerSession;
}

const UpdateSessionForm = ({ session }: UpdateSessionFormProps) => {
  const images = sessionImages;

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    sessionId: session.id,
    title: session.title,
    date: formatDateForInput(session.date),
    location: session.location,
    image: session.image,
    description: session.description,
    capacity: session.capacity,
  });

  // function formatDateForInput(date: Date | string): string {
  //   const d = typeof date === "string" ? new Date(date) : date;
  //   return DateTime.fromJSDate(d)
  //   .setZone("America/Lima")
  //   .toFormat("yyyy-MM-dd'T'HH:mm");
  // }

  function formatDateForInput(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date;
  
    // Affiche exactement ce qui est en UTC, sans transformation
    return DateTime.fromJSDate(d)
      .setZone("utc") // ✅ on force UTC, pas Lima ni local
      .toFormat("yyyy-MM-dd'T'HH:mm");
  }


  const handleImageSelect = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
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


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeUpdate(formData);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  return (
    <div className="bg-white rounded-2xl shadow-sm p-10 max-w-xl mx-auto text-myzinc">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Modificación del evento
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-3">
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
            type="datetime-local"
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
          <div className="flex items-center justify-start w-full gap-2 lg:gap-5">
            {images.map((image) => (
              <div
                key={image.id}
                onClick={() => handleImageSelect(image.url)}
                className={`${
                  formData.image === image.url ? "border-4 border-zinc-100" : ""
                } relative w-[60px] h-[60px] lg:w-[100px] lg:h-[100px] rounded-xl overflow-hidden`}
              >
                <Image
                  src={image.url}
                  fill
                  className="w-full h-full object-cover p-2 rounded-xl"
                  alt="Imagen del evento"
                />
              </div>
            ))}

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
        </div>
      </form>
      <DeleteSessionButton
        sessionId={session.id}
        redirection={true}
      />
            
    </div>
  );
};

export default UpdateSessionForm;
