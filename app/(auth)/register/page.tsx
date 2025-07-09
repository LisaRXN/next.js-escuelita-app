
import { auth } from "@clerk/nextjs/server";
import CreateProfilForm from "./components/CreateProfilForm";
import { isVolunteerProfileComplete } from "@/lib/check-user";
import { redirect } from "next/navigation";

export default async function RegisterPage(){

    const { userId } = await auth();

    const isComplete = await isVolunteerProfileComplete(userId);

        if (isComplete) {
        redirect("/dashboard");
      }
  
  return (
    <div className="p-2 lg:py-[80px]">
      <CreateProfilForm />
    </div>
  )
}