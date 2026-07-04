import {
  Activity,
  BadgePercent,
  Banknote,
  Bell,
  BookOpenText,
  Building2,
  Cable,
  CreditCard,
  Database,
  Gamepad2,
  Gauge,
  Headphones,
  Home,
  KeyRound,
  Landmark,
  LayoutDashboard,
  MessageCircle,
  MonitorPlay,
  Moon,
  PlugZap,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  Ticket,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Product = {
  id: string;
  name: string;
  category: string;
  provider: string;
  logo: string;
  tone: string;
  price: number;
  cost: number;
  adminFee: number;
  sold: number;
  status: "Online" | "Maintenance" | "Low Stock";
  badge?: string;
  description: string;
};

export type Category = {
  name: string;
  slug: string;
  icon: LucideIcon;
  tone: string;
  description: string;
};

export const categories: Category[] = [
  { name: "Pulsa", slug: "pulsa", icon: Smartphone, tone: "from-cyan-400 to-blue-500", description: "Telkomsel, Indosat, XL, AXIS, Tri, Smartfren." },
  { name: "Data", slug: "data", icon: Cable, tone: "from-blue-400 to-violet-500", description: "Paket data harian sampai unlimited." },
  { name: "PLN", slug: "pln", icon: Zap, tone: "from-yellow-300 to-cyan-400", description: "Token dan tagihan PLN." },
  { name: "Bills", slug: "bills", icon: ReceiptText, tone: "from-emerald-300 to-cyan-500", description: "PDAM, BPJS, Telkom, PBB, cicilan." },
  { name: "E-Wallet", slug: "e-wallet", icon: WalletCards, tone: "from-green-300 to-emerald-500", description: "DANA, OVO, GoPay, ShopeePay, LinkAja." },
  { name: "Games", slug: "games", icon: Gamepad2, tone: "from-violet-400 to-fuchsia-500", description: "MLBB, Free Fire, PUBG, Valorant, Roblox." },
  { name: "Entertainment", slug: "entertainment", icon: MonitorPlay, tone: "from-pink-400 to-violet-500", description: "Netflix, Spotify, Vidio, Disney+, Canva." },
];

export const mainMenu = [
  ["Home", "/"],
  ["Pulsa", "/pulsa"],
  ["Data", "/data"],
  ["PLN", "/pln"],
  ["Bills", "/bills"],
  ["E-Wallet", "/e-wallet"],
  ["Games", "/games"],
  ["Entertainment", "/entertainment"],
  ["Promotions", "/promotions"],
  ["Transaction Tracking", "/transaction-tracking"],
  ["Business", "/business"],
  ["API Documentation", "/api-documentation"],
  ["Help Center", "/help-center"],
  ["Blog", "/blog"],
];

export const products: Product[] = [
  { id: "p1", name: "Telkomsel 50K", category: "Pulsa", provider: "Telkomsel", logo: "/brands/telkomsel.svg", tone: "from-red-500/20 to-cyan-400/10", price: 50150, cost: 48500, adminFee: 500, sold: 12840, status: "Online", badge: "Fast", description: "Pulsa reguler Telkomsel nasional." },
  { id: "p2", name: "Indosat 100K", category: "Pulsa", provider: "Indosat", logo: "/brands/indosat.svg", tone: "from-yellow-400/20 to-blue-400/10", price: 100900, cost: 98500, adminFee: 700, sold: 9810, status: "Online", description: "Pulsa IM3 dan Indosat Ooredoo." },
  { id: "p3", name: "XL Xtra Combo 30GB", category: "Data", provider: "XL", logo: "/brands/xl.svg", tone: "from-blue-500/20 to-cyan-400/10", price: 82000, cost: 78500, adminFee: 1000, sold: 7102, status: "Online", badge: "Promo", description: "Paket data utama dan bonus aplikasi." },
  { id: "p4", name: "AXIS Bronet 15GB", category: "Data", provider: "AXIS", logo: "/brands/axis.svg", tone: "from-purple-500/20 to-fuchsia-400/10", price: 48500, cost: 46200, adminFee: 800, sold: 5274, status: "Online", description: "Kuota hemat untuk pengguna AXIS." },
  { id: "p5", name: "Tri 25GB", category: "Data", provider: "Tri", logo: "/brands/qris.svg", tone: "from-orange-400/20 to-cyan-400/10", price: 65000, cost: 62000, adminFee: 800, sold: 4310, status: "Online", description: "Paket data Tri bulanan." },
  { id: "p6", name: "Smartfren Unlimited", category: "Data", provider: "Smartfren", logo: "/brands/qris.svg", tone: "from-red-400/20 to-violet-400/10", price: 78000, cost: 74000, adminFee: 800, sold: 3882, status: "Online", description: "Paket unlimited Smartfren." },
  { id: "p7", name: "Token PLN 100K", category: "PLN", provider: "PLN", logo: "/brands/pln.svg", tone: "from-yellow-300/20 to-cyan-400/10", price: 100500, cost: 100000, adminFee: 2500, sold: 10412, status: "Online", description: "Token listrik prabayar realtime." },
  { id: "p8", name: "PLN Pascabayar", category: "Bills", provider: "PLN", logo: "/brands/pln.svg", tone: "from-yellow-300/20 to-blue-400/10", price: 0, cost: 0, adminFee: 3000, sold: 4828, status: "Online", description: "Cek dan bayar tagihan listrik." },
  { id: "p9", name: "BPJS Kesehatan", category: "Bills", provider: "BPJS", logo: "/brands/bpjs.svg", tone: "from-emerald-400/20 to-green-400/10", price: 0, cost: 0, adminFee: 2500, sold: 3684, status: "Online", description: "Bayar iuran BPJS keluarga." },
  { id: "p10", name: "GoPay 50K", category: "E-Wallet", provider: "GoPay", logo: "/brands/gopay.svg", tone: "from-sky-400/20 to-cyan-300/10", price: 50000, cost: 50000, adminFee: 1000, sold: 7606, status: "Online", description: "Top up saldo GoPay instan." },
  { id: "p11", name: "ShopeePay 100K", category: "E-Wallet", provider: "ShopeePay", logo: "/brands/shopeepay.svg", tone: "from-orange-400/20 to-red-400/10", price: 100000, cost: 100000, adminFee: 1000, sold: 6980, status: "Online", description: "Top up saldo ShopeePay." },
  { id: "p12", name: "OVO 50K", category: "E-Wallet", provider: "OVO", logo: "/brands/ovo.svg", tone: "from-purple-400/20 to-violet-400/10", price: 50000, cost: 50000, adminFee: 1000, sold: 5210, status: "Online", description: "Top up saldo OVO." },
  { id: "p13", name: "MLBB 284 Diamonds", category: "Games", provider: "Mobile Legends", logo: "/brands/mobile-legends.svg", tone: "from-indigo-400/20 to-fuchsia-400/10", price: 84000, cost: 80800, adminFee: 500, sold: 6110, status: "Online", badge: "Hot", description: "Diamond Mobile Legends via user ID." },
  { id: "p14", name: "Free Fire 140 Diamonds", category: "Games", provider: "Garena", logo: "/brands/garena.svg", tone: "from-orange-400/20 to-red-500/10", price: 20500, cost: 19000, adminFee: 500, sold: 4902, status: "Online", description: "Diamond Free Fire masuk cepat." },
  { id: "p15", name: "Steam Wallet 120K", category: "Games", provider: "Steam", logo: "/brands/qris.svg", tone: "from-slate-400/20 to-cyan-400/10", price: 120000, cost: 116000, adminFee: 1500, sold: 1884, status: "Low Stock", description: "Voucher digital Steam Wallet." },
  { id: "p16", name: "Spotify Premium", category: "Entertainment", provider: "Spotify", logo: "/brands/spotify.svg", tone: "from-green-400/20 to-emerald-400/10", price: 54900, cost: 51000, adminFee: 1000, sold: 2932, status: "Online", description: "Premium 1 bulan." },
  { id: "p17", name: "Netflix Gift 100K", category: "Entertainment", provider: "Netflix", logo: "/brands/netflix.svg", tone: "from-red-500/20 to-violet-400/10", price: 100000, cost: 97000, adminFee: 1500, sold: 2384, status: "Online", description: "Gift card digital Netflix." },
];

export const chartData = [
  { name: "Mon", value: 1200000 },
  { name: "Tue", value: 2250000 },
  { name: "Wed", value: 1820000 },
  { name: "Thu", value: 3200000 },
  { name: "Fri", value: 2800000 },
  { name: "Sat", value: 4100000 },
  { name: "Sun", value: 4550000 },
];

export const liveOrders = [
  { name: "Raka", city: "Jakarta", product: "GoPay 50K", amount: "Rp 51.000" },
  { name: "Mira", city: "Bandung", product: "Token PLN 100K", amount: "Rp 103.000" },
  { name: "Dion", city: "Surabaya", product: "MLBB 284 Diamonds", amount: "Rp 84.500" },
  { name: "Naya", city: "Medan", product: "XL Xtra Combo", amount: "Rp 83.000" },
  { name: "Fajar", city: "Bekasi", product: "Telkomsel 50K", amount: "Rp 50.650" },
];

export const promos = [
  { title: "Neon Cashback", copy: "Cashback hingga 35% untuk transaksi e-wallet pertama.", image: "/images/promo-ewallet.png" },
  { title: "Game Boost Weekend", copy: "Harga spesial MLBB, Free Fire, Steam, dan PlayStation.", image: "/images/promo-game.png" },
  { title: "Data Turbo Pack", copy: "Kuota besar operator populer dengan proses otomatis.", image: "/images/promo-data.png" },
];

export const dashboardMenu = [
  ["Control Center", "/dashboard", LayoutDashboard],
  ["Saldo", "/dashboard/saldo", WalletCards],
  ["Deposit", "/dashboard/deposit", Banknote],
  ["Transactions", "/dashboard/transactions", ReceiptText],
  ["Favorites", "/dashboard/favorites", Zap],
  ["Saved Numbers", "/dashboard/saved-numbers", Smartphone],
  ["Voucher", "/dashboard/voucher", Ticket],
  ["Referral", "/dashboard/referral", Users],
  ["API Key", "/dashboard/api-key", KeyRound],
  ["Webhook", "/dashboard/webhook", PlugZap],
  ["Notifications", "/dashboard/notifications", Bell],
  ["Support Ticket", "/dashboard/tickets", Headphones],
  ["Security", "/dashboard/security", ShieldCheck],
];

export const adminMenu = [
  ["Realtime", "/admin", Gauge],
  ["Products", "/admin/products", Zap],
  ["Categories", "/admin/categories", Database],
  ["Providers", "/admin/providers", Building2],
  ["Orders", "/admin/orders", ReceiptText],
  ["Payments", "/admin/payments", CreditCard],
  ["Deposits", "/admin/deposits", Banknote],
  ["Refund", "/admin/refund", Landmark],
  ["Customers", "/admin/customers", Users],
  ["Business", "/admin/business", KeyRound],
  ["Webhook Log", "/admin/webhook-log", PlugZap],
  ["Provider Log", "/admin/provider-log", Activity],
  ["Promo", "/admin/promo", BadgePercent],
  ["Banner", "/admin/banner", MonitorPlay],
  ["Blog", "/admin/blog", BookOpenText],
  ["Tickets", "/admin/tickets", MessageCircle],
  ["Reports", "/admin/reports", ReceiptText],
  ["Roles", "/admin/roles", Users],
  ["Audit Log", "/admin/audit-log", ShieldCheck],
  ["System Health", "/admin/system-health", Moon],
];

export const orders = [
  { id: "VP-20260704-44091", product: "GoPay 50K", target: "0812-4455-7788", date: "04 Jul 2026, 12:22", status: "Paid", total: 51000 },
  { id: "VP-20260704-44092", product: "Token PLN 100K", target: "53210988712", date: "04 Jul 2026, 12:18", status: "Processing", total: 103000 },
  { id: "VP-20260704-44093", product: "MLBB 284 Diamonds", target: "89123321", date: "04 Jul 2026, 12:10", status: "Success", total: 84500 },
];

export const quickLinks = [
  ["Track Transaction", "/transaction-tracking", ReceiptText],
  ["Deposit Balance", "/dashboard/deposit", WalletCards],
  ["API Docs", "/api-documentation", KeyRound],
  ["Help Center", "/help-center", Headphones],
  ["Admin CMS", "/admin", Home],
];
