import { toggleVolunteerStatus } from "@/actions/admin/toggle-volunteer-status";
import { toast } from "sonner";
import { useAction } from "@/hooks/use-action";
import { RegistrationStatus } from "@/generated/prisma";
import { useQueryClient } from "@tanstack/react-query";

interface UpdateStatusProps {
  registrationId: number;
  status: RegistrationStatus;
}

const UpdateStatus = ({ registrationId, status }: UpdateStatusProps) => {

  const queryClient = useQueryClient();

  const { execute, isLoading } = useAction(toggleVolunteerStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessionById"] });
      toast.success(`Asistencia modificada!`);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error");
    },
  });

  const handleStatusChange = (newStatus: RegistrationStatus) => {
    execute({ registrationId: registrationId, status: newStatus });
  };

  return (
    <select
      disabled={isLoading}
      value={status}
      onChange={(e) => handleStatusChange(e.target.value as RegistrationStatus)}
      className={`
        appearance-none px-2 rounded py-1.5 text-sm focus:outline-none focus:none text-center
        ${status === "CONFIRMED" ? "bg-mygreen text-white" : ""}
        ${status === "PENDING" ? "bg-slate-400 text-white " : ""}
        ${status === "CANCELLED" ? "bg-myorange text-white" : ""}
        ${status === "NO_SHOW" ? "bg-myred text-white" : ""}
      `}
    >
      <option value="PENDING">EN ESPERA</option>
      <option value="CONFIRMED">PRESENTE</option>
      <option value="CANCELLED">CANCELÓ</option>
      <option value="NO_SHOW">AUSENTE</option>
    </select>
  );
};

export default UpdateStatus;
