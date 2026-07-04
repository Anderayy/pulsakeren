import { NextResponse } from "next/server";
import { compareSync, hashSync } from "bcryptjs";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const demoHash = hashSync("password123", 10);

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Email atau password tidak valid" }, { status: 422 });
  }

  const ok = ["user@pulsakeren.com", "admin@pulsakeren.com"].includes(parsed.data.email) && compareSync(parsed.data.password, demoHash);
  if (!ok) {
    return NextResponse.json({ error: "Kredensial salah" }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      email: parsed.data.email,
      role: parsed.data.email.startsWith("admin") ? "Super Admin" : "Customer",
    },
    token: "mock-session-token",
  });
}
