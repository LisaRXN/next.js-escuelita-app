import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import "./globals.css";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/components/providers/query-provider";


export const metadata = {
  title: "La Escuelita App",
  description: "Gère les volontaires facilement",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <ClerkProvider>
      <ReactQueryProvider>
        <Toaster />
        <html lang="en">
          <body className="min-h-screen bg-myteal text-myzinc text-open font-medium">
            {children}
          </body>
        </html>
      </ReactQueryProvider>
    </ClerkProvider>
  );
}
