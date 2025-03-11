'use client';

import { useEffect, useRef } from 'react';
import ProjectCard from '../../components/ProjectCard';

/**
 * Projects Page Component
 * 
 * This page displays a collection of projects with a "Coming Soon" message.
 * In future versions, this will be populated with actual projects.
 */
export default function Projects() {
  const projectRefs = useRef([]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-primary/5 dark:from-[#0F0F0F] dark:via-[#0F0F0F] dark:to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          My Projects
        </h1>
        
        {/* Coming Soon Message */}
        <div className="bg-gradient-to-b from-transparent via-white/50 to-primary/5 dark:via-[#1A1A1A]/50 dark:to-primary/5 rounded-xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 animate-pulse">
            Coming Soon
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            I'm currently working on adding my portfolio projects. Check back soon to see my latest work!
          </p>
        </div>
      </div>
    </div>
  );
} 