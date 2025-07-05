"use client";

import UpdateStatus from "./UpdateStatus";
import { RegisteredVolunteer } from "@/type";

interface VolunteerListProps {
  registeredVolunteers: RegisteredVolunteer[];
}

const VolunteerList = ({ registeredVolunteers }: VolunteerListProps) => {

  // const [registrationsList, setRegistrationsList] = useState<SessionWithRegistrations[]>(
  //   registrations || []
  // );

  // const handleToggle = (id: number, newStatus: RegistrationStatus) => {
  //   if (!registrationsList) return;

  //   setRegistrationsList((prev) =>
  //     prev.map((registration) =>
  //       registration.id === id
  //         ? { ...registration, status: newStatus }
  //         : registration
  //     )
  //   );
  // };

  return (
    <div className="border border-zinc-400 rounded-lg w-full overflow-x-auto text-myzinc">
      <table className="min-w-full divide-y divide-zinc-200 rounded-lg overflow-hidden">
        <thead className="bg-zinc-200 text-myzinc w-full">
          <tr>
            <th className="px-2 md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-user"></i> Nombre
              </div>
            </th>
            <th className="px-2 md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-phone"></i> Número
              </div>
            </th>
            <th className="px-2 md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider0">
              <span className="flex items-center justify-start gap-2">
                <i className="fa-solid fa-users"></i>
                <p>Asistencia</p>
              </span>
            </th>
          </tr>
        </thead>
        <tbody className=" divide-y divide-zinc-200">
          {registeredVolunteers.map((reg) => (
            <tr key={reg.registrationId} className="hover:bg-zinc-50">
              <td className="px-2 md:px-6 py-4 whitespace-nowrap">
                {reg.firstName}{" "}
                {reg.lastName}
              </td>
              <td className="px-2 md:px-6 py-4 whitespace-nowrap">
                {reg.phone}
              </td>
              <td className="px-2 md:px-6 py-4 whitespace-nowrap">
                <UpdateStatus
                  registrationId={reg.registrationId}
                  status={reg.status}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerList;
