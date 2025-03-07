'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
  logo: string;
}

const experiences: Experience[] = [
  {
    company: 'Ideas Revenue Solutions',
    role: 'Data Analyst Intern',
    period: 'May 2023 - Aug 2023',
    location: 'Ahmedabad, India',
    description: [
      'Developed and maintained ETL frameworks using Python and SQL to process 100K+ records daily, ensuring data accuracy and system reliability.',
      'Created interactive Power BI dashboards for revenue analysis, reducing report generation time by 60% and improving decision-making.',
      'Implemented data validation procedures and QA validation plans, reducing data errors by 40%.',
      'Collaborated with cross-functional teams to gather requirements and translate them into technical specifications.'
    ],
    skills: ['Python', 'SQL', 'Power BI', 'Excel', 'ETL', 'Data Analysis'],
    logo: '/assets/companies/ideas-revenue.png'
  },
  {
    company: 'RWTH International Academy',
    role: 'Data Analyst Intern',
    period: 'Jan 2023 - Apr 2023',
    location: 'Aachen, Germany',
    description: [
      'Led data analysis projects using Python and SQL to optimize student enrollment processes.',
      'Developed automated reporting systems that reduced manual work by 50%.',
      'Created visualization dashboards using Tableau for tracking key performance metrics.',
      'Collaborated with international teams to implement data-driven solutions.'
    ],
    skills: ['Python', 'SQL', 'Tableau', 'Data Analysis', 'Process Optimization'],
    logo: '/assets/companies/rwth.png'
  },
  {
    company: 'Volkswagen Group Technology Solutions',
    role: 'Data Analyst Intern',
    period: 'May 2022 - Dec 2022',
    location: 'Pune, India',
    description: [
      'Analyzed large datasets using SQL and Python to identify process improvement opportunities.',
      'Built and maintained data pipelines for efficient data processing and analysis.',
      'Created comprehensive reports and dashboards for stakeholder communication.',
      'Participated in agile development processes and sprint planning.'
    ],
    skills: ['Python', 'SQL', 'Data Analysis', 'Agile', 'Process Optimization'],
    logo: '/assets/companies/volkswagen.png'
  }
];

export default function Career() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    tileRefs.current.forEach((tile) => {
      if (tile) observerRef.current?.observe(tile);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Career Journey
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Exploring my professional path through data analysis and engineering, where each role has contributed to my growth and expertise.
          </p>
        </div>

        {/* Experience Tiles */}
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <div
              key={exp.company}
              ref={(el) => (tileRefs.current[index] = el)}
              className="opacity-0 translate-y-10 transform transition-all duration-700 ease-out"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                <div className="grid md:grid-cols-3 gap-6 p-8">
                  {/* Left Column - Logo and Basic Info */}
                  <div className="flex flex-col items-center md:items-start space-y-4">
                    <div className="relative w-32 h-32 bg-white dark:bg-gray-700 rounded-lg p-4 flex items-center justify-center">
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {exp.company}
                      </h3>
                      <p className="text-primary font-medium">{exp.role}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {exp.period}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {exp.location}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column - Description */}
                  <div className="md:col-span-2">
                    <ul className="space-y-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-primary"></span>
                          <p className="ml-4 text-gray-600 dark:text-gray-300">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 