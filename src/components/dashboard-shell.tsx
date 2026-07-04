"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { LogOut, Search } from "lucide-react";
import { chartData, dashboardMenu, orders, products, quickLinks } from "@/lib/data";
import { rupiah } from "@/lib/utils";

export function DashboardShell({ section = "Ringkasan Akun" }: { section?: string }) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-[#f7f8ff] text-[#130a26]">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white p-7 lg:block">
        <Link href="/" className="mb-10 block text-xl font-black">pulsakeren</Link>
        <nav className="grid gap-1">
          {dashboardMenu.map(([label, href, Icon]) => (
            <Link key={href as string} href={href as string} className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold ${pathname === href ? "bg-pink-100 text-[#b12675]" : "hover:bg-slate-50"}`}>
              <Icon size={18} /> {label as string}
            </Link>
          ))}
        </nav>
        <Link href="/" className="absolute bottom-8 flex items-center gap-3 font-semibold"><LogOut size={18} /> Keluar</Link>
      </aside>
      <section className="lg:pl-72">
        <header className="flex items-center justify-between px-5 py-5 md:px-9">
          <div>
            <p>Halo, Budi Santoso! ✨</p>
            <p className="text-sm text-slate-500">Senang melihatmu kembali hari ini.</p>
          </div>
          <Link href="/dashboard/profil" className="grid h-11 w-11 place-items-center rounded-full bg-[#dce8ff] font-black">BS</Link>
        </header>
        <div className="grid gap-8 px-5 pb-12 md:px-9">
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr_0.9fr]">
            <Metric title="Total Saldo" value="Rp 1.250.000" action="Deposit Baru" />
            <Metric title="Poin Kado" value="1,200 Poin" action="Tukarkan Reward" />
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="text-sm text-slate-500">Status Terkini</p>
              <h2 className="mt-5 text-xl font-semibold">1 Transaksi Sedang Diproses</h2>
              <p className="mt-2 text-sm">Estimasi selesai: 2 Menit</p>
            </div>
          </div>
          {section === "Ringkasan Akun" ? <Overview /> : <DashboardSection title={section} />}
        </div>
      </section>
    </main>
  );
}

function Metric({ title, value, action }: { title: string; value: string; action: string }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <h2 className="mt-2 text-2xl font-black">{value}</h2>
      <button className="mt-5 rounded-full bg-white px-6 py-3 font-bold shadow-lg shadow-pink-100" type="button">{action}</button>
    </div>
  );
}

function Overview() {
  return (
    <>
      <div className="grid gap-8 xl:grid-cols-[1fr_0.48fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-7">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Pengeluaran Bulanan</h1>
            <select className="border border-slate-300 px-4 py-2"><option>30 Hari Terakhir</option></select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <Tooltip formatter={(value) => rupiah(Number(value))} />
                <Bar dataKey="value" fill="#ec5fac" radius={[24, 24, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-7">
          <h2 className="mb-6 text-xl font-semibold">Akses Cepat</h2>
          <div className="grid gap-4">
            {quickLinks.map(([label, href, Icon]) => <Link key={href as string} href={href as string} className="flex items-center justify-between bg-white p-4 shadow-sm"><span className="flex items-center gap-3"><Icon size={18} />{label as string}</span><span>›</span></Link>)}
          </div>
        </div>
      </div>
      <History />
      <div>
        <h2 className="mb-4 text-xl font-semibold">Kado Untukmu</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-xl bg-gradient-to-r from-pink-200 to-violet-200 p-7 text-white shadow-lg"><strong>Cashback Gabungan 50%</strong><p>Khusus PLN & BPJS hari ini.</p></div>
          <div className="rounded-xl bg-gradient-to-r from-blue-200 to-pink-200 p-7 text-white shadow-lg"><strong>Pesta Poin</strong><p>Tukarkan 1000 poin dengan saldo Rp10rb.</p></div>
        </div>
      </div>
    </>
  );
}

function History() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-7">
      <div className="mb-6 flex justify-between"><h2 className="text-xl font-semibold">Riwayat Transaksi</h2><Link href="/dashboard/transaksi" className="font-bold">Semua Transaksi</Link></div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead><tr className="border-b text-sm uppercase"><th className="py-4">Produk</th><th>Tanggal & ID</th><th>Status</th><th className="text-right">Total</th></tr></thead>
          <tbody>{orders.slice(1).map((order) => <tr className="border-b border-slate-100" key={order.id}><td className="py-5"><strong>{order.product}</strong><span className="block text-sm text-slate-500">{order.target}</span></td><td>{order.date}<span className="block text-sm">#{order.id}</span></td><td><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase">{order.status}</span></td><td className="text-right font-bold">{rupiah(order.total)}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

function DashboardSection({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-7">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-black">{title}</h1>
        <label className="flex h-11 items-center gap-2 rounded-full bg-[#f3f6ff] px-4 text-sm text-slate-500"><Search size={16} /><input className="bg-transparent outline-none" placeholder="Cari data" /></label>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {products.slice(0, 6).map((product) => <div key={product.id} className="rounded-2xl border border-pink-100 p-5"><strong>{product.name}</strong><p className="text-sm text-slate-500">{product.description}</p><button className="mt-4 rounded-full bg-[#dce8ff] px-4 py-2 text-sm font-bold text-[#b12675]" type="button">Kelola</button></div>)}
      </div>
    </div>
  );
}
