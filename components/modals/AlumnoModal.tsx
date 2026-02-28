"use client";

import { RefObject, useState } from "react";
import { Alumno } from "@/generated/prisma";
import { useAction } from "@/hooks/use-action";
import { updateAlumno } from "@/actions/admin/update-alumno";
import { deleteAlumno } from "@/actions/admin/delete-alumno";
import { FormErrors } from "@/components/form/form-errors";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const NIVELES = [
  "Nido",
  "Primaria 1°", "Primaria 2°", "Primaria 3°", "Primaria 4°", "Primaria 5°",
  "Secundaria 1°", "Secundaria 2°", "Secundaria 3°", "Secundaria 4°", "Secundaria 5°",
];

interface AlumnoModalProps {
  alumno: Alumno;
  dialogRef: RefObject<HTMLDialogElement | null>;
  onClose: () => void;
}

const AlumnoModal = ({ alumno, dialogRef, onClose }: AlumnoModalProps) => {
  const queryClient = useQueryClient();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [formData, setFormData] = useState({
    id: alumno.id,
    nombre: alumno.nombre,
    apellidos: alumno.apellidos,
    fechaNacimiento: new Date(alumno.fechaNacimiento).toISOString().split("T")[0],
    sexo: alumno.sexo as "M" | "F",
    dni: String(alumno.dni),
    colegio: alumno.colegio,
    nivel: alumno.nivel,
    fechaMatricula: new Date(alumno.fechaMatricula).toISOString().split("T")[0],
    escuelita: alumno.escuelita as "Peruanidad" | "Valle_Ecologico",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const { execute: execUpdate, fieldErrors, isLoading: isUpdating } = useAction(updateAlumno, {
    onSuccess: (data) => {
      toast.success(`"${data.nombre} ${data.apellidos}" actualizado`);
      queryClient.invalidateQueries({ queryKey: ["alumnos"] });
      onClose();
    },
    onError: (error) => toast.error(error),
  });

  const { execute: execDelete, isLoading: isDeleting } = useAction(deleteAlumno, {
    onSuccess: () => {
      toast.success("Alumno eliminado");
      queryClient.invalidateQueries({ queryKey: ["alumnos"] });
      onClose();
    },
    onError: (error) => toast.error(error),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execUpdate({
      ...formData,
      dni: parseInt(formData.dni),
    });
  };

  return (
    <dialog ref={dialogRef} className="modal p-2">
      <div className="modal-box bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-myzinc">
            {alumno.nombre} {alumno.apellidos}
          </h2>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost text-zinc-400"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-myzinc">
          {/* Nombre y apellidos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1 text-sm">Nombre*</label>
              <input
                value={formData.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                className="w-full border rounded p-2 bg-zinc-50 text-sm"
              />
              <FormErrors id="nombre" errors={fieldErrors} />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm">Apellidos*</label>
              <input
                value={formData.apellidos}
                onChange={(e) => handleChange("apellidos", e.target.value)}
                className="w-full border rounded p-2 bg-zinc-50 text-sm"
              />
              <FormErrors id="apellidos" errors={fieldErrors} />
            </div>
          </div>

          {/* DNI y sexo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1 text-sm">DNI*</label>
              <input
                type="number"
                value={formData.dni}
                onChange={(e) => handleChange("dni", e.target.value)}
                className="w-full border rounded p-2 bg-zinc-50 text-sm"
              />
              <FormErrors id="dni" errors={fieldErrors} />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm">Sexo*</label>
              <select
                value={formData.sexo}
                onChange={(e) => handleChange("sexo", e.target.value)}
                className="w-full border rounded p-2 bg-zinc-50 text-sm"
              >
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
              <FormErrors id="sexo" errors={fieldErrors} />
            </div>
          </div>

          {/* Fecha nacimiento */}
          <div>
            <label className="block font-medium mb-1 text-sm">Fecha de nacimiento*</label>
            <input
              type="date"
              value={formData.fechaNacimiento}
              onChange={(e) => handleChange("fechaNacimiento", e.target.value)}
              className="w-full border rounded p-2 bg-zinc-50 text-sm"
            />
            <FormErrors id="fechaNacimiento" errors={fieldErrors} />
          </div>

          {/* Colegio y nivel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1 text-sm">Colegio*</label>
              <input
                value={formData.colegio}
                onChange={(e) => handleChange("colegio", e.target.value)}
                className="w-full border rounded p-2 bg-zinc-50 text-sm"
              />
              <FormErrors id="colegio" errors={fieldErrors} />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm">Nivel*</label>
              <select
                value={formData.nivel}
                onChange={(e) => handleChange("nivel", e.target.value)}
                className="w-full border rounded p-2 bg-zinc-50 text-sm"
              >
                <option value="">Seleccionar...</option>
                <option value="Nido">Nido</option>
                <optgroup label="Primaria">
                  {NIVELES.filter((n) => n.startsWith("Primaria")).map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </optgroup>
                <optgroup label="Secundaria">
                  {NIVELES.filter((n) => n.startsWith("Secundaria")).map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </optgroup>
              </select>
              <FormErrors id="nivel" errors={fieldErrors} />
            </div>
          </div>

          {/* Escuelita */}
          <div>
            <label className="block font-medium mb-1 text-sm">Escuelita*</label>
            <select
              value={formData.escuelita}
              onChange={(e) => handleChange("escuelita", e.target.value)}
              className="w-full border rounded p-2 bg-zinc-50 text-sm"
            >
              <option value="Peruanidad">Peruanidad</option>
              <option value="Valle_Ecologico">Valle Ecológico</option>
            </select>
            <FormErrors id="escuelita" errors={fieldErrors} />
          </div>

          {/* Fecha matrícula */}
          <div>
            <label className="block font-medium mb-1 text-sm">Fecha de matrícula*</label>
            <input
              type="date"
              value={formData.fechaMatricula}
              onChange={(e) => handleChange("fechaMatricula", e.target.value)}
              className="w-full border rounded p-2 bg-zinc-50 text-sm"
            />
            <FormErrors id="fechaMatricula" errors={fieldErrors} />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
            {/* Delete */}
            {!confirmDelete ? (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="text-sm text-red-500 hover:text-red-600 transition"
              >
                <i className="fa-solid fa-trash mr-1"></i> Eliminar alumno
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm text-red-500">¿Confirmar?</span>
                <button
                  type="button"
                  onClick={() => execDelete({ id: alumno.id })}
                  disabled={isDeleting}
                  className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-60"
                >
                  {isDeleting ? "Eliminando..." : "Sí, eliminar"}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="text-sm px-3 py-1 bg-zinc-100 text-myzinc rounded hover:bg-zinc-200"
                >
                  Cancelar
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isUpdating}
              className="bg-myorange hover:bg-myorange/80 transition text-white px-5 py-2 rounded text-sm disabled:opacity-60"
            >
              {isUpdating ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AlumnoModal;
