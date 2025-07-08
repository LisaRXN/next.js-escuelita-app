import CreateSessionForm from "../../app/(admin)/admin/sessions/_components/CreateSessionForm";
import { RefObject } from "react";

interface CreateSessionModalProps {
  date: string | null | undefined;
  dialogRef: RefObject<HTMLDialogElement | null>;
  handleCloseModal: () => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

const CreateSessionModal = ({
  date,
  dialogRef,
  setIsModalOpen,
  handleCloseModal,
}: CreateSessionModalProps) => {
  return (
    <dialog ref={dialogRef} id="my_modal_3" className="modal p-2">
      <div className="modal-box bg-white h-full w-full lg:h-4/5">
        <form method="dialog">
          <button
            onClick={() => setIsModalOpen(false)}
            className="btn btn-sm btn-circle btn-ghost text-zinc-400 absolute right-2 top-2 py-1 px-2"
          >
            ✕
          </button>
        </form>
        <CreateSessionForm date={date} closeModal={handleCloseModal} />
      </div>
    </dialog>
  );
};

export default CreateSessionModal;
