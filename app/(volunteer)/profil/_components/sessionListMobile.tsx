"use client";

import UnregisterButton from "@/components/session/UnregisterButton";
import { RegistrationWithSession, VolunteerWithRegistration } from "@/type";

interface SessionListMobileProps {
  volunteerWithSession: VolunteerWithRegistration;
  handleOpenModal: (sessionId: number) => void;
}

export default function SessionListMobile({
  volunteerWithSession,
  handleOpenModal,
}: SessionListMobileProps) {
  return (
    <div className="w-full space-y-4 max-w-[500px] mx-auto ">
      {volunteerWithSession?.registrations?.map(
        (reg: RegistrationWithSession) => {
          const status =
            reg.status === "PENDING"
              ? { label: "Inscrito", color: "text-myorange", icon: "fa-clock" }
              : reg.status === "CONFIRMED"
              ? { label: "Completado", color: "text-mygreen", icon: "fa-check" }
              : reg.status === "CANCELLED"
              ? { label: "Cancelado", color: "text-myred", icon: "fa-xmark" }
              : { label: "Falta", color: "text-zinc-500", icon: "fa-question" };

          return (
            <div
              key={reg.id}
              className="bg-white shadow rounded-xl border border-zinc-200 flex flex-col overflow-hidden"
            >
              <div className="flex justify-between items-center bg-zinc-100 p-3 border-b border-zinc-200 ">
                <h3 className="font-semibold text-base text-myzinc">
                  {reg.session.title}
                </h3>
                <span
                  className={`flex items-center gap-1 text-sm font-medium ${status.color}`}
                >
                  <i className={`fa-solid ${status.icon}`}></i>
                  {status.label}
                </span>
              </div>

              <div className="flex flex-col  w-full p-4">
                <div className="text-sm text-zinc-500">
                  <i className="fa-regular fa-calendar-days mr-2"></i>
                  {new Intl.DateTimeFormat("es-ES", {
                    day: "numeric",
                    month: "long",
                  }).format(new Date(reg.session.date))}
                </div>

                <div className="flex justify-between items-end min-h-[35px]">
                  <button
                    onClick={() => handleOpenModal(reg.session.id)}
                    className="flex items-center gap-1 mt-1 text-myteal text-sm hover:underline"
                  >
                    <i className="fa-solid fa-eye"></i>
                    Ver sesión
                  </button>
                  {reg.status === "PENDING" ? (
                    <UnregisterButton sessionId={reg.session.id} isReduce />
                  ) : null}
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import UnregisterButton from "@/components/session/UnregisterButton";
// import { RegistrationWithSession, VolunteerWithRegistration } from "@/type";

// interface SessionListMobileProps {
//   volunteerWithSession: VolunteerWithRegistration;
//   handleOpenModal: (sessionId: number) => void;
// }

// export default function SessionListMobile({
//   volunteerWithSession,
//   handleOpenModal,
// }: SessionListMobileProps) {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   return (
//     <div className="w-full space-y-3 max-w-[500px] mx-auto">
//       {volunteerWithSession?.registrations?.map(
//         (reg: RegistrationWithSession, index) => {
//           const isOpen = openIndex === index;

//           const statusColor =
//             reg.status === "PENDING"
//               ? "myorange"
//               : reg.status === "CONFIRMED"
//               ? "mygreen"
//               : reg.status === "CANCELLED"
//               ? "myred"
//               : "zinc-500";

//           return (
//             <div
//               key={reg.id}
//               className="border rounded-lg shadow-sm overflow-hidden"
//             >
//               {/* En-tête cliquable */}
//               <button
//                 className="w-full flex justify-between items-center px-4 py-3 bg-zinc-100 hover:bg-zinc-200 transition"
//                 onClick={() => setOpenIndex(isOpen ? null : index)}
//               >
//                 <div className="flex flex-col items-start">
//                   <span className="font-medium text-zinc-800">
//                     {reg.session.title}
//                   </span>
//                   <span className="text-sm text-zinc-500">
//                     {new Intl.DateTimeFormat("es-ES", {
//                       day: "numeric",
//                       month: "short",
//                     }).format(new Date(reg.session.date))}
//                   </span>
//                 </div>
//                 <i
//                   className={`fa-solid fa-chevron-down transform transition duration-300 ${
//                     isOpen ? "rotate-180" : "rotate-0"
//                   } text-zinc-500`}
//                 ></i>
//               </button>

//               {/* Détails si ouvert */}
//               {isOpen && (
//                 <div className="px-4 py-3 bg-white text-sm text-myzinc flex flex-col gap-4 items-start justify-start">
//                   <div className="flex items-center justify-start gap-2">
//                     <i className="fa-solid fa-users text-sm"></i>
//                     <strong>Estado :</strong>
//                     <span className={`${statusColor}`}>
//                       {reg.status === "PENDING"
//                         ? "Inscrito"
//                         : reg.status === "CONFIRMED"
//                         ? "Completado"
//                         : reg.status === "CANCELLED"
//                         ? "Cancelado"
//                         : "Falta"}
//                     </span>
//                   </div>

//                   <div
//                     onClick={() => handleOpenModal(reg.session.id)}
//                     className="flex items-center justify-start gap-2"
//                   >
//                     <i className="fa-solid fa-eye text-sm"></i>
//                     <strong>Ver sesión</strong>
//                   </div>

//                   <div className="flex items-center justify-start gap-2">
//                     <i className="fa-solid fa-pen text-sm"></i>
//                     <strong>Acción :</strong>{" "}
//                     {reg.status === "PENDING" ? (
//                       <UnregisterButton
//                         sessionId={reg.session.id}
//                       />
//                     ) : reg.status === "CONFIRMED" ? (
//                       <i className="fa-solid fa-check text-mygreen text-lg"></i>
//                     ) : reg.status === "CANCELLED" ? (
//                       <i className="fa-solid fa-xmark text-myred text-lg"></i>
//                     ) : (
//                       <i className="fa-solid fa-pen"></i>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         }
//       )}
//     </div>
//   );
// }
