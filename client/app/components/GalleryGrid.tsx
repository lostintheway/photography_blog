"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { BASE_URL } from "@/constants/constants";

type GalleryItem = {
  id: number;
  title: string;
  imageSrc: string;
};

type GalleryGridProps = {
  initialItems: GalleryItem[];
};

export default function GalleryGrid({ initialItems }: GalleryGridProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openCarousel = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {initialItems.map((item, index) => (
          <div
            key={item.id}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg hover:opacity-80 transition-opacity duration-300"
            onClick={() => openCarousel(index)}
          >
            <Image
              src={BASE_URL + "/" + item.imageSrc}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-7xl w-full bg-black">
          <Carousel className="w-full max-h-[80vh]">
            <CarouselContent>
              {initialItems.map((item, index) => {
                const imgUrl = BASE_URL + "/" + item.imageSrc;
                return (
                  <CarouselItem key={item.id}>
                    <div className="flex aspect-video items-center justify-center p-6">
                      <Image
                        src={imgUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 80vw"
                        className="object-contain"
                      />
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  );
}
