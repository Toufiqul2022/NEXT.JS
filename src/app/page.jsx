import Link from "next/link";

/**
 * Shared UI Components
 */
const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white/50 px-3 py-1 text-sm font-medium text-zinc-800 backdrop-blur-sm dark:border-zinc-800 dark:bg-white/10 dark:text-zinc-200">
    {children}
  </span>
);

const SectionHeader = ({ title, subtitle, align = "center" }) => (
  <div
    className={`mb-16 flex flex-col ${
      align === "center" ? "items-center text-center" : "items-start text-left"
    }`}
  >
    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-5xl">
      {title}
    </h2>
    <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
      {subtitle}
    </p>
  </div>
);

export default function Home() {
  return (
    <div className="bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      {/* 1. HERO: The Core Value Proposition */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="pointer-events-none absolute inset-0 flex justify-center">
          <div className="h-[500px] w-[500px] rounded-full bg-gradient-to-b from-emerald-100 to-transparent blur-[100px] dark:from-emerald-900/20"></div>
        </div>

        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
          <Badge>🚀 Built with Next.js 16 App Router</Badge>

          <h1 className="mt-8 text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-7xl lg:text-8xl">
            Modern Frontend. <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400">
              Robust Backend.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-xl text-zinc-600 dark:text-zinc-400">
            A seamless integration of <strong>Next.js Server Components</strong>{" "}
            for the UI and a standalone <strong>Express.js API</strong> for
            business logic. Featuring secure cookie-based auth and protected
            routes.
          </p>

          <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Link
              href="/items"
              className="inline-flex h-14 items-center justify-center rounded-full bg-zinc-900 px-8 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 active:scale-95 dark:bg-white dark:text-black"
            >
              Browse Catalog
            </Link>
            <Link
              href="/login"
              className="inline-flex h-14 items-center justify-center rounded-full border border-zinc-200 bg-white px-8 text-base font-semibold text-zinc-900 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:hover:bg-zinc-900"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TECH STACK: The Actual Libraries Used */}
      <section className="border-y border-zinc-200 bg-zinc-50/50 py-12 dark:border-zinc-900 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Architecture Components
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 grayscale transition-all hover:grayscale-0">
            {[
              "Next.js 16",
              "React 19",
              "Express.js",
              "Tailwind CSS",
              "Cookies-Next",
            ].map((tech) => (
              <span
                key={tech}
                className="text-xl font-bold text-zinc-400 dark:text-zinc-600"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURES: Real Technical Implementation Details */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            title="Under the Hood"
            subtitle="How we handle data, security, and routing in this project."
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1: The Auth Strategy */}
            <div className="group relative col-span-1 overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 transition-shadow hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 md:col-span-2">
              <div className="relative z-10">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  HttpOnly Cookie Auth
                </h3>
                <p className="mt-4 max-w-md text-zinc-600 dark:text-zinc-400">
                  We avoid <code>localStorage</code> for security. When you log
                  in, the Next.js Route Handler sets a strict{" "}
                  <code>HttpOnly</code> cookie. This cookie is automatically
                  sent with subsequent requests to verify your admin session.
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-emerald-50 dark:bg-emerald-900/10"></div>
            </div>

            {/* Feature 2: Middleware */}
            <div className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-900 p-8 text-white transition-transform hover:-translate-y-1 dark:border-zinc-700 dark:bg-zinc-800">
              <h3 className="text-xl font-bold">Middleware Protection</h3>
              <p className="mt-2 text-zinc-400">
                <code>middleware.ts</code> intercepts requests to{" "}
                <code>/add-item</code>. If the auth cookie is missing, it
                redirects to login immediately.
              </p>
              <div className="mt-8 font-mono text-xs text-zinc-500">
                if (!cookie) return NextResponse.redirect(new URL('/login',
                request.url))
              </div>
            </div>

            {/* Feature 3: Persistence */}
            <div className="rounded-3xl border border-zinc-200 bg-white p-8 transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-bold">JSON Persistence</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Data is stored in a local <code>items.json</code> file on the
                Express server, simulating a real database (like MongoDB)
                without the overhead.
              </p>
            </div>

            {/* Feature 4: UX */}
            <div className="col-span-1 rounded-3xl border border-zinc-200 bg-white p-8 transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 md:col-span-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-bold">
                    Server Actions & Revalidation
                  </h3>
                  <p className="mt-2 text-sm text-zinc-500">
                    When you add an item, a Server Action posts to Express, then
                    calls <code>revalidatePath('/items')</code> to refresh the
                    UI instantly without a page reload.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ARCHITECTURE: The Request Lifecycle */}
      <section className="bg-zinc-50 py-24 dark:bg-zinc-900/30">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            title="The Request Lifecycle"
            subtitle="Tracing data from the client to the server."
          />

          <div className="relative grid gap-12 md:grid-cols-3">
            <div className="absolute top-12 left-0 hidden h-0.5 w-full bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-700 md:block"></div>

            {[
              {
                num: "01",
                title: "User Action",
                desc: "Admin submits the 'Create Item' form. A Next.js Server Action is triggered.",
              },
              {
                num: "02",
                title: "API Mutation",
                desc: "The Server Action sends a POST request to Express. Express writes to items.json.",
              },
              {
                num: "03",
                title: "UI Update",
                desc: "Next.js revalidates the cache. The new item appears in the list immediately.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-zinc-900 text-2xl font-bold text-white shadow-xl dark:border-zinc-900 dark:bg-white dark:text-black">
                  {step.num}
                </div>
                <h3 className="mt-6 text-xl font-bold text-zinc-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STATS: Project Metrics */}
      <section className="border-y border-zinc-200 py-16 dark:border-zinc-800">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 text-center md:grid-cols-4">
          {[
            { label: "Frontend", value: "Next.js 16" },
            { label: "Backend", value: "Express 4" },
            { label: "Database", value: "JSON File" },
            { label: "Auth Type", value: "Cookies" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-medium uppercase tracking-wide text-zinc-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS: Developer Perspective */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            title="Developer Notes"
            subtitle="Why we chose this architecture for the demo."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                text: "This setup simulates a real-world microservices pattern where the frontend (Next.js) is decoupled from the backend logic (Express).",
                author: "Architecture Note",
                role: "Best Practices",
              },
              {
                text: "Using HttpOnly cookies instead of Authorization headers makes the app significantly more secure against XSS attacks by default.",
                author: "Security Note",
                role: "Auth Strategy",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <p className="text-lg font-medium text-zinc-900 dark:text-white">
                  "{t.text}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 font-bold text-zinc-500 dark:bg-zinc-800">
                    {i === 0 ? "A" : "S"}
                  </div>
                  <div>
                    <div className="font-bold text-zinc-900 dark:text-white">
                      {t.author}
                    </div>
                    <div className="text-xs text-zinc-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA: Final Action */}
      <section className="pb-24 pt-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-900 px-6 py-24 text-center shadow-2xl dark:bg-white sm:px-12">
            <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-zinc-800 opacity-50 blur-3xl dark:bg-zinc-200"></div>
            <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-emerald-900 opacity-50 blur-3xl dark:bg-emerald-200"></div>

            <div className="relative z-10">
              <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white dark:text-black sm:text-5xl">
                Experience the flow.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400 dark:text-zinc-600">
                Browse the public items. Then, use the mock credentials (
                <code>admin@example.com</code>) to log in and create new data.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Link
                  href="/items"
                  className="rounded-full bg-white px-10 py-4 text-lg font-bold text-zinc-900 transition-transform hover:scale-105 active:scale-95 dark:bg-zinc-900 dark:text-white"
                >
                  Start Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
