'use client';

import { signUpToSession } from '@/actions/sessions/signup-to-session';
import { useAction } from '@/hooks/use-action';
import { toast } from 'sonner';
import { useQueryClient } from "@tanstack/react-query"; 

type Props = {
  sessionId: number;
  fullWidth?: boolean
};

export default function SignUpToSessionButton({ sessionId, fullWidth=false }: Props) {

  const queryClient = useQueryClient(); 

  const { execute: executeSignUp, isLoading } = useAction(signUpToSession, {
    onSuccess: () => {
      toast.success("Gracias, estas inscrito/a a la sesión!");
      queryClient.invalidateQueries({ queryKey: ['user'] }); 
      queryClient.invalidateQueries({ queryKey: ['sessionById'] }); 
      queryClient.invalidateQueries({ queryKey: ['sessionsWithLiders'] }); 
      queryClient.invalidateQueries({ queryKey: ['sessions'] }); 
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSignUp = () => {
    executeSignUp({ sessionId });
  }

  return (
    <button
      onClick={handleSignUp}
      disabled={isLoading}
      className={`${fullWidth ? 'w-full':''} bg-myorange text-white px-4 py-2  rounded hover:bg-myorange/80 transition disabled:opacity-50`}

    >
      {isLoading ? 'Inscripción...' : 'Inscribirme'}
    </button>
  );
}
