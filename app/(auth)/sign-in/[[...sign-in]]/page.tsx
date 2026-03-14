import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Branding */}
      <div className="flex flex-col items-center gap-3">
        <Image src="/img/logos/logo.png" width={64} height={64} alt="La Escuelita ONG" />
        <div className="text-center">
          <p className="text-white/50 text-sm">Bienvenido/a a</p>
          <h1 className="text-white text-2xl font-extrabold font-montserrat leading-tight">La Escuelita</h1>
        </div>
      </div>

      {/* Clerk card */}
      <SignIn
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/dashboard"
        appearance={{
          variables: {
            colorPrimary: "#2B797C",
            colorText: "#193252",
            colorTextSecondary: "#6B7280",
            colorBackground: "#ffffff",
            colorInputBackground: "#f9fafb",
            colorInputText: "#193252",
            borderRadius: "0.75rem",
            fontSize: "0.875rem",
          },
          elements: {
            card: "shadow-none border border-zinc-100 rounded-2xl",
            formButtonPrimary: "bg-myteal hover:opacity-90 transition text-sm font-semibold rounded-xl shadow-none",
            formFieldInput: "rounded-xl border-zinc-200 bg-zinc-50 text-sm focus:ring-2 focus:ring-myteal/30",
            formFieldLabel: "text-xs font-semibold text-zinc-400 uppercase tracking-wide",
            headerTitle: "text-xl font-bold",
            headerSubtitle: "text-zinc-400 text-sm",
            socialButtonsBlockButton: "border border-zinc-200 rounded-xl text-sm font-medium hover:bg-zinc-50 shadow-none",
            dividerLine: "bg-zinc-100",
            dividerText: "text-zinc-400 text-xs",
            footerActionLink: "text-myteal font-semibold hover:opacity-80",
            footerActionText: "text-zinc-400",
          },
        }}
      />
    </div>
  );
}
