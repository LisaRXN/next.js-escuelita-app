export const CALIFICACIONES = [
  "Excelente",
  "Bueno",
  "Regular",
  "Con_dificultad",
  "Con_mucha_dificultad",
] as const;

export const calificacionLabel: Record<string, string> = {
  Excelente: "Excelente",
  Bueno: "Bueno",
  Regular: "Regular",
  Con_dificultad: "Con dificultad",
  Con_mucha_dificultad: "Con mucha dificultad",
};

export const calificacionColor: Record<string, string> = {
  Excelente: "bg-mygreen",
  Bueno: "bg-myteal",
  Regular: "bg-yellow-400",
  Con_dificultad: "bg-myorange",
  Con_mucha_dificultad: "bg-red-500",
};
