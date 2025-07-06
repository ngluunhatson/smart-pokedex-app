import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { LocaleEnum } from "./lib";

const isApiRoute = createRouteMatcher(["/(api|trpc)(.*)"]);

const intlMiddleware = createMiddleware({
  locales: Object.values(LocaleEnum),
  defaultLocale: LocaleEnum.EN,
});

export default clerkMiddleware((auth, req) => {
  if (!isApiRoute(req)) {
    return intlMiddleware(req);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
