import { deleteSession } from "@/actions/admin/delete-session";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useRouter } from "next/navigation";

interface DeleteSessionButtonProps {
  sessionId: number;
  handleCloseModal?: ()=>void
  redirection?: boolean;
}

const DeleteSessionButton = ({ sessionId, handleCloseModal, redirection=false }: DeleteSessionButtonProps) => {
  const queryClient = useQueryClient();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const { execute, isLoading } = useAction(deleteSession, {
    onSuccess: (data) => {
      toast.success(`Sesión "${data.title}" suprimida !`);
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      queryClient.invalidateQueries({ queryKey: ["nextSessions"] });
      queryClient.invalidateQueries({ queryKey: ["sessionsWithLiders"] });
      handleCloseModal?.();
      dialogRef.current?.close();
      if(redirection){router.push("/admin");} 

    },
    onError: (error) => {
      toast.error(error);
      dialogRef.current?.close();
    },
  });

  const onDelete = () => {
    execute({ id: sessionId });
  };

  return (
    <>
      <button
        onClick={() => dialogRef.current?.showModal()}
        className="w-full py-2.5 rounded-2xl border border-zinc-200 text-mygray text-sm font-medium hover:bg-zinc-50 hover:border-myred/30 hover:text-myred transition disabled:opacity-50 flex items-center justify-center gap-2"
        disabled={isLoading}
      >
        <i className="fa-solid fa-trash-can text-xs" />
        Eliminar sesión
      </button>

      <dialog ref={dialogRef} className="modal h-full">
        <div className="modal-box w-auto h-auto bg-white">
          <h3 className="font-bold text-lg">¿Confirmar supresión?</h3>
          <p className="py-4">¿Estás segura/o de que deseas suprimir esta sesión?</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button className="btn">Cancelar</button>
              <button
                type="button"
                onClick={onDelete}
                className="btn bg-myred border-none"
                disabled={isLoading}
              >
                Confirmar
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteSessionButton;
