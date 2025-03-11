'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * AnimatedBackground Component
 * 
 * Creates a canvas-based animated background with particles and connecting lines.
 * Optimized for performance with reduced animation during scrolling.
 */
export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    
    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setCanvasDimensions();
        // Recreate particles on resize to prevent visual glitches
        particlesRef.current = createParticles(40);
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; // Smaller particles
        this.speedX = Math.random() * 1 - 0.5; // Slower movement
        this.speedY = Math.random() * 1 - 0.5; // Slower movement
        
        // Use our primary color with varying opacity
        const opacity = Math.random() * 0.3 + 0.1; // Lower opacity
        this.color = `rgba(177, 221, 140, ${opacity})`;
      }

      update() {
        // Slower updates during scrolling
        const speed = isScrolling ? 0.3 : 1;
        
        this.x += this.speedX * speed;
        this.y += this.speedY * speed;

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles - use fewer particles for better performance
    const createParticles = (count: number) => {
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
      return particles;
    };

    // Initial particle count
    particlesRef.current = createParticles(40);

    // Connect particles with lines if they're close enough
    function connectParticles(particles: Particle[]) {
      // Reduce connection distance during scrolling
      const maxDistance = isScrolling ? 60 : 80;
      
      // Only connect every other particle for better performance
      const step = isScrolling ? 3 : 2;
      
      for (let i = 0; i < particles.length; i += step) {
        // Only check a limited number of neighbors
        const limit = Math.min(i + 8, particles.length);
        
        for (let j = i + 1; j < limit; j += step) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            // Opacity based on distance
            const opacity = (1 - distance / maxDistance) * (isScrolling ? 0.05 : 0.15);
            ctx.strokeStyle = `rgba(177, 221, 140, ${opacity})`;
            ctx.lineWidth = 0.5; // Thinner lines
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // Animation loop with performance optimizations
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      
      // Always update and draw particles, but with reduced operations during scrolling
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      
      // Always connect particles, but with reduced intensity during scrolling
      connectParticles(particles);
      
      animationRef.current = requestAnimationFrame(animate);
    }

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Scroll event handler with throttling
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
      }
      
      // Clear previous timeout
      clearTimeout(scrollTimeout);
      
      // Set a timeout to stop "isScrolling" after scrolling ends
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    };

    // Add scroll event listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Clean up
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      clearTimeout(resizeTimeout);
    };
  }, [isScrolling]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full opacity-20 pointer-events-none optimize-gpu"
      style={{ zIndex: -1 }}
    />
  );
} 