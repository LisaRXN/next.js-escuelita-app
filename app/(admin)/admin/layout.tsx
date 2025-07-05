import AdminNavbar from "@/components/admin/AdminNavbar";
import { isAdmin } from "@/lib/is-admin";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  const isUserAdmin = await isAdmin(userId);

  if (!isUserAdmin) {
    redirect("/");
  }

  return (
    isUserAdmin && (
      <div className="bg-myteal min-h-screen w-full py-20">
        <AdminNavbar />
        {children}
      </div>
    )
  );
}
