import { Request, Response } from 'express';
import pool from '../db';

export const getReports = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const dateFilter = startDate && endDate 
      ? `WHERE si.date BETWEEN '${startDate}' AND '${endDate}'`
      : '';

    // Total sales
    const salesResult = await pool.query(
      `SELECT SUM(total) as total_sales, COUNT(*) as invoice_count 
       FROM sales_invoices ${dateFilter.replace('si.', '')}`
    );

    // Total expenses
    const expensesResult = await pool.query(
      `SELECT SUM(amount) as total_expenses, COUNT(*) as expense_count 
       FROM expenses ${dateFilter.replace('si.', '')}`
    );

    // Sales by category
    const categoryResult = await pool.query(
      `SELECT p.category, SUM(si.subtotal) as sales, SUM(si.quantity) as units
       FROM sale_items si
       JOIN products p ON si.product_id = p.id
       ${dateFilter}
       GROUP BY p.category
       ORDER BY sales DESC`
    );

    // Profit margin analysis
    const marginResult = await pool.query(
      `SELECT 
         SUM(si.subtotal) as total_revenue,
         SUM(si.quantity * p.cost) as total_cost,
         (SUM(si.subtotal) - SUM(si.quantity * p.cost)) as gross_profit,
         ((SUM(si.subtotal) - SUM(si.quantity * p.cost)) / SUM(si.subtotal) * 100)::DECIMAL(5,2) as margin_percent
       FROM sale_items si
       JOIN products p ON si.product_id = p.id
       ${dateFilter}`
    );

    const sales = salesResult.rows[0] || { total_sales: 0, invoice_count: 0 };
    const expenses = expensesResult.rows[0] || { total_expenses: 0, expense_count: 0 };
    const margin = marginResult.rows[0] || {};

    const netProfit = (sales.total_sales || 0) - (expenses.total_expenses || 0);

    res.json({
      success: true,
      data: {
        period: { startDate, endDate },
        sales: {
          total: parseFloat(sales.total_sales) || 0,
          invoices: sales.invoice_count || 0,
        },
        expenses: {
          total: parseFloat(expenses.total_expenses) || 0,
          count: expenses.expense_count || 0,
        },
        profitAnalysis: {
          revenue: parseFloat(margin.total_revenue) || 0,
          cost: parseFloat(margin.total_cost) || 0,
          gross_profit: parseFloat(margin.gross_profit) || 0,
          margin_percent: parseFloat(margin.margin_percent) || 0,
        },
        net_profit: netProfit,
        sales_by_category: categoryResult.rows,
      },
    });
  } catch (error) {
    console.error('Error generating reports:', error);
    res.status(500).json({ success: false, error: 'Failed to generate reports' });
  }
};
