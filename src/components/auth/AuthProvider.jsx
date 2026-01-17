"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "users";
const SESSION_KEY = "session";

export function AuthProvider({ children }) {
  const [status, setStatus] = useState("loading"); // loading | guest | authed
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);

  // ✅ ONLY RUNS IN BROWSER
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sessionRaw = localStorage.getItem(SESSION_KEY);
    const session = sessionRaw ? JSON.parse(sessionRaw) : null;

    if (session?.email) {
      setStatus("authed");
      setEmail(session.email);
      setRole(session.role || "user");
    } else {
      setStatus("guest");
    }
  }, []);

  async function register({ email, password }) {
    if (typeof window === "undefined") {
      return { ok: false, error: "Client only" };
    }

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

    if (users.find((u) => u.email === email)) {
      return { ok: false, error: "User already exists" };
    }

    // 🔒 FORCE USER ROLE
    const newUser = { email, password, role: "user" };
    users.push(newUser);

    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email, role: "user" }));

    setStatus("authed");
    setEmail(email);
    setRole("user");

    return { ok: true };
  }

  async function login({ email, password }) {
    if (typeof window === "undefined") {
      return { ok: false, error: "Client only" };
    }

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      return { ok: false, error: "Invalid credentials" };
    }

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ email: user.email, role: user.role }),
    );

    setStatus("authed");
    setEmail(user.email);
    setRole(user.role);

    return { ok: true };
  }

  async function logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(SESSION_KEY);
    }

    setStatus("guest");
    setEmail(null);
    setRole(null);

    return { ok: true };
  }

  const value = useMemo(
    () => ({
      status,
      authed: status === "authed",
      email,
      role,
      register,
      login,
      logout,
    }),
    [status, email, role],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
