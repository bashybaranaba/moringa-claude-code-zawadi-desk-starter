import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


export const metadata: Metadata = {
  title: "Zawadi Desk",
  description: "Starter Next.js project for the Moringa Claude Code workshop.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}