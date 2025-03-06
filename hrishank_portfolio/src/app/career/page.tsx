'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TechSkill {
  name: string;
  icon: string;
}

interface CompanyExperience {
  company: string;
  role: string;
  date: string;
  location: string;
  description: string[];
  techSkills: TechSkill[];
}

export default function Career() {
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  const experiences: CompanyExperience[] = [
    {
      company: '10x15 Revenue Solutions',
      role: 'Data Science Intern - Business Process Analyst',
      date: 'Jan 2023 - Aug 2023',
      location: 'India',
      description: [
        'Collaborated with cross-functional U.S. teams to develop data-driven pricing models for 3-star hotels, leveraging A/B testing, Python, SQL, and Scikit-learn, leading to a 20% improvement in pricing accuracy.',
        'Designed and implemented a data analytics framework using ETL pipelines with Hadoop and Spark, reducing manual intervention by 40%.',
        'Developed dynamic dashboards in Tableau and Excel, improving forecast accuracy by 25%.'
      ],
      techSkills: [
        { name: 'Python', icon: '/icons/python.svg' },
        { name: 'SQL', icon: '/icons/sql.svg' },
        { name: 'Tableau', icon: '/icons/tableau.svg' },
        { name: 'Excel', icon: '/icons/excel.svg' },
        { name: 'Hadoop', icon: '/icons/hadoop.svg' },
        { name: 'Spark', icon: '/icons/spark.svg' }
      ]
    },
    {
      company: 'RWTH International Academy',
      role: 'Data Analyst Intern - Research and Predictive Analytics',
      date: 'Sep 2022 - Dec 2022',
      location: 'India',
      description: [
        'Analyzed sensor and telematic data from logistics trucks using Python, SQL, and Scikit-learn, reducing delivery time variance by 15%.',
        'Built predictive time series models optimizing delivery routes, improving reliability by 10%.',
        'Automated real-time dashboards in Tableau, improving fleet management by 20%.'
      ],
      techSkills: [
        { name: 'Python', icon: '/icons/python.svg' },
        { name: 'SQL', icon: '/icons/sql.svg' },
        { name: 'Tableau', icon: '/icons/tableau.svg' },
        { name: 'TensorFlow', icon: '/icons/tensorflow.svg' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-light-text dark:text-dark-text mb-8 animate-fade-in">
          Career Journey
        </h1>
        
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className={`bg-light-card dark:bg-dark-card rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
                expandedCompany === exp.company ? 'transform scale-102' : ''
              }`}
            >
              <button
                className="w-full text-left p-6"
                onClick={() => setExpandedCompany(expandedCompany === exp.company ? null : exp.company)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
                      {exp.company}
                    </h3>
                    <p className="text-primary font-medium mt-1">{exp.role}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {exp.date} • {exp.location}
                    </p>
                  </div>
                  <svg
                    className={`w-6 h-6 transform transition-transform ${
                      expandedCompany === exp.company ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.techSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full"
                    >
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={16}
                        height={16}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </button>

              {expandedCompany === exp.company && (
                <div className="px-6 pb-6 animate-fade-in">
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <ul className="space-y-3">
                      {exp.description.map((desc, index) => (
                        <li
                          key={index}
                          className="flex items-start text-gray-600 dark:text-gray-400"
                        >
                          <span className="mr-2">•</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 