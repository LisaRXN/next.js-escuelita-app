import AdminSidebar from "@/components/admin/AdminSidebar";
// import { isVolunteerProfileComplete } from "@/lib/check-user";
import { isAdmin } from "@/lib/is-admin";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactQueryProvider } from "@/components/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { isVolunteerProfileComplete } from "@/lib/check-user";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();

  const isUserAdmin = await isAdmin(userId);
  const isComplete = await isVolunteerProfileComplete(userId);

  if (!isUserAdmin) {
    redirect("/dashboard");
  }

    if (!isComplete) {
    redirect("/register");
  }

  return (
    <ClerkProvider>
      <ReactQueryProvider>
        <Toaster />
        <div className="flex min-h-screen bg-myteal">
          <AdminSidebar />
          <div className="flex-1 md:ml-60 pt-14 md:pt-0 min-h-screen text-myzinc font-medium">
            {children}
          </div>
        </div>
      </ReactQueryProvider>
    </ClerkProvider>
  );
};

export default AdminLayout;
