'use client';

import React, { useState, useEffect } from 'react';
import styles from './GridAnimation.module.css';

const GridAnimation: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className={styles.wrap}>
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className={styles.square}
          style={{
            '--index': i,
          } as React.CSSProperties}
        >
          <div className={styles.inner} />
        </div>
      ))}
    </div>
  );
};

export default GridAnimation; 