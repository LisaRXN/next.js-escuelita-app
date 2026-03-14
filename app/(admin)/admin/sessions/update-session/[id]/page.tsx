import Link from "next/link";
import { prisma } from "@/lib/prisma";
import UpdateSessionForm from "../../_components/UpdateSessionForm";

interface SessionPageProps {
  params: Promise<{ id: string }>;
}

export default async function UpdateSessionPage({ params }: SessionPageProps) {
  const paramsUrl = await params;
  const sessionId = Number(paramsUrl.id);

  const session = await prisma.volunteerSession.findUnique({
    where: { id: sessionId },
  });

  if (!session) {
    return <div className="p-10 text-zinc-500">Sesión no encontrada.</div>;
  }

  return (
    <main className="min-h-screen bg-zinc-50 pb-10">
      <div className="bg-[#193252] px-4 md:px-8 pt-8 pb-6">
        <Link
          href={`/admin/sessions/${sessionId}`}
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-4 transition-colors"
        >
          <i className="fa-solid fa-arrow-left text-xs" />
          Volver
        </Link>
        <h1 className="text-white text-3xl font-extrabold font-montserrat">Modificar sesión</h1>
        <p className="text-white/60 text-sm mt-1 line-clamp-1">{session.title}</p>
      </div>
      <div className="px-4 md:px-8 pt-6 max-w-2xl">
        <UpdateSessionForm session={session} />
      </div>
    </main>
  );
}
