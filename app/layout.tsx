import type { Metadata } from "next";
// Geist ships its font files in the npm package, so builds never fetch from
// Google Fonts (a common source of flaky build failures).
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js on Railway",
  description: "Next.js 16 starter with Tailwind CSS 4 and shadcn/ui, deployed on Railway.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
