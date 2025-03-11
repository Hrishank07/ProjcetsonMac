'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from '../components/ProjectCard';
import AnimatedBackground from '../components/AnimatedBackground';
import BubbleBackground from '../components/BubbleBackground';
import GridAnimation from '../components/GridAnimation';

/**
 * Featured Projects
 * 
 * This array will be populated with actual projects in future versions.
 * Currently marked as "Coming Soon" in the UI.
 */
const featuredProjects = [];

/**
 * Skills Categories
 * 
 * Organized collection of skills by category with their respective icons.
 */
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

/**
 * Home Page Component
 * 
 * The main landing page of the portfolio website featuring:
 * - Hero section with animated text
 * - About Me section with profile image
 * - Skills section showcasing technical expertise
 * - Projects section (coming soon)
 * - Contact information
 */
export default function Home() {
  // State to track if component is mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false);
  
  // Refs for scroll animations and section visibility
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  // Effect to handle initial mounting - prevents hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Effect for scroll animations - only runs on client
  useEffect(() => {
    if (!isMounted) return;
    
    // Use IntersectionObserver for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
            entry.target.classList.remove('translate-y-10');
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px 100px 0px' // Pre-load animations before they come into view
      }
    );

    // Observe all elements with animation classes
    document.querySelectorAll('.opacity-0').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [isMounted]);

  // Add an effect to optimize scrolling
  useEffect(() => {
    if (!isMounted) return;
    
    let scrollTimeout: NodeJS.Timeout;
    let isScrolling = false;
    
    const handleScroll = () => {
      // Set scrolling state
      if (!isScrolling) {
        document.body.classList.add('is-scrolling');
        isScrolling = true;
      }
      
      // Clear previous timeout
      clearTimeout(scrollTimeout);
      
      // Set a timeout to remove scrolling class with a delay
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
        isScrolling = false;
      }, 300); // Longer timeout for smoother transitions
    };
    
    // Add scroll event listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      document.body.classList.remove('is-scrolling');
    };
  }, [isMounted]);

  // Render a simple placeholder during SSR to prevent hydration issues
  if (!isMounted) {
    return <div className="min-h-screen bg-white dark:bg-[#0F0F0F]"></div>;
  }

  return (
    <main className="relative min-h-screen bg-white dark:bg-[#0F0F0F] overflow-hidden">
      {/* Grid Animation Background */}
      <div className="fixed inset-0 z-0">
        <GridAnimation />
      </div>
      
      <div className="relative z-10">
        {/* Hero Section - Main introduction with animated gradient text */}
        <section className="relative min-h-screen flex items-center justify-center px-4">
          <div className="text-center z-20 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold animate-fade-in relative group">
              <span className="bg-gradient-to-r from-[#64B5F6] via-[#81C784] to-[#FFB74D] bg-clip-text text-transparent animate-gradient-x animate-breathing inline-block">
                Hi, I&apos;m Hrishank Chhatbar
              </span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300 animate-fade-in-delay">
              Transforming complex data into clear, actionable insights that empower strategic decisions and fuel innovation.
            </p>
            <div className="mt-10">
              <button
                onClick={() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-lg font-medium text-white bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group w-44"
              >
                Learn More
                <svg
                  className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* About Me Section - Professional summary with profile image */}
        <section 
          ref={aboutRef}
          id="about" 
          className="relative py-20 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div>
                <h2 className="text-4xl font-bold mb-6">About Me</h2>
                <div className="space-y-4">
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Data Analyst Intern (USC MEM &apos;25) with 1 year of hands-on experience
                    in data management, process optimization, and cross-functional
                    collaboration. Proficient in SQL, Python, and data visualization tools to
                    develop data-driven solutions that enhance business performance.
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    My passion lies in transforming complex data into actionable insights
                    that drive business decisions. I specialize in developing scalable data
                    solutions and creating intuitive visualizations that tell compelling stories.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      href="/about"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-full text-lg font-medium text-white bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group w-44"
                    >
                      More
                      <svg
                        className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                    <Link
                      href="/career"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-full text-lg font-medium border-2 border-primary text-primary dark:text-white hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg w-44"
                    >
                      My Career
                    </Link>
                  </div>
                </div>
              </div>

              {/* Profile Image Container */}
              <div className="relative h-[600px] w-full rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 dark:to-[#0F0F0F]/10 z-10"></div>
                <Image
                  src="/Profile_Pic.jpeg"
                  alt="Hrishank Chhatbar"
                  fill
                  className="object-cover object-center rounded-2xl transition-all duration-500 hover:scale-105"
                  style={{ 
                    mixBlendMode: 'luminosity',
                    filter: 'contrast(1.1) brightness(0.9)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 dark:from-[#0F0F0F]/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section - Technical expertise organized by category */}
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

        {/* Featured Projects Section - Showcase of selected work (coming soon) */}
        <section 
          ref={projectsRef}
          className="min-h-screen flex items-center py-20 px-4 bg-white dark:bg-[#0F0F0F] snap-start"
        >
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Featured Projects
            </h2>
            
            {/* Coming Soon Message */}
            <div className="bg-gradient-to-b from-transparent via-white/50 to-primary/5 dark:via-[#1A1A1A]/50 dark:to-primary/5 rounded-xl p-12 text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 animate-pulse">
                Coming Soon
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                I'm currently working on adding my portfolio projects. Check back soon to see my latest work!
              </p>
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

        {/* Contact Section - Contact information and form */}
        <section
          ref={contactRef}
          id="contact"
          className="min-h-screen flex items-center justify-center py-20 px-4 bg-gray-50 dark:bg-[#111111] snap-start"
        >
          <div className="max-w-7xl mx-auto w-full text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Get In Touch
            </h2>
            
            {/* Contact Page Button */}
            <div className="flex justify-center mb-12">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-lg font-medium text-white bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group w-44"
              >
                Contact Me
                <svg
                  className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
