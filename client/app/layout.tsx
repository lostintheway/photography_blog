import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "./components/Header";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Precious Memories Photography",
  description: "Capturing life's moments through the lens",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Toaster />
        <Header />
        {children}
      </body>
    </html>
  );
}
