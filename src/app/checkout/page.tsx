import { Suspense } from "react";
import { CheckoutClient } from "@/components/checkout-client";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fbf8ff] p-10">Memuat checkout...</div>}>
      <CheckoutClient />
    </Suspense>
  );
}
