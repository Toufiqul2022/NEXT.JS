'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

/**
 * Minimal toast system (no external deps).
 * Usage:
 * const { toast } = useToast();
 * toast("Saved!", { variant: "success" });
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message, opts = {}) => {
    const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const variant = opts.variant || 'success';
    const duration = typeof opts.duration === 'number' ? opts.duration : 2600;

    setToasts((prev) => [...prev, { id, message, variant }]);
    window.setTimeout(() => remove(id), duration);
  }, [remove]);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex w-[min(92vw,380px)] flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={[
              "rounded-xl border px-4 py-3 text-sm shadow-sm backdrop-blur",
              t.variant === "error"
                ? "border-red-200 bg-red-50 text-red-800"
                : "border-zinc-200 bg-white/90 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950/90 dark:text-zinc-100",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-4">
              <span>{t.message}</span>
              <button
                type="button"
                onClick={() => remove(t.id)}
                className="text-xs text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                aria-label="Dismiss toast"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}
