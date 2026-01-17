import Image from "next/image";
import Link from "next/link";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  process.env.API_BASE ||
  "http://localhost:4000";

async function getItems() {
  const res = await fetch(`${API_BASE}/api/items`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
}

export default async function ItemsPage() {
  const items = await getItems();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Items</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            Public item list fetched from the Express API.
          </p>
        </div>
        <Link
          href="/items/new"
          className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
        >
          Add Item
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/items/${item.id}`}
            className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="relative aspect-[4/3] w-full bg-zinc-50 dark:bg-zinc-900">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-contain p-6 transition-transform group-hover:scale-[1.02]"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">{item.name}</h3>
                <span className="text-sm font-medium">
                  ${Number(item.price).toFixed(2)}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300">
                {item.description}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
                <span>{item.category}</span>
                <span
                  className={
                    item.inStock ? "text-emerald-600" : "text-rose-600"
                  }
                >
                  {item.inStock ? "In stock" : "Out of stock"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
