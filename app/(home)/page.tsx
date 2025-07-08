// import Navbar from "@/app/(volunteer)/_components/Navbar";
// import { isVolunteerProfileComplete } from "@/lib/check-user";
// import { isAdmin } from "@/lib/is-admin";
// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";

import { isVolunteerProfileComplete } from "@/lib/check-user";
import { isAdmin } from "@/lib/is-admin";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const HomePage = async () => {

  const { userId } = await auth();
  
  const isUserAdmin = await isAdmin(userId);
  const isComplete = await isVolunteerProfileComplete(userId);


  if (!isComplete) {
    redirect("/register");
  }

  if (isComplete && isUserAdmin) {
    redirect("/admin");
  }

  // 🟦volunteer with complete profil
  if (isComplete && !isUserAdmin) {
    redirect("/dashboard");
  }

  return(<p className="text-white">Ingresa como invitado</p>)

}

export default HomePage;
