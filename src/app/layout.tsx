import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pulsakeren.com"),
  title: {
    default: "pulsakeren - Power Up Your Digital Life",
    template: "%s | pulsakeren",
  },
  description: "Platform PPOB dark futuristic untuk pulsa, data, PLN, tagihan, e-wallet, game, dan entertainment.",
  openGraph: {
    title: "pulsakeren",
    description: "Power Up Your Digital Life",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
