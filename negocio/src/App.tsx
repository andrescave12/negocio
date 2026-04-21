import React, { useState } from 'react';
import { Home, Calculator, Package, Store } from 'lucide-react';
import QuickQuoteScreen from './screens/QuickQuoteScreen';
import LotManagementScreen from './screens/LotManagementScreen';
import WarehouseScreen from './screens/WarehouseScreen';

type Tab = 'home' | 'quote' | 'lot' | 'warehouse';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'quote':
        return <QuickQuoteScreen onNavigate={setActiveTab} />;
      case 'lot':
        return <LotManagementScreen onNavigate={setActiveTab} />;
      case 'warehouse':
        return <WarehouseScreen onNavigate={setActiveTab} />;
      default:
        return <HomeScreen onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 rounded-lg p-1.5">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              ImportManager
            </h1>
          </div>
          <div className="bg-slate-100 px-3 py-1 rounded-full text-sm font-medium text-slate-700">
            {activeTab === 'home' ? 'Inicio' : 
             activeTab === 'quote' ? 'Cotizador' : 
             activeTab === 'lot' ? 'Lotes' : 'Bodega'}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>

        {/* Bottom Navigation - Shows on all pages */}
        <nav className="bg-white border-t border-slate-200 px-6 py-3 pb-safe z-20">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                activeTab === 'home' 
                  ? 'bg-slate-100 text-slate-900' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <Home className={`w-6 h-6 ${activeTab === 'home' ? 'fill-current' : ''}`} />
              <span className="text-xs font-medium">Inicio</span>
            </button>
            <button
              onClick={() => setActiveTab('quote')}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                activeTab === 'quote' 
                  ? 'bg-slate-100 text-slate-900' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <Calculator className={`w-6 h-6 ${activeTab === 'quote' ? 'fill-current' : ''}`} />
              <span className="text-xs font-medium">Cotizar</span>
            </button>
            <button
              onClick={() => setActiveTab('lot')}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                activeTab === 'lot' 
                  ? 'bg-slate-100 text-slate-900' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <Package className={`w-6 h-6 ${activeTab === 'lot' ? 'fill-current' : ''}`} />
              <span className="text-xs font-medium">Lotes</span>
            </button>
            <button
              onClick={() => setActiveTab('warehouse')}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                activeTab === 'warehouse' 
                  ? 'bg-slate-100 text-slate-900' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <Store className={`w-6 h-6 ${activeTab === 'warehouse' ? 'fill-current' : ''}`} />
              <span className="text-xs font-medium">Bodega</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

// Home Screen Component
function HomeScreen({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] p-6">
      <div className="bg-white rounded-3xl shadow-sm p-8 max-w-md w-full text-center">
        <div className="bg-slate-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <Package className="w-10 h-10 text-slate-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Gestión de Inventario y Costos
        </h2>
        <p className="text-slate-600 mb-8">
          Seleccione una opción del menú inferior para comenzar a gestionar sus importaciones, cotizaciones y inventario.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('quote')}
            className="bg-emerald-50 p-4 rounded-xl hover:bg-emerald-100 transition-colors"
          >
            <Calculator className="w-8 h-8 text-emerald-600 mb-2 mx-auto" />
            <h3 className="font-semibold text-slate-900">Cotizador</h3>
            <p className="text-sm text-slate-600 mt-1">Calcula costos en tiempo real</p>
          </button>
          <button
            onClick={() => onNavigate('lot')}
            className="bg-amber-50 p-4 rounded-xl hover:bg-amber-100 transition-colors"
          >
            <Package className="w-8 h-8 text-amber-600 mb-2 mx-auto" />
            <h3 className="font-semibold text-slate-900">Lotes</h3>
            <p className="text-sm text-slate-600 mt-1">Gestión de inversiones</p>
          </button>
          <button
            onClick={() => onNavigate('warehouse')}
            className="bg-blue-50 p-4 rounded-xl hover:bg-blue-100 transition-colors"
          >
            <Store className="w-8 h-8 text-blue-600 mb-2 mx-auto" />
            <h3 className="font-semibold text-slate-900">Bodega</h3>
            <p className="text-sm text-slate-600 mt-1">Inventario y ventas</p>
          </button>
        </div>
      </div>
    </div>
  );
}