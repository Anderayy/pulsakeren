"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { ArrowRight, CheckCircle2, Headphones, LockKeyhole, Radio, ShieldCheck, Zap } from "lucide-react";
import { categories, chartData, liveOrders, products, promos } from "@/lib/data";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { QuickOrderForm } from "@/components/quick-order-form";
import { SiteHeader } from "@/components/site-header";
import { rupiah } from "@/lib/utils";

export function HomePage() {
  return (
    <main className="digital-grid min-h-screen overflow-hidden text-cyan-50">
      <SiteHeader />
      <section className="relative px-5 py-16 lg:py-20">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1fr]">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-200">
              <Radio size={16} /> Provider API Online
            </span>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[1.02] text-white md:text-7xl">
              Power Up Your <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">Digital Life</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              pulsakeren adalah platform PPOB high-performance untuk pulsa, data, PLN, tagihan, e-wallet, game, dan entertainment dengan dashboard bisnis siap API.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="#quick" className="group inline-flex items-center gap-2 rounded-full bg-cyan-400 px-7 py-4 font-black text-[#050816] shadow-[0_0_36px_rgba(34,211,238,0.35)] transition hover:bg-lime-300">
                Mulai Transaksi <ArrowRight className="transition group-hover:translate-x-1" size={18} />
              </Link>
              <Link href="/api-documentation" className="rounded-full border border-cyan-400/30 bg-white/5 px-7 py-4 font-bold text-cyan-100 transition hover:bg-cyan-400/10">
                Lihat API
              </Link>
            </div>
            <LiveTicker />
          </div>
          <div className="relative z-10">
            <div className="hero-frame animate-floaty relative h-[430px] overflow-hidden rounded-[34px] border border-cyan-300/20 bg-[#081222] shadow-[0_0_80px_rgba(34,211,238,0.18)]">
              <Image src="/images/pulsakeren-hero.png" alt="Dashboard transaksi futuristik pulsakeren" fill priority sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/30 to-transparent" />
            </div>
            <div className="glass absolute -bottom-8 left-6 hidden rounded-3xl p-5 md:block">
              <p className="text-sm text-slate-400">Success Rate</p>
              <strong className="text-3xl text-lime-300">99.8%</strong>
            </div>
          </div>
        </div>
      </section>
      <div id="quick" className="px-5 pb-12"><QuickOrderForm /></div>
      <section className="mx-auto max-w-7xl px-5 py-12">
        <SectionTitle title="Digital Product Matrix" copy="Katalog lengkap dengan logo provider dan harga dummy realistis." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.slug} href={`/${category.slug}`} className="glass group rounded-3xl p-5 text-center transition hover:-translate-y-2 hover:border-cyan-300/50">
                <span className={`mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${category.tone} text-[#050816] shadow-[0_0_28px_rgba(34,211,238,0.18)] transition group-hover:scale-110`}><Icon /></span>
                <strong className="text-white">{category.name}</strong>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="px-5 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <SectionTitle title="Flash Promo" copy="Campaign aktif untuk pelanggan dan akun bisnis." align="left" />
            <Link href="/promotions" className="font-bold text-cyan-300">All Promotions</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {promos.map((promo) => (
              <article key={promo.title} className="glass group overflow-hidden rounded-3xl transition hover:-translate-y-2 hover:border-cyan-300/50">
                <div className="relative h-44">
                  <Image src={promo.image} alt={promo.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover opacity-80 transition group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-white">{promo.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{promo.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-[1fr_0.8fr]">
        <div className="glass rounded-3xl p-7">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-3xl font-black text-white">Traffic Monitor</h2>
            <span className="rounded-full bg-lime-300 px-4 py-2 text-sm font-black text-[#050816]">Realtime</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs><linearGradient id="voltChart" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22d3ee" stopOpacity={0.85}/><stop offset="95%" stopColor="#22d3ee" stopOpacity={0.02}/></linearGradient></defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#94a3b8" />
                <Tooltip formatter={(value) => rupiah(Number(value))} contentStyle={{ background: "#07111f", border: "1px solid rgba(34,211,238,.25)", borderRadius: 16 }} />
                <Area type="monotone" dataKey="value" stroke="#22d3ee" fill="url(#voltChart)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass rounded-3xl p-7">
          <h2 className="mb-5 text-3xl font-black text-white">Live Activity</h2>
          <div className="grid gap-3">
            {liveOrders.map((order) => (
              <div key={`${order.name}-${order.product}`} className="flex items-center justify-between gap-4 rounded-2xl border border-cyan-400/10 bg-white/[0.03] p-4">
                <span><strong className="block text-white">{order.name} · {order.city}</strong><span className="text-sm text-slate-400">{order.product}</span></span>
                <span className="font-black text-cyan-200">{order.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12">
        <SectionTitle title="Popular Products" copy="Produk dengan transaksi tertinggi minggu ini." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 8).map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 md:grid-cols-2">
        <InfoPanel title="Saldo vs Direct Payment" icon={<Zap />} items={["Saldo: checkout lebih cepat dan biaya lebih rendah.", "Direct payment: cocok untuk transaksi tamu via QRIS/VA.", "Akun bisnis dapat API key dan webhook callback."]} />
        <InfoPanel title="Security Layer" icon={<ShieldCheck />} items={["Input validation dengan Zod.", "Mock rate limiting dan RBAC siap dikembangkan.", "Audit log, provider adapter, dan webhook log tersedia di CMS."]} />
      </section>
      <section className="bg-cyan-400/5 px-5 py-14">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {[
            ["1.2M+", "Transactions"],
            ["620K+", "Active Users"],
            ["38", "Provider Routes"],
            ["99.8%", "Success Rate"],
          ].map(([value, label]) => (
            <div key={label} className="glass rounded-3xl p-6 text-center">
              <strong className="block text-3xl font-black text-cyan-200">{value}</strong>
              <span className="mt-2 block text-sm font-semibold text-slate-400">{label}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-14">
        <SectionTitle title="FAQ, Testimonial, Blog" copy="Konten pendukung untuk membangun trust dan SEO." />
        <div className="grid gap-5 md:grid-cols-3">
          {["Pembayaran QRIS diproses otomatis?", "Apakah tersedia API bisnis?", "Bagaimana refund transaksi gagal?"].map((faq) => (
            <details key={faq} className="glass rounded-3xl p-6">
              <summary className="cursor-pointer font-black text-white">{faq}</summary>
              <p className="mt-3 text-sm leading-6 text-slate-400">Ya. Demo ini memakai payment sandbox dan provider mock API yang bisa disambungkan ke provider nyata.</p>
            </details>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <div className="glass rounded-[34px] p-8 text-center">
          <h2 className="text-3xl font-black text-white">Get platform updates</h2>
          <div className="mx-auto mt-6 flex max-w-xl flex-col gap-3 rounded-full border border-cyan-400/20 bg-black/30 p-2 sm:flex-row">
            <input className="min-h-12 flex-1 rounded-full bg-transparent px-5 text-white outline-none" placeholder="Email bisnis kamu" />
            <button className="rounded-full bg-cyan-400 px-7 py-3 font-black text-[#050816]" type="button">Subscribe</button>
          </div>
        </div>
      </section>
      <Link href="https://wa.me/6281234567890" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-lime-300 text-[#050816] shadow-[0_0_35px_rgba(190,242,100,0.35)]" aria-label="WhatsApp customer service">
        <Headphones />
      </Link>
      <LiveToast />
      <Footer />
    </main>
  );
}

function SectionTitle({ title, copy, align = "center" }: { title: string; copy: string; align?: "center" | "left" }) {
  return <div className={align === "center" ? "mb-10 text-center" : ""}><h2 className="text-3xl font-black text-white md:text-4xl">{title}</h2><p className="mt-2 text-slate-400">{copy}</p></div>;
}

function InfoPanel({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) {
  return (
    <div className="glass rounded-3xl p-7">
      <div className="mb-5 flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400 text-[#050816]">{icon}</span><h3 className="text-2xl font-black text-white">{title}</h3></div>
      <div className="grid gap-3">{items.map((item) => <p key={item} className="flex gap-3 text-slate-300"><CheckCircle2 className="mt-0.5 shrink-0 text-lime-300" size={18} />{item}</p>)}</div>
    </div>
  );
}

function LiveTicker() {
  return <div className="mt-8 flex items-center gap-3 rounded-full border border-cyan-400/20 bg-white/5 px-4 py-3 text-sm text-slate-300"><span className="h-2.5 w-2.5 rounded-full bg-lime-300 shadow-[0_0_0_6px_rgba(190,242,100,.12)]" /> Live transactions updating every minute</div>;
}

function LiveToast() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % liveOrders.length), 3400);
    return () => window.clearInterval(timer);
  }, []);
  const order = liveOrders[index];
  return (
    <div className="glass fixed bottom-24 left-5 z-40 hidden max-w-[330px] items-center gap-3 rounded-2xl p-3 md:flex">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-lime-300 text-[#050816]"><LockKeyhole size={18} /></span>
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-white">{order.name} dari {order.city} membeli {order.product}</p>
        <p className="text-xs text-slate-400">transaksi berhasil · {order.amount}</p>
      </div>
    </div>
  );
}
