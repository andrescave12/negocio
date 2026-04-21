import React, { useState } from 'react';
import { Calculator, Percent, DollarSign } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { MoneyDisplay } from '../components/shared/MoneyDisplay';
import { Header } from '../components/Layout/Header';

interface QuickQuoteResult {
  totalCost: number;
  wholesale: number;
  retail: number;
}

interface QuickQuoteScreenProps {
  onNavigate: (tab: string) => void;
}

export default function QuickQuoteScreen({ onNavigate }: QuickQuoteScreenProps) {
  const [usdValue, setUsdValue] = useState<string>('');
  const [taxPercentage, setTaxPercentage] = useState<string>('');
  const [result, setResult] = useState<QuickQuoteResult | null>(null);

  const calculateQuote = () => {
    const usd = parseFloat(usdValue) || 0;
    const tax = parseFloat(taxPercentage) || 0;
    const trm = 4000; // Fixed TRM
    
    const totalCost = (usd * trm) * (1 + tax / 100);
    const wholesale = totalCost * 1.3;
    const retail = totalCost * 1.5;
    
    setResult({ totalCost, wholesale, retail });
  };

  return (
    <div className="p-6 space-y-6">
      <Header 
        title="Cotizador Rápido" 
        subtitle="Calcula costos y precios en tiempo real" 
      />

      <Card className="shadow-[0_6px_6px_-1px_rgba(0,0,0,0.05)]">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">Valor en USD</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="number"
                placeholder="0.00"
                className="pl-10 rounded-2xl text-lg"
                value={usdValue}
                onChange={(e) => setUsdValue(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">Impuestos (%)</Label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="number"
                placeholder="0"
                className="pl-10 rounded-2xl text-lg w-24"
                value={taxPercentage}
                onChange={(e) => setTaxPercentage(e.target.value)}
              />
            </div>
          </div>

          <Button
            className="w-full bg-slate-900 text-white rounded-2xl py-4 text-lg font-semibold"
            onClick={calculateQuote}
          >
            CALCULAR
          </Button>

          {result && (
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800">Resultados</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span className="text-slate-600">Costo Total</span>
                  <MoneyDisplay amount={result.totalCost} />
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span className="text-slate-600">Precio Mayorista</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    <MoneyDisplay amount={result.wholesale} />
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Precio Detal</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    <MoneyDisplay amount={result.retail} />
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <Button 
          variant="outline" 
          fullWidth 
          onClick={() => onNavigate('home')}
        >
          ← Inicio
        </Button>
        <Button 
          variant="outline" 
          fullWidth 
          onClick={() => onNavigate('lot')}
        >
          Siguiente: Lotes →
        </Button>
      </div>
    </div>
  );
}