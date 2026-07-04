import Link from "next/link";
import { Code2, Mail, MessageCircle, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-cyan-400/15 bg-[#050816]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-black text-white"><Zap className="text-cyan-300" /> pulsakeren</h2>
          <p className="text-sm leading-7 text-slate-400">Platform PPOB dark futuristic untuk transaksi digital cepat, aman, dan siap bisnis.</p>
          <div className="mt-5 flex gap-3 text-cyan-300"><Code2 /><MessageCircle /><Mail /></div>
        </div>
        <FooterGroup title="Products" items={["Pulsa", "Data", "PLN", "E-Wallet"]} />
        <FooterGroup title="Platform" items={["Business", "API Documentation", "Transaction Tracking", "Promotions"]} />
        <FooterGroup title="Support" items={["Help Center", "Blog", "Terms", "Privacy Policy"]} />
      </div>
      <div className="border-t border-cyan-400/15 py-5 text-center text-xs text-slate-500">© 2026 pulsakeren.com · Power Up Your Digital Life.</div>
    </footer>
  );
}

function FooterGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-4 font-bold uppercase tracking-wide text-cyan-200">{title}</h3>
      <div className="grid gap-3 text-sm text-slate-400">
        {items.map((item) => (
          <Link key={item} href={`/${item.toLowerCase().replaceAll(" ", "-")}`} className="hover:text-cyan-200">
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}
