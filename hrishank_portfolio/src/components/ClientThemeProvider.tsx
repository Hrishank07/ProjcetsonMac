'use client';

import { ThemeProvider } from 'next-themes';
import { useState, useEffect } from 'react';

/**
 * ClientThemeProvider Component
 * 
 * Wraps the application with next-themes ThemeProvider for theme switching functionality.
 * Includes a mounted check to prevent hydration errors by ensuring the component
 * only renders its children when running on the client side.
 */
export default function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // Set mounted to true on client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Render children without theme provider during SSR to prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="dark"
      enableSystem={false}
      storageKey="hrishank-portfolio-theme"
    >
      {children}
    </ThemeProvider>
  );
} 