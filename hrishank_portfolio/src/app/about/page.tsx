'use client';

import { useEffect, useRef } from 'react';

// TODO: Add/update skill icons in the public/icons directory
interface Skill {
  name: string;
  icon: string;
  category: string;
}

// TODO: Update skills based on your current expertise
const skills: Skill[] = [
  // Programming Languages
  { name: 'Python', icon: '/icons/python.svg', category: 'Programming Languages' },
  { name: 'SQL', icon: '/icons/sql.svg', category: 'Programming Languages' },
  { name: 'JavaScript', icon: '/icons/javascript.svg', category: 'Programming Languages' },
  
  // Data Analysis Tools
  { name: 'Power BI', icon: '/icons/powerbi.svg', category: 'Data Analysis' },
  { name: 'Tableau', icon: '/icons/tableau.svg', category: 'Data Analysis' },
  { name: 'Excel', icon: '/icons/excel.svg', category: 'Data Analysis' },
  
  // Databases
  { name: 'MySQL', icon: '/icons/mysql.svg', category: 'Databases' },
  { name: 'PostgreSQL', icon: '/icons/postgresql.svg', category: 'Databases' },
  
  // Cloud & Tools
  { name: 'AWS', icon: '/icons/aws.svg', category: 'Cloud & Tools' },
  { name: 'Git', icon: '/icons/git.svg', category: 'Cloud & Tools' },
];

// TODO: Update education details
const education = [
  {
    school: 'University of Southern California',
    degree: 'Master of Engineering Management with a minor in Business Analytics',
    period: 'Jan 2024 - Dec 2025',
    location: 'Los Angeles, CA',
    gpa: '3.8/4.0',
    description: 'Relevant Courses: Statistics for Engineering Managers, Applied Time Series Analysis for Forecasting, Data Warehousing Business Intelligence and Data Mining, Designing Spreadsheet-Based Business Models, Driving Business Transformation with Gen-AI and ML'
  },
  {
    school: 'MIT World Peace University',
    degree: 'Bachelor of Technology in Computer Engineering',
    period: 'Aug 2019 - Aug 2023',
    location: 'Pune, India',
    gpa: '3.7/4.0',
    description: 'Relevant Courses: Data Structures, Algorithms, Introduction to Python, Object Oriented Programming, Computer Networks, Operating Systems, Database Management Systems, Natural Language Processing, Pattern Recognition, and Machine Learning'
  }
];

export default function About() {
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Refs for scroll animations
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  // Intersection Observer for scroll animations
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
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-primary/5 dark:from-[#0F0F0F] dark:via-[#0F0F0F] dark:to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* TODO: Update About Me section with your current bio */}
        <section 
          ref={el => {
            if (el) sectionRefs.current[0] = el;
          }}
          className="mb-20 opacity-0 translate-y-10 transition-all duration-700 bg-gradient-to-b from-transparent via-white/50 to-primary/5 dark:via-[#1A1A1A]/50 dark:to-primary/5 rounded-xl p-6"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-primary pb-2">
            About Me
          </h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-gray-700 dark:text-gray-200">
            I'm a current student and a soon-to-be graduate from USC's Master of Science in Engineering Management program, with a minor in Business Analytics. My journey in data began with a strong foundation in Electrical and Electronic Engineering, and over the past year, I've honed my skills in data management, process optimization, and cross-functional collaboration. I'm passionate about transforming raw data into actionable insights that drive business performance and foster innovation. </p>
            <p className="text-gray-700 dark:text-gray-200">
            Throughout my internships at leading organizations, I've had the opportunity to collaborate with diverse teams across the U.S. and India. From developing data-driven pricing models that improved accuracy by 20% to designing scalable analytics frameworks that reduced manual intervention by 40%, I thrive on solving complex challenges. I combine technical expertise using tools like SQL, Python, and advanced data visualization with a strategic mindset to create solutions that make a tangible impact.
            </p>
            <p className="text-gray-700 dark:text-gray-200">
            Beyond my technical work, I am a proactive learner and a natural leader. I've led project teams in high-stakes environments, whether it's streamlining operational workflows or negotiating key partnerships. These experiences have taught me the value of clear communication, creative problem solving, and continuous growth.
            </p>
            <p className="text-gray-700 dark:text-gray-200">
            I'm excited about the future of data analytics and am dedicated to leveraging my skills to help businesses and organizations make informed, data-driven decisions. Thank you for taking the time to get to know me. I look forward to connecting and exploring new opportunities to create meaningful impact.
            </p>
          </div>
        </section>

        {/* Education Section */}
        <section 
          ref={el => {
            if (el) sectionRefs.current[1] = el;
          }}
          className="mb-20 opacity-0 translate-y-10 transition-all duration-700 bg-gradient-to-b from-transparent via-white/50 to-primary/5 dark:via-[#1A1A1A]/50 dark:to-primary/5 rounded-xl p-6"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-primary pb-2">
            Education
          </h2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div 
                key={index} 
                className="bg-white/50 dark:bg-[#1A1A1A]/50 backdrop-blur-sm rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-primary/10"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{edu.school}</h3>
                    <p className="text-primary font-medium">{edu.degree}</p>
                    <div className="mt-2 inline-block bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full">
                      <p className="text-sm text-primary font-semibold">GPA: {edu.gpa}</p>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <p className="text-gray-600 dark:text-gray-400">{edu.period}</p>
                    <p className="text-gray-600 dark:text-gray-400">{edu.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section 
          ref={el => {
            if (el) sectionRefs.current[2] = el;
          }}
          className="opacity-0 translate-y-10 transition-all duration-700 bg-gradient-to-b from-transparent via-white/50 to-primary/5 dark:via-[#1A1A1A]/50 dark:to-primary/5 rounded-xl p-6"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-primary pb-2">
            Core Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skillsByCategory).map(([category, items]) => (
              <div 
                key={category} 
                className="bg-white/50 dark:bg-[#1A1A1A]/50 backdrop-blur-sm rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-primary/10"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 capitalize">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <div 
                      key={skill.name} 
                      className="flex items-center bg-white/80 dark:bg-[#2A2A2A]/80 px-3 py-1.5 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 border border-primary/5"
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