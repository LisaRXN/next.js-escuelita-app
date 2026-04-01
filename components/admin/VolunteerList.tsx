"use client";

import { useAction } from "@/hooks/use-action";
import { toggleVolunteerStatus } from "@/actions/admin/toggle-volunteer-status";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import UnregisterVolunteer from "./UnregisterVolunteer";
import { RegisteredVolunteer } from "@/type";
import { RegistrationStatus } from "@/generated/prisma";

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  CONFIRMED: { label: "Presente",  color: "#15803D", bg: "#DCFCE7", border: "#15803D40" },
  NO_SHOW:   { label: "No vino",   color: "#B91C1C", bg: "#FEE2E2", border: "#B91C1C40" },
  CANCELLED: { label: "Canceló",   color: "#9CA3AF", bg: "#F1F5F9", border: "transparent" },
};

function StatusChips({ registrationId, status }: { registrationId: number; status: RegistrationStatus }) {
  const queryClient = useQueryClient();
  const { execute, isLoading } = useAction(toggleVolunteerStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessionById"] });
      toast.success("Asistencia modificada");
    },
    onError: () => toast.error("Error al actualizar"),
  });

  const handleClick = (newStatus: RegistrationStatus) => {
    execute({ registrationId, status: status === newStatus ? "PENDING" : newStatus });
  };

  return (
    <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2.5 border-t border-gray-50">
      {(["CONFIRMED", "NO_SHOW", "CANCELLED"] as RegistrationStatus[]).map((s) => {
        const active = status === s;
        const cfg = STATUS_CONFIG[s];
        return (
          <button
            key={s}
            disabled={isLoading}
            onClick={() => handleClick(s)}
            className="text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all disabled:opacity-50 hover:opacity-80"
            style={{
              backgroundColor: active ? cfg.bg : "#F3F4F6",
              color: active ? cfg.color : "#9CA3AF",
              borderColor: active ? cfg.border : "transparent",
            }}
          >
            {cfg.label}
          </button>
        );
      })}
    </div>
  );
}

function VolunteerCard({ reg, sessionId }: { reg: RegisteredVolunteer; sessionId: number }) {
  return (
    <div className="bg-white rounded-2xl px-4 py-3 border border-gray-100">
      <div className="flex items-center gap-3">
        <div className="relative w-9 h-9 shrink-0">
          <div className="w-9 h-9 rounded-full bg-myteal/15 flex items-center justify-center">
            <span className="text-myteal font-black text-xs">
              {reg.firstName[0]}{reg.lastName[0]}
            </span>
          </div>
          <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-myteal text-white text-[9px] font-bold flex items-center justify-center leading-none">
            {reg.registrationOrder}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-myzinc font-semibold text-sm">{reg.firstName} {reg.lastName}</p>
          <p className="text-gray-400 text-xs mt-0.5">
            {reg.phone && <span>{reg.phone} · </span>}
            <span>Inscrito el {new Date(reg.registeredAt).toLocaleDateString("es-PE", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
          </p>
        </div>
        <UnregisterVolunteer sessionId={sessionId} clerkUserId={reg.clerkUserId} />
      </div>
      <StatusChips registrationId={reg.registrationId} status={reg.status} />
    </div>
  );
}

const VolunteerList = ({ registeredVolunteers, sessionId }: { registeredVolunteers: RegisteredVolunteer[]; sessionId: number }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-myteal/15 flex items-center justify-center shrink-0">
          <i className="fa-solid fa-people-group text-myteal text-[10px]" />
        </div>
        <span className="text-myteal text-[11px] font-bold uppercase tracking-wider">Voluntarios</span>
        <div className="flex-1 h-px bg-myteal/20" />
        <span className="text-myteal text-[11px] font-semibold">{registeredVolunteers.length}</span>
      </div>
      {registeredVolunteers.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
          <p className="text-gray-400 text-sm">Ningún voluntario inscrito aún</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {registeredVolunteers.map((reg) => (
            <VolunteerCard key={reg.registrationId} reg={reg} sessionId={sessionId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VolunteerList;
