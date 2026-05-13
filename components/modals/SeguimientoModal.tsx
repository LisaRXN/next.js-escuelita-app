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
  sessionId?: number;
  sessionDate?: string;
  seguimiento?: Seguimiento & {
    alumno?: { nombre: string; apellidos: string };
  };
  defaultAlumnoId?: number;
  defaultEscuelita?: "Peruanidad" | "Valle_Ecologico";
}

const INPUT =
  "w-full border border-zinc-200 rounded-xl px-3 py-2.5 text-sm text-myzinc bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-myteal/30 focus:border-myteal transition disabled:opacity-50 disabled:cursor-not-allowed";
const LABEL =
  "block text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1.5";

const SeguimientoModal = ({
  dialogRef,
  onClose,
  sessionId,
  sessionDate,
  seguimiento,
  defaultAlumnoId,
  defaultEscuelita,
}: SeguimientoModalProps) => {
  const queryClient = useQueryClient();
  const isEdit = !!seguimiento;
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [formData, setFormData] = useState({
    escuelita: (seguimiento?.escuelita ?? defaultEscuelita ?? "") as
      | "Peruanidad"
      | "Valle_Ecologico"
      | "",
    alumnoId: String(seguimiento?.alumnoId ?? defaultAlumnoId ?? ""),
    tema: seguimiento?.tema ?? "",
    calificacion: (seguimiento?.calificacion ?? "") as string,
    dificultad: seguimiento?.dificultad ?? "",
    observacion: seguimiento?.observacion ?? "",
  });

  const handleChange = (field: string, value: string) => {
    if (field === "escuelita") {
      setFormData((prev) => ({
        ...prev,
        escuelita: value as "Peruanidad" | "Valle_Ecologico" | "",
        alumnoId: "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["seguimientos"] });
    queryClient.invalidateQueries({ queryKey: ["seguimientos-alumno"] });
    if (sessionId) {
      queryClient.invalidateQueries({ queryKey: ["session", sessionId] });
    }
  };

  const {
    execute: execCreate,
    fieldErrors: createErrors,
    isLoading: isCreating,
  } = useAction(createSeguimiento, {
    onSuccess: () => {
      toast.success("Seguimiento creado");
      invalidate();
      onClose();
    },
    onError: (e) => toast.error(e),
  });

  const {
    execute: execUpdate,
    fieldErrors: updateErrors,
    isLoading: isUpdating,
  } = useAction(updateSeguimiento, {
    onSuccess: () => {
      toast.success("Seguimiento actualizado");
      invalidate();
      onClose();
    },
    onError: (e) => toast.error(e),
  });

  const { execute: execDelete, isLoading: isDeleting } = useAction(
    deleteSeguimiento,
    {
      onSuccess: () => {
        toast.success("Seguimiento eliminado");
        invalidate();
        onClose();
      },
      onError: (e) => toast.error(e),
    },
  );

  const { data: alumnosData } = useQuery({
    queryKey: ["alumnos-by-escuelita", formData.escuelita],
    queryFn: () => fetcher(`/api/alumnos?escuelita=${formData.escuelita}&all=true`),
    enabled: !!formData.escuelita,
  });
  const alumnosList: { id: number; nombre: string; apellidos: string }[] =
    alumnosData?.data ?? [];

  const fieldErrors = isEdit ? updateErrors : createErrors;
  const isLoading = isCreating || isUpdating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      alumnoId: parseInt(formData.alumnoId),
      escuelita: formData.escuelita as "Peruanidad" | "Valle_Ecologico",
      calificacion: formData.calificacion as
        | "Excelente"
        | "Bueno"
        | "Regular"
        | "Con_dificultad"
        | "Con_mucha_dificultad",
    };
    if (isEdit) {
      execUpdate({ id: seguimiento!.id, ...payload });
    } else {
      execCreate({ ...payload, sessionId: sessionId! });
    }
  };

  const isValid =
    formData.escuelita &&
    formData.alumnoId &&
    formData.tema &&
    formData.calificacion &&
    (isEdit || !!sessionId);

  const displayDate = sessionDate
    ? new Date(sessionDate).toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" })
    : seguimiento
      ? new Date(seguimiento.fechaSesion).toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" })
      : null;

  return (
    <dialog ref={dialogRef} className="modal p-2">
      <div className="modal-box bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-myzinc">
              {isEdit ? "Editar seguimiento" : "Nuevo seguimiento"}
            </h2>
            {displayDate && (
              <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1.5">
                <i className="fa-solid fa-calendar-day text-myteal" />
                Sesión del {displayDate}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition text-sm"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Escuelita */}
          <div>
            <label className={LABEL}>Escuelita *</label>
            <select
              value={formData.escuelita}
              onChange={(e) => handleChange("escuelita", e.target.value)}
              className={INPUT}
            >
              <option value="">Seleccionar...</option>
              <option value="Peruanidad">Peruanidad</option>
              <option value="Valle_Ecologico">Valle Ecológico</option>
            </select>
            <FormErrors id="escuelita" errors={fieldErrors} />
          </div>

          {/* Alumno */}
          {!defaultAlumnoId && (
            <div>
              <label className={LABEL}>Alumno *</label>
              <select
                value={formData.alumnoId}
                onChange={(e) => handleChange("alumnoId", e.target.value)}
                disabled={!formData.escuelita}
                className={INPUT}
              >
                <option value="">
                  {formData.escuelita
                    ? "Seleccionar alumno..."
                    : "Primero elige una escuelita"}
                </option>
                {alumnosList
                  .sort((a, b) => a.nombre.localeCompare(b.nombre))
                  .map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.nombre}
                    </option>
                  ))}
              </select>
              <FormErrors id="alumnoId" errors={fieldErrors} />
            </div>
          )}

          {/* Tema */}
          <div>
            <label className={LABEL}>Tema *</label>
            <input
              value={formData.tema}
              onChange={(e) => handleChange("tema", e.target.value)}
              placeholder="Ej: Matemáticas - fracciones"
              className={INPUT}
            />
            <FormErrors id="tema" errors={fieldErrors} />
          </div>

          {/* Calificación */}
          <div>
            <label className={LABEL}>Calificación *</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {CALIFICACIONES.map((cal) => (
                <button
                  key={cal}
                  type="button"
                  onClick={() => handleChange("calificacion", cal)}
                  className={`py-2 px-3 rounded-xl border text-sm font-medium transition ${
                    formData.calificacion === cal
                      ? "border-myteal bg-myteal text-white"
                      : "border-zinc-200 bg-zinc-50 text-myzinc hover:border-myteal/50"
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
            <label className={LABEL}>Dificultad observada</label>
            <textarea
              value={formData.dificultad}
              onChange={(e) => handleChange("dificultad", e.target.value)}
              placeholder="Describe las dificultades encontradas..."
              rows={3}
              className={`${INPUT} resize-none`}
            />
          </div>

          {/* Observación */}
          <div>
            <label className={LABEL}>Observación general</label>
            <textarea
              value={formData.observacion}
              onChange={(e) => handleChange("observacion", e.target.value)}
              placeholder="Observaciones adicionales..."
              rows={3}
              className={`${INPUT} resize-none`}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-zinc-100 mt-1">
            {isEdit && !confirmDelete && (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="text-sm text-zinc-400 hover:text-red-500 transition flex items-center gap-1.5"
              >
                <i className="fa-solid fa-trash-can text-xs" />
                Eliminar
              </button>
            )}
            {isEdit && confirmDelete && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-red-500">¿Confirmar?</span>
                <button
                  type="button"
                  onClick={() => execDelete({ id: seguimiento!.id })}
                  disabled={isDeleting}
                  className="text-sm px-3 py-1.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition disabled:opacity-60"
                >
                  {isDeleting ? "Eliminando..." : "Sí, eliminar"}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="text-sm px-3 py-1.5 border border-zinc-200 rounded-xl hover:bg-zinc-50 transition"
                >
                  Cancelar
                </button>
              </div>
            )}
            {!isEdit && <span />}

            <button
              type="submit"
              disabled={isLoading || !isValid}
              className="px-5 py-2.5 bg-myteal text-white rounded-xl text-sm font-semibold hover:bg-myteal/90 transition disabled:opacity-50 ml-auto"
            >
              {isLoading
                ? "Guardando..."
                : isEdit
                  ? "Guardar cambios"
                  : "Crear seguimiento"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default SeguimientoModal;
