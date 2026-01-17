import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

async function getItems() {
  const res = await fetch(`${API_BASE}/api/items`, { cache: "no-store" });
  return res.ok ? res.json() : [];
}

export default async function Dashboard() {
  const items = await getItems();
  const total = items.length;
  const inStock = items.filter((i) => i.inStock).length;

  return (
    <div className="min-h-screen bg-zinc-50/50 p-6 dark:bg-zinc-950">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-base text-zinc-500 dark:text-zinc-400">
              Protected area. View quick stats and manage products.
            </p>
          </div>
          <div className="hidden md:block">
            <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1: Total Items */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <div className="relative z-10">
              <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Total Items
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {total}
                </span>
                <span className="text-sm text-zinc-500">products</span>
              </div>
            </div>
            {/* Visual Decoration */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-zinc-50 transition-transform group-hover:scale-110 dark:bg-zinc-800"></div>
          </div>

          {/* Card 2: In Stock */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <div className="relative z-10">
              <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Inventory Status
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {inStock}
                </span>
                <span className="text-sm text-zinc-500">in stock</span>
              </div>
            </div>
            {/* Visual Decoration */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-50 transition-transform group-hover:scale-110 dark:bg-emerald-900/20"></div>
          </div>

          {/* Card 3: Actions */}
          <div className="flex flex-col justify-between rounded-[2rem] border border-zinc-200 bg-zinc-900 p-8 text-white shadow-sm transition-transform hover:-translate-y-1 dark:border-zinc-700 dark:bg-zinc-800">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-zinc-400">
                Quick Actions
              </p>
              <h3 className="mt-2 text-xl font-semibold">Manage Store</h3>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/dashboard/add-product"
                className="flex w-full items-center justify-center rounded-xl bg-white py-3 text-sm font-bold text-zinc-900 transition-colors hover:bg-zinc-100 dark:bg-zinc-950 dark:text-white dark:hover:bg-black"
              >
                + Add Product
              </Link>
              <Link
                href="/items"
                className="flex w-full items-center justify-center rounded-xl border border-zinc-700 bg-transparent py-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                View Catalog &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
