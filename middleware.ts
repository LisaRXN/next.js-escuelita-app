import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Définir les routes publiques
const isPublicRoute = (req: NextRequest) => {
  // const publicRoutes = ["/","/sign-in",'*'];
  const publicRoutes = ["/sign-in", "/sign-up"];
  return publicRoutes.includes(req.nextUrl.pathname);
};

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  const isPublic = isPublicRoute(req);

  // Rediriger vers /sign-in si l'utilisateur n'est pas connecté et la route est privée
  if (!userId && !isPublic) {
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
    // Tout sauf _next, fichiers statiques, etc.
    "/((?!_next|.*\\..*).*)",
  ],
};
