import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import bcrypt from "bcryptjs";

const USERS_FILE = path.join(process.cwd(), "server", "data", "users.json");

async function ensureUsersFile() {
  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
    await fs.writeFile(USERS_FILE, JSON.stringify({ users: [] }, null, 2), "utf-8");
  }
}

async function readUsers() {
  await ensureUsersFile();
  const raw = await fs.readFile(USERS_FILE, "utf-8");
  const data = JSON.parse(raw || "{}");
  const users = Array.isArray(data.users) ? data.users : [];
  return { data, users };
}

async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify({ users }, null, 2), "utf-8");
}

async function ensureAdmin(users) {
  const adminEmail = "admin@example.com";
  const adminPass = "123456";
  const exists = users.some((u) => u.email === adminEmail);
  if (!exists) {
    const passwordHash = bcrypt.hashSync(adminPass, 10);
    users.push({ email: adminEmail, passwordHash, createdAt: new Date().toISOString() });
  }
  return users;
}


export async function POST(req) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").trim().toLowerCase();
    const password = String(body?.password || "");

    let { users } = await readUsers();
    users = await ensureAdmin(users);

    const user = users.find((u) => u.email === email);
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      return NextResponse.json({ ok: false, error: "Invalid email or password" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });

    res.cookies.set("auth", "true", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    res.cookies.set("auth_email", email, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    // persist admin seed if needed
    await writeUsers(users);

    return res;
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}
