"use client";

import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { unregisterVolunteer } from "@/actions/sessions/unregister-volunteer";

type UnregisterVolunteerProps = {
  sessionId: number;
  clerkUserId: string;
};

const UnregisterVolunteer = ({
  sessionId,
  clerkUserId,
}: UnregisterVolunteerProps) => {
  const queryClient = useQueryClient();

  const { execute: executeUnregister, isLoading } = useAction(
    unregisterVolunteer,
    {
      onSuccess: (data) => {
        toast.success(`Inscripción de ${data.firstName} cancelada!`);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        queryClient.invalidateQueries({ queryKey: ["sessionById"] });
        queryClient.invalidateQueries({ queryKey: ["sessionById"] });
        queryClient.invalidateQueries({ queryKey: ["sessionsWithLiders"] });
        queryClient.invalidateQueries({ queryKey: ["sessions"] });
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const handleUnregister = () => {
    executeUnregister({ sessionId, clerkUserId });
  };

  return (
    <button
      onClick={handleUnregister}
      disabled={isLoading}
      className="rounded px-2 py-1.5 text-white  bg-myred hover:bg-myred/80 transition disabled:opacity-50"
    >
      {isLoading
        ? "Cancelación"
        : "Cancelar"}
    </button>
  );
};

export default UnregisterVolunteer;
