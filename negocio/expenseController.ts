import { Request, Response } from 'express';
import pool from '../db';

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const { category, startDate, endDate } = req.query;
    let query = 'SELECT * FROM expenses';
    const params: any[] = [];
    const conditions: string[] = [];

    if (category) {
      conditions.push(`category = $${params.length + 1}`);
      params.push(category);
    }

    if (startDate && endDate) {
      conditions.push(`date BETWEEN $${params.length + 1} AND $${params.length + 2}`);
      params.push(startDate, endDate);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY date DESC';

    const result = await pool.query(query, params);
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length,
    });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch expenses' });
  }
};

export const getExpenseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM expenses WHERE id = $1', [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Expense not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error fetching expense:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch expense' });
  }
};

export const createExpense = async (req: Request, res: Response) => {
  try {
    const { date, category, amount, description } = req.body;

    if (!date || !category || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: date, category, amount',
      });
    }

    const result = await pool.query(
      `INSERT INTO expenses (date, category, amount, description)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [date, category, amount, description || null]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ success: false, error: 'Failed to create expense' });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { date, category, amount, description } = req.body;

    const result = await pool.query(
      `UPDATE expenses 
       SET date = COALESCE($1, date),
           category = COALESCE($2, category),
           amount = COALESCE($3, amount),
           description = COALESCE($4, description)
       WHERE id = $5
       RETURNING *`,
      [date, category, amount, description, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Expense not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ success: false, error: 'Failed to update expense' });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM expenses WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Expense not found' });
    }

    res.json({ success: true, message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ success: false, error: 'Failed to delete expense' });
  }
};

export const getExpenseSummary = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    let query = `SELECT category, SUM(amount) as total, COUNT(*) as count 
                 FROM expenses`;
    const params: any[] = [];

    if (startDate && endDate) {
      query += ' WHERE date BETWEEN $1 AND $2';
      params.push(startDate, endDate);
    }

    query += ' GROUP BY category ORDER BY total DESC';

    const result = await pool.query(query, params);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching expense summary:', error);
    res
      .status(500)
      .json({ success: false, error: 'Failed to fetch expense summary' });
  }
};
