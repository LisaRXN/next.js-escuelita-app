import { auth } from "@clerk/nextjs/server";
import { isVolunteerProfileComplete } from "@/lib/check-user";
import { isAdmin } from "@/lib/is-admin";
import CreateProfilForm from "./components/CreateProfilForm";
import { redirect } from "next/navigation";

export default async function Register() {
  const { userId } = await auth();

  const isComplete = await isVolunteerProfileComplete(userId);
  const isAdminTrue = await isAdmin(userId);

  if(isComplete && !isAdminTrue){
    redirect("/");
  }

  if(isComplete && isAdminTrue){
    redirect("/admin/");
}

    return (
      <div className="pt-[80px]">
        <CreateProfilForm />
      </div>
    );

}
