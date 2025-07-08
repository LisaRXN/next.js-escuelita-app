import AdminSessionPage from "../_components/AdminSessionPage";

interface PageProps {
  params: Promise<{ id: string }>
};


export default async function Page({ params }: PageProps) {
  
  const { id } = await params;
  
  const sessionId = Number(id);

  if (isNaN(sessionId)) {
    return (
      <div className="p-20 text-white">Oops... Ningún evento encontrado</div>
    );
  }

  return <AdminSessionPage sessionId={sessionId} />;
}
