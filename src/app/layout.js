import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/toast/ToastProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mini Store",
  description: "Next.js + Express demo store",
};

// Ensure auth-aware UI (Navbar) updates correctly (no static caching)
export const dynamic = "force-dynamic";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100`}>
        <ToastProvider>
          <AuthProvider>
          <Navbar />
          <div className="min-h-[calc(100vh-140px)]">{children}</div>
          <Footer />
                  </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
