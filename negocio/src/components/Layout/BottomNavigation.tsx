import React from 'react';
import { Home, Calculator, Package, Store } from 'lucide-react';
import { Button } from '../ui/button';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', label: 'Inicio', icon: <Home className="w-5 h-5" /> },
    { id: 'quote', label: 'Cotizar', icon: <Calculator className="w-5 h-5" /> },
    { id: 'lot', label: 'Lotes', icon: <Package className="w-5 h-5" /> },
    { id: 'warehouse', label: 'Bodega', icon: <Store className="w-5 h-5" /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 pb-safe z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            className={`flex flex-col items-center gap-1 py-2 px-0 ${
              activeTab === tab.id ? 'text-slate-900' : 'text-slate-500'
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.icon}
            <span className="text-[10px] font-medium">{tab.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}