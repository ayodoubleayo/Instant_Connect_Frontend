import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  console.log("🧭 MIDDLEWARE HIT");
  console.log("➡️ Path:", pathname);

  const token = req.cookies.get("token")?.value;
  console.log("🍪 Token exists:", !!token);

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
