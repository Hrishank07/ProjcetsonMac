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
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-primary/5 dark:from-[#0F0F0F] dark:via-[#0F0F0F] dark:to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Career Journey
        </h1>
        
        <div className="relative bg-gradient-to-b from-transparent via-white/50 to-primary/5 dark:via-[#1A1A1A]/50 dark:to-primary/5 rounded-xl p-6">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary/30 dark:bg-primary/20"></div>
          
          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <div 
                key={index}
                ref={(el) => {
                  tileRefs.current[index] = el;
                }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                } opacity-0 translate-y-10 transition-all duration-700`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white dark:border-[#0F0F0F] z-10"></div>
                
                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                  <div className="bg-white/50 dark:bg-[#1A1A1A]/50 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-primary/10">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{experience.role}</h3>
                        <p className="text-primary font-medium">{experience.company}</p>
                      </div>
                      <div className="h-12 w-12 relative flex items-center justify-center bg-gray-100 dark:bg-[#2A2A2A] rounded-full">
                        <span className="text-lg font-bold text-primary">{experience.company.substring(0, 2).toUpperCase()}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{experience.period}</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{experience.location}</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                      {experience.description.map((responsibility, idx) => (
                        <li key={idx}>{responsibility}</li>
                      ))}
                    </ul>
                    {experience.skills && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {experience.skills.map((skill) => (
                            <span 
                              key={skill} 
                              className="px-3 py-1 text-xs bg-gray-100 dark:bg-[#2A2A2A] text-gray-700 dark:text-gray-300 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Empty space for the other side */}
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 