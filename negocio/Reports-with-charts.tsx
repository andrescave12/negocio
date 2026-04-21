import React, { useEffect, useState } from 'react';
import { reportAPI } from '../api';
import { ChartComponent } from './Chart';
import { ExportControl } from './ExportControl';

interface ReportData {
  period: { startDate?: string; endDate?: string };
  sales: { total: number; invoices: number };
  expenses: { total: number; count: number };
  profitAnalysis: {
    revenue: number;
    cost: number;
    gross_profit: number;
    margin_percent: number;
  };
  net_profit: number;
  sales_by_category: any[];
}

export const Reports: React.FC = () => {
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split('T')[0]
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  const fetchReport = async (start?: string, end?: string) => {
    try {
      const response = await reportAPI.getReports(start, end);
      setReport(response.data.data);
    } catch (error) {
      console.error('Error fetching report:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport(startDate, endDate);
  }, []);

  const handleFilter = () => {
    fetchReport(startDate, endDate);
  };

  if (loading) return <div className="text-center py-8">Cargando reportes...</div>;

  const salesVsExpensesChart = {
    labels: ['Ventas', 'Gastos'],
    datasets: [
      {
        label: 'Monto',
        data: [
          report?.sales.total || 0,
          report?.expenses.total || 0,
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.6)',
          'rgba(239, 68, 68, 0.6)',
        ],
        borderColor: ['#22c55e', '#ef4444'],
        borderWidth: 1,
      },
    ],
  };

  const categoryChart = {
    labels: report?.sales_by_category.map((c: any) => c.category || 'Sin categoría') || [],
    datasets: [
      {
        label: 'Ventas por Categoría',
        data: report?.sales_by_category.map((c: any) => c.sales) || [],
        backgroundColor: [
          'rgba(59, 130, 246, 0.6)',
          'rgba(139, 92, 246, 0.6)',
          'rgba(236, 72, 153, 0.6)',
          'rgba(251, 146, 60, 0.6)',
          'rgba(34, 197, 94, 0.6)',
        ],
        borderColor: [
          '#3b82f6',
          '#8b5cf6',
          '#ec4899',
          '#fb923c',
          '#22c55e',
        ],
        borderWidth: 1,
      },
    ],
  };

  const profitChart = {
    labels: ['Ingresos', 'Costo', 'Ganancia Bruta'],
    datasets: [
      {
        label: 'Análisis de Ganancia',
        data: [
          report?.profitAnalysis.revenue || 0,
          report?.profitAnalysis.cost || 0,
          report?.profitAnalysis.gross_profit || 0,
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.6)',
          'rgba(239, 68, 68, 0.6)',
          'rgba(59, 130, 246, 0.6)',
        ],
        borderColor: ['#22c55e', '#ef4444', '#3b82f6'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">📊 Reportes Contables</h1>
      </div>

      <div className="bg-white p-6 rounded shadow flex gap-4 items-end flex-wrap">
        <div>
          <label className="block text-sm font-semibold mb-2">Desde</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Hasta</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🔍 Filtrar
        </button>
        {report && <ExportControl startDate={startDate} endDate={endDate} />}
      </div>

      {report && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded shadow">
              <div className="text-sm text-gray-600 font-semibold">Total Ventas</div>
              <div className="text-3xl font-bold text-green-600">
                ${report.sales.total.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500 mt-2">{report.sales.invoices} facturas</div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded shadow">
              <div className="text-sm text-gray-600 font-semibold">Total Gastos</div>
              <div className="text-3xl font-bold text-red-600">
                ${report.expenses.total.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500 mt-2">{report.expenses.count} registros</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded shadow">
              <div className="text-sm text-gray-600 font-semibold">Margen Bruto</div>
              <div className="text-3xl font-bold text-blue-600">
                {report.profitAnalysis.margin_percent.toFixed(2)}%
              </div>
              <div className="text-xs text-gray-500 mt-2">
                ${report.profitAnalysis.gross_profit.toFixed(2)}
              </div>
            </div>

            <div
              className={`bg-gradient-to-br ${
                report.net_profit >= 0
                  ? 'from-purple-50 to-purple-100'
                  : 'from-yellow-50 to-yellow-100'
              } p-6 rounded shadow`}
            >
              <div className="text-sm text-gray-600 font-semibold">Utilidad Neta</div>
              <div
                className={`text-3xl font-bold ${
                  report.net_profit >= 0 ? 'text-purple-600' : 'text-yellow-600'
                }`}
              >
                ${report.net_profit.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {((report.net_profit / report.sales.total) * 100).toFixed(2)}% del total
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-6">
            <ChartComponent
              type="bar"
              data={salesVsExpensesChart}
              title="Ventas vs Gastos"
            />
            <ChartComponent
              type="bar"
              data={profitChart}
              title="Análisis de Ganancia"
            />
          </div>

          <div>
            <ChartComponent
              type="bar"
              data={categoryChart}
              title="Ventas por Categoría"
            />
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-2 gap-6">
            {/* Profit Analysis */}
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-bold mb-4">Análisis de Ganancia</h3>
              <div className="space-y-3">
                <div className="flex justify-between pb-3 border-b">
                  <span className="text-gray-600">Ingresos</span>
                  <span className="font-bold">${report.profitAnalysis.revenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pb-3 border-b">
                  <span className="text-gray-600">Costo de Ventas</span>
                  <span className="font-bold text-red-600">
                    -${report.profitAnalysis.cost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pb-3 border-b bg-green-50 p-2 rounded">
                  <span className="text-gray-600 font-semibold">Ganancia Bruta</span>
                  <span className="font-bold text-green-600">
                    ${report.profitAnalysis.gross_profit.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t bg-red-50 p-2 rounded">
                  <span className="text-gray-600 font-semibold">Gastos Operacionales</span>
                  <span className="font-bold text-red-600">
                    -${report.expenses.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t bg-purple-100 p-2 rounded">
                  <span className="text-gray-700 font-bold">UTILIDAD NETA</span>
                  <span
                    className={`font-bold text-lg ${
                      report.net_profit >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    ${report.net_profit.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Sales by Category */}
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-bold mb-4">Ventas por Categoría</h3>
              <div className="space-y-2">
                {report.sales_by_category.length > 0 ? (
                  report.sales_by_category.map((cat: any, index: number) => (
                    <div key={index} className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <div className="font-semibold">{cat.category || 'Sin categoría'}</div>
                        <div className="text-xs text-gray-500">{cat.units} unidades</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${cat.sales.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">
                          {((cat.sales / report.sales.total) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-4">Sin datos</div>
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-bold mb-4">Resumen del Período</h3>
            <div className="text-sm text-gray-600">
              {startDate && endDate && (
                <p>
                  Período: {startDate} al {endDate}
                </p>
              )}
              <p className="mt-2">
                Este período has generado <strong>${report.sales.total.toFixed(2)}</strong> en
                ventas con <strong>{report.sales.invoices}</strong> facturas registradas.
              </p>
              <p className="mt-2">
                Los gastos totalizaron <strong>${report.expenses.total.toFixed(2)}</strong>,
                resultando en una utilidad neta de{' '}
                <strong
                  className={report.net_profit >= 0 ? 'text-green-600' : 'text-red-600'}
                >
                  ${report.net_profit.toFixed(2)}
                </strong>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
