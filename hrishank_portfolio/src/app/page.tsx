'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from '../components/ProjectCard';
import AnimatedBackground from '../components/AnimatedBackground';

const featuredProjects = [
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

// Define skill categories
const skills = {
  "Languages": [
    { name: "Python", icon: "/icons/python.svg" },
    { name: "SQL", icon: "/icons/sql.svg" },
    { name: "Java", icon: "/icons/java.svg" },
    { name: "JavaScript", icon: "/icons/javascript.svg" },
    { name: "HTML", icon: "/icons/html.svg" },
    { name: "CSS", icon: "/icons/css.svg" },
  ],
  "Technologies": [
    { name: "React", icon: "/icons/react.svg" },
    { name: "Node.js", icon: "/icons/nodejs.svg" },
    { name: "Django", icon: "/icons/django.svg" },
    { name: "TensorFlow", icon: "/icons/tensorflow.svg" },
    { name: "PyTorch", icon: "/icons/pytorch.svg" },
    { name: "Git", icon: "/icons/git.svg" },
  ],
  "Databases": [
    { name: "MongoDB", icon: "/icons/mongodb.svg" },
    { name: "MySQL", icon: "/icons/mysql.svg" },
    { name: "Neo4j", icon: "/icons/neo4j.svg" },
    { name: "DynamoDB", icon: "/icons/dynamodb.svg" },
  ],
  "Core Competencies": [
    { name: "Data Analysis", icon: "/icons/chart.svg" },
    { name: "Machine Learning", icon: "/icons/brain.svg" },
    { name: "Data Visualization", icon: "/icons/chart-bar.svg" },
    { name: "Cloud Computing", icon: "/icons/aws.svg" },
    { name: "Docker", icon: "/icons/docker.svg" },
  ],
};

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

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

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F0F0F] overflow-x-hidden scroll-smooth">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative bg-white dark:bg-[#0F0F0F] snap-start">
        <AnimatedBackground />
        <div className="text-center max-w-4xl mx-auto z-10">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
            Hi, I'm Hrishank Chhatbar
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Data Analyst Intern (USC MEM '25) passionate about transforming data into actionable insights
          </p>
          <button
            onClick={() => aboutRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-all duration-300 animate-fade-in hover:shadow-lg transform hover:scale-105"
            style={{ animationDelay: '400ms' }}
          >
            Learn More
          </button>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg 
            className="w-6 h-6 text-gray-400 dark:text-gray-500 cursor-pointer" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            onClick={() => aboutRef.current?.scrollIntoView({ behavior: 'smooth' })}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section 
        ref={aboutRef} 
        className="min-h-screen flex items-center py-20 px-4 bg-white dark:bg-[#0F0F0F] snap-start"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                About Me
              </h2>
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Data Analyst Intern (USC MEM '25) with 1 year of hands-on experience in data management, process optimization, and cross-functional collaboration. Proficient in SQL, Python, and data visualization tools to develop data-driven solutions that enhance business performance.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  My passion lies in transforming complex data into actionable insights that drive business decisions. I specialize in developing scalable data solutions and creating intuitive visualizations that tell compelling stories.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/about"
                  className="inline-block bg-primary text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                >
                  Learn More About Me
                </Link>
                <Link
                  href="/career"
                  className="inline-block bg-transparent border-2 border-primary text-primary dark:text-white px-6 py-2 rounded-full font-medium hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                >
                  View My Career
                </Link>
              </div>
            </div>
            <div className="relative max-w-md mx-auto">
              <div className="aspect-square relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/10 dark:to-primary/5 animate-pulse"></div>
                <div className="absolute inset-4 rounded-full border-2 border-primary/30 dark:border-primary/20 transform rotate-45"></div>
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/50 to-primary/30 flex items-center justify-center text-white text-4xl font-bold">
                    HC
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        ref={skillsRef} 
        className="min-h-screen flex items-center py-20 px-4 bg-gray-50 dark:bg-[#111111] snap-start"
      >
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Skills & Expertise
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items], index) => (
              <div
                key={category}
                className="bg-white dark:bg-[#1A1A1A] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center relative inline-block">
                    {category}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/50"></span>
                  </h3>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {items.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center bg-gray-50 dark:bg-[#2A2A2A] px-4 py-2 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-300"
                    >
                      <div className="w-5 h-5 relative mr-2 flex items-center justify-center text-primary">
                        <span className="text-xs font-bold">{skill.name.substring(0, 2).toUpperCase()}</span>
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section 
        ref={projectsRef}
        className="min-h-screen flex items-center py-20 px-4 bg-white dark:bg-[#0F0F0F] snap-start"
      >
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <div
                key={project.title}
                className="opacity-0 translate-y-10 transition-all duration-700"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-block bg-primary text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        ref={contactRef} 
        className="min-h-screen flex items-center py-20 px-4 bg-gray-50 dark:bg-[#111111] snap-start"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Get in Touch!
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            I'm always open to new opportunities and collaborations.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </div>
  );
}
