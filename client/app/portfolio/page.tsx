import { BASE_URL } from "@/constants/constants";
import PortfolioGrid from "../components/PortfolioGrid";

export const metadata = {
  title: "Portfolio - Precious Memories",
  description: "Explore our photography portfolio",
};

async function getPortfolioItems() {
  // Simulated API call
  const response = await fetch(BASE_URL + "/api/portfolios");
  const data = await response.json();
  console.log("Portfolio response:", data);
  return data;
}

export default async function PortfolioPage() {
  const portfolioItems = await getPortfolioItems();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 text-center mb-8 md:mb-12">
            Our Portfolio
          </h1>
          <PortfolioGrid initialItems={portfolioItems} />
        </div>
      </main>
    </div>
  );
}
