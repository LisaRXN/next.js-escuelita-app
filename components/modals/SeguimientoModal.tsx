"use client";

import { RefObject, useState } from "react";
import { useAction } from "@/hooks/use-action";
import { createSeguimiento } from "@/actions/admin/create-seguimiento";
import { updateSeguimiento } from "@/actions/admin/update-seguimiento";
import { deleteSeguimiento } from "@/actions/admin/delete-seguimiento";
import { FormErrors } from "@/components/form/form-errors";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Seguimiento } from "@/generated/prisma";
import { CALIFICACIONES, calificacionLabel } from "@/lib/calificacion";
import { fetcher } from "@/lib/fetcher";

interface SeguimientoModalProps {
  dialogRef: RefObject<HTMLDialogElement | null>;
  onClose: () => void;
  /** Si fourni → mode édition, sinon → mode création */
  seguimiento?: Seguimiento & { alumno?: { nombre: string; apellidos: string } };
  /** Pré-rempli lors de la création depuis la fiche d'un alumno */
  defaultAlumnoId?: number;
  defaultEscuelita?: "Peruanidad" | "Valle_Ecologico";
}

const today = new Date().toISOString().split("T")[0];

const SeguimientoModal = ({
  dialogRef,
  onClose,
  seguimiento,
  defaultAlumnoId,
  defaultEscuelita,
}: SeguimientoModalProps) => {
  const queryClient = useQueryClient();
  const isEdit = !!seguimiento;
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [formData, setFormData] = useState({
    fechaSesion: seguimiento
      ? new Date(seguimiento.fechaSesion).toISOString().split("T")[0]
      : today,
    escuelita: (seguimiento?.escuelita ?? defaultEscuelita ?? "") as "Peruanidad" | "Valle_Ecologico" | "",
    alumnoId: String(seguimiento?.alumnoId ?? defaultAlumnoId ?? ""),
    tema: seguimiento?.tema ?? "",
    calificacion: (seguimiento?.calificacion ?? "") as string,
    dificultad: seguimiento?.dificultad ?? "",
    observacion: seguimiento?.observacion ?? "",
  });

  const handleChange = (field: string, value: string) => {
    if (field === "escuelita") {
      setFormData((prev) => ({ ...prev, escuelita: value as "Peruanidad" | "Valle_Ecologico" | "", alumnoId: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["seguimientos"] });
    queryClient.invalidateQueries({ queryKey: ["seguimientos-alumno"] });
  };

  const { execute: execCreate, fieldErrors: createErrors, isLoading: isCreating } = useAction(createSeguimiento, {
    onSuccess: () => { toast.success("Seguimiento creado"); invalidate(); onClose(); },
    onError: (e) => toast.error(e),
  });

  const { execute: execUpdate, fieldErrors: updateErrors, isLoading: isUpdating } = useAction(updateSeguimiento, {
    onSuccess: () => { toast.success("Seguimiento actualizado"); invalidate(); onClose(); },
    onError: (e) => toast.error(e),
  });

  const { execute: execDelete, isLoading: isDeleting } = useAction(deleteSeguimiento, {
    onSuccess: () => { toast.success("Seguimiento eliminado"); invalidate(); onClose(); },
    onError: (e) => toast.error(e),
  });

  const { data: alumnosData } = useQuery({
    queryKey: ["alumnos-by-escuelita", formData.escuelita],
    queryFn: () => fetcher(`/api/alumnos?escuelita=${formData.escuelita}&page=1`),
    enabled: !!formData.escuelita,
  });
  const alumnosList: { id: number; nombre: string; apellidos: string }[] = alumnosData?.data ?? [];

  const fieldErrors = isEdit ? updateErrors : createErrors;
  const isLoading = isCreating || isUpdating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      alumnoId: parseInt(formData.alumnoId),
      escuelita: formData.escuelita as "Peruanidad" | "Valle_Ecologico",
      calificacion: formData.calificacion as "Excelente" | "Bueno" | "Regular" | "Con_dificultad" | "Con_mucha_dificultad",
    };
    if (isEdit) {
      execUpdate({ id: seguimiento!.id, ...payload });
    } else {
      execCreate(payload);
    }
  };

  const isValid = formData.fechaSesion && formData.escuelita && formData.alumnoId && formData.tema && formData.calificacion;

  return (
    <dialog ref={dialogRef} className="modal p-2">
      <div className="modal-box bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-myzinc">
            {isEdit ? "Editar seguimiento" : "Nuevo seguimiento"}
          </h2>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost text-zinc-400">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-myzinc">
          {/* Fecha + Escuelita */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1 text-sm">Fecha de la sesión*</label>
              <input
                type="date"
                value={formData.fechaSesion}
                onChange={(e) => handleChange("fechaSesion", e.target.value)}
                className="w-full border rounded p-2 bg-zinc-50 text-sm"
              />
              <FormErrors id="fechaSesion" errors={fieldErrors} />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm">Escuelita*</label>
              <select
                value={formData.escuelita}
                onChange={(e) => handleChange("escuelita", e.target.value)}
                className="w-full border rounded p-2 bg-zinc-50 text-sm"
              >
                <option value="">Seleccionar...</option>
                <option value="Peruanidad">Peruanidad</option>
                <option value="Valle_Ecologico">Valle Ecológico</option>
              </select>
              <FormErrors id="escuelita" errors={fieldErrors} />
            </div>
          </div>

          {/* Alumno — affiché seulement si pas pré-rempli */}
          {!defaultAlumnoId && (
            <div>
              <label className="block font-medium mb-1 text-sm">Alumno*</label>
              <select
                value={formData.alumnoId}
                onChange={(e) => handleChange("alumnoId", e.target.value)}
                disabled={!formData.escuelita}
                className="w-full border rounded p-2 bg-zinc-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">
                  {formData.escuelita ? "Seleccionar alumno..." : "Primero elige una escuelita"}
                </option>
                {alumnosList.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nombre} {a.apellidos}
                  </option>
                ))}
              </select>
              <FormErrors id="alumnoId" errors={fieldErrors} />
            </div>
          )}

          {/* Tema */}
          <div>
            <label className="block font-medium mb-1 text-sm">Tema*</label>
            <input
              value={formData.tema}
              onChange={(e) => handleChange("tema", e.target.value)}
              placeholder="Ej: Matemáticas - fracciones"
              className="w-full border rounded p-2 bg-zinc-50 text-sm"
            />
            <FormErrors id="tema" errors={fieldErrors} />
          </div>

          {/* Calificación */}
          <div>
            <label className="block font-medium mb-1 text-sm">Calificación*</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {CALIFICACIONES.map((cal) => (
                <button
                  key={cal}
                  type="button"
                  onClick={() => handleChange("calificacion", cal)}
                  className={`py-2 px-3 rounded-lg border text-sm font-medium transition ${
                    formData.calificacion === cal
                      ? "border-myorange bg-myorange text-white"
                      : "border-zinc-200 bg-zinc-50 text-myzinc hover:border-myorange"
                  }`}
                >
                  {calificacionLabel[cal]}
                </button>
              ))}
            </div>
            <FormErrors id="calificacion" errors={fieldErrors} />
          </div>

          {/* Dificultad */}
          <div>
            <label className="block font-medium mb-1 text-sm">Dificultad observada</label>
            <textarea
              value={formData.dificultad}
              onChange={(e) => handleChange("dificultad", e.target.value)}
              placeholder="Describe las dificultades encontradas..."
              rows={3}
              className="w-full border rounded p-2 bg-zinc-50 text-sm resize-none"
            />
          </div>

          {/* Observación */}
          <div>
            <label className="block font-medium mb-1 text-sm">Observación general</label>
            <textarea
              value={formData.observacion}
              onChange={(e) => handleChange("observacion", e.target.value)}
              placeholder="Observaciones adicionales..."
              rows={3}
              className="w-full border rounded p-2 bg-zinc-50 text-sm resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
            {isEdit && !confirmDelete && (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="text-sm text-red-500 hover:text-red-600 transition"
              >
                <i className="fa-solid fa-trash mr-1"></i> Eliminar
              </button>
            )}
            {isEdit && confirmDelete && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-red-500">¿Confirmar?</span>
                <button
                  type="button"
                  onClick={() => execDelete({ id: seguimiento!.id })}
                  disabled={isDeleting}
                  className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-60"
                >
                  {isDeleting ? "Eliminando..." : "Sí, eliminar"}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="text-sm px-3 py-1 bg-zinc-100 rounded"
                >
                  Cancelar
                </button>
              </div>
            )}
            {!isEdit && <span />}

            <button
              type="submit"
              disabled={isLoading || !isValid}
              className="bg-myorange hover:bg-myorange/80 transition text-white px-5 py-2 rounded text-sm disabled:opacity-60 ml-auto"
            >
              {isLoading ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear seguimiento"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default SeguimientoModal;
