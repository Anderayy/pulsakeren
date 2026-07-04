"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ScanLine, Send } from "lucide-react";
import { categories, products } from "@/lib/data";
import { rupiah } from "@/lib/utils";

export function QuickOrderForm() {
  const router = useRouter();
  const [category, setCategory] = useState("Pulsa");
  const [target, setTarget] = useState("");
  const [selected, setSelected] = useState(products[0].id);
  const [payment, setPayment] = useState("QRIS All Pay");
  const filtered = useMemo(() => products.filter((product) => product.category === category).slice(0, 4), [category]);
  const product = products.find((item) => item.id === selected) ?? filtered[0] ?? products[0];

  function submit() {
    const params = new URLSearchParams({ product: product.id, target: target || "0812-7788-9900", payment });
    router.push(`/checkout?${params.toString()}`);
  }

  return (
    <section className="glass mx-auto max-w-6xl rounded-[30px] p-5 md:p-7">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400 text-[#050816]"><ScanLine /></span>
        <div>
          <h2 className="text-xl font-black text-white">Quick Transaction</h2>
          <p className="text-sm text-slate-400">Validasi mock API, invoice otomatis, proses realtime.</p>
        </div>
      </div>
      <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
        {categories.map((item) => {
          const Icon = item.icon;
          const active = item.name === category;
          return (
            <button
              key={item.slug}
              onClick={() => {
                setCategory(item.name);
                setSelected(products.find((product) => product.category === item.name)?.id ?? products[0].id);
              }}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition ${active ? "border-cyan-300 bg-cyan-400 text-[#050816]" : "border-cyan-400/15 bg-white/5 text-slate-300 hover:border-cyan-300/50"}`}
              type="button"
            >
              <Icon size={16} /> {item.name}
            </button>
          );
        })}
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_1.25fr_0.9fr]">
        <label className="grid gap-2 text-sm font-semibold text-slate-300">
          Customer Number / ID
          <input value={target} onChange={(event) => setTarget(event.target.value)} className="h-14 rounded-2xl border border-cyan-400/20 bg-black/30 px-4 text-white outline-none focus:border-cyan-300" placeholder="0812xxxx / ID pelanggan" />
        </label>
        <div className="grid gap-2 text-sm font-semibold text-slate-300">
          Product Variant
          <div className="grid gap-3 sm:grid-cols-2">
            {filtered.map((item) => (
              <button key={item.id} onClick={() => setSelected(item.id)} className={`flex min-h-24 items-center gap-3 rounded-2xl border p-3 text-left transition hover:-translate-y-1 ${selected === item.id ? "border-cyan-300 bg-cyan-400/10" : "border-cyan-400/15 bg-white/[0.03]"}`} type="button">
                <span className="grid h-14 w-20 shrink-0 place-items-center rounded-xl bg-white p-2">
                  <Image src={item.logo} alt={`Logo ${item.provider}`} width={80} height={34} className="max-h-9 w-auto object-contain" />
                </span>
                <span>
                  <span className="block font-black text-white">{item.name}</span>
                  <span className="text-xs text-slate-400">{rupiah(item.price + item.adminFee)}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-2 text-sm font-semibold text-slate-300">
          Payment Channel
          <select value={payment} onChange={(event) => setPayment(event.target.value)} className="h-14 rounded-2xl border border-cyan-400/20 bg-black/30 px-4 text-white outline-none focus:border-cyan-300">
            {["QRIS All Pay", "GoPay", "OVO", "ShopeePay", "BCA Virtual Account", "Mandiri Virtual Account", "Indomaret", "Alfamart"].map((item) => <option className="bg-[#07111f]" key={item}>{item}</option>)}
          </select>
          <button onClick={submit} className="mt-2 flex h-14 items-center justify-center gap-2 rounded-2xl bg-cyan-400 font-black text-[#050816] shadow-[0_0_35px_rgba(34,211,238,0.3)] transition hover:bg-lime-300" type="button">
            Mulai Transaksi <Send size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
