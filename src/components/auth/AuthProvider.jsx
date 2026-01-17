"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [status, setStatus] = useState("loading"); // loading | guest | authed
  const [email, setEmail] = useState(null);

  async function loadSession() {
    try {
      const res = await fetch("/api/auth/session", {
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok && data?.authed) {
        setStatus("authed");
        setEmail(data.email || null);
      } else {
        setStatus("guest");
        setEmail(null);
      }
    } catch {
      setStatus("guest");
      setEmail(null);
    }
  }

  useEffect(() => {
    loadSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function login({ email: e, password }) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: e, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data?.ok) {
      return { ok: false, error: data?.error || "Login failed" };
    }
    setStatus("authed");
    setEmail(e);
    return { ok: true };
  }

  async function register({ email: e, password }) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: e, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data?.ok) {
      return { ok: false, error: data?.error || "Registration failed" };
    }
    // auto-login after registration (cookies set server-side)
    setStatus("authed");
    setEmail(e);
    return { ok: true };
  }

  async function logout() {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data?.ok) {
      return { ok: false, error: data?.error || "Logout failed" };
    }
    setStatus("guest");
    setEmail(null);
    return { ok: true };
  }

  const value = useMemo(
    () => ({
      status,
      authed: status === "authed",
      email,
      reload: loadSession,
      login,
      register,
      logout,
    }),
    [status, email],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
