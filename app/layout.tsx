import "./globals.css";

export const metadata = {
  title: "La Escuelita App",
  description: "Gestiona el voluntariado y las actividades de La Escuelita",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "/img/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/img/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/img/favicon/apple-touch-icon.png",
    shortcut: "/img/favicon/favicon.ico",
  },
  manifest: "/webmanifest.json",
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
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="manifest" href="/webmanifest.json" />
        <link rel="apple-touch-icon" href="/img/favicon/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-myteal text-myzinc text-open font-medium">
        {children}
      </body>
    </html>
  );
}
