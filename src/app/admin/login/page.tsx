import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-[#ffdbeb] to-[#dce8ff] p-5">
      <section className="w-full max-w-md rounded-[28px] bg-white p-8 shadow-2xl shadow-pink-100">
        <h1 className="text-3xl font-black text-[#b12675]">Admin Login</h1>
        <p className="mt-2 text-slate-500">Demo: admin@pulsakeren.com / password123</p>
        <input className="mt-6 h-14 w-full rounded-2xl border border-pink-200 px-4 outline-none" placeholder="Email admin" />
        <input className="mt-3 h-14 w-full rounded-2xl border border-pink-200 px-4 outline-none" placeholder="Password" type="password" />
        <Link href="/admin" className="mt-5 block rounded-2xl bg-[#b12675] px-6 py-4 text-center font-bold text-white">Masuk Admin CMS</Link>
      </section>
    </main>
  );
}
