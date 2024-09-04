"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-gray-900">
                Precious Memories
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link
              href="/portfolio"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Portfolio
            </Link>
            <Link
              href="/gallery"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Gallery
            </Link>
            <Link
              href="/experience"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Experience
            </Link>
            <Link
              href="/contact"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Contact
            </Link>
          </nav>
          <div className="hidden md:flex items-center">
            <Button variant="default">Book Now</Button>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />
    </header>
  );
}
