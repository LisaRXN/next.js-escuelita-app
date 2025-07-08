import { auth } from "@clerk/nextjs/server";
import AdminSessionPage from "../_components/AdminSessionPage";

export default async function Page({ params }: { params: { id: string } }) {

  const paramsUrl = await params;
  const sessionId = Number(paramsUrl.id);

  if (isNaN(sessionId)) {
    return <div className="p-20 text-white">Oops... Ningún evento encontrado</div>;
  }

  return <AdminSessionPage sessionId={sessionId} />;
}
