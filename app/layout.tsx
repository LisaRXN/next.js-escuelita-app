import "./globals.css";

export const metadata = {
  title: "La Escuelita App",
  description: "Gestiona el voluntariado y las actividades de La Escuelita",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
      </head>
      <body className="min-h-screen bg-myteal text-myzinc text-open font-medium">
        {children}
      </body>
    </html>
  );
}

