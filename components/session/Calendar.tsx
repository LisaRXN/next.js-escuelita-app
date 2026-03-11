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
import { DateTime } from "luxon";

interface CalendarProps {
  sessions: SessionWithLiders[];
  isReduce?: boolean;
}

// ─── Vue agenda réduite (dashboard) ───────────────────────────────────────────

const TYPE_LABEL: Record<string, string> = {
  TUTORING: "Tutoría",
  OTHER: "Actividad",
};
const TYPE_COLOR: Record<string, string> = {
  TUTORING: "bg-orange-100 text-orange-600",
  OTHER: "bg-blue-100 text-blue-600",
};
const TYPE_BORDER: Record<string, string> = {
  TUTORING: "border-orange-400",
  OTHER: "border-blue-400",
};

function getWeekBounds(offset: number) {
  const now = DateTime.now().plus({ weeks: offset }).setLocale("es");
  const start = now.startOf("week"); // lundi
  const end = now.endOf("week");     // dimanche
  return { start, end };
}

function AgendaView({
  sessions,
  onCreateClick,
}: {
  sessions: SessionWithLiders[];
  onCreateClick: () => void;
}) {
  const router = useRouter();
  const [weekOffset, setWeekOffset] = useState(0);
  const { start, end } = getWeekBounds(weekOffset);

  const weekSessions = sessions
    .filter((s) => {
      const d = DateTime.fromISO(s.date, { zone: "utc" });
      return d >= start && d <= end;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Grouper par jour (clé = "yyyy-MM-dd")
  const grouped = weekSessions.reduce<Record<string, SessionWithLiders[]>>(
    (acc, s) => {
      const key = DateTime.fromISO(s.date, { zone: "utc" }).toFormat("yyyy-MM-dd");
      if (!acc[key]) acc[key] = [];
      acc[key].push(s);
      return acc;
    },
    {}
  );

  const weekLabel =
    start.toFormat("d MMM", { locale: "es" }) +
    " – " +
    end.toFormat("d MMM yyyy", { locale: "es" });

  return (
    <div className="flex flex-col gap-3">
      {/* Navigation semaine */}
      <div className="flex items-center justify-between px-1">
        <button
          onClick={() => setWeekOffset((o) => o - 1)}
          className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition"
        >
          <i className="fa-solid fa-chevron-left text-xs" />
        </button>
        <span className="text-xs font-semibold text-zinc-500 tracking-wide uppercase">
          {weekLabel}
        </span>
        <button
          onClick={() => setWeekOffset((o) => o + 1)}
          className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition"
        >
          <i className="fa-solid fa-chevron-right text-xs" />
        </button>
      </div>

      {/* Liste des sessions */}
      {Object.keys(grouped).length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-6 text-zinc-400">
          <i className="fa-regular fa-calendar text-2xl" />
          <p className="text-xs">Ninguna sesión esta semana</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {Object.entries(grouped).map(([dateKey, daySessions]) => {
            const dt = DateTime.fromISO(dateKey, { zone: "utc" });
            const isToday = dt.hasSame(DateTime.now(), "day");
            return (
              <div key={dateKey}>
                {/* En-tête de jour */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      isToday
                        ? "bg-myorange text-white"
                        : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {dt.setLocale("es").toFormat("EEE d")}
                  </span>
                  <div className="flex-1 h-px bg-zinc-100" />
                </div>

                {/* Sessions du jour */}
                <div className="flex flex-col gap-1.5 pl-1">
                  {daySessions.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => router.push(`/admin/sessions/${s.id}`)}
                      className={`w-full text-left flex items-start gap-3 bg-white border-l-[3px] ${TYPE_BORDER[s.type] ?? "border-zinc-300"} rounded-r-lg px-3 py-2 shadow-sm hover:shadow-md hover:-translate-y-px transition-all duration-150`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-zinc-700 truncate leading-tight">
                          {s.title}
                        </p>
                        {s.liders?.length > 0 && (
                          <p className="text-[10px] text-zinc-400 mt-0.5 truncate">
                            {s.liders.map((l) => l.firstName).join(", ")}
                          </p>
                        )}
                      </div>
                      <span
                        className={`shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${TYPE_COLOR[s.type] ?? "bg-zinc-100 text-zinc-500"}`}
                      >
                        {TYPE_LABEL[s.type] ?? s.type}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bouton créer */}
      <button
        onClick={onCreateClick}
        className="mt-1 self-center flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-myorange transition group"
      >
        <span className="w-5 h-5 rounded-full bg-zinc-100 group-hover:bg-myorange/10 flex items-center justify-center transition">
          <i className="fa-solid fa-plus text-[10px] text-zinc-400 group-hover:text-myorange" />
        </span>
        Crear sesión
      </button>
    </div>
  );
}

// ─── Composant principal ───────────────────────────────────────────────────────

const CalendarWithSessions = ({ isReduce, sessions }: CalendarProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [sessionSelected, setSessionSelected] = useState<number | undefined>(undefined);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const showSessionDialogRef = useRef<HTMLDialogElement>(null);
  const isMobile = window.innerWidth < 768;

  const formattedTitle = (title: string) => {
    if (!isReduce && !isMobile) {
      return title.length > 15 ? title.slice(0, 15) + "..." : title;
    } else {
      return title;
    }
  };

  const events = sessions?.map((s: SessionWithLiders) => ({
    id: String(s.id),
    title: formattedTitle(s.title),
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

  const handleCloseCreateModal = () => {
    setIsModalOpen(false);
    dialogRef.current?.close();
  };

  const handleCloseModal = () => {
    setSessionSelected(undefined);
    showSessionDialogRef.current?.close();
  };

  // Vue réduite : agenda custom
  if (isReduce) {
    return (
      <>
        <AgendaView
          sessions={sessions}
          onCreateClick={() => setIsModalOpen(true)}
        />
        {isModalOpen && (
          <CreateSessionModal
            date={selectedDate}
            dialogRef={dialogRef}
            handleCloseModal={handleCloseCreateModal}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </>
    );
  }

  // Vue pleine page : FullCalendar
  return (
    sessions && (
      <div className="w-full h-auto m-auto">
        <FullCalendar
          timeZone="UTC"
          locale={esLocale}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          initialView={isMobile ? "listWeek" : "dayGridMonth"}
          headerToolbar={{
            left: isMobile ? "" : "today",
            center: "title",
            right: isMobile
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
            const timeEl = info.el.querySelector(".fc-event-time") as HTMLElement;
            if (timeEl) timeEl.style.fontSize = "10px";

            const titleEl = info.el.querySelector(".fc-event-title") as HTMLElement;
            if (titleEl) titleEl.style.fontSize = "12px";

            const liders = info.event.extendedProps.liders;
            if (liders?.length) {
              const names = liders
                .map((l: Volunteer) => l.firstName.toLowerCase())
                .join(", ");
              const namesEl = document.createElement("div");
              namesEl.className = "text-xs font-semibold text-myorange mt-1 flex flex-wrap";
              namesEl.innerText = names;

              const possibleTargets = [
                ".fc-event-title",
                ".fc-event-title-container",
                ".fc-list-event-title",
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

        {isMobile && (
          <div className="mt-5 w-full flex items-center justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-start gap-3 cursor-pointer"
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
