import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import "./globals.css";
// import { Toaster } from "@/components/UI/Toast/toaster";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Melodify",
  description: "Enjoy your music with Melodify",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
        {/* <Toaster /> */}
      </body>
    </html>
  );
}
