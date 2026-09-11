import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zawadi Desk",
  description: "Starter Next.js project for the Moringa Claude Code workshop.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
