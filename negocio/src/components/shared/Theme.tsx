import React from 'react';

// Theme variables are defined in Tailwind config
// This file serves as a reference for the design system

export const theme = {
  colors: {
    primary: 'bg-slate-900',
    primaryText: 'text-slate-900',
    success: 'bg-emerald-500',
    successText: 'text-emerald-600',
    danger: 'bg-red-500',
    dangerText: 'text-red-600',
    background: 'bg-slate-50',
    card: 'bg-white',
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    heading: 'font-bold',
    body: 'font-medium',
  },
  spacing: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
  },
  borderRadius: {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
  },
};

export default theme;