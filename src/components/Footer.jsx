import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 py-8 dark:border-zinc-800 dark:bg-zinc-950/50">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 md:grid-cols-4">
        {/* Brand Column */}
        <div className="md:col-span-1">
          <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Mini Store.
          </h3>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            Curated essentials for the modern minimalist. built with Next.js 16.
          </p>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="font-semibold text-zinc-900 dark:text-white">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              <Link href="#" className="hover:text-black dark:hover:text-white">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-black dark:hover:text-white">
                Bestsellers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-black dark:hover:text-white">
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="font-semibold text-zinc-900 dark:text-white">
            Support
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              <Link href="#" className="hover:text-black dark:hover:text-white">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-black dark:hover:text-white">
                Returns
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-black dark:hover:text-white">
                Status
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="md:col-span-1">
          <h4 className="font-semibold text-zinc-900 dark:text-white">
            Stay in the loop
          </h4>
          <p className="mt-2 text-xs text-zinc-500">
            Get 10% off your first order.
          </p>
          <div className="mt-4 flex gap-2">
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-black dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-white"
            />
            <button className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
              →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto mt-8 w-full max-w-6xl border-t border-zinc-200 px-4 pt-8 dark:border-zinc-800">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} Mini Store Inc.
          </p>
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <span>Demo: admin@example.com / 123456</span>
            <span className="hidden h-3 w-[1px] bg-zinc-300 dark:bg-zinc-700 md:block"></span>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Link href="#" className="hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
