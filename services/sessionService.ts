import { VolunteerSession } from "@/generated/prisma";

export async function fetchLastSessions(): Promise<VolunteerSession[]> {
  const res = await fetch("/api/lastSessions");
  if (!res.ok) throw new Error("Failed to fetch sessions");
  return res.json();
}


export const getNextSaturdayDateTime = () => {
  const today = new Date();
  const day = today.getDay(); // 0 = dimanche, 6 = samedi
  const distance = (6 - day + 7) % 7 || 7; // samedi prochain
  const nextSaturday = new Date(today);
  nextSaturday.setDate(today.getDate() + distance);
  nextSaturday.setHours(12, 0, 0, 0); 

  // Format: YYYY-MM-DDTHH:mm
  return nextSaturday.toISOString().slice(0, 16);
};
