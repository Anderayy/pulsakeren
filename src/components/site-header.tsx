"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, Moon, Search, Sun, X, Zap } from "lucide-react";
import { categories, mainMenu } from "@/lib/data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [light, setLight] = useState(false);

  return (
    <>
      <div className="overflow-hidden border-b border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-100">
        <Link href="/promotions" className="ticker block whitespace-nowrap">
          LIVE BOOST: biaya admin mulai Rp500 · provider mock API online · cashback bisnis aktif minggu ini
        </Link>
      </div>
      <header className={`sticky top-0 z-50 border-b backdrop-blur-2xl ${light ? "border-slate-200 bg-white/90 text-slate-950" : "border-cyan-400/15 bg-[#050816]/82 text-cyan-50"}`}>
        <div className="mx-auto grid max-w-7xl grid-cols-[220px_minmax(0,1fr)_auto] items-center gap-5 px-5 py-4">
          <Link href="/" className="flex items-center gap-3 text-2xl font-black tracking-tight">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400 text-[#050816] shadow-[0_0_35px_rgba(34,211,238,0.45)]">
              <Zap size={24} fill="currentColor" />
            </span>
            <span>pulsakeren</span>
          </Link>
          <nav className="hidden min-w-0 items-center justify-center gap-1 text-sm font-bold lg:flex">
            {mainMenu.slice(1, 8).map(([label, href]) => (
              <Link key={href} href={href} className="whitespace-nowrap rounded-full px-3 py-2 text-slate-300 transition hover:bg-cyan-400/10 hover:text-cyan-200 xl:px-4">
                {label}
              </Link>
            ))}
            <button className="flex items-center gap-1 rounded-full px-3 py-2 text-slate-300 transition hover:bg-violet-400/10 hover:text-violet-200" onClick={() => setMega((value) => !value)} type="button">
              More <ChevronDown size={16} />
            </button>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <label className="hidden h-11 items-center gap-2 rounded-full border border-cyan-400/15 bg-white/5 px-4 text-sm text-slate-400 xl:flex">
              <Search size={17} />
              <input className="w-44 bg-transparent outline-none" placeholder="Search product..." />
            </label>
            <button onClick={() => setLight((value) => !value)} className="grid h-11 w-11 place-items-center rounded-full border border-cyan-400/20 bg-white/5 text-cyan-200" aria-label="Toggle theme" type="button">
              {light ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <Link href="/login" className="font-bold text-cyan-200">Login</Link>
            <Link href="/register" className="rounded-full bg-cyan-400 px-6 py-3 font-black text-[#050816] shadow-[0_0_28px_rgba(34,211,238,0.35)] transition hover:bg-lime-300">
              Register
            </Link>
          </div>
          <button className="justify-self-end lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu" type="button">
            <Menu />
          </button>
        </div>
        {mega && (
          <div className="hidden border-t border-cyan-400/15 bg-[#07111f]/95 p-5 shadow-2xl lg:block">
            <div className="mx-auto grid max-w-7xl grid-cols-4 gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link key={category.slug} href={`/${category.slug}`} className="glass rounded-3xl p-5 transition hover:-translate-y-1 hover:border-cyan-300/50">
                    <span className={`mb-4 inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${category.tone} text-[#050816]`}><Icon /></span>
                    <strong className="block text-cyan-50">{category.name}</strong>
                    <span className="text-sm text-slate-400">{category.description}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>
      {open && (
        <div className="fixed inset-0 z-[60] bg-[#050816] p-6 text-cyan-50 lg:hidden">
          <div className="mb-8 flex items-center justify-between">
            <span className="flex items-center gap-2 text-2xl font-black"><Zap className="text-cyan-300" /> pulsakeren</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" type="button"><X /></button>
          </div>
          <div className="grid gap-3">
            {mainMenu.map(([label, href]) => (
              <Link onClick={() => setOpen(false)} className="rounded-2xl border border-cyan-400/15 bg-white/5 px-4 py-3 font-semibold" key={href} href={href}>
                {label}
              </Link>
            ))}
            <Link href="/dashboard" className="rounded-2xl bg-cyan-400 px-4 py-3 font-black text-[#050816]">Dashboard</Link>
            <Link href="/admin" className="rounded-2xl bg-violet-500 px-4 py-3 font-black text-white">Admin CMS</Link>
          </div>
        </div>
      )}
    </>
  );
}
