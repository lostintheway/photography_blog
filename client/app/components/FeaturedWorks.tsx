import Image from "next/image";

type FeatureType = {
  id: number;
  title: string;
  image_url: string;
};

export default function FeaturedWorks() {
  const featuredWorks: FeatureType[] = [
    { id: 1, title: "Wedding Bliss", image_url: "/wedding.jpg" },
    { id: 2, title: "Family Portraits", image_url: "/family.jpg" },
    { id: 3, title: "Nature's Beauty", image_url: "/nature.jpg" },
  ];
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Works
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Explore some of our favorite captured moments
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredWorks.map((work) => (
            <div key={work.id} className="group relative">
              <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                <Image
                  src={work.image_url}
                  alt={work.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h3 className="mt-6 text-sm text-gray-500">
                <a href="#">
                  <span className="absolute inset-0"></span>
                  {work.title}
                </a>
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
