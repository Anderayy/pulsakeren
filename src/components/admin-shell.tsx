"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Download, Plus, Search } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { adminMenu, chartData, orders, products } from "@/lib/data";
import { rupiah } from "@/lib/utils";

export function AdminShell({ section = "Dashboard" }: { section?: string }) {
  const pathname = usePathname();
  return (
    <main className="min-h-screen bg-[#f8f7ff] text-[#130a26]">
      <aside className="fixed inset-y-0 left-0 hidden w-80 border-r border-pink-100 bg-white p-6 lg:block">
        <Link href="/admin" className="text-4xl font-black text-cyan-300">pulsakeren</Link>
        <p className="mb-8 text-sm text-slate-500">Admin Control Center</p>
        <nav className="grid gap-1">
          {adminMenu.map(([label, href, Icon]) => (
            <Link key={href as string} href={href as string} className={`flex items-center gap-3 rounded-full px-5 py-3 font-semibold ${pathname === href ? "bg-pink-100 text-[#b12675]" : "hover:bg-slate-50"}`}>
              <Icon size={19} /> {label as string}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-7 left-6 right-6 flex items-center justify-between rounded-2xl bg-[#dce8ff] p-4"><span className="grid h-12 w-12 place-items-center rounded-full bg-[#ec5fac] font-bold text-white">JD</span><div><strong>Jane Doe</strong><p className="text-xs">Super Admin</p></div></div>
      </aside>
      <section className="lg:pl-80">
        <header className="flex items-center justify-between px-5 py-7 md:px-10">
          <label className="hidden h-14 w-full max-w-xl items-center gap-3 rounded-full bg-[#edf2ff] px-5 text-slate-500 md:flex"><Search /><input className="flex-1 bg-transparent outline-none" placeholder="Cari transaksi, produk, atau user..." /></label>
          <div className="ml-auto flex items-center gap-5"><span className="rounded-full bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-700">API Status: Online</span><Bell /></div>
        </header>
        <div className="px-5 pb-12 md:px-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div><h1 className="text-4xl font-black">{section === "Dashboard" ? "Dashboard Overview" : section}</h1><p className="text-lg text-slate-600">Selamat datang kembali, Jane. Berikut ringkasan performa hari ini.</p></div>
            <div className="flex gap-3"><button className="flex items-center gap-2 rounded-full bg-[#dce8ff] px-6 py-3 font-semibold" type="button"><Download size={18} /> Export Reports</button><button className="flex items-center gap-2 rounded-full bg-[#b12675] px-6 py-3 font-semibold text-white" type="button"><Plus size={18} /> Tambah Produk</button></div>
          </div>
          {section === "Dashboard" ? <AdminOverview /> : <AdminCrud title={section} />}
        </div>
      </section>
    </main>
  );
}

function AdminOverview() {
  return (
    <div className="grid gap-7">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total Transaksi Hari Ini" value="1,284" delta="+12%" />
        <Stat title="Omzet Bulanan" value="Rp 428.5M" delta="+5.4%" />
        <Stat title="Laba Kotor" value="Rp 32.1M" delta="-2.1%" danger />
        <Stat title="Berhasil vs Gagal" value="98.2%" delta="/ 1.8%" />
      </div>
      <div className="grid gap-7 xl:grid-cols-[1fr_0.48fr]">
        <div className="rounded-[24px] bg-white p-8 shadow-xl shadow-pink-50">
          <div className="mb-6 flex justify-between"><h2 className="text-3xl font-black">Sales Performance</h2><select className="rounded-full bg-[#dce8ff] px-4 py-2"><option>7 Hari Terakhir</option></select></div>
          <div className="h-80"><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData}><XAxis dataKey="name" axisLine={false} tickLine={false} /><Tooltip formatter={(value) => rupiah(Number(value))} /><Bar dataKey="value" fill="#ec5fac" radius={[28, 28, 0, 0]} /></BarChart></ResponsiveContainer></div>
        </div>
        <div className="rounded-[24px] bg-white p-8 shadow-xl shadow-pink-50">
          <h2 className="mb-6 text-3xl font-black">Top Selling</h2>
          <div className="grid gap-5">{products.slice(0, 5).map((product) => <div key={product.id} className="flex items-center justify-between gap-4"><span><strong>{product.name}</strong><p className="text-sm text-slate-500">{product.sold.toLocaleString("id-ID")} Terjual</p></span><strong className="text-[#b12675]">{product.price ? rupiah(product.price) : "Tagihan"}</strong></div>)}</div>
          <Link href="/admin/produk" className="mt-8 block rounded-full border border-pink-200 py-3 text-center font-semibold">Lihat Semua Produk</Link>
        </div>
      </div>
      <AdminCrud title="Pesanan Tertunda" />
    </div>
  );
}

function Stat({ title, value, delta, danger = false }: { title: string; value: string; delta: string; danger?: boolean }) {
  return <div className="rounded-[24px] bg-white p-7 shadow-xl shadow-pink-50"><span className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-pink-100 text-[#b12675]">▣</span><p className="font-semibold">{title}</p><div className="mt-3 flex items-end justify-between"><strong className="text-3xl">{value}</strong><span className={danger ? "font-bold text-red-600" : "font-bold text-emerald-600"}>{delta}</span></div></div>;
}

function AdminCrud({ title }: { title: string }) {
  return (
    <div className="rounded-[24px] bg-white p-7 shadow-xl shadow-pink-50">
      <div className="mb-5 flex flex-wrap justify-between gap-3"><h2 className="text-2xl font-black">{title}</h2><div className="flex gap-2"><input className="rounded-full bg-[#f3f6ff] px-4 py-2 outline-none" placeholder="Search dan filter" /><button className="rounded-full bg-[#b12675] px-5 py-2 font-bold text-white" type="button">Tambah</button></div></div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead><tr className="border-b text-sm uppercase text-slate-500"><th className="py-4">Nama</th><th>Provider/User</th><th>Status</th><th>Margin/Total</th><th>Aksi</th></tr></thead>
          <tbody>{orders.map((order, index) => <tr key={order.id} className="border-b border-slate-100"><td className="py-4 font-bold">{index % 2 ? products[index]?.name : order.product}</td><td>{index % 2 ? products[index]?.provider : order.target}</td><td><span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-[#b12675]">{order.status}</span></td><td>{rupiah(order.total)}</td><td><button className="rounded-full bg-[#dce8ff] px-4 py-2 text-sm font-bold" type="button">Edit</button></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
