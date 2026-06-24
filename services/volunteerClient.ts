// services/volunteerClient.ts
// Fonctions appelables côté client (aucune dépendance server-only comme Prisma).
// Elles consomment les routes REST réutilisables (web + mobile).

export async function toggleVolunteerAdmin(
  id: number,
  isAdmin: boolean,
): Promise<{ volunteerId: number; isAdmin: boolean }> {
  const res = await fetch(`/api/volunteers/${id}/toggle-admin`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isAdmin }),
  });
  if (!res.ok) throw new Error("Failed to toggle admin");
  return res.json();
}

export async function toggleVolunteerActive(
  id: number,
  isActive: boolean,
): Promise<{ volunteerId: number; isActive: boolean }> {
  const res = await fetch(`/api/volunteers/${id}/toggle-active`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isActive }),
  });
  if (!res.ok) throw new Error("Failed to toggle active");
  return res.json();
}
