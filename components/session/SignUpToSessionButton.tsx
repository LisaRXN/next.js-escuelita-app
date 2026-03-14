
"use client";

import { signUpToSession } from "@/actions/sessions/signup-to-session";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  sessionId: number;
  fullWidth?: boolean;
  compact?: boolean;
};

export default function SignUpToSessionButton({
  sessionId,
  fullWidth = false,
  compact = false,
}: Props) {
  const queryClient = useQueryClient();

  const { execute: executeSignUp, isLoading } = useAction(signUpToSession, {
    onSuccess: () => {
      toast.success("Gracias, estas inscrito/a a la sesión!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["sessionById"] });
      queryClient.invalidateQueries({ queryKey: ["sessionsWithLiders"] });
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      queryClient.invalidateQueries({ queryKey: ["coordinator-agenda"] });
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSignUp = () => {
    executeSignUp({ sessionId });
  };

  return (
    <button
      type="button"
      onClick={handleSignUp}
      disabled={isLoading}
      className={`${fullWidth ? "w-full" : ""} bg-myteal text-white font-semibold hover:bg-myteal/90 transition disabled:opacity-50 flex items-center justify-center gap-2 ${
        compact
          ? "px-3 py-1.5 rounded-xl text-xs"
          : "px-4 py-2.5 rounded-2xl text-sm"
      }`}
    >
      {isLoading ? "Inscripción..." : "Inscribirme"}
    </button>
  );
}
