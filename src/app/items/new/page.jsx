'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/toast/ToastProvider";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

export default function AddItemPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("/products/aurora-lamp.svg");
  const [category, setCategory] = useState("Home");
  const [inStock, setInStock] = useState(true);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          imageUrl,
          category,
          inStock,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast(data?.error || "Failed to create item", { variant: "error" });
        return;
      }

      toast("Item created successfully!");
      router.push(`/items/${data.item.id}`);
      router.refresh();
    } catch {
      toast("Network error", { variant: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Add Item</h1>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
        This page is protected. You must be logged in to access it.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-2 w-full rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800" />
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="mt-2 w-full rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Price</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} required type="number" step="0.01" min="0" className="mt-2 w-full rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800" />
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-2 w-full rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800">
              <option>Home</option>
              <option>Outdoors</option>
              <option>Electronics</option>
              <option>Fitness</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Image URL</label>
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-2 w-full rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800" />
          <p className="mt-2 text-xs text-zinc-500">Tip: use /products/*.svg from the public folder.</p>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
          In stock
        </label>

        <button type="submit" disabled={loading} className="w-full rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60">
          {loading ? "Creating…" : "Create item"}
        </button>
      </form>
    </main>
  );
}
