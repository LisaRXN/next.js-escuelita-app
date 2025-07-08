import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useRef, useState } from "react";
import { VolunteerSession } from "@/generated/prisma";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import SessionModal from "@/components/modals/sessionModal";
import { EventClickArg } from "@fullcalendar/core/index.js";

interface CalendarVolunteerProps {
  isReduce?: boolean;
  sessions: VolunteerSession[];
}

const CalendarVolunteer = ({ isReduce, sessions }: CalendarVolunteerProps) => {
  const [sessionSelected, setSessionSelected] = useState<number | undefined>(
    undefined
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  

  const events = sessions.map((s: VolunteerSession) => ({
    id: String(s.id),
    title: s.title,
    start: s.date,
    extendedProps: {
      type: s.type,
    },
  }));


  const handleEventClick = (info: EventClickArg) => {
    const sessionId = parseInt(info.event.id);
    setSessionSelected(sessionId);
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleCloseModal = () => {
    setSessionSelected(undefined);
    dialogRef.current?.close();
  };


  return (
    <div className="w-full h-auto m-auto max-w-screen-lg">
      <FullCalendar
        locale={esLocale}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView={isReduce ? "listWeek" : "dayGridMonth"}
        headerToolbar={{
          left: isReduce ? undefined : "prev,next today",
          center: "title",
          right: isReduce
            ? "prev,next"
            : "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="auto"
        selectable={true}
        events={events}
        eventClick={handleEventClick}
        dayMaxEventRows={true}
        fixedWeekCount={true}
        contentHeight="auto"
        eventDidMount={(info) => {
          info.el.classList.add("cursor-pointer");
        }}
      />

      {sessionSelected !== undefined && (
        <SessionModal
          sessionId={sessionSelected}
          dialogRef={dialogRef}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CalendarVolunteer;
