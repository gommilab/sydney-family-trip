import { useState, type ReactNode } from "react";

export function Accordion({
  title,
  defaultOpen = false,
  icon,
  badge,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  icon?: ReactNode;
  badge?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="rounded-2xl bg-white shadow-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-4 text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          {icon && (
            <span className="text-xl" aria-hidden>
              {icon}
            </span>
          )}
          <span className="text-lg font-bold text-slate-900">{title}</span>
          {badge}
        </span>
        <span
          className={`text-ocean-600 text-xl transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          ⌄
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-slate-100">
          {children}
        </div>
      )}
    </section>
  );
}
