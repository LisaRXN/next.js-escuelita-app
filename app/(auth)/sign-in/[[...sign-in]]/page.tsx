import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          card: "shadow-lg rounded-xl p-6",
          headerTitle: "text-xl font-bold text-center",
          formButtonPrimary: "bg-slate-600 hover:bg-slate-700",
          formButtonSecondary: "bg-gray-300 hover:bg-gray-400",
          footerActionLink: "text-blue-600 hover:underline",
          footerActionText: "text-gray-600",
          socialButtonsBlockButtonIconContainer:
            "bg-blue-500 hover:bg-blue-600",
        },
      }}
      signUpUrl="/sign-up"
      fallbackRedirectUrl="/dashboard"
    />
  );
}
