import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "John Doe Photography",
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
        {children}
      </body>
    </html>
  );
}
