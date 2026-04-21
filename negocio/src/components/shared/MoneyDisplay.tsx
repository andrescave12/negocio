import React from 'react';

interface MoneyDisplayProps {
  amount: number;
  currency?: 'USD' | 'COP';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: 'default' | 'emerald' | 'red' | 'blue';
}

export function MoneyDisplay({ 
  amount, 
  currency = 'COP', 
  size = 'md', 
  className = '',
  color = 'default'
}: MoneyDisplayProps) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency === 'USD' ? 'USD' : 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  const colorClasses = {
    default: 'text-slate-900',
    emerald: 'text-emerald-600',
    red: 'text-red-600',
    blue: 'text-blue-600',
  };

  return (
    <span className={`${sizeClasses[size]} ${colorClasses[color]} font-semibold ${className}`}>
      {formatAmount(amount)}
    </span>
  );
}