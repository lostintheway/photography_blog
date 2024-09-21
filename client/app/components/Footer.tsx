import Link from "next/link";
import { Facebook } from "lucide-react";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

export default function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* <nav className="flex flex-wrap justify-center">
          <div className="px-5 py-2">
            <Link
              href="/about"
              className="text-base text-gray-300 hover:text-white"
            >
              About
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="/terms"
              className="text-base text-gray-300 hover:text-white"
            >
              Terms
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="/privacy"
              className="text-base text-gray-300 hover:text-white"
            >
              Privacy
            </Link>
          </div>
        </nav> */}
        <div className="flex justify-center space-x-6">
          {/* Add social media icons here */}
          <a href="#" className="text-gray-400 hover:text-white">
            <InstagramLogoIcon className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <Facebook className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <TwitterLogoIcon className="h-6 w-6" />
          </a>
        </div>
        <p className="mt-4 text-center text-base text-gray-400">
          &copy; 2024 Precious Memories. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
