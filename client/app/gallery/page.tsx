import { BASE_URL } from "@/constants/constants";
import GalleryGrid from "../components/GalleryGrid";

export const metadata = {
  title: "Gallery - Precious Memories",
  description: "Explore our photography gallery",
};

async function getGalleryItems() {
  const response = await fetch(BASE_URL + "/api/gallery");
  const data = await response.json();
  console.log("Gallery response:", data);
  return data;
}

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 text-center mb-8 md:mb-12">
            Our Gallery
          </h1>
          <GalleryGrid initialItems={galleryItems} />
        </div>
      </main>
    </div>
  );
}
