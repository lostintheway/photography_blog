"use client";

import { useInView } from "react-intersection-observer";

type SkillsType = {
  name: string;
  level: number;
};

const skills: SkillsType[] = [
  { name: "Portrait Photography", level: 95 },
  { name: "Wedding Photography", level: 90 },
  { name: "Landscape Photography", level: 85 },
  { name: "Photo Editing", level: 80 },
  { name: "Studio Lighting", level: 75 },
];

export default function SkillsSection() {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Skills</h2>
      <div className="space-y-6">
        {skills.map((skill, index) => (
          <SkillBar key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
}

function SkillBar({ skill, index }: { skill: SkillsType; index: number }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
            {skill.name}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold inline-block text-blue-600">
            {skill.level}%
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
        <div
          style={{ width: inView ? `${skill.level}%` : "0%" }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-1000 ease-out"
        ></div>
      </div>
    </div>
  );
}
