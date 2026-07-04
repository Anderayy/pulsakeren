import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/data";
import { rupiah } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/checkout?product=${product.id}`} className="group glass overflow-hidden rounded-3xl transition hover:-translate-y-2 hover:border-cyan-300/50">
      <div className={`relative h-32 bg-gradient-to-br ${product.tone} p-5`}>
        <span className="absolute right-4 top-4 rounded-full border border-cyan-300/20 bg-black/30 px-3 py-1 text-xs font-bold text-cyan-100">{product.status}</span>
        <span className="absolute bottom-4 left-5 grid h-16 w-28 place-items-center rounded-2xl bg-white p-3 shadow-[0_0_35px_rgba(34,211,238,0.18)]">
          <Image src={product.logo} alt={`Logo ${product.provider}`} width={108} height={46} className="max-h-11 w-auto object-contain" />
        </span>
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-200">{product.category}</span>
          {product.badge && <span className="rounded-full bg-lime-300 px-3 py-1 text-xs font-black text-[#050816]">{product.badge}</span>}
        </div>
        <h3 className="text-lg font-black text-white">{product.name}</h3>
        <p className="mt-2 min-h-10 text-sm leading-6 text-slate-400">{product.description}</p>
        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <span className="block text-xs text-slate-500">{product.sold.toLocaleString("id-ID")} orders</span>
            <strong className="text-xl text-cyan-200">{product.price ? rupiah(product.price) : "Cek tagihan"}</strong>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-cyan-400 text-[#050816] transition group-hover:rotate-12">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}
