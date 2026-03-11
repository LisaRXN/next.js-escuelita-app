"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAlumno } from "@/actions/admin/create-alumno";
import { useAction } from "@/hooks/use-action";
import { FormErrors } from "@/components/form/form-errors";
import { toast } from "sonner";

const today = new Date().toISOString().split("T")[0];

export default function CreateAlumnoPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    apellidos: "",
    nombre: "",
    fechaNacimiento: "",
    sexo: "",
    dni: "",
    colegio: "",
    nivel: "",
    fechaMatricula: today,
    escuelita: "",
    necesidadesEspeciales: "",
  });

  const { execute, fieldErrors, isLoading } = useAction(createAlumno, {
    onSuccess: (data) => {
      toast.success(`Alumno "${data.nombre} ${data.apellidos}" creado con éxito`);
      router.push("/admin");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute({
      ...formData,
      dni: parseInt(formData.dni),
      sexo: formData.sexo as "M" | "F",
      escuelita: formData.escuelita as "Peruanidad" | "Valle_Ecologico",
    });
  };

  const isValid =
    formData.apellidos &&
    formData.nombre &&
    formData.fechaNacimiento &&
    formData.sexo &&
    formData.dni &&
    formData.colegio &&
    formData.nivel &&
    formData.fechaMatricula &&
    formData.escuelita;

  return (
    <main className="p-2 md:p-10 min-h-screen bg-myteal max-w-screen-2xl m-auto">
      <h1 className="p-4 text-[40px] font-bold font-montserrat mb-6 text-white">
        Nuevo alumno
      </h1>

      <form
        onSubmit={handleSubmit}
        className="m-auto w-full max-w-2xl bg-white rounded-xl p-6 md:p-10 border border-zinc-200 flex flex-col gap-4 text-myzinc"
      >
        {/* Nombre y apellidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2">Nombre*</label>
            <input
              value={formData.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              placeholder="Nombre"
              className="w-full border rounded p-2 bg-zinc-50"
            />
            <FormErrors id="nombre" errors={fieldErrors} />
          </div>
          <div>
            <label className="block font-medium mb-2">Apellidos*</label>
            <input
              value={formData.apellidos}
              onChange={(e) => handleChange("apellidos", e.target.value)}
              placeholder="Apellidos"
              className="w-full border rounded p-2 bg-zinc-50"
            />
            <FormErrors id="apellidos" errors={fieldErrors} />
          </div>
        </div>

        {/* DNI y sexo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2">DNI*</label>
            <input
              type="number"
              value={formData.dni}
              onChange={(e) => handleChange("dni", e.target.value)}
              placeholder="12345678"
              className="w-full border rounded p-2 bg-zinc-50"
            />
            <FormErrors id="dni" errors={fieldErrors} />
          </div>
          <div>
            <label className="block font-medium mb-2">Sexo*</label>
            <select
              value={formData.sexo}
              onChange={(e) => handleChange("sexo", e.target.value)}
              className="w-full border rounded p-2 bg-zinc-50"
            >
              <option value="">Seleccionar...</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
            <FormErrors id="sexo" errors={fieldErrors} />
          </div>
        </div>

        {/* Fecha de nacimiento */}
        <div>
          <label className="block font-medium mb-2">Fecha de nacimiento*</label>
          <input
            type="date"
            value={formData.fechaNacimiento}
            onChange={(e) => handleChange("fechaNacimiento", e.target.value)}
            className="w-full border rounded p-2 bg-zinc-50"
          />
          <FormErrors id="fechaNacimiento" errors={fieldErrors} />
        </div>

        {/* Colegio y nivel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2">Colegio*</label>
            <input
              value={formData.colegio}
              onChange={(e) => handleChange("colegio", e.target.value)}
              placeholder="Nombre del colegio"
              className="w-full border rounded p-2 bg-zinc-50"
            />
            <FormErrors id="colegio" errors={fieldErrors} />
          </div>
          <div>
            <label className="block font-medium mb-2">Nivel*</label>
            <select
              value={formData.nivel}
              onChange={(e) => handleChange("nivel", e.target.value)}
              className="w-full border rounded p-2 bg-zinc-50"
            >
              <option value="">Seleccionar...</option>
              <option value="Nido">Nido</option>
              <optgroup label="Primaria">
                <option value="Primaria 1°">Primaria 1°</option>
                <option value="Primaria 2°">Primaria 2°</option>
                <option value="Primaria 3°">Primaria 3°</option>
                <option value="Primaria 4°">Primaria 4°</option>
                <option value="Primaria 5°">Primaria 5°</option>
                <option value="Primaria 6°">Primaria 6°</option>
              </optgroup>
              <optgroup label="Secundaria">
                <option value="Secundaria 1°">Secundaria 1°</option>
                <option value="Secundaria 2°">Secundaria 2°</option>
                <option value="Secundaria 3°">Secundaria 3°</option>
                <option value="Secundaria 4°">Secundaria 4°</option>
                <option value="Secundaria 5°">Secundaria 5°</option>
                <option value="Secundaria 6°">Secundaria 6°</option>
              </optgroup>
            </select>
            <FormErrors id="nivel" errors={fieldErrors} />
          </div>
        </div>

        {/* Escuelita */}
        <div>
          <label className="block font-medium mb-2">Escuelita*</label>
          <select
            value={formData.escuelita}
            onChange={(e) => handleChange("escuelita", e.target.value)}
            className="w-full border rounded p-2 bg-zinc-50"
          >
            <option value="">Seleccionar...</option>
            <option value="Peruanidad">Peruanidad</option>
            <option value="Valle_Ecologico">Valle Ecológico</option>
          </select>
          <FormErrors id="escuelita" errors={fieldErrors} />
        </div>

        {/* Fecha de matrícula */}
        <div>
          <label className="block font-medium mb-2">Fecha de matrícula*</label>
          <input
            type="date"
            value={formData.fechaMatricula}
            onChange={(e) => handleChange("fechaMatricula", e.target.value)}
            className="w-full border rounded p-2 bg-zinc-50"
          />
          <FormErrors id="fechaMatricula" errors={fieldErrors} />
        </div>

        {/* Necesidades especiales */}
        <div>
          <label className="block font-medium mb-2">Necesidades especiales</label>
          <textarea
            value={formData.necesidadesEspeciales}
            onChange={(e) => handleChange("necesidadesEspeciales", e.target.value)}
            placeholder="Indicar si el alumno tiene necesidades especiales..."
            rows={3}
            className="w-full border rounded p-2 bg-zinc-50 resize-none"
          />
          <FormErrors id="necesidadesEspeciales" errors={fieldErrors} />
        </div>

        <button
          type="submit"
          disabled={isLoading || !isValid}
          className="self-end bg-myorange hover:bg-myorange/80 transition duration-200 text-white px-6 py-2.5 rounded disabled:opacity-60"
        >
          {isLoading ? "Guardando..." : "Crear alumno"}
        </button>
      </form>
    </main>
  );
}
