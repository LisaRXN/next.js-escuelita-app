import UnregisterButton from "@/components/session/UnregisterButton";
import { RegistrationWithSession, VolunteerWithRegistration } from "@/type";

interface SessionListProps {
  volunteerWithSession: VolunteerWithRegistration;
  handleOpenModal: (sessionId: number) => void;
}

const SessionList = ({
  volunteerWithSession,
  handleOpenModal,
}: SessionListProps) => {
  // Formattage des dates
  const formattedDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  };
  return (
    <div className="rounded-lg w-full max-w-screen-lg mx-auto text-myzinc">
      <table className="min-w-full divide-y divide-zinc-200 rounded-lg overflow-hidden">
        <thead className="bg-mygray text-white">
          <tr>
            <th className="px-2 md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              <span className="flex items-center justify-start gap-2">
                <i className="fa-solid fa-shapes"></i>
                <p>Sesión</p>
              </span>
            </th>
            <th className="px-2 md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              <span className="flex items-center justify-start gap-2">
                <i className="fa-solid fa-calendar"></i>
                <p>Fecha</p>
              </span>
            </th>
            <th className="px-2 md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              <span className="flex items-center justify-start gap-2">
                <i className="fa-solid fa-users"></i>
                <p>Asistencia</p>
              </span>
            </th>
            <th className="px-2 md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              <span className="flex items-center justify-start gap-2">
                <i className="fa-solid fa-pen"></i>
                <p>Acción</p>
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-zinc-200 max-h-[500px] overflow-y-scroll">
          {volunteerWithSession?.registrations?.map(
            (reg: RegistrationWithSession) => (
              <tr key={reg.id} className="hover:bg-zinc-50">
                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-start">
                  <button
                    onClick={() => handleOpenModal(reg.session.id)}
                    className="underline"
                  >
                    {reg.session.title}
                  </button>
                </td>
                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-start">
                  {formattedDate(reg.session.date)}
                </td>
                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-start">
                  <span
                    className={`inline-flex items-center justify-center font-medium transition-colors duration-200 hover:text-opacity-80 ${
                      reg.status === "PENDING"
                        ? "text-myorange"
                        : reg.status === "CONFIRMED"
                        ? "text-mygreen"
                        : reg.status === "CANCELLED"
                        ? "text-myred"
                        : "text-myorange"
                    }`}
                    aria-label={"Ver más"}
                  >
                    {reg.status === "PENDING"
                      ? "Inscrito"
                      : reg.status === "CONFIRMED"
                      ? "Completado"
                      : reg.status === "CANCELLED"
                      ? "Cancelado"
                      : "Falta"}
                  </span>
                </td>
                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-start">
                  {reg.status === "PENDING" ? (
                    <UnregisterButton sessionId={reg.session.id} />
                  ) : reg.status === "CONFIRMED" ? (
                    <i className="fa-solid fa-check text-mygreen text-lg"></i>
                  ) : reg.status === "CANCELLED" ? (
                    <i className="fa-solid fa-xmark text-lg text-myred"></i>
                  ) : (
                    <i className="fa-solid fa-pen"></i>
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SessionList;
