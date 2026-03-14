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

function formatDateForInput(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return DateTime.fromJSDate(d).setZone("utc").toFormat("yyyy-MM-dd'T'HH:mm");
}

const INPUT = "w-full border border-zinc-200 rounded-xl px-3 py-2.5 text-sm text-myzinc bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-myteal/30 focus:border-myteal transition";
const LABEL = "block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5";

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

  const handleImageSelect = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

  const { execute: executeUpdate, fieldErrors, isLoading } = useAction(updateSession, {
    onSuccess: (data) => {
      toast.success(`¡Evento "${data.title}" modificado!`);
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      queryClient.invalidateQueries({ queryKey: ["nextSessions"] });
      queryClient.invalidateQueries({ queryKey: ["sessionsWithLiders"] });
    },
    onError: (error) => toast.error(error),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeUpdate(formData);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 p-5 md:p-6 text-myzinc">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Titre */}
        <div>
          <label className={LABEL}>Título del evento *</label>
          <input name="title" value={formData.title} onChange={(e) => handleChange("title", e.target.value)} className={INPUT} required />
          <FormErrors id="title" errors={fieldErrors} />
        </div>

        {/* Date */}
        <div>
          <label className={LABEL}>Fecha del evento *</label>
          <input name="date" type="datetime-local" value={formData.date} onChange={(e) => handleChange("date", e.target.value)} className={INPUT} required />
          <FormErrors id="date" errors={fieldErrors} />
        </div>

        {/* Lieu */}
        <div>
          <label className={LABEL}>Dirección *</label>
          <input name="location" type="text" value={formData.location} onChange={(e) => handleChange("location", e.target.value)} className={INPUT} required />
          <FormErrors id="location" errors={fieldErrors} />
        </div>

        {/* Capacité */}
        <div>
          <label className={LABEL}>Capacidad *</label>
          <input name="capacity" type="number" min={1} value={formData.capacity} onChange={(e) => handleChange("capacity", Math.max(1, parseInt(e.target.value) || 1))} className={INPUT} required />
          <FormErrors id="capacity" errors={fieldErrors} />
        </div>

        {/* Description */}
        <div>
          <label className={LABEL}>Descripción *</label>
          <textarea name="description" value={formData.description} onChange={(e) => handleChange("description", e.target.value)} className={`${INPUT} h-28 resize-none`} />
          <FormErrors id="description" errors={fieldErrors} />
        </div>

        {/* Images */}
        <div>
          <label className={LABEL}>Imagen</label>
          <div className="flex flex-wrap gap-2">
            {images.map((image) => (
              <button
                key={image.id}
                type="button"
                onClick={() => handleImageSelect(image.url)}
                className={`relative w-16 h-16 rounded-xl overflow-hidden transition-all ${
                  formData.image === image.url
                    ? "ring-2 ring-myteal ring-offset-2"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={image.url} fill className="object-cover" alt="Imagen del evento" />
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 bg-myteal text-white rounded-xl text-sm font-semibold hover:bg-myteal/90 transition disabled:opacity-50"
        >
          {isLoading ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>

      {/* Supprimer */}
      <div className="mt-4 pt-4 border-t border-zinc-100">
        <DeleteSessionButton sessionId={session.id} redirection={true} />
      </div>
    </div>
  );
};

export default UpdateSessionForm;
