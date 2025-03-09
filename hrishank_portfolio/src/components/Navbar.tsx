'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  const handleResumeDownload = () => {
    // Logic to download resume
    window.open('/assets/resume.pdf', '_blank');
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-[#0F0F0F]/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className={styles.logo}>
            <Link 
              href="/" 
              className={`text-2xl font-bold transition-colors ${
                isScrolled 
                  ? 'text-gray-900 dark:text-white hover:text-primary' 
                  : 'text-gray-900 dark:text-white hover:text-primary backdrop-blur-sm bg-white/10 dark:bg-black/10 px-3 py-1 rounded-lg'
              }`}
              aria-label="Home"
            >
              HC
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <nav className="flex items-center space-x-8">
              {['About', 'Career', 'Projects', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative group ${
                    isActive(`/${item.toLowerCase()}`)
                      ? 'text-primary'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  aria-current={isActive(`/${item.toLowerCase()}`) ? 'page' : undefined}
                >
                  {item}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${
                      isActive(`/${item.toLowerCase()}`) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                    aria-hidden="true"
                  ></span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side - Resume & Theme Toggle */}
          <div className="flex items-center space-x-4">
            <Link
              href="/resume"
              className="hidden sm:inline-flex items-center px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white dark:text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105"
              onClick={handleResumeDownload}
              aria-label="Download Resume"
            >
              Resume
            </Link>
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden bg-white dark:bg-[#0F0F0F] border-t border-gray-200 dark:border-gray-800"
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['About', 'Career', 'Projects', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(`/${item.toLowerCase()}`)
                    ? 'text-primary bg-gray-50 dark:bg-gray-800'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                aria-current={isActive(`/${item.toLowerCase()}`) ? 'page' : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link
              href="/resume"
              className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={(e) => {
                e.preventDefault();
                handleResumeDownload();
                setIsMobileMenuOpen(false);
              }}
              aria-label="Download Resume"
            >
              Resume
            </Link>
          </div>
        </div>
      )}
    </header>
  );
} 