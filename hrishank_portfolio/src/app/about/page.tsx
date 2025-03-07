'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface Skill {
  name: string;
  icon: string;
  category: string;
}

const skills: Skill[] = [
  // Technical Skills
  { name: 'Python', icon: '/icons/python.svg', category: 'Programming Languages' },
  { name: 'SQL', icon: '/icons/sql.svg', category: 'Programming Languages' },
  { name: 'Java', icon: '/icons/java.svg', category: 'Programming Languages' },
  { name: 'JavaScript', icon: '/icons/javascript.svg', category: 'Programming Languages' },
  
  // Data Analysis Tools
  { name: 'Power BI', icon: '/icons/powerbi.svg', category: 'Data Analysis' },
  { name: 'Tableau', icon: '/icons/tableau.svg', category: 'Data Analysis' },
  { name: 'Excel', icon: '/icons/excel.svg', category: 'Data Analysis' },
  { name: 'R', icon: '/icons/r.svg', category: 'Data Analysis' },
  
  // Databases
  { name: 'MySQL', icon: '/icons/mysql.svg', category: 'Databases' },
  { name: 'MongoDB', icon: '/icons/mongodb.svg', category: 'Databases' },
  { name: 'PostgreSQL', icon: '/icons/postgresql.svg', category: 'Databases' },
  
  // Cloud & Tools
  { name: 'AWS', icon: '/icons/aws.svg', category: 'Cloud & Tools' },
  { name: 'Git', icon: '/icons/git.svg', category: 'Cloud & Tools' },
  { name: 'Docker', icon: '/icons/docker.svg', category: 'Cloud & Tools' },
];

const education = [
  {
    school: 'University of Southern California',
    degree: 'Master of Engineering Management',
    period: '2023 - 2025',
    location: 'Los Angeles, CA',
    description: 'Focusing on Data Analytics and Business Intelligence'
  },
  {
    school: 'Gujarat Technological University',
    degree: 'Bachelor of Technology in Computer Engineering',
    period: '2019 - 2023',
    location: 'Ahmedabad, India',
    description: 'Specialized in Data Structures, Algorithms, and Software Development'
  }
];

export default function About() {
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
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
        rootMargin: '-50px',
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F0F0F] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Summary Section */}
        <section ref={(el) => (sectionRefs.current[0] = el)} className="mb-20 opacity-0 translate-y-10 transition-all duration-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-primary pb-2">
            About Me
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-gray-700 dark:text-gray-300">
              Data Analyst Intern (USC MEM '25) with 1 year of hands-on experience in data management, process optimization, and cross-functional collaboration. Proficient in SQL, Python, and data visualization tools to develop data-driven solutions that enhance business performance.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              My passion lies in transforming complex data into actionable insights that drive business decisions. I specialize in developing scalable data solutions and creating intuitive visualizations that tell compelling stories.
            </p>
          </div>
        </section>

        {/* Education Section */}
        <section ref={(el) => (sectionRefs.current[1] = el)} className="mb-20 opacity-0 translate-y-10 transition-all duration-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-primary pb-2">
            Education
          </h2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{edu.school}</h3>
                    <p className="text-primary font-medium">{edu.degree}</p>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <p className="text-gray-600 dark:text-gray-400">{edu.period}</p>
                    <p className="text-gray-600 dark:text-gray-400">{edu.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section ref={(el) => (sectionRefs.current[2] = el)} className="opacity-0 translate-y-10 transition-all duration-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-primary pb-2">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skillsByCategory).map(([category, items]) => (
              <div 
                key={category} 
                className="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 capitalize">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <div 
                      key={skill.name} 
                      className="flex items-center bg-gray-100 dark:bg-[#2A2A2A] px-3 py-1 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300"
                    >
                      <div className="w-5 h-5 relative mr-2 flex items-center justify-center text-primary">
                        <span className="text-xs font-bold">{skill.name.substring(0, 2).toUpperCase()}</span>
                      </div>
                      <span className="text-sm text-gray-800 dark:text-gray-200">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 