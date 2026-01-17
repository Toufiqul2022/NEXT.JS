import Image from "next/image";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

async function getItem(id) {
  const res = await fetch(`${API_BASE}/api/items/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function ItemDetails({ params }) {
  const item = await getItem(params.id);

  if (!item) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-semibold">Item not found</h1>
        <Link href="/items" className="mt-4 inline-block text-sm underline underline-offset-4">
          Back to items
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <Link href="/items" className="text-sm text-zinc-600 underline underline-offset-4 dark:text-zinc-300">
        ← Back to items
      </Link>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <Image src={item.imageUrl} alt={item.name} fill className="object-contain p-10" />
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h1 className="text-3xl font-semibold tracking-tight">{item.name}</h1>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{item.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-zinc-200 px-3 py-1 text-sm dark:border-zinc-800">
              Category: {item.category}
            </span>
            <span className="rounded-full border border-zinc-200 px-3 py-1 text-sm dark:border-zinc-800">
              {item.inStock ? "In stock" : "Out of stock"}
            </span>
          </div>

          <div className="mt-6 text-2xl font-semibold">${Number(item.price).toFixed(2)}</div>

          <div className="mt-6">
            <Link href="/items/new" className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
              Add new item
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
