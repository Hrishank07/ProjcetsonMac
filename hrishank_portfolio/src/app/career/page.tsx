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
    company: 'IdeaS Revenue Solutions',
    role: 'Associate Software Engineer: G2 Casper Product',
    period: 'Jan 2023 - Aug 2023',
    location: 'Pune, India',
    description: [
      'Collaborated with the R&D team in the United States to develop optimized rates for 3-star hotels and resorts through the G2 Casper product, conducting A/B testing and performing ad hoc regressions to refine pricing parameters and enhance decision-making accuracy.',
      'Designed a robust big data collection and analytics framework using technologies like Hadoop and Spark, resulting in a 30% increase in actionable insights that directly informed rate optimization strategies for clients in the hospitality industry.',
      'Automated the ad hoc regression process and streamlined the comparison of Excel workbooks using Python scripts and Postman API calls, significantly reducing manual intervention and improving data processing efficiency by 40%.',
      'Created dynamic dashboards in Excel and Power BI, enhancing forecasting accuracy by 25% and facilitating a 20% reduction in planning cycle time, contributing to an estimated revenue growth of $80K.'
    ],
    skills: ['Python', 'SQL', 'Power BI', 'Excel', 'ETL', 'Data Analysis', 'Hadoop', 'ETL Pipeline', 'Big Data', 'Ad-hoc Regression', 'A/B Testing'],
    logo: '/assets/companies/ideas-revenue.png'
  },
  {
    company: 'RWTH International Academy',
    role: 'Data Analyst Intern',
    period: 'Oct 2022 - Dec 2022',
    location: 'Pune, India',
    description: [
      'Analyzed sensor and telematics data from logistics trucks using Python, SQL, and Scikit-learn for data extraction and processing, applying statistical testing to identify trends and outliers, which improved predictive analytics and reduced delivery time variance by 15%.',
      'Built predictive time series models using techniques (NAIVE and SNAIVE), optimizing delivery routes by factoring in traffic patterns, fuel efficiency, and driver relaxation schedules and implementing optimized routing strategies to improve service efficiency.',
      'Additionally, I designed data models to enhance logistics operations, increasing delivery efficiency by 25%, and developed custom Power BI dashboards to present real-time data to leadership, translating technical analysis into clear business recommendations.'
    ],
    skills: ['Python', 'SQL', 'Tableau', 'Power BI', 'Data Analysis', 'Process Optimization', 'Time Series Analysis', 'Forecasting', 'Data Modeling'],
    logo: '/assets/companies/rwth.png'
  },
  {
    company: 'Volkswagen Group Technology Solutions',
    role: 'Data Analyst Intern',
    period: 'Apr 2022 - Oct 2022',
    location: 'Pune, India',
    description: [
      'Developed and implemented automation packages using Python and Java to automate the extraction of critical data from foreign-language invoices, leveraging Azure Form Cognitive Services for OCR and Automation Anywhere 360 (AA360), increasing data accuracy and operational efficiency by 30%, which helped scale operations across multiple regions and improve overall business performance.',
      'Designed reusable components and standardized business logic fields within the AA360 platform, leveraging the Gradle development environment to streamline integration and deployment across teams, which reduced development time by 20%, improved team collaboration, and supported faster rollout of new business solutions to meet client needs.',
      'Enhanced data extraction capabilities by significantly reducing manual efforts, resulting in a 25% increase in productivity and improved operational workflows, ultimately leading to better resource allocation and cost savings for the organization.'
    ],
    skills: ['Python', 'SQL', 'Data Analysis', 'Agile', 'Process Optimization', 'Azure Form Cognitive Services', 'Automation Anywhere 360', 'Gradle', 'Data Extraction', 'Data Processing'],
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