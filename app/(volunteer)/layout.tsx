
import Navbar from "@/app/(volunteer)/_components/Navbar";
import { isAdmin } from "@/lib/is-admin";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const VolunteerLayout = async({ children }: { children: React.ReactNode }) => {

  const { userId } = await auth();

  const isUserAdmin = await isAdmin(userId);

  if (isUserAdmin) {
    redirect("/admin");
  }

  return (
    !isUserAdmin && (
      <div className="min-h-screen bg-myteal w-full pt-20">
      <Navbar/>
      {children}</div>
    )
  )

}


export default VolunteerLayout;
