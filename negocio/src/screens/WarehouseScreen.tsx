import React, { useState } from 'react';
import { Search, Package, CheckCircle, XCircle, Store } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { MoneyDisplay } from '../components/shared/MoneyDisplay';
import { Header } from '../components/Layout/Header';

interface Product {
  id: string;
  name: string;
  reference: string;
  size: string;
  cost: number;
  price: number;
  status: 'in-stock' | 'sold';
}

export default function WarehouseScreen() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Nike Air Jordan 1', reference: 'AJ1 Retro High', size: '42', cost: 480000, price: 1200000, status: 'in-stock' },
    { id: '2', name: 'Adidas Yeezy 350', reference: 'Yeezy 350 V2', size: '43', cost: 600000, price: 1500000, status: 'in-stock' },
    { id: '3', name: 'Nike Dunk Low', reference: 'Dunk Low Retro', size: '44', cost: 350000, price: 850000, status: 'sold' },
    { id: '4', name: 'Puma Suede', reference: 'Classic Suede', size: '41', cost: 200000, price: 500000, status: 'in-stock' },
    { id: '5', name: 'Converse Chuck Taylor', reference: 'All Star High', size: '42', cost: 180000, price: 450000, status: 'sold' },
  ]);

  // Filter products based on search and active tab
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'in-stock' && product.status === 'in-stock') ||
      (activeTab === 'sold' && product.status === 'sold');
    
    return matchesSearch && matchesTab;
  });

  const handleSell = (id: string) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, status: 'sold' } : product
    ));
  };

  const handleRestore = (id: string) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, status: 'in-stock' } : product
    ));
  };

  const stats = {
    total: products.length,
    inStock: products.filter(p => p.status === 'in-stock').length,
    sold: products.filter(p => p.status === 'sold').length,
  };

  return (
    <div className="p-6 space-y-6">
      <Header 
        title="Bodega" 
        subtitle="Gestión de inventario y ventas" 
      />

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            placeholder="Buscar productos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="in-stock">En Bodega</TabsTrigger>
            <TabsTrigger value="sold">Vendidos</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
          <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
          <div className="text-xs text-slate-500 mt-1">Total Productos</div>
        </div>
        <div className="bg-emerald-50 rounded-xl p-4 shadow-sm border border-emerald-100 text-center">
          <div className="text-2xl font-bold text-emerald-600">{stats.inStock}</div>
          <div className="text-xs text-emerald-700 mt-1">En Bodega</div>
        </div>
        <div className="bg-red-50 rounded-xl p-4 shadow-sm border border-red-100 text-center">
          <div className="text-2xl font-bold text-red-600">{stats.sold}</div>
          <div className="text-xs text-red-700 mt-1">Vendidos</div>
        </div>
      </div>

      {/* Product List */}
      <div className="space-y-3">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No se encontraron productos</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      product.status === 'in-stock' 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {product.status === 'in-stock' ? <Package className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{product.name}</h3>
                      <p className="text-sm text-slate-500">{product.reference} • Talla: {product.size}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <MoneyDisplay amount={product.price} size="lg" color="emerald" className="font-bold" />
                    <p className="text-xs text-slate-400 mt-1">
                      {product.status === 'in-stock' ? 'Disponible' : 'Vendido'}
                    </p>
                  </div>
                </div>
                
                <div className="bg-slate-50 px-4 py-3 flex items-center justify-between border-t border-slate-100">
                  <div className="flex gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">Costo</p>
                      <MoneyDisplay amount={product.cost} size="sm" color="default" />
                    </div>
                    <div>
                      <p className="text-slate-500">Margen</p>
                      <span className="text-emerald-600 font-medium">
                        {Math.round(((product.price - product.cost) / product.cost) * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  {product.status === 'in-stock' ? (
                    <Button 
                      onClick={() => handleSell(product.id)}
                      variant="secondary"
                      size="sm"
                    >
                      Vender
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleRestore(product.id)}
                      variant="outline"
                      size="sm"
                    >
                      Restaurar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}