"use client"

import { RefObject } from 'react';
import SessionDescription from '../session/SessionDescription';
import AdminSessionDescription from '../admin/AdminSessionDescription';

interface CreateSessionModalProps {
  sessionId: number;
  dialogRef: RefObject<HTMLDialogElement | null>;
  isAdmin?: boolean;
  handleCloseModal: () => void;
}

const SessionModal = ({sessionId, dialogRef, isAdmin=false, handleCloseModal}:CreateSessionModalProps ) => {



  return (
    <dialog ref={dialogRef} id="my_modal_3" className="modal">
    <div className="modal-box bg-white h-full lg:h-auto w-full lg:max-h-4/5">
      <form method="dialog">
        <button
          onClick={handleCloseModal}
          className="btn z-10 btn-sm btn-circle btn-ghost text-zinc-400 absolute right-2 top-2 py-1 px-2"
        >
          ✕
        </button>
      </form>
      { isAdmin ? ( <AdminSessionDescription sessionId={sessionId} handleCloseModal={handleCloseModal} />) : (<SessionDescription sessionId={sessionId} />)}
      
    </div>
  </dialog>
  );
};

export default SessionModal;
