import { auth } from "@clerk/nextjs/server";
import CreateProfilForm from "./components/CreateProfilForm";
import { isVolunteerProfileComplete } from "@/lib/check-user";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function RegisterPage() {
  const { userId } = await auth();
  const isComplete = await isVolunteerProfileComplete(userId);

  if (isComplete) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg px-4 py-12">
      {/* Branding */}
      <div className="flex flex-col items-center gap-3">
        <Image src="/img/logos/logo.png" width={64} height={64} alt="La Escuelita ONG" />
        <div className="text-center">
          <h1 className="text-white text-2xl font-extrabold font-montserrat leading-tight">¡Solo un paso más!</h1>
          <p className="text-white/50 text-sm mt-1">Completa tu perfil para acceder a la plataforma</p>
        </div>
      </div>

      <CreateProfilForm />
    </div>
  );
}
