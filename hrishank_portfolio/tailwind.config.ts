import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B1DD8C',
        dark: {
          bg: '#1a1a1a',
          card: '#2a2a2a',
          text: '#ffffff',
        },
        light: {
          bg: '#ffffff',
          card: '#f5f5f5',
          text: '#1a1a1a',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'gradient-x': 'gradient-x 8s ease infinite',
        'breathing': 'breathing 8s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
            'background-image': 'linear-gradient(45deg, #64B5F6, #81C784, #FFB74D, #FFF176, #ffffff)',
          },
          '25%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
            'background-image': 'linear-gradient(45deg, #ffffff, #64B5F6, #81C784, #FFB74D, #FFF176)',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
            'background-image': 'linear-gradient(45deg, #FFF176, #ffffff, #64B5F6, #81C784, #FFB74D)',
          },
          '75%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
            'background-image': 'linear-gradient(45deg, #FFB74D, #FFF176, #ffffff, #64B5F6, #81C784)',
          }
        },
        'breathing': {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '0.9',
          },
          '50%': {
            transform: 'scale(1.05)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config; 