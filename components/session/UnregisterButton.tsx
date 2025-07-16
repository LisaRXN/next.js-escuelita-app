'use client';

import { useAction } from '@/hooks/use-action';
import { toast } from 'sonner';
import { useQueryClient } from "@tanstack/react-query"; 
import { unregisterToSession } from '@/actions/sessions/unregister-to-session';

type UnregisterButtonProps = {
  sessionId: number;
  fullWidth?: boolean,
  isReduce?: boolean,
};

const UnregisterButton = ({ sessionId, fullWidth=false, isReduce=false }: UnregisterButtonProps) => {

  const queryClient = useQueryClient(); 

  const { execute: executeUnregister, isLoading } = useAction(unregisterToSession, {
    onSuccess: () => {
      toast.success("Tu inscripción esta cancelada!");
      queryClient.invalidateQueries({ queryKey: ['user'] }); 
      queryClient.invalidateQueries({ queryKey: ['sessionById'] }); 
      queryClient.invalidateQueries({ queryKey: ['sessionById'] }); 
      queryClient.invalidateQueries({ queryKey: ['sessionsWithLiders'] });
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleUnregister = () => {
    executeUnregister({ sessionId });
  }

  return (
      <button
        onClick={handleUnregister}
        disabled={isLoading}
        className={`${fullWidth ? 'w-full':''} bg-myred text-white ${isReduce ? 'px-2 md:px-4 py-1.5':'px-4 py-2'} rounded hover:bg-myred/80 transition disabled:opacity-50`}
      >
        {isLoading ? 'Cancelación...' : !isReduce ? 'Cancelar inscripción' : 'Cancelar'}
      </button>
  );
}

export default UnregisterButton;
