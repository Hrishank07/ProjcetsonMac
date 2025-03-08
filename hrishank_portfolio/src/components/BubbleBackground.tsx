'use client';

import React, { useMemo } from 'react';
import styles from './BubbleBackground.module.css';

const BubbleBackground: React.FC = () => {
  const bubbles = useMemo(() => {
    return Array.from({ length: 15 }, (_, index) => ({
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      time: Math.random() * 2 + 2,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className={styles.bubbleBackground}>
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          className={styles.bubble}
          style={{
            width: `${bubble.size}rem`,
            height: `${bubble.size}rem`,
            left: `${bubble.left}%`,
            animationDuration: `${bubble.time}s`,
            animationDelay: `-${bubble.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default BubbleBackground; 