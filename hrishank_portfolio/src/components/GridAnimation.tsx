'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import styles from './GridAnimation.module.css';

const GridAnimation = () => {
  const [squares, setSquares] = useState<Array<{ x: number; y: number; color: string; delay: number }>>([]);
  const { theme } = useTheme();

  const generateSquares = useCallback(() => {
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
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
    const padding = 100;
    const numSquares = Math.min(50, Math.floor((windowWidth * windowHeight) / 40000));

    return Array.from({ length: numSquares }, (_, i) => ({
      x: padding + Math.random() * (windowWidth - padding * 2),
      y: padding + Math.random() * (windowHeight - padding * 2),
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5
    }));
  }, [theme]);

  useEffect(() => {
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
  }, [generateSquares]);

  // Regenerate squares when theme changes
  useEffect(() => {
    setSquares(generateSquares());
  }, [theme, generateSquares]);

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

export default React.memo(GridAnimation); 