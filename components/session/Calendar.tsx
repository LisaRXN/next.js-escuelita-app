"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { SessionWithLiders } from "@/type";
import { Volunteer } from "@/generated/prisma";
import SessionModal from "@/components/modals/SessionModal";
import CreateSessionModal from "@/components/modals/CreateSessionModal";

interface CalendarProps {
  sessions: SessionWithLiders[];
  isReduce?: boolean;
}

const CalendarWithSessions = ({ isReduce, sessions }: CalendarProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [sessionSelected, setSessionSelected] = useState<number | undefined>(
    undefined
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const showSessionDialogRef = useRef<HTMLDialogElement>(null);
  const isMobile = window.innerWidth < 768;

  // Transforme les sessions en events FullCalendar
  const events = sessions?.map((s: SessionWithLiders) => ({
    id: String(s.id),
    title: s.title,
    start: new Date(s.date).toISOString(),
    extendedProps: {
      type: s.type,
      liders: s.liders,
    },
  }));

  useEffect(() => {
    if (isModalOpen && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (sessionSelected !== undefined) {
      showSessionDialogRef.current?.showModal();
    }
  }, [sessionSelected]);

  const handleDateClick = (info: DateClickArg) => {
    setSelectedDate(info.dateStr);
    setIsModalOpen(true);
  };

  const handleEventClick = (info: EventClickArg) => {
    const sessionId = parseInt(info.event.id);
    router.push(`/admin/sessions/${sessionId}`);
  };
  // setSessionSelected(sessionId);

  const handleCloseCreateModal = () => {
    setIsModalOpen(false);
    dialogRef.current?.close();
  };

  const handleCloseModal = () => {
    setSessionSelected(undefined);
    showSessionDialogRef.current?.close();
  };

  return (
    sessions && (
      <div className="w-full h-auto m-auto">
        <FullCalendar
          timeZone="UTC"
          locale={esLocale}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialView={isMobile || isReduce ? "listWeek" : "dayGridMonth"}
          headerToolbar={{
            left: isMobile ? "" : "today",
            center: "title",
            right:
              isMobile || isReduce
                ? "prev,next"
                : "prev,next dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height="auto"
          selectable={true}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          dayMaxEventRows={true}
          fixedWeekCount={true}
          contentHeight="auto"
          dayCellDidMount={(info) => {
            info.el.classList.add("cursor-pointer");
          }}
          eventDidMount={(info) => {
            const liders = info.event.extendedProps.liders;
            if (liders?.length) {
              const names = liders
                .map((l: Volunteer) => l.firstName.toLowerCase())
                .join(", ");
              const namesEl = document.createElement("div");
              namesEl.className = "text-xs font-semibold text-myorange mt-1";
              namesEl.innerText = names;

              const possibleTargets = [
                ".fc-event-title", // dayGridMonth (desktop)
                ".fc-event-title-container", // timeGridWeek/Day
                ".fc-list-event-title", // listWeek / listDay (mobile)
              ];

              for (const selector of possibleTargets) {
                const target = info.el.querySelector(selector);
                if (target) {
                  target.appendChild(namesEl);
                  target.classList.add("ml-2");
                  break;
                }
              }
            }
            info.el.classList.add("cursor-pointer");
          }}
        />

        {(isReduce || isMobile) && (
          <div className=" mt-5 w-full flex items-center justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-start gap-3 cursror-pointer"
            >
              <i className="fa-solid fa-plus bg-myorange rounded-full text-white w-4 h-4 text-sm md:text-md md:w-5 md:h-5 flex items-center justify-center"></i>
              <span className="text-myzinc text-sm md:text-md underline font-semibold">
                Crear evento
              </span>
            </button>
          </div>
        )}

        {isModalOpen && (
          <CreateSessionModal
            date={selectedDate}
            dialogRef={dialogRef}
            handleCloseModal={handleCloseCreateModal}
            setIsModalOpen={setIsModalOpen}
          />
        )}

        {sessionSelected && (
          <SessionModal
            sessionId={sessionSelected}
            dialogRef={showSessionDialogRef}
            isAdmin={true}
            handleCloseModal={handleCloseModal}
          />
        )}
      </div>
    )
  );
};

export default CalendarWithSessions;
