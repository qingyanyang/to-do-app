import { emphasize } from '@mui/material';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      mobile: '375px',
      tablet: '768px',
      desktop: '1440px',
    },
    textColor: {
      primary: {
        DEFAULT: '#171717',
        hover: '#0a0a0a',
        invert: '#fff',
      },
      secondary: '#525252',
      tertiary: '#737373',
      brand: {
        DEFAULT: '#4338ca',
        hover: '#3730a3',
      },
      disabled: {
        DEFAULT: '#a3a3a3',
        icon: '#e6e6e6',
      },
      error: {
        DEFAULT: '#dc2626',
        emphasize: '#991b1b',
      },
      success: {
        DEFAULT: '#15803d',
        icon: '#10b981',
      },
      warning: {
        DEFAULT: '#a16207',
        icon: '#facc15',
      },
      neutral: '#525154',
    },
    backgroundColor: {
      primary: {
        DEFAULT: '#fff',
        inverted: '#0a0a0a',
        hover: '#fafafa',
        filled: '#171717',
      },
      secondary: {
        DEFAULT: '#e5e7eb',
        hover: '#d1d5db',
      },
      tertiary: '#fafafa',
      disabled: {
        DEFAULT: '#f5f5f5',
        emphasize: '#f3f4f6',
      },
      brand: {
        primary: {
          DEFAULT: '#4338ca',
          emphasize: '#3730a3',
        },
        subtle: '#eff1fc',
      },
      error: {
        DEFAULT: '#dc2626',
        emphasize: '#b91c1c',
        subtle: '#fef2f2',
      },
      success: {
        subtle: '#f0fdf4',
        icon: '#10b981',
      },
      neutral: {
        subtle: '#f9fafb',
      },
      warning: {
        subtle: '#fffbeb',
        icon: '#ca8a04',
      },
    },
    lineColor: {
      primary: '#e5e5e5',
      secondary: '#9ca3af',
      success: '#bbf7d0',
      brand: {
        solid: '#4f46e5',
        subtle: '#c7d2fe',
      },
      error: {
        subtle: '#fecaca',
      },
      warning: {
        subtle: '#fde68a',
      },
    },
    iconColor: {
      emphasize: '#404040',
      primary: {
        DEFAULT: '#a3a3a3',
        hover: '#737373',
      },
      brand: {
        DEFAULT: '#6366f1',
        background: '#eef2ff',
      },
      success: '#15803d',
      error: '#dc2626',
      warning: '#facc15',
    },
    formColor: {
      text: {
        title: '#404040',
        placeholder: '#737373',
        hint: '#737373',
        filled: '#171717',
        disabled: '#a3a3a3',
        error: '#dc2626',
      },
      background: '#fafafa',
      border: '#e5e5e5',
    },
    outlineColor: {
      brand: {
        DEFAULT: '#c7d2fe',
        light: '#eef2ff',
        emphasize: '#4338ca',
      },
    },
    borderColor: {
      primary: '#e5e5e5',
      secondary: '#9ca3af',
      success: '#bbf7d0',
      brand: {
        DEFAULT: '#c7d2fe',
        light: '#eef2ff',
        emphasize: '#4338ca',
      },
      transparent: 'transparent',
      error: '#fecaca',
      warning: '#fde68a',
      neutral: '#e5e5e5',
    },
    borderRadius: {
      none: '0',
      sm: '.125rem',
      DEFAULT: '.25rem',
      lg: '.5rem',
      full: '9999px',
    },
    extend: {
      aspectRatio: {
        '592/800': '592 / 800',
        '592/190': '592 / 190',
        '160/190': '160 / 190',
        '704/190': '704 / 190',
        '188/190': '188 / 190',
        '311/120': '311 / 120',
        '80/120': '80 / 120',
      },
      boxShadow: {
        DEFAULT:
          '0px 1px 2px 0 rgb(0 0 0 / 0.06), 0px 1px 3px 0 rgb(0 0 0 / 0.10)',
        toolTip:
          '0px 4px 6px -4px rgb(0 0 0 / 0.10), 0px 10px 15px -3px rgb(0 0 0 / 0.10)',
      },
      spacing: {
        '2px': '2px',
        '4px': '4px',
        '6px': '6px',
        '8px': '8px',
        '0.125em': '0.125em',
        '0.5em': '0.5em',
      },
      borderWidth: {
        primary: '1.5px',
      },
    },
  },
  plugins: [],
};
