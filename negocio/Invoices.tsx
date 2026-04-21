import React, { useEffect, useState } from 'react';
import { invoiceAPI, productAPI } from '../api';

interface InvoiceForm {
  invoice_number: string;
  date: string;
  items: InvoiceItem[];
  notes: string;
}

interface InvoiceItem {
  product_id: number;
  quantity: number;
  unit_price: number;
  margin_percent: number;
}

interface Product {
  id: number;
  code: string;
  name: string;
  base_price: number;
  cost: number;
}

const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<InvoiceForm>({
    invoice_number: '',
    date: new Date().toISOString().split('T')[0],
    items: [{ product_id: 0, quantity: 1, unit_price: 0, margin_percent: 20 }],
    notes: '',
  });

  const fetchInvoices = async () => {
    try {
      const response = await invoiceAPI.getAll();
      setInvoices(response.data.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchInvoices();
    fetchProducts();
  }, []);

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product_id: 0, quantity: 1, unit_price: 0, margin_percent: 20 }],
    });
  };

  const handleUpdateItem = (index: number, field: string, value: any) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setFormData({ ...formData, items: updatedItems });
  };

  const handleRemoveItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const calculateSubtotal = (item: InvoiceItem): number => {
    const baseSubtotal = item.quantity * item.unit_price;
    return baseSubtotal * (1 + item.margin_percent / 100);
  };

  const calculateTotal = (): number => {
    return formData.items.reduce((sum, item) => sum + calculateSubtotal(item), 0);
  };

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const invoiceData = {
        ...formData,
        items: formData.items.map((item) => ({
          ...item,
          subtotal: calculateSubtotal(item),
        })),
      };
      await invoiceAPI.create(invoiceData);
      setFormData({
        invoice_number: '',
        date: new Date().toISOString().split('T')[0],
        items: [{ product_id: 0, quantity: 1, unit_price: 0, margin_percent: 20 }],
        notes: '',
      });
      setShowForm(false);
      fetchInvoices();
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  const handleDeleteInvoice = async (id: number) => {
    if (window.confirm('¿Eliminar factura?')) {
      try {
        await invoiceAPI.delete(id);
        fetchInvoices();
      } catch (error) {
        console.error('Error deleting invoice:', error);
      }
    }
  };

  if (loading) return <div className="text-center py-8">Cargando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">📋 Facturas</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'Cancelar' : '+ Nueva Factura'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreateInvoice} className="bg-white p-6 rounded shadow space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="# Factura"
              value={formData.invoice_number}
              onChange={(e) => setFormData({ ...formData, invoice_number: e.target.value })}
              required
              className="border p-2 rounded"
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Notas (opcional)"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="border p-2 rounded"
            />
          </div>

          <div className="space-y-3 border-t pt-4">
            <div className="text-sm font-semibold">Productos:</div>
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-6 gap-2 items-end">
                <select
                  value={item.product_id}
                  onChange={(e) => handleUpdateItem(index, 'product_id', parseInt(e.target.value))}
                  required
                  className="border p-2 rounded col-span-2"
                >
                  <option value="">Seleccionar</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.code} - {p.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Cantidad"
                  value={item.quantity}
                  onChange={(e) => handleUpdateItem(index, 'quantity', parseInt(e.target.value))}
                  required
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Precio"
                  step="0.01"
                  value={item.unit_price}
                  onChange={(e) => handleUpdateItem(index, 'unit_price', parseFloat(e.target.value))}
                  required
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Margen %"
                  value={item.margin_percent}
                  onChange={(e) => handleUpdateItem(index, 'margin_percent', parseFloat(e.target.value))}
                  required
                  className="border p-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddItem}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            + Agregar Producto
          </button>

          <div className="text-right text-lg font-bold bg-gray-100 p-3 rounded">
            Total: ${calculateTotal().toFixed(2)}
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
          >
            Crear Factura
          </button>
        </form>
      )}

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left"># Factura</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-mono font-bold">{invoice.invoice_number}</td>
                <td className="px-4 py-3">{invoice.date}</td>
                <td className="px-4 py-3 text-right font-bold">${parseFloat(invoice.total).toFixed(2)}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleDeleteInvoice(invoice.id)}
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

export default Invoices;
