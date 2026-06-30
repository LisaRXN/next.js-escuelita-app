-- Index pour optimiser les recherches filtrées sur /alumnos
-- Correspond aux @@index ajoutés dans schema.prisma (modèle Alumno).
-- À appliquer soit via `npx prisma db push` (quand la base est joignable),
-- soit directement dans le SQL Editor Supabase.
-- IF NOT EXISTS = idempotent, sans risque de doublon.

CREATE INDEX IF NOT EXISTS "Alumno_escuelita_idx"          ON "Alumno"("escuelita");
CREATE INDEX IF NOT EXISTS "Alumno_nivel_idx"              ON "Alumno"("nivel");
CREATE INDEX IF NOT EXISTS "Alumno_estatusInscripcion_idx" ON "Alumno"("estatusInscripcion");
CREATE INDEX IF NOT EXISTS "Alumno_fechaNacimiento_idx"    ON "Alumno"("fechaNacimiento");
CREATE INDEX IF NOT EXISTS "Alumno_apellidos_idx"          ON "Alumno"("apellidos");
