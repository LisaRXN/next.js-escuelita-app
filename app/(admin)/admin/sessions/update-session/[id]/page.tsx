import { prisma } from "@/lib/prisma";
import UpdateSessionForm from "../../_components/UpdateSessionForm";

interface SessionPageProps {
  params: Promise<{ id: string }>
}

const UpdateSessionPage = async ({ params }: SessionPageProps) => {

  const paramsUrl = await params;
  const sessionId = Number(paramsUrl.id);

  const session = await prisma.volunteerSession.findUnique({
    where: { id: sessionId },
  });


  if (!session) {
    return <div className="p-10">Sesión no encontrada.</div>;
  }

  return (
    <div className="px-2 py-5 md:p-10 min-h-screen">
      <UpdateSessionForm session={session} />
    </div>
  );
};

export default UpdateSessionPage;
