"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function MobileMenu({ isOpen, setIsOpen }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
    >
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`absolute top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
          <nav className="mt-8 space-y-4">
            <Link
              href="/portfolio"
              className="block text-base font-medium text-gray-900"
            >
              Portfolio
            </Link>
            <Link
              href="/gallery"
              className="block text-base font-medium text-gray-900"
            >
              Gallery
            </Link>
            <Link
              href="/experience"
              className="block text-base font-medium text-gray-900"
            >
              Experience
            </Link>
            <Link
              href="/contact"
              className="block text-base font-medium text-gray-900"
            >
              Contact
            </Link>
          </nav>
          <div className="mt-8">
            <Button className="w-full">Book Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
