import { toggleVolunteerActive } from "@/actions/admin/toggle-volunteer-active";
import { toast } from "sonner";
import { useAction } from "@/hooks/use-action";
import { useQueryClient } from "@tanstack/react-query"; 
import { Volunteer } from "@/generated/prisma";


interface ToggleActiveButtonProps {
  user: Volunteer
}

const ToggleActiveButton = ({
  user,
}: ToggleActiveButtonProps) => {

  const queryClient = useQueryClient(); 

  const currentIsActive = user.isActive;

  const { execute, isLoading } = useAction(toggleVolunteerActive, {
    onSuccess: () => {
      toast.success(`Voluntario ${currentIsActive ? "desactivado" : "activado"}.`);
      queryClient.invalidateQueries({ queryKey: ['volunteers'] }); //invalide les données pour refetch

    },
    onError: (error) => {
      toast.error(
        `Error al ${
          currentIsActive ? "desactivar" : "activar"
        } al voluntario: ${error}`
      );
    },
  });

  const handleToggle = () => {
    execute({ volunteerId: user.id, isActive: !currentIsActive });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`p-2 w-[80px] rounded text-xs ${
        currentIsActive ? "bg-myred text-white" : "bg-mygreen text-white"
      }`}
    >
      {isLoading ? "Cargando..." : currentIsActive ? "Desactivar" : "Activar"}
    </button>
  );
};

export default ToggleActiveButton;
