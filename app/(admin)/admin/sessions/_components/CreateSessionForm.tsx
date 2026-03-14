"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createSession } from "@/actions/admin/create-session";
import { useAction } from "@/hooks/use-action";
import { FormErrors } from "@/components/form/form-errors";
import Image from "next/image";
import { getNextSaturdayDateTime } from "@/services/sessionService";
import { useQueryClient } from "@tanstack/react-query";
import sessionImages from "@/public/data/images.json";
import { SessionTypes } from "@/generated/prisma";

interface CreateSessionFormProps {
  date?: string | undefined | null;
  closeModal?: () => void;
}

const INPUT = "w-full border border-zinc-200 rounded-xl px-3 py-2.5 text-sm text-myzinc bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-myteal/30 focus:border-myteal transition";
const LABEL = "block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5";

export default function CreateSessionForm({ date, closeModal }: CreateSessionFormProps) {
  const [isTutorias, setIsTutorias] = useState(false);
  const dateTime = `${date}T08:00`;
  const images = sessionImages;
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    date: date ? dateTime : "",
    location: "",
    description: "",
    capacity: 1,
    type: "",
    image: "",
  });

  const { execute, fieldErrors, isLoading } = useAction(createSession, {
    onSuccess: (data) => {
      toast.success(`Sesión "${data.title}" creada !`);
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      queryClient.invalidateQueries({ queryKey: ["nextSessions"] });
      queryClient.invalidateQueries({ queryKey: ["sessionsWithLiders"] });
      if (closeModal) closeModal();
      setIsTutorias(false);
      setFormData({ title: "", date: "", location: "", description: "", capacity: 1, type: "", image: "" });
    },
    onError: (error) => toast.error(error),
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsTutorias(checked);
    if (checked) {
      setFormData({
        title: "Sesión de tutorías",
        date: date ? dateTime : getNextSaturdayDateTime(),
        location: "En nuestras Escuelitas - Pamplona Alta",
        description: "Nos encontramos a las 8:20 a. m. en la Universidad Ricardo Palma o a las 9:00 a. m. en la Comisaría n.° 2 de Pamplona Alta.",
        capacity: 30,
        type: "TUTORING",
        image: "/img/photos/tutorias.jpg",
      });
    } else {
      setFormData({ title: "", date: date ? dateTime : "", location: "", description: "", capacity: 1, type: "", image: "" });
    }
  };

  const onSubmit = (formData: FormData) => {
    const data = {
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      location: formData.get("location") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as SessionTypes,
      capacity: parseInt(formData.get("capacity") as string, 10),
      image: formData.get("image") as string,
    };
    if (!data.title || !data.date || !data.location || !data.description || !data.type || !data.capacity || !data.image) {
      toast.error("Por favor, completa todos los campos obligatorios.");
      return;
    }
    execute(data);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 p-5 md:p-6 text-myzinc">
      <form action={onSubmit} className="flex flex-col gap-5">

        {/* Toggle tutoría */}
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div
            onClick={() => handleCheckboxChange({ target: { checked: !isTutorias } } as React.ChangeEvent<HTMLInputElement>)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${isTutorias ? "bg-myteal" : "bg-zinc-200"}`}
          >
            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${isTutorias ? "translate-x-5" : "translate-x-0"}`} />
          </div>
          <input type="hidden" name="type" value={isTutorias ? "TUTORING" : "OTHER"} />
          <span className="text-sm font-medium text-zinc-600">Sesión de tutorías</span>
        </label>

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
          <input type="hidden" name="image" value={formData.image} />
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
          className="w-full py-2.5 bg-myteal text-white rounded-xl text-sm font-semibold hover:bg-myteal/90 transition disabled:opacity-50 mt-1"
        >
          {isLoading ? "Creando..." : "Crear sesión"}
        </button>
      </form>
    </div>
  );
}
