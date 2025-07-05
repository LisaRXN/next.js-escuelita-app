// app/admin/sessions/[id]/page.tsx

import AdminSessionPage from "./page";

interface SessionPageProps {
    params: { id: string };
  }


export default function SessionPage({ params }: SessionPageProps) {
  const sessionId = Number(params.id);

  if (isNaN(sessionId)) return <div className="p-20 text-white">Oops... Ningun evento encontrado</div>;

  return <AdminSessionPage sessionId={sessionId} />;
}
