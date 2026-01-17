export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      {children}
    </div>
  );
}
