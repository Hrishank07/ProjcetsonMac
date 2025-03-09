'use client';

import React, { useState, useEffect } from 'react';
import styles from './GridAnimation.module.css';

const GridAnimation = () => {
  const [squares, setSquares] = useState<Array<{ x: number; y: number; color: string; delay: number }>>([]);

  useEffect(() => {
    const colors = [
      '88, 172, 255',    // Bright Blue
      '255, 88, 172',    // Pink
      '172, 255, 88',    // Lime
      '255, 172, 88',    // Orange
      '172, 88, 255',    // Purple
      '88, 255, 172',    // Mint
    ];

    const generateSquares = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const padding = 100; // Padding from the edges

      return Array.from({ length: 50 }, (_, i) => ({
        x: padding + Math.random() * (windowWidth - padding * 2),
        y: padding + Math.random() * (windowHeight - padding * 2),
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 5 // Random delay for animations
      }));
    };

    const handleResize = () => {
      setSquares(generateSquares());
    };

    setSquares(generateSquares());
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.wrap}>
      {squares.map((square, i) => (
        <div
          key={i}
          className={styles.square}
          style={{
            left: `${square.x}px`,
            top: `${square.y}px`,
            '--color': square.color,
            animationDelay: `${square.delay}s`
          } as React.CSSProperties}
        >
          <div className={styles.inner} />
        </div>
      ))}
    </div>
  );
};

export default GridAnimation; 