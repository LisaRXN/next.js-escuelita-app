"use client";

import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { useDebounce } from "use-debounce";
import { VolunteerWithTutoringCount } from "@/type";
import { toggleVolunteerActive, toggleVolunteerAdmin } from "@/services/volunteerClient";

// ── helpers ─────────────────────────────────────────────────────────────────

function monthKey(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(key: string) {
  const [year, month] = key.split("-");
  return new Date(Number(year), Number(month) - 1, 1).toLocaleDateString("es-PE", {
    month: "long", year: "numeric",
  });
}

function initials(v: VolunteerWithTutoringCount) {
  return `${v.firstName[0] ?? ""}${v.lastName[0] ?? ""}`.toUpperCase();
}

// ── page ────────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [filterRole, setFilterRole] = useState<"all" | "admin" | "no-admin">("all");
  const [filterActive, setFilterActive] = useState<"all" | "active" | "inactive">("all");
  const [filterMonth, setFilterMonth] = useState<string>("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const searchRef = useRef<HTMLInputElement>(null);

  const { data, isLoading } = useQuery<{ data: VolunteerWithTutoringCount[]; total: number }>({
    queryKey: ["volunteers-all"],
    queryFn: () => fetcher("/api/users?all=true&withCounts=true"),
    staleTime: 0,
  });

  const allVolunteers: VolunteerWithTutoringCount[] = data?.data ?? [];

  // Mois disponibles
  const availableMonths = useMemo(() => {
    const keys = new Set<string>();
    for (const v of allVolunteers) {
      if (v.createdAt) keys.add(monthKey(String(v.createdAt)));
    }
    return Array.from(keys).sort((a, b) => b.localeCompare(a));
  }, [allVolunteers]);

  // Filtrage + recherche client
  const filtered = useMemo(() => {
    let list = allVolunteers;
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter(
        (v) =>
          v.firstName.toLowerCase().includes(q) ||
          v.lastName.toLowerCase().includes(q) ||
          v.email.toLowerCase().includes(q),
      );
    }
    if (filterRole === "admin") list = list.filter((v) => v.isAdmin);
    if (filterRole === "no-admin") list = list.filter((v) => !v.isAdmin);
    if (filterActive === "active") list = list.filter((v) => v.isActive);
    if (filterActive === "inactive") list = list.filter((v) => !v.isActive);
    if (filterMonth) list = list.filter((v) => v.createdAt && monthKey(String(v.createdAt)) === filterMonth);
    return list;
  }, [allVolunteers, debouncedSearch, filterRole, filterActive, filterMonth]);

  // Sections par mois
  const sections = useMemo(() => {
    const groups: Record<string, VolunteerWithTutoringCount[]> = {};
    for (const v of filtered) {
      const key = v.createdAt ? monthKey(String(v.createdAt)) : "unknown";
      if (!groups[key]) groups[key] = [];
      groups[key].push(v);
    }
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
  }, [filtered]);

  // Toggle admin — on attend l'invalidation dans la mutationFn pour que
  // `isPending` reste vrai jusqu'à l'arrivée des données fraîches (évite le bug du double-clic).
  const toggleAdminMutation = useMutation({
    mutationFn: async ({ id, isAdmin }: { id: number; isAdmin: boolean }) => {
      await toggleVolunteerAdmin(id, isAdmin);
      await queryClient.invalidateQueries({ queryKey: ["volunteers-all"] });
    },
  });

  // Toggle active
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      await toggleVolunteerActive(id, isActive);
      await queryClient.invalidateQueries({ queryKey: ["volunteers-all"] });
    },
  });

  // Quel volontaire est en cours de mise à jour (pour le spinner sur la bonne carte)
  const pendingId = toggleAdminMutation.isPending
    ? toggleAdminMutation.variables?.id
    : toggleActiveMutation.isPending
      ? toggleActiveMutation.variables?.id
      : null;

  return (
    <main className="min-h-screen w-full pb-10">
      {/* ── Header ── */}
      <div className="bg-[#193252] px-4 md:px-10 pt-8 pb-4">
        <h1 className="text-white text-3xl font-extrabold font-montserrat">Voluntarios</h1>
        <p className="text-white/60 text-sm mt-1">
          {filtered.length} voluntario{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Chips filtres */}
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          {(["all", "admin", "no-admin"] as const).map((f) => {
            const label = f === "all" ? "Todos" : f === "admin" ? "Admins" : "Voluntarios";
            const active = filterRole === f;
            return (
              <button
                key={f}
                onClick={() => setFilterRole(f)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition ${
                  active ? "bg-white text-[#193252]" : "bg-white/15 text-white hover:bg-white/25"
                }`}
              >
                {label}
              </button>
            );
          })}

          <div className="w-px h-5 bg-white/20 mx-1" />

          {(["all", "active", "inactive"] as const).map((f) => {
            const label = f === "all" ? "Todos" : f === "active" ? "Activos" : "Inactivos";
            const active = filterActive === f;
            return (
              <button
                key={f}
                onClick={() => setFilterActive(f)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition ${
                  active ? "bg-white text-[#193252]" : "bg-white/15 text-white hover:bg-white/25"
                }`}
              >
                {label}
              </button>
            );
          })}

          {availableMonths.length > 0 && <div className="w-px h-5 bg-white/20 mx-1" />}

          {availableMonths.map((m) => {
            const active = filterMonth === m;
            return (
              <button
                key={m}
                onClick={() => setFilterMonth(filterMonth === m ? "" : m)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-semibold capitalize transition ${
                  active ? "bg-white text-[#193252]" : "bg-white/15 text-white hover:bg-white/25"
                }`}
              >
                {monthLabel(m)}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Search ── */}
      <div className="px-4 md:px-10 py-4 border-b border-zinc-100">
        <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 max-w-md">
          <i className="fa-solid fa-magnifying-glass text-zinc-400 text-sm"></i>
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, apellido, email..."
            className="flex-1 bg-transparent text-sm text-myzinc placeholder-zinc-400 outline-none"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-zinc-400 hover:text-zinc-600 transition">
              <i className="fa-solid fa-xmark text-xs"></i>
            </button>
          )}
        </div>
      </div>

      {/* ── Liste ── */}
      <div className="px-4 md:px-10 pt-5 flex flex-col gap-6">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4 py-20 text-zinc-400">
            <span className="loading loading-spinner loading-xl"></span>
            <p>Cargando...</p>
          </div>
        ) : sections.length === 0 ? (
          <p className="text-zinc-500 py-10">No hay voluntarios.</p>
        ) : (
          sections.map(([key, volunteers]) => (
            <div key={key}>
              {/* Section header */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 capitalize">
                  {monthLabel(key)}
                </span>
                <div className="flex-1 h-px bg-zinc-200" />
                <span className="text-xs font-semibold text-zinc-400">{volunteers.length}</span>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-2">
                {volunteers.map((v) => {
                  const isExpanded = expandedId === v.id;
                  const isAdmin = v.isAdmin;
                  const cardBg = isAdmin ? "bg-indigo-50 border-indigo-200" : "bg-white border-zinc-100";
                  const avatarBg = isAdmin ? "bg-indigo-100 text-indigo-700" : "bg-[#E6F4F4] text-myteal";
                  const countBg = isAdmin ? "bg-indigo-100 text-indigo-700" : "bg-[#E6F4F4] text-myteal";
                  const isPending = pendingId === v.id;

                  const birthDate = v.birthDate
                    ? new Date(String(v.birthDate)).toLocaleDateString("es-PE", {
                        day: "numeric", month: "long", year: "numeric",
                      })
                    : null;
                  const createdAt = v.createdAt
                    ? new Date(String(v.createdAt)).toLocaleDateString("es-PE", {
                        day: "numeric", month: "long", year: "numeric",
                      })
                    : null;

                  return (
                    <div
                      key={v.id}
                      className={`rounded-2xl border overflow-hidden transition-all ${cardBg}`}
                    >
                      {/* Row principale */}
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : v.id)}
                        className="w-full flex items-center gap-3 p-4 text-left hover:brightness-95 transition"
                      >
                        {/* Avatar */}
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-extrabold ${avatarBg}`}>
                          {initials(v)}
                        </div>

                        {/* Infos */}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-myzinc text-sm truncate">
                            {v.firstName} {v.lastName}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                            {isAdmin && (
                              <span className="px-1.5 py-0.5 rounded-md bg-indigo-100 text-indigo-700 text-[10px] font-bold">Admin</span>
                            )}
                            {!v.isActive && (
                              <span className="px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-700 text-[10px] font-bold">Inactivo</span>
                            )}
                            <span className="text-zinc-400 text-xs truncate">{v.email}</span>
                          </div>
                        </div>

                        {/* Count + chevron */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`px-2 py-1 rounded-lg text-xs font-bold ${countBg}`}>
                            {v.tutoringCount} tut.
                          </span>
                          <i className={`fa-solid fa-chevron-${isExpanded ? "up" : "down"} text-zinc-400 text-xs`}></i>
                        </div>
                      </button>

                      {/* Détails */}
                      {isExpanded && (
                        <div className={`border-t ${isAdmin ? "border-indigo-200" : "border-zinc-100"}`}>
                          {/* Infos contact */}
                          <div className="px-4 pt-3 pb-2 flex flex-col gap-2.5">
                            {v.phone && (
                              <div className="flex items-center gap-2.5">
                                <i className="fa-solid fa-phone text-zinc-400 text-xs w-3.5"></i>
                                <span className="text-zinc-600 text-sm">{v.phone}</span>
                              </div>
                            )}
                            {(v as VolunteerWithTutoringCount & { instagram?: string | null }).instagram && (
                              <div className="flex items-center gap-2.5">
                                <i className="fa-brands fa-instagram text-zinc-400 text-xs w-3.5"></i>
                                <span className="text-zinc-600 text-sm">
                                  @{(v as VolunteerWithTutoringCount & { instagram?: string | null }).instagram}
                                </span>
                              </div>
                            )}
                            {birthDate && (
                              <div className="flex items-center gap-2.5">
                                <i className="fa-solid fa-gift text-zinc-400 text-xs w-3.5"></i>
                                <span className="text-zinc-600 text-sm">{birthDate}</span>
                              </div>
                            )}
                            {createdAt && (
                              <div className="flex items-center gap-2.5">
                                <i className="fa-solid fa-user-plus text-zinc-400 text-xs w-3.5"></i>
                                <span className="text-zinc-600 text-sm">Inscrito el {createdAt}</span>
                              </div>
                            )}
                          </div>

                          {/* Toggles */}
                          <div className={`flex items-center justify-between px-4 py-3 mt-1 border-t ${isAdmin ? "border-indigo-200" : "border-zinc-100"}`}>
                            {isPending ? (
                              <div className="flex-1 flex items-center justify-center py-1">
                                <span className="loading loading-spinner loading-sm text-myteal"></span>
                              </div>
                            ) : (
                              <>
                                {/* Toggle Activo */}
                                <button
                                  onClick={() => toggleActiveMutation.mutate({ id: v.id, isActive: !v.isActive })}
                                  className="flex items-center gap-2 select-none"
                                >
                                  <div className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${v.isActive ? "bg-[#65C5A9]" : "bg-zinc-200"}`}>
                                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${v.isActive ? "translate-x-5" : "translate-x-0.5"}`} />
                                  </div>
                                  <span className="text-zinc-500 text-sm">Activo</span>
                                </button>

                                {/* Toggle Admin */}
                                <button
                                  onClick={() => toggleAdminMutation.mutate({ id: v.id, isAdmin: !v.isAdmin })}
                                  className="flex items-center gap-2 select-none"
                                >
                                  <div className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${v.isAdmin ? "bg-indigo-600" : "bg-zinc-200"}`}>
                                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${v.isAdmin ? "translate-x-5" : "translate-x-0.5"}`} />
                                  </div>
                                  <span className="text-zinc-500 text-sm">Admin</span>
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
