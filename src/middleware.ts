// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { isbot } from "isbot";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const trackingId = request.headers.get("x-tracking-id") || uuidv4();
  const userAgent = request.headers.get("user-agent") || "";
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const isBot = isbot(userAgent);
  const { pathname } = request.nextUrl;

  if (!isBot) {
    response.headers.set("x-tracking-id", trackingId);
    response.headers.set("x-path", pathname);
    response.headers.set("x-ip", ip);
    response.cookies.set("trackingId", trackingId, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return response;
}

export const config = {
  //api|
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
