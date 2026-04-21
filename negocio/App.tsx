import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Products from './Products';
import Invoices from './Invoices';
import Expenses from './Expenses';
import Reports from './Reports';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: '🏠 Dashboard', icon: 'home' },
    { path: '/products', label: '📦 Productos', icon: 'products' },
    { path: '/invoices', label: '📋 Facturas', icon: 'invoices' },
    { path: '/expenses', label: '💰 Gastos', icon: 'expenses' },
    { path: '/reports', label: '📊 Reportes', icon: 'reports' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white p-6 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">💼 Contabilidad</h1>
        <p className="text-sm text-gray-400 mt-1">Gestión de Ventas</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-3 rounded transition ${
              isActive(item.path)
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-12 pt-6 border-t border-gray-700">
        <div className="text-xs text-gray-500 space-y-2">
          <p>📱 App Contable v1.0</p>
          <p>🔗 Backend: localhost:3000</p>
        </div>
      </div>
    </aside>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">🏠 Dashboard Principal</h1>

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Productos" value="--" icon="📦" color="blue" />
        <StatCard label="Facturas" value="--" icon="📋" color="green" />
        <StatCard label="Gastos" value="--" icon="💰" color="red" />
        <StatCard label="Utilidad" value="--" icon="📊" color="purple" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-4">📝 Últimas Facturas</h2>
          <p className="text-gray-500 text-center py-8">
            Navega a Facturas para registrar nuevas ventas
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-4">🎯 Gestión Rápida</h2>
          <div className="space-y-2">
            <Link
              to="/products"
              className="block px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
            >
              + Agregar Producto
            </Link>
            <Link
              to="/invoices"
              className="block px-4 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100"
            >
              + Crear Factura
            </Link>
            <Link
              to="/expenses"
              className="block px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
            >
              + Registrar Gasto
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-4">ℹ️ Bienvenida</h2>
        <div className="text-gray-600 space-y-2">
          <p>
            Bienvenido a tu aplicación de gestión contable y de ventas. Aquí puedes:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>📦 Administrar el catálogo de productos con costos y precios</li>
            <li>📋 Crear facturas aplicando márgenes de ganancia flexibles</li>
            <li>💰 Registrar gastos y categorías contables</li>
            <li>📊 Generar reportes de ventas, márgenes y utilidades</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: string;
  color: string;
}) {
  const colors = {
    blue: 'from-blue-50 to-blue-100 text-blue-600',
    green: 'from-green-50 to-green-100 text-green-600',
    red: 'from-red-50 to-red-100 text-red-600',
    purple: 'from-purple-50 to-purple-100 text-purple-600',
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color as keyof typeof colors]} p-6 rounded shadow`}>
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

export default App;
