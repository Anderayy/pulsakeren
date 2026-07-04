"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, CreditCard, ShieldQuestion, User, Zap } from "lucide-react";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { products } from "@/lib/data";
import { rupiah } from "@/lib/utils";

type PaymentMethod = {
  label: string;
  logo: string;
  tone: string;
  subtitle: string;
};

const methods: PaymentMethod[] = [
  { label: "QRIS All Pay", logo: "/brands/qris.svg", tone: "from-cyan-400/20 to-violet-400/10", subtitle: "Scan semua bank & e-wallet" },
  { label: "GoPay", logo: "/brands/gopay.svg", tone: "from-sky-400/20 to-cyan-300/10", subtitle: "Bayar instan via GoPay" },
  { label: "OVO", logo: "/brands/ovo.svg", tone: "from-purple-400/20 to-violet-300/10", subtitle: "Saldo OVO aktif" },
  { label: "ShopeePay", logo: "/brands/shopeepay.svg", tone: "from-orange-400/20 to-red-300/10", subtitle: "Bayar lewat ShopeePay" },
  { label: "BCA Virtual Account", logo: "/brands/bca.svg", tone: "from-blue-400/20 to-cyan-300/10", subtitle: "ATM, m-BCA, myBCA" },
  { label: "Mandiri Virtual Account", logo: "/brands/mandiri.svg", tone: "from-yellow-400/20 to-blue-300/10", subtitle: "Livin, ATM, internet banking" },
  { label: "Indomaret / Ceriamart", logo: "/brands/indomaret.svg", tone: "from-red-400/20 to-yellow-300/10", subtitle: "Bayar di kasir Indomaret" },
  { label: "Alfamart / Alfamidi", logo: "/brands/alfamart.svg", tone: "from-blue-400/20 to-red-300/10", subtitle: "Bayar di kasir Alfamart" },
];

export function CheckoutClient() {
  const params = useSearchParams();
  const product = products.find((item) => item.id === params.get("product")) ?? products[0];
  const target = params.get("target") ?? "0812-4455-7788";
  const subtotal = product.price || 50000;
  const total = subtotal + product.adminFee - 750;

  return (
    <main className="digital-grid min-h-screen text-cyan-50">
      <SiteHeader />
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[1fr_0.48fr]">
        <div className="grid gap-8">
          <div className="glass rounded-[32px] p-8">
            <div className="grid gap-4 sm:grid-cols-4">
              {["Waiting Payment", "Paid", "Processing", "Success"].map((step, index) => (
                <div key={step} className="text-center">
                  <span className={`mx-auto grid h-14 w-14 place-items-center rounded-full ${index < 2 ? "bg-cyan-400 text-[#050816]" : "bg-white/5 text-slate-400"}`}>{index === 0 ? <CreditCard /> : index === 1 ? <Zap /> : <CheckCircle2 />}</span>
                  <strong className={`mt-3 block text-sm ${index < 2 ? "text-cyan-200" : "text-slate-500"}`}>{step}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-[32px] p-8">
            <h1 className="mb-8 text-3xl font-black text-white">Payment Channel</h1>
            <PaymentGroup title="E-Wallet & QRIS" methods={methods.slice(0, 4)} />
            <PaymentGroup title="Virtual Account" methods={methods.slice(4, 6)} columns="md:grid-cols-2" />
            <PaymentGroup title="Retail Outlet" methods={methods.slice(6)} columns="md:grid-cols-2" />
          </div>
        </div>
        <aside className="grid content-start gap-8">
          <div className="glass overflow-hidden rounded-[32px]">
            <div className={`bg-gradient-to-br ${product.tone} p-7`}>
              <span className="rounded-full border border-cyan-300/20 bg-black/30 px-3 py-1 text-sm font-bold text-cyan-100">SANDBOX</span>
              <div className="mt-5 flex items-center gap-4">
                <span className="grid h-16 w-28 place-items-center rounded-2xl bg-white p-3">
                  <Image src={product.logo} alt={product.provider} width={112} height={48} className="max-h-12 w-auto object-contain" />
                </span>
                <div>
                  <h2 className="text-2xl font-black text-white">{product.name}</h2>
                  <p className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-300"><User size={16} /> {target}</p>
                </div>
              </div>
            </div>
            <div className="p-7">
              <Row label="Harga Produk" value={rupiah(subtotal)} />
              <Row label="Biaya Layanan" value={rupiah(product.adminFee)} />
              <Row label="Diskon Promo" value="-Rp 750" accent />
              <div className="mt-6 border-t border-cyan-400/15 pt-6">
                <Row label="Total Bayar" value={rupiah(total)} big accent />
              </div>
              <button className="mt-6 w-full rounded-full bg-cyan-400 py-4 text-xl font-black text-[#050816] shadow-[0_0_35px_rgba(34,211,238,0.3)]" type="button">Bayar Sekarang</button>
            </div>
          </div>
          <div className="glass rounded-[28px] p-7">
            <span className="rounded-full bg-amber-300 px-3 py-1 text-sm font-black text-[#050816]">UNPAID</span>
            <h3 className="mt-4 font-black uppercase text-slate-400">Invoice ID</h3>
            <p className="text-xl font-black text-white">VP-20260704-44091</p>
            <h3 className="mt-6 font-black uppercase text-slate-400">Transaction Time</h3>
            <p className="text-lg text-slate-300">04 Juli 2026, 13:00 WIB</p>
            <Link href="/help-center" className="mt-6 flex items-center gap-2 border-t border-cyan-400/15 pt-5 font-black text-cyan-200"><ShieldQuestion /> Need Help? Contact Support</Link>
          </div>
        </aside>
      </section>
      <Footer />
    </main>
  );
}

function PaymentGroup({ title, methods, columns = "md:grid-cols-4" }: { title: string; methods: PaymentMethod[]; columns?: string }) {
  return (
    <>
      <h2 className="mb-4 mt-8 first:mt-0 font-black uppercase tracking-wide text-cyan-200">{title}</h2>
      <div className={`grid gap-4 ${columns}`}>
        {methods.map((method, index) => <PaymentButton key={method.label} method={method} active={index === 0 && title === "E-Wallet & QRIS"} />)}
      </div>
    </>
  );
}

function PaymentButton({ method, active = false }: { method: PaymentMethod; active?: boolean }) {
  return (
    <button className={`group overflow-hidden rounded-[24px] border text-left transition hover:-translate-y-1 hover:border-cyan-300/60 ${active ? "border-cyan-300 bg-cyan-400/10 shadow-[0_0_35px_rgba(34,211,238,0.16)]" : "border-cyan-400/15 bg-white/[0.03]"}`} type="button">
      <div className={`grid h-28 place-items-center bg-gradient-to-br ${method.tone} p-5`}>
        <span className="grid h-16 w-28 place-items-center rounded-2xl bg-white p-3 transition group-hover:scale-105">
          <Image src={method.logo} alt={`Logo ${method.label}`} width={112} height={56} className="max-h-12 w-auto object-contain" />
        </span>
      </div>
      <div className="p-5">
        <strong className="block font-black text-white">{method.label}</strong>
        <span className="mt-1 block text-sm font-medium text-slate-400">{method.subtitle}</span>
      </div>
    </button>
  );
}

function Row({ label, value, accent = false, big = false }: { label: string; value: string; accent?: boolean; big?: boolean }) {
  return <div className={`mb-4 flex justify-between gap-4 ${big ? "text-2xl font-black" : "text-lg"}`}><span className="text-slate-300">{label}</span><strong className={accent ? "text-cyan-200" : "text-white"}>{value}</strong></div>;
}
