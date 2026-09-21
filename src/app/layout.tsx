import type { Metadata } from "next";
import "./globals.css";
import {geistSans, geistMono} from "@/config/fonts"

export const metadata: Metadata = {
  title: "Teslo | Shop",
  description: "Tienda de productos",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
