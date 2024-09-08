"use client";

import { useInView } from "react-intersection-observer";

type ExperienceType = {
  year: string;
  title: string;
  company: string;
  description: string;
};

const experiences: ExperienceType[] = [
  {
    year: "2020-Present",
    title: "Lead Photographer",
    company: "Precious Memories",
    description:
      "Managing a team of photographers and overseeing all projects.",
  },
  {
    year: "2018-2020",
    title: "Wedding Photographer",
    company: "Love Captured Studios",
    description: "Specialized in wedding photography and event coverage.",
  },
  {
    year: "2015-2018",
    title: "Freelance Photographer",
    company: "Self-employed",
    description:
      "Worked on various photography projects across different genres.",
  },
];

export default function ExperienceTimeline() {
  return (
    <div className="flow-root mt-8 mb-12">
      <ul className="-mb-8">
        {experiences.map((experience, index) => (
          <TimelineItem key={index} experience={experience} index={index} />
        ))}
      </ul>
    </div>
  );
}

function TimelineItem({
  experience,
  index,
}: {
  experience: ExperienceType;
  index: number;
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <li ref={ref}>
      <div className="relative pb-8">
        {index !== experiences.length - 1 ? (
          <span
            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
            aria-hidden="true"
          />
        ) : null}
        <div
          className={`relative flex space-x-3 transition-all duration-500 ease-out ${
            inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <div>
            <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
              <svg
                className="h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {experience.title} at {experience.company}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {experience.description}
              </p>
            </div>
            <div className="text-right text-sm whitespace-nowrap text-gray-500">
              <time dateTime={experience.year}>{experience.year}</time>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
