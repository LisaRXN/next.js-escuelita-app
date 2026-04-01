"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createAlumno } from "@/actions/admin/create-alumno";
import { useAction } from "@/hooks/use-action";
import { FormErrors } from "@/components/form/form-errors";
import { toast } from "sonner";

const today = new Date().toISOString().split("T")[0];

const INPUT = "w-full border border-zinc-200 rounded-xl px-3 py-2.5 text-sm text-myzinc bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-myteal/30 focus:border-myteal transition";
const LABEL = "block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5";

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
    estatusInscripcion: "",
    autorizacionImagen: false,
  });

  const { execute, fieldErrors, isLoading } = useAction(createAlumno, {
    onSuccess: (data) => {
      toast.success(`Alumno "${data.nombre} ${data.apellidos}" creado con éxito`);
      router.push("/admin");
    },
    onError: (error) => toast.error(error),
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
      estatusInscripcion: formData.estatusInscripcion as "Inscrito" | "EnEspera" | "Cancelado",
      autorizacionImagen: formData.autorizacionImagen,
    });
  };

  const isValid =
    formData.apellidos && formData.nombre && formData.fechaNacimiento &&
    formData.sexo && formData.dni && !isNaN(parseInt(formData.dni)) &&
    formData.fechaMatricula && formData.escuelita && formData.estatusInscripcion;

  return (
    <main className="min-h-screen bg-zinc-50 pb-10">

      {/* Header */}
      <div className="bg-[#193252] px-4 md:px-8 pt-8 pb-6">
        <Link
          href="/admin/alumnos"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-4 transition-colors"
        >
          <i className="fa-solid fa-arrow-left text-xs" />
          Alumnos
        </Link>
        <h1 className="text-white text-3xl font-extrabold font-montserrat">Nuevo alumno</h1>
        <p className="text-white/60 text-sm mt-1">Completa los campos para registrar al alumno</p>
      </div>

      {/* Form */}
      <div className="px-4 md:px-8 pt-6 max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-zinc-100 p-5 md:p-6 flex flex-col gap-5"
        >
          {/* Nombre y apellidos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={LABEL}>Nombre *</label>
              <input value={formData.nombre} onChange={(e) => handleChange("nombre", e.target.value)} placeholder="Nombre" className={INPUT} />
              <FormErrors id="nombre" errors={fieldErrors} />
            </div>
            <div>
              <label className={LABEL}>Apellidos *</label>
              <input value={formData.apellidos} onChange={(e) => handleChange("apellidos", e.target.value)} placeholder="Apellidos" className={INPUT} />
              <FormErrors id="apellidos" errors={fieldErrors} />
            </div>
          </div>

          {/* DNI y sexo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={LABEL}>DNI *</label>
              <input type="number" value={formData.dni} onChange={(e) => handleChange("dni", e.target.value)} placeholder="12345678" className={INPUT} />
              <FormErrors id="dni" errors={fieldErrors} />
            </div>
            <div>
              <label className={LABEL}>Sexo *</label>
              <select value={formData.sexo} onChange={(e) => handleChange("sexo", e.target.value)} className={INPUT}>
                <option value="">Seleccionar...</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
              <FormErrors id="sexo" errors={fieldErrors} />
            </div>
          </div>

          {/* Fecha de nacimiento */}
          <div>
            <label className={LABEL}>Fecha de nacimiento *</label>
            <input type="date" value={formData.fechaNacimiento} onChange={(e) => handleChange("fechaNacimiento", e.target.value)} className={INPUT} />
            <FormErrors id="fechaNacimiento" errors={fieldErrors} />
          </div>

          {/* Colegio y nivel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={LABEL}>Colegio</label>
              <input value={formData.colegio} onChange={(e) => handleChange("colegio", e.target.value)} placeholder="Nombre del colegio" className={INPUT} />
              <FormErrors id="colegio" errors={fieldErrors} />
            </div>
            <div>
              <label className={LABEL}>Nivel</label>
              <select value={formData.nivel} onChange={(e) => handleChange("nivel", e.target.value)} className={INPUT}>
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
            <label className={LABEL}>Escuelita *</label>
            <select value={formData.escuelita} onChange={(e) => handleChange("escuelita", e.target.value)} className={INPUT}>
              <option value="">Seleccionar...</option>
              <option value="Peruanidad">Peruanidad</option>
              <option value="Valle_Ecologico">Valle Ecológico</option>
            </select>
            <FormErrors id="escuelita" errors={fieldErrors} />
          </div>

          {/* Estatus de inscripción */}
          <div>
            <label className={LABEL}>Estatus de inscripción *</label>
            <select value={formData.estatusInscripcion} onChange={(e) => handleChange("estatusInscripcion", e.target.value)} className={INPUT}>
              <option value="">Seleccionar...</option>
              <option value="Inscrito">Inscrito</option>
              <option value="EnEspera">En espera</option>
              <option value="Cancelado">Cancelado</option>
            </select>
            <FormErrors id="estatusInscripcion" errors={fieldErrors} />
          </div>

          {/* Fecha de matrícula */}
          <div>
            <label className={LABEL}>Fecha de matrícula *</label>
            <input type="date" value={formData.fechaMatricula} onChange={(e) => handleChange("fechaMatricula", e.target.value)} className={INPUT} />
            <FormErrors id="fechaMatricula" errors={fieldErrors} />
          </div>

          {/* Autorización de imagen */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="autorizacionImagen"
              checked={formData.autorizacionImagen}
              onChange={(e) => setFormData((prev) => ({ ...prev, autorizacionImagen: e.target.checked }))}
              className="mt-0.5 w-4 h-4 accent-myteal cursor-pointer"
            />
            <label htmlFor="autorizacionImagen" className="text-sm text-zinc-600 cursor-pointer">
              Autorización de uso de imagen
            </label>
          </div>

          {/* Necesidades especiales */}
          <div>
            <label className={LABEL}>Necesidades especiales</label>
            <textarea
              value={formData.necesidadesEspeciales}
              onChange={(e) => handleChange("necesidadesEspeciales", e.target.value)}
              placeholder="Indicar si el alumno tiene necesidades especiales..."
              rows={3}
              className={`${INPUT} resize-none`}
            />
            <FormErrors id="necesidadesEspeciales" errors={fieldErrors} />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-1">
            <Link
              href="/admin/alumnos"
              className="px-5 py-2.5 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isLoading || !isValid}
              className="px-6 py-2.5 bg-myteal text-white rounded-xl text-sm font-semibold hover:bg-myteal/90 transition disabled:opacity-50"
            >
              {isLoading ? "Guardando..." : "Crear alumno"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
