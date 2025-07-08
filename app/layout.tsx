import "./globals.css";

export const metadata = {
  title: "La Escuelita App",
  description: "Gère les volontaires facilement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen bg-myteal text-myzinc text-open font-medium"
      >
        {children}
      </body>
    </html>
  );
}

