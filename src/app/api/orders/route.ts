import { NextResponse } from "next/server";
import { z } from "zod";
import { products } from "@/lib/data";

const orderSchema = z.object({
  productId: z.string().min(1),
  target: z.string().min(5).max(32),
  paymentMethod: z.string().min(2),
  guestEmail: z.string().email().optional(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = orderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Data transaksi tidak valid", issues: parsed.error.flatten() }, { status: 422 });
  }

  const product = products.find((item) => item.id === parsed.data.productId);
  if (!product) {
    return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
  }

  const invoiceId = `KP-${Date.now().toString().slice(-8)}`;
  const total = (product.price || 50000) + product.adminFee;

  return NextResponse.json({
    invoiceId,
    status: "Menunggu Pembayaran",
    product,
    target: parsed.data.target,
    total,
    notifications: {
      email: "Simulasi email invoice dikirim",
      whatsapp: "Simulasi WhatsApp status transaksi dikirim",
    },
  });
}
