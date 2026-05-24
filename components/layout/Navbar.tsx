"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Telescope, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/lib/mock-data";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-space-950/65 backdrop-blur-2xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-nebula-cyan/35 bg-nebula-cyan/10 text-nebula-cyan shadow-inner-glass">
            <Telescope size={18} />
          </span>
          <span className="text-base font-semibold tracking-normal text-white">Cosmos Atlas</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-lg px-3 py-2 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-nebula-cyan/30",
                  active
                    ? "border border-white/10 bg-white/10 text-white shadow-inner-glass"
                    : "border border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
          aria-label={isOpen ? "关闭导航" : "打开导航"}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-white/10 bg-space-950/95 px-5 py-3 shadow-inner-glass backdrop-blur-2xl lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={[
                    "rounded-lg border px-4 py-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-nebula-cyan/30",
                    active
                      ? "border-white/10 bg-white/10 text-white"
                      : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}
