'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

/**
 * Navbar Component
 * 
 * Responsive navigation bar that changes appearance on scroll.
 * Features:
 * - Logo/home link
 * - Navigation links
 * - Resume download button
 * - Theme toggle
 * - Mobile menu with animations
 */
export default function Navbar() {
  // State for scroll detection and mobile menu
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Effect to handle scroll events
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

  // Helper function to determine active link
  const isActive = (path: string) => pathname === path;

  // Handler for resume download
  const handleResumeDownload = (e?: React.MouseEvent) => {
    e?.preventDefault(); // Prevent default link behavior
    const link = document.createElement('a');
    link.href = '/assets/HrishankC_Resume.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-[#0F0F0F]/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Home Link */}
          <div className={styles.logo}>
            <Link 
              href="/" 
              className="hover:text-primary"
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
            {/* Resume Button */}
            <Link
              href="/resume"
              className="hidden sm:inline-flex items-center px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white dark:text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105"
              onClick={handleResumeDownload}
              aria-label="Download Resume"
            >
              Resume
            </Link>
            
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle mobile menu"
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-6">
                <span
                  className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                  }`}
                ></span>
                <span
                  className={`absolute h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'w-0 opacity-0' : 'w-6 opacity-100'
                  }`}
                ></span>
                <span
                  className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className={`px-4 pt-2 pb-4 space-y-1 bg-white/90 dark:bg-[#0F0F0F]/90 backdrop-blur-md ${styles.mobileNav}`}>
          {['About', 'Career', 'Projects', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className={`block px-4 py-3 text-base font-medium rounded-md transition-all duration-300 ${
                isActive(`/${item.toLowerCase()}`)
                  ? 'text-primary bg-primary/10'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-current={isActive(`/${item.toLowerCase()}`) ? 'page' : undefined}
            >
              {item}
            </Link>
          ))}
          <Link
            href="/resume"
            className="block px-4 py-3 text-base font-medium text-primary hover:bg-primary/10 rounded-md transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              handleResumeDownload();
              setIsMobileMenuOpen(false);
            }}
          >
            Resume
          </Link>
        </div>
      </div>
    </header>
  );
} 