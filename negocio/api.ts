import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product API
export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id: number) => api.get(`/products/${id}`),
  create: (data: any) => api.post('/products', data),
  update: (id: number, data: any) => api.put(`/products/${id}`, data),
  delete: (id: number) => api.delete(`/products/${id}`),
};

// Invoice API
export const invoiceAPI = {
  getAll: (startDate?: string, endDate?: string) => 
    api.get('/invoices', { params: { startDate, endDate } }),
  getById: (id: number) => api.get(`/invoices/${id}`),
  create: (data: any) => api.post('/invoices', data),
  delete: (id: number) => api.delete(`/invoices/${id}`),
};

// Expense API
export const expenseAPI = {
  getAll: (category?: string, startDate?: string, endDate?: string) =>
    api.get('/expenses', { params: { category, startDate, endDate } }),
  getById: (id: number) => api.get(`/expenses/${id}`),
  create: (data: any) => api.post('/expenses', data),
  update: (id: number, data: any) => api.put(`/expenses/${id}`, data),
  delete: (id: number) => api.delete(`/expenses/${id}`),
  getSummary: (startDate?: string, endDate?: string) =>
    api.get('/expenses/summary', { params: { startDate, endDate } }),
};

// Report API
export const reportAPI = {
  getReports: (startDate?: string, endDate?: string) =>
    api.get('/reports', { params: { startDate, endDate } }),
};
