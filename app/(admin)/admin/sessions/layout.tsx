import { isAdmin } from "@/lib/is-admin";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  await isAdmin(userId); 

  if (!isAdmin) {
    redirect("/"); 
  }

  return <div className="min-h-screen bg-myteal text-white">{children}</div>;
}
