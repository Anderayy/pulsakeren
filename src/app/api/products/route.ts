import { NextResponse } from "next/server";
import { products } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase();
  const category = searchParams.get("category");
  const data = products.filter((product) => {
    const matchesQuery = !q || product.name.toLowerCase().includes(q) || product.provider.toLowerCase().includes(q);
    const matchesCategory = !category || product.category === category;
    return matchesQuery && matchesCategory;
  });

  return NextResponse.json({ data, page: 1, total: data.length });
}
