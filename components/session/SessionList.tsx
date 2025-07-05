import React from "react";
import SessionCard from "@/components/session/SessionCard";
import { VolunteerSession } from "@/generated/prisma";

interface SessionListProps {
  sessions: VolunteerSession[] | null;
  admin: boolean;
}

export default function SessionList({ sessions, admin}: SessionListProps) {
  if (!sessions || sessions.length === 0) {
    return <p>Aucune session disponible.</p>;
  }

  return (
    <div className="space-y-10">
      {sessions.map((session) => (
        <SessionCard
          isAdmin={admin}
          key={session.id}
          title={session.title}
          location={session.location}
          date={session.date}
          sessionId={session.id}
          shadow={false}
        />
      ))}
    </div>
  );
}
