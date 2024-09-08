import ExperienceTimeline from "../components/ExperienceTimeline";
import SkillsSection from "../components/SkillsSection";

export const metadata = {
  title: "Experience & Skills - Precious Memories",
  description: "Our photography experience and skills",
};

export default function ExperiencePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 text-center mb-8 md:mb-12 animate-fadeIn">
            Experience & Skills
          </h1>
          <ExperienceTimeline />
          <SkillsSection />
        </div>
      </main>
    </div>
  );
}
