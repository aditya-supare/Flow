import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  '/',
  '/auth/sign-in',
  '/auth/sign-up',
  '/api/clerk-webhook',
  '/api/drive-activity/notification',
  '/api/payment/success',
]);

const isIgnoredRoute = createRouteMatcher([
  '/api/auth/callback/discord',
  '/api/auth/callback/notion',
  '/api/auth/callback/slack',
  '/api/flow',
  '/api/cron/wait',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isIgnoredRoute(req)) return;

  const { userId } = await auth();

  // Redirect signed-in users away from sign-in/up pages to dashboard
  if (userId && (req.nextUrl.pathname === '/auth/sign-in' || req.nextUrl.pathname === '/auth/sign-up')) {
    const dashboardUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Let public routes pass (including sign-in/up pages)
  if (isPublicRoute(req)) return;

  // Redirect unauthenticated users to sign-in page
  if (!userId) {
    const signInUrl = new URL('/auth/sign-in', req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Allow authenticated requests to proceed
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
