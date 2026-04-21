import express from 'express';
import * as productController from '../controllers/productController';
import * as invoiceController from '../controllers/invoiceController';
import * as expenseController from '../controllers/expenseController';
import * as reportController from '../controllers/reportController';

const router = express.Router();

// Products routes
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Invoices routes
router.get('/invoices', invoiceController.getInvoices);
router.get('/invoices/:id', invoiceController.getInvoiceById);
router.post('/invoices', invoiceController.createInvoice);
router.delete('/invoices/:id', invoiceController.deleteInvoice);

// Expenses routes
router.get('/expenses', expenseController.getExpenses);
router.get('/expenses/:id', expenseController.getExpenseById);
router.post('/expenses', expenseController.createExpense);
router.put('/expenses/:id', expenseController.updateExpense);
router.delete('/expenses/:id', expenseController.deleteExpense);
router.get('/expenses/summary', expenseController.getExpenseSummary);

// Reports routes
router.get('/reports', reportController.getReports);

export default router;
