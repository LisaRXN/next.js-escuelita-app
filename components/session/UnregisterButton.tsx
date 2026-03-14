"use client";

import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { unregisterToSession } from "@/actions/sessions/unregister-to-session";

type UnregisterButtonProps = {
  sessionId: number;
  fullWidth?: boolean;
  isReduce?: boolean;
  isAdmin?: boolean;
};

const UnregisterButton = ({
  sessionId,
  fullWidth = false,
  isReduce = false,
  isAdmin,
}: UnregisterButtonProps) => {
  const queryClient = useQueryClient();

  const { execute: executeUnregister, isLoading } = useAction(
    unregisterToSession,
    {
      onSuccess: () => {
        toast.success("Tu inscripción esta cancelada!");
        queryClient.invalidateQueries({ queryKey: ["user"] });
        queryClient.invalidateQueries({ queryKey: ["sessionById"] });
        queryClient.invalidateQueries({ queryKey: ["sessionsWithLiders"] });
        queryClient.invalidateQueries({ queryKey: ["sessions"] });
        queryClient.invalidateQueries({ queryKey: ["coordinator-agenda"] });
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const handleUnregister = () => {
    executeUnregister({ sessionId });
  };

  return (
    <div className="relative group">
      <button
        onClick={handleUnregister}
        disabled={isLoading || !isAdmin}
        className={`${fullWidth ? "w-full" : ""} border border-myred text-myred bg-transparent cursor-pointer font-semibold ${
          isReduce ? "px-2 md:px-3 py-1 text-xs rounded-xl" : "px-4 py-2.5 rounded-2xl"
        } hover:bg-myred/5 transition disabled:opacity-50 flex items-center justify-center gap-2`}
      >
        {isLoading
          ? "Cancelación..."
          : !isReduce
          ? "Cancelar inscripción"
          : "Cancelar"}
      </button>
      {!isAdmin && <span className="hidden group-hover:flex absolute min-w-[280px] bg-white text-myzinc flex-wrap h-auto p-4 rounded-lg shadow-lg z-10 top-0 right-0 -translate-y-1/2">
        <p>Contacta un coordinador para cancelar</p>
      </span>}
    </div>
  );
};

export default UnregisterButton;
