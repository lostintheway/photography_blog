"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  imageSrc: string;
};

type PortfolioGridProps = {
  initialItems: PortfolioItem[];
};

export default function PortfolioGrid({ initialItems }: PortfolioGridProps) {
  const [filter, setFilter] = useState("all");
  const [portfolioItems] = useState(initialItems);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  const filteredItems =
    filter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === filter);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {["all", "wedding", "portrait", "nature"].map((category) => (
          <Button
            key={category}
            onClick={() => setFilter(category)}
            variant={filter === category ? "default" : "outline"}
            className={`mb-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${
              filter === category ? "animate-scaleIn" : ""
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className={`group relative ${
              animated ? "animate-fadeIn" : "opacity-0"
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative w-full h-48 sm:h-56 md:h-64 bg-white rounded-lg overflow-hidden group-hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
            <h3 className="mt-2 md:mt-4 text-base md:text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500">{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
