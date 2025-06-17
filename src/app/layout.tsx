import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/ui/main-nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Demo | incoxchange",
  description: "IncoXchange",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body
        className={"font-sans bg-background text-foreground antialiased"}
      >
         <header className="border-b px-6 py-4">
          <MainNav />
        </header>
        {children}
      </body>
    </html>
  );
}
