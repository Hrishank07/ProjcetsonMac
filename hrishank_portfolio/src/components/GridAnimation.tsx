/**
 * GridAnimation Component
 * 
 * A dynamic grid-based animation component that creates an interactive background
 * with animated squares. The squares are positioned in a grid layout and respond
 * to theme changes and window resizing.
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import styles from './GridAnimation.module.css';

/**
 * Square interface defining the properties of each animated square
 */
interface Square {
  x: number;      // X position of the square
  y: number;      // Y position of the square
  color: string;  // RGB color value
  delay: number;  // Animation delay in seconds
}

const GridAnimation = () => {
  // State to store the array of squares with their properties
  const [squares, setSquares] = useState<Square[]>([]);
  // State to track if component is mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  /**
   * Generates an array of squares with calculated positions and properties
   * based on the window size and current theme.
   * 
   * @returns Array of Square objects with position, color, and animation delay
   */
  const generateSquares = useCallback(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return [];
    
    // Color palettes for different themes
    const darkColors = [
      '88, 172, 255',    // Bright Blue
      '255, 88, 172',    // Pink
      '172, 255, 88',    // Lime
      '255, 172, 88',    // Orange
      '172, 88, 255',    // Purple
      '88, 255, 172',    // Mint
    ];

    const lightColors = [
      '100, 100, 100',   // Grey
      '220, 60, 60',     // Red
      '60, 180, 60',     // Green
      '60, 60, 180',     // Blue
      '180, 60, 180',    // Purple
      '60, 180, 180',    // Teal
    ];

    const colors = theme === 'dark' ? darkColors : lightColors;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const padding = 50;
    
    // Calculate number of squares based on window size
    const numSquares = Math.min(40, Math.floor((windowWidth * windowHeight) / 50000));

    // Calculate grid dimensions
    const gridCols = Math.ceil(Math.sqrt(numSquares));
    const gridRows = Math.ceil(numSquares / gridCols);
    const cellWidth = (windowWidth - padding * 2) / gridCols;
    const cellHeight = (windowHeight - padding * 2) / gridRows;

    return Array.from({ length: numSquares }, (_, i) => {
      const col = i % gridCols;
      const row = Math.floor(i / gridCols);
      const baseX = padding + col * cellWidth;
      const baseY = padding + row * cellHeight;
      
      // Add random offset within cell boundaries
      const x = baseX + (Math.random() - 0.5) * cellWidth * 0.8;
      const y = baseY + (Math.random() - 0.5) * cellHeight * 0.8;

      return {
        x: Math.max(padding, Math.min(windowWidth - padding, x)),
        y: Math.max(padding, Math.min(windowHeight - padding, y)),
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 5
      };
    });
  }, [theme]);

  /**
   * Effect to handle initial mounting - prevents hydration errors
   */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  /**
   * Effect to handle window resizing and initial square generation
   */
  useEffect(() => {
    if (!isMounted) return;
    
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSquares(generateSquares());
      }, 200);
    };

    setSquares(generateSquares());
    window.addEventListener('resize', handleResize);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [generateSquares, isMounted]);

  /**
   * Effect to regenerate squares when theme changes
   */
  useEffect(() => {
    if (!isMounted) return;
    setSquares(generateSquares());
  }, [theme, generateSquares, isMounted]);

  // Don't render anything during SSR to prevent hydration errors
  if (!isMounted) {
    return <div className={styles.wrap}></div>;
  }

  return (
    <div className={`${styles.wrap} optimize-gpu`}>
      {squares.map((square, i) => (
        <div
          key={i}
          className={`${styles.square} optimize-gpu`}
          style={{
            left: `${square.x}px`,
            top: `${square.y}px`,
            '--color': square.color,
            animationDelay: `${square.delay}s`,
            willChange: 'transform'
          } as React.CSSProperties}
        >
          <div className={styles.inner} />
        </div>
      ))}
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(GridAnimation); 