import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative bg-gray-900">
      <div className="absolute inset-0">
        <Image
          className="w-full h-full object-cover"
          src="/hero-image.jpg"
          alt="Hero background"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Capturing Your Precious Memories
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl">
          We specialize in turning your special moments into timeless
          photographic art. Let us tell your story through our lenses.
        </p>
        <div className="mt-10">
          <Button size="lg">View Our Portfolio</Button>
        </div>
      </div>
    </div>
  );
}
