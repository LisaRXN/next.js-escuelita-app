import { Volunteer, VolunteerSession } from "@/generated/prisma";
import { RegistrationWithSession, VolunteerWithRegistration } from "@/type";

interface ActivityCardProps {
    volunteerWithSession: VolunteerWithRegistration;
    handleOpenModal: (sessionId: number) => void;
}

const ActivityCard = ({volunteerWithSession, handleOpenModal}: ActivityCardProps) => {

    return(
        <div className="border border-mygreen rounded-lg w-full overflow-y-auto">
        <table className="min-w-full divide-y divide-zinc-200 rounded-lg overflow-hidden">
          <thead className="bg-mygreen/40 text-myzinc">
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-zinc-200 max-h-[500px] overflow-y-scroll">
            {volunteerWithSession?.registrations?.map(
              (reg: RegistrationWithSession) => (
                <tr key={reg.id} className="hover:bg-zinc-50">
                  <td className="px-2 md:px-6 py-4 whitespace-nowrap text-left">
                    {reg.session.type === "TUTORING"
                      ? "Tutorias"
                      : reg.session.title.length > 15
                      ? reg.session.title.slice(0, 15) + "..."
                      : reg.session.title}
                  </td>
                  <td className="px-2 md:px-6 py-4 whitespace-nowrap text-start ml-2">
                    {new Intl.DateTimeFormat("es-ES", {
                      day: "numeric",
                      month: "numeric",
                    }).format(new Date(reg.session.date))}
                  </td>
                  <td className="px-2 md:px-6 py-4 whitespace-nowrap text-start ml-2">
                    <button
                      onClick={() => handleOpenModal(reg.session.id)}
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
                      <i className="fa-solid fa-chevron-right text-[12px] ml-1"></i>
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

    )
}

export default ActivityCard;