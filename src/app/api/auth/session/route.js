import { NextResponse } from "next/server";

export async function GET(request) {
  const authed = request.cookies.get("auth")?.value === "true";
  const email = request.cookies.get("auth_email")?.value || null;
  return NextResponse.json({ ok: true, authed, email });
}
