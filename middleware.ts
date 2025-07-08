import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = (pathname: string) => {
  return (
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/api/webhooks")
  );
};

export default clerkMiddleware(async (auth, req) => {

  const { userId } = await auth();
  const { pathname } = req.nextUrl;

  console.log("PATHNAME:", req.nextUrl.pathname);
  console.log("userId:", userId);

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Rediriger vers /sign-in si l'utilisateur n'est pas connecté et la route est privée
  if (!userId ) {
    console.log("Redirecting to sign-in");
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url); // Pour revenir après connexion
    return NextResponse.redirect(signInUrl);
  }

  // Sinon, laisser passer
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Toutes les routes sauf _next et fichiers statiques…
    "/((?!_next|static|.*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Toutes les API (trpc et REST)
    "/api/:path*",
    "/trpc/:path*",
  ],
};
