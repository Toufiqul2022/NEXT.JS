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


function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").trim().toLowerCase();
    const password = String(body?.password || "");

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Please provide a valid email." }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ ok: false, error: "Password must be at least 6 characters." }, { status: 400 });
    }

    let { users } = await readUsers();
    users = await ensureAdmin(users);

    if (users.some((u) => u.email === email)) {
      return NextResponse.json({ ok: false, error: "Email is already registered." }, { status: 409 });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    users.push({ email, passwordHash, createdAt: new Date().toISOString() });
    await writeUsers(users);

    const res = NextResponse.json({ ok: true });

    // auto-login
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

    return res;
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}
