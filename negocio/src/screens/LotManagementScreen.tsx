import React, { useState } from 'react';
import { Plus, Trash2, Package, DollarSign, Truck, Plane, CreditCard } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { MoneyDisplay } from '../components/shared/MoneyDisplay';
import { Header } from '../components/Layout/Header';

interface Expense {
  id: string;
  name: string;
  amount: number;
}

interface Product {
  id: string;
  brand: string;
  reference: string;
  size: string;
  cost: number;
}

interface LotManagementScreenProps {
  onNavigate: (tab: string) => void;
}

export default function LotManagementScreen({ onNavigate }: LotManagementScreenProps) {
  const [tripName, setTripName] = useState<string>('');
  const [trm, setTrm] = useState<string>('4000');
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', name: 'Tiquetes', amount: 500000 },
    { id: '2', name: 'Envíos', amount: 800000 },
  ]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    brand: '',
    reference: '',
    size: '',
    cost: 0,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('lot');

  const addExpense = () => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      name: `Gasto ${expenses.length + 1}`,
      amount: 0,
    };
    setExpenses([...expenses, newExpense]);
  };

  const updateExpense = (id: string, amount: number) => {
    setExpenses(expenses.map(exp => 
      exp.id === id ? { ...exp, amount } : exp
    ));
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const addProduct = () => {
    if (newProduct.brand && newProduct.cost) {
      const product: Product = {
        id: Date.now().toString(),
        brand: newProduct.brand || '',
        reference: newProduct.reference || '',
        size: newProduct.size || '',
        cost: newProduct.cost || 0,
      };
      setProducts([...products, product]);
      setNewProduct({ brand: '', reference: '', size: '', cost: 0 });
    }
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalProductCost = products.reduce((sum, prod) => sum + prod.cost, 0);
  const totalInvestment = (totalProductCost * parseFloat(trm)) + totalExpenses;

  const expenseIcons = {
    'Tiquetes': <Plane className="w-4 h-4 text-blue-500" />,
    'Envíos': <Truck className="w-4 h-4 text-orange-500" />,
    'Gasto 1': <CreditCard className="w-4 h-4 text-purple-500" />,
  };

  return (
    <div className="p-6 space-y-6">
      <Header 
        title="Gestión de Lote" 
        subtitle="Control de inversiones y artículos" 
      />

      {/* Trip Info */}
      <Card className="shadow-[0_6px_6px_-1px_rgba(0,0,0,0.05)]">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">Nombre del Viaje</Label>
            <Input
              placeholder="Ej: Viaje Miami - Junio 2024"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">TRM Actual</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="number"
                className="pl-10 rounded-2xl"
                value={trm}
                onChange={(e) => setTrm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expenses */}
      <Card className="shadow-[0_6px_6px_-1px_rgba(0,0,0,0.05)]">
        <CardHeader>
          <CardTitle className="text-lg">Gastos Operativos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                {expenseIcons[expense.name] || <CreditCard className="w-4 h-4 text-slate-400" />}
                <div>
                  <p className="font-medium text-slate-800">{expense.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  className="w-24 text-right rounded-lg"
                  value={expense.amount}
                  onChange={(e) => updateExpense(expense.id, parseFloat(e.target.value) || 0)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExpense(expense.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full border-dashed border-slate-300 text-slate-600 hover:bg-slate-50"
            onClick={addExpense}
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Gasto
          </Button>
        </CardContent>
      </Card>

      {/* Add Product */}
      <Card className="shadow-[0_6px_6px_-1px_rgba(0,0,0,0.05)]">
        <CardHeader>
          <CardTitle className="text-lg">Agregar Artículo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Marca</Label>
              <Input
                placeholder="Nike"
                value={newProduct.brand}
                onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Referencia</Label>
              <Input
                placeholder="AJ1 Retro"
                value={newProduct.reference}
                onChange={(e) => setNewProduct({ ...newProduct, reference: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Talla</Label>
              <Input
                placeholder="42"
                value={newProduct.size}
                onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Costo (USD)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="number"
                  className="pl-10 rounded-xl"
                  placeholder="0.00"
                  value={newProduct.cost || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, cost: parseFloat(e.target.value) })}
                />
              </div>
            </div>
          </div>
          <Button
            className="w-full bg-slate-900 text-white rounded-xl py-3"
            onClick={addProduct}
          >
            Guardar Artículo
          </Button>
        </CardContent>
      </Card>

      {/* Products List */}
      {products.length > 0 && (
        <Card className="shadow-[0_6px_6px_-1px_rgba(0,0,0,0.05)]">
          <CardHeader>
            <CardTitle className="text-lg">Artículos ({products.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-xl border border-slate-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-slate-800">{product.brand}</p>
                    <p className="text-sm text-slate-500">{product.reference} - Talla: {product.size}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Costo</p>
                    <p className="font-medium text-slate-800">
                      <MoneyDisplay amount={product.cost} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Total Investment */}
      <div className="bg-slate-900 text-white p-4 rounded-3xl shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-300">Inversión Total</span>
          <span className="text-lg font-semibold">
            <MoneyDisplay amount={totalInvestment} />
          </span>
        </div>
        <div className="flex justify-between text-sm text-slate-400">
          <span>Productos: {products.length}</span>
          <span>Gastos: {expenses.length}</span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <Button 
          variant="outline" 
          fullWidth 
          onClick={() => onNavigate('quote')}
        >
          ← Anterior: Cotizador
        </Button>
        <Button 
          variant="outline" 
          fullWidth 
          onClick={() => onNavigate('warehouse')}
        >
          Siguiente: Bodega →
        </Button>
      </div>
    </div>
  );
}