import React, { useEffect, useState } from 'react';
import { expenseAPI } from '../api';

interface Expense {
  id: number;
  date: string;
  category: string;
  amount: number;
  description?: string;
}

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    amount: '',
    description: '',
  });

  const categories = ['Arriendo', 'Servicios', 'Materiales', 'Personal', 'Transporte', 'Otros'];

  const fetchExpenses = async () => {
    try {
      const response = await expenseAPI.getAll();
      setExpenses(response.data.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await expenseAPI.create({
        ...formData,
        amount: parseFloat(formData.amount),
      });
      setFormData({
        date: new Date().toISOString().split('T')[0],
        category: '',
        amount: '',
        description: '',
      });
      setShowForm(false);
      fetchExpenses();
    } catch (error) {
      console.error('Error creating expense:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Eliminar gasto?')) {
      try {
        await expenseAPI.delete(id);
        fetchExpenses();
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const expensesByCategory = categories.map((cat) => ({
    category: cat,
    amount: expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0),
  }));

  if (loading) return <div className="text-center py-8">Cargando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">💰 Gastos</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'Cancelar' : '+ Nuevo Gasto'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded shadow space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              className="border p-2 rounded"
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="border p-2 rounded"
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Monto"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
              className="border p-2 rounded"
            />
          </div>
          <textarea
            placeholder="Descripción (opcional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
          >
            Guardar Gasto
          </button>
        </form>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-red-50 p-6 rounded shadow">
          <div className="text-gray-600">Total Gastos</div>
          <div className="text-3xl font-bold text-red-600">${totalExpenses.toFixed(2)}</div>
        </div>
        <div className="bg-blue-50 p-6 rounded shadow">
          <div className="text-gray-600">Total Categorías</div>
          <div className="text-3xl font-bold text-blue-600">{expenses.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-bold mb-4">Gastos por Categoría</h3>
          <div className="space-y-2">
            {expensesByCategory.map((item) =>
              item.amount > 0 ? (
                <div key={item.category} className="flex justify-between items-center pb-2 border-b">
                  <span>{item.category}</span>
                  <span className="font-bold">${item.amount.toFixed(2)}</span>
                </div>
              ) : null
            )}
          </div>
        </div>

        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Fecha</th>
                <th className="px-4 py-3 text-left">Categoría</th>
                <th className="px-4 py-3 text-right">Monto</th>
              </tr>
            </thead>
            <tbody>
              {expenses.slice(0, 5).map((expense) => (
                <tr key={expense.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{expense.date}</td>
                  <td className="px-4 py-3 text-sm">{expense.category}</td>
                  <td className="px-4 py-3 text-right">${expense.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Fecha</th>
              <th className="px-4 py-3 text-left">Categoría</th>
              <th className="px-4 py-3 text-left">Descripción</th>
              <th className="px-4 py-3 text-right">Monto</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{expense.date}</td>
                <td className="px-4 py-3">{expense.category}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{expense.description || '-'}</td>
                <td className="px-4 py-3 text-right font-bold">${expense.amount.toFixed(2)}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expenses;
