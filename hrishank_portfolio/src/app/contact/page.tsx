'use client';

import { useState, useEffect, useRef } from 'react';

// Interface for form data
interface FormData {
  name: string;
  email: string;
  message: string;
}

// Interface for social links
interface SocialLink {
  name: string;
  url: string;
  icon: JSX.Element;
}

export default function Contact() {
  // Form state management
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  
  // Refs for animation
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe form and info sections
    if (formRef.current) observer.observe(formRef.current);
    if (infoRef.current) observer.observe(infoRef.current);

    return () => observer.disconnect();
  }, []);

  // Form event handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  // Social media links configuration
  const socialLinks: SocialLink[] = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/hrishankk/',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Hrishank07',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-primary/5 dark:from-[#0F0F0F] dark:via-[#0F0F0F] dark:to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Get in Touch
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form Section */}
          <div 
            ref={formRef}
            className="bg-gradient-to-b from-transparent via-white/50 to-primary/5 dark:via-[#1A1A1A]/50 dark:to-primary/5 rounded-2xl p-4 opacity-0 translate-y-10 transition-all duration-700"
          >
            <div className="bg-white/50 dark:bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-primary/10 h-full">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
                Send Me a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-white focus:ring-primary focus:border-primary transition-colors duration-300"
                  />
                </div>
                
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-white focus:ring-primary focus:border-primary transition-colors duration-300"
                  />
                </div>
                
                {/* Message Input */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-white focus:ring-primary focus:border-primary transition-colors duration-300"
                  />
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-6 rounded-md font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
          
          {/* Contact Information Section */}
          <div 
            ref={infoRef}
            className="bg-gradient-to-b from-transparent via-white/50 to-primary/5 dark:via-[#1A1A1A]/50 dark:to-primary/5 rounded-2xl p-4 opacity-0 translate-y-10 transition-all duration-700 delay-200"
          >
            <div className="bg-white/50 dark:bg-[#1A1A1A]/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-primary/10 h-full flex items-center">
              <div className="flex flex-col items-center justify-center space-y-10 w-full">
                {/* Email Section */}
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="h-14 w-14 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary transform transition-transform duration-300 hover:scale-110">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
                  <a href="mailto:hchhatba@usc.edu" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300">
                    hchhatba@usc.edu
                  </a>
                </div>

                {/* Location Section */}
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="h-14 w-14 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary transform transition-transform duration-300 hover:scale-110">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Location</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Los Angeles, California
                  </p>
                </div>

                {/* Social Media Section */}
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="h-14 w-14 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary transform transition-transform duration-300 hover:scale-110">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connect</h3>
                  <div className="flex justify-center space-x-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-all duration-300 transform hover:scale-110"
                        aria-label={link.name}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 