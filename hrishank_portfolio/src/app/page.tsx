'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from '../components/ProjectCard';

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

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const skills = {
    languages: [
      { name: 'Python', icon: '/icons/python.svg' },
      { name: 'SQL', icon: '/icons/sql.svg' },
      { name: 'Java', icon: '/icons/java.svg' },
      { name: 'HTML', icon: '/icons/html.svg' },
      { name: 'CSS', icon: '/icons/css.svg' },
      { name: 'JavaScript', icon: '/icons/javascript.svg' },
    ],
    technologies: [
      { name: 'Git', icon: '/icons/git.svg' },
      { name: 'PyTorch', icon: '/icons/pytorch.svg' },
      { name: 'TensorFlow', icon: '/icons/tensorflow.svg' },
      { name: 'Django', icon: '/icons/django.svg' },
      { name: 'Node.js', icon: '/icons/nodejs.svg' },
      { name: 'React.js', icon: '/icons/react.svg' },
      { name: 'Docker', icon: '/icons/docker.svg' },
      { name: 'AWS', icon: '/icons/aws.svg' },
    ],
    databases: [
      { name: 'MySQL', icon: '/icons/mysql.svg' },
      { name: 'MongoDB', icon: '/icons/mongodb.svg' },
      { name: 'Neo4j', icon: '/icons/neo4j.svg' },
      { name: 'DynamoDB', icon: '/icons/dynamodb.svg' },
    ]
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-light-text dark:text-dark-text mb-4 animate-fade-in">
            Hi, I'm Hrishank Chhatbar
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            [Your one-line description will go here]
          </p>
          <button
            onClick={() => aboutRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity animate-fade-in"
            style={{ animationDelay: '400ms' }}
          >
            Learn More
          </button>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <h2 className="text-4xl font-bold text-light-text dark:text-dark-text mb-6">
              About Me
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Data Analyst Intern (USC MEM '25) with 1 year of hands-on experience in data management, process optimization, and cross-functional collaboration. Proficient in SQL, Python, and data visualization tools to develop data-driven solutions that enhance business performance.
            </p>
          </div>
          <div className="relative h-[400px] animate-slide-up" style={{ animationDelay: '200ms' }}>
            {/* Add your photo here */}
            <div className="bg-gray-200 dark:bg-gray-700 w-full h-full rounded-lg" />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-20 px-4 bg-light-card dark:bg-dark-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-light-text dark:text-dark-text mb-12 text-center animate-fade-in">
            Skills & Expertise
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, items], index) => (
              <div
                key={category}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4 capitalize">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill) => (
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section ref={contactRef} className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-light-text dark:text-dark-text mb-6 animate-fade-in">
            Get in Touch!
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            I'm always open to new opportunities and collaborations.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity animate-fade-in"
            style={{ animationDelay: '400ms' }}
          >
            Contact Me
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12 animate-fade-in">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <div
              key={project.title}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
