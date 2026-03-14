"use client";

import UnregisterButton from "../session/UnregisterButton";
import { useAuth } from "@clerk/nextjs";
import { RegisteredVolunteer } from "@/type";

const STATUS_LABELS: Record<string, string> = {
  CONFIRMED: "Presente",
  NO_SHOW:   "No vino",
  CANCELLED: "Canceló",
  PENDING:   "En espera",
};

const STATUS_COLORS: Record<string, { color: string; bg: string }> = {
  CONFIRMED: { color: "#15803D", bg: "#DCFCE7" },
  NO_SHOW:   { color: "#B91C1C", bg: "#FEE2E2" },
  CANCELLED: { color: "#9CA3AF", bg: "#F1F5F9" },
  PENDING:   { color: "#6B7280", bg: "#F3F4F6" },
};

function CoordinatorCard({
  lider,
  sessionId,
  currentUserId,
}: {
  lider: RegisteredVolunteer;
  sessionId: number;
  currentUserId: string | null | undefined;
}) {
  const isCurrentUser = currentUserId === lider.clerkUserId;
  const cfg = STATUS_COLORS[lider.status] ?? STATUS_COLORS.PENDING;

  return (
    <div className="bg-indigo-50 rounded-2xl px-4 py-3 border border-indigo-100 flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-indigo-200 flex items-center justify-center shrink-0">
        <span className="text-indigo-700 font-black text-xs">
          {lider.firstName[0]}{lider.lastName[0]}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-myzinc font-semibold text-sm">{lider.firstName} {lider.lastName.slice(0, 1)}.</p>
        {lider.phone && <p className="text-gray-400 text-xs mt-0.5">{lider.phone}</p>}
      </div>
      {lider.status !== "PENDING" && (
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-lg shrink-0"
          style={{ color: cfg.color, backgroundColor: cfg.bg }}
        >
          {STATUS_LABELS[lider.status]}
        </span>
      )}
      {isCurrentUser && (
        <UnregisterButton sessionId={sessionId} isReduce={true} isAdmin={true} />
      )}
    </div>
  );
}

interface CoordinatorListProps {
  liders: RegisteredVolunteer[];
  sessionId: number;
  sessionDate: Date;
}

const CoordinatorList = ({ liders, sessionId }: CoordinatorListProps) => {
  const { userId } = useAuth();

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
          <i className="fa-solid fa-star text-indigo-500 text-[10px]" />
        </div>
        <span className="text-indigo-500 text-[11px] font-bold uppercase tracking-wider">Coordinadores</span>
        <div className="flex-1 h-px bg-indigo-200" />
        <span className="text-indigo-500 text-[11px] font-semibold">{liders.length}</span>
      </div>
      {liders.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
          <p className="text-gray-400 text-sm">Ningún coordinador inscrito aún</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {liders.map((lider) => (
            <CoordinatorCard
              key={lider.clerkUserId}
              lider={lider}
              sessionId={sessionId}
              currentUserId={userId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoordinatorList;
