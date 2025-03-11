'use client';

import { useEffect, useRef } from 'react';
import ProjectCard from '../../components/ProjectCard';

const projects = [
  {
    title: 'Project 1',
    description: 'A full-stack web application built with React and Node.js.',
    imageUrl: '/project1.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    projectUrl: 'https://project1.com',
    githubUrl: 'https://github.com/yourusername/project1',
  },
  {
    title: 'Project 2',
    description: 'A responsive e-commerce platform with modern UI/UX.',
    imageUrl: '/project2.jpg',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    projectUrl: 'https://project2.com',
    githubUrl: 'https://github.com/yourusername/project2',
  },
  // Add more projects here
];

export default function Projects() {
  const projectRefs = useRef([]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-primary/5 dark:from-[#0F0F0F] dark:via-[#0F0F0F] dark:to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          My Projects
        </h1>
        
        <div className="bg-gradient-to-b from-transparent via-white/50 to-primary/5 dark:via-[#1A1A1A]/50 dark:to-primary/5 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.title}
                ref={(el) => {
                  projectRefs.current[index] = el;
                }}
                className="opacity-0 translate-y-10 transition-all duration-700"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 