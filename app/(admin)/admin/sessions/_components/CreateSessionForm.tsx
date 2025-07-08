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

interface CreateSessionFormProps {
  date?: string | undefined | null;
  closeModal?: () => void;
}

export default function CreateSessionForm({
  date,
  closeModal,
}: CreateSessionFormProps) {
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
      setFormData({
        title: "",
        date: "",
        location: "",
        description: "",
        capacity: 1,
        image: "",
      });
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsTutorias(checked);

    if (checked) {
      setFormData({
        title: "Sesión de tutorías",
        date: date ? dateTime : getNextSaturdayDateTime(),
        location: "En nuestras Escuelitas - Pamplona Alta",
        description:
          "Nos encontramos a las 8:20 a. m. en la Universidad Ricardo Palma o a las 9:00 a. m. en la Comisaría n.° 2 de Pamplona Alta.",
        capacity: 30,
        image: "/img/photos/tutorias.jpg",
      });
    } else {
      setFormData({
        title: "",
        date: date ? dateTime : "",
        location: "",
        description: "",
        capacity: 0,
        image: "",
      });
    }
  };

  const onSubmit = (formData: FormData) => {
    const data = {
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      location: formData.get("location") as string,
      description: formData.get("description") as string,
      capacity: parseInt(formData.get("capacity") as string, 10),
      image: formData.get("image") as string,
    };
    console.log(data);
    if (
      !data.title ||
      !data.date ||
      !data.location ||
      !data.description ||
      !data.capacity ||
      !data.image
    ) {
      toast.error("Por favor, completa todos los campos obligatorios.");
      return;
    }

    execute(data);
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   execute(formData);
  // };

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

  return (
    <div className="bg-white rounded-2xl p-3 md:p-5 max-w-xl mx-auto text-myzinc">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Creación del evento
      </h1>
      <form action={onSubmit} className="space-y-4">
        <div className="flex items-center justify-start gap-2">
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={isTutorias}
            className="checkbox checkbox-warning checkbox-md"
          />
          <label>Crear sesión de tutorias</label>
        </div>
        <div>
          <label className="block font-medium text-start mb-2">
            Titulo del evento*
          </label>
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
          <label className="block font-medium text-start mb-2">
            Fecha del evento*
          </label>
          <input
            name="date"
            type="datetime-local"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="w-full border rounded p-2 bg-zinc-200 text-myzinc accent-myzinc"
            required
          />
          <FormErrors id="date" errors={fieldErrors} />
        </div>
        <div>
          <label className="block font-medium text-start mb-2">
            Dirección*
          </label>
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
          <label className="block font-medium text-start mb-2">
            Capacidad*
          </label>
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
          <label className="block font-medium text-start mb-2">
            Descripción*
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full border rounded p-2 bg-zinc-100 h-32"
          />
          <FormErrors id="description" errors={fieldErrors} />
        </div>

        <div>
          <label className="block font-medium text-start mb-2">
            Elegir una imagen
          </label>
          <div className="flex items-center justify-start w-full gap-2 lg:gap-5">
            <input type="hidden" name="image" value={formData.image} />
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

        <div className="flex items-center justify-center w-full">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-myorange text-white px-4 py-2 rounded hover:bg-myorange/80 disabled:opacity-50"
          >
            Crear evento
          </button>
        </div>
      </form>
    </div>
  );
}
