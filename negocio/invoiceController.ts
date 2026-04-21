import { Request, Response } from 'express';
import pool from '../db';

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    let query = 'SELECT * FROM sales_invoices';
    const params: any[] = [];

    if (startDate && endDate) {
      query += ' WHERE date BETWEEN $1 AND $2';
      params.push(startDate, endDate);
    }

    query += ' ORDER BY date DESC';

    const result = await pool.query(query, params);
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length,
    });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch invoices' });
  }
};

export const getInvoiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const invoice = await pool.query(
      'SELECT * FROM sales_invoices WHERE id = $1',
      [id]
    );

    if (invoice.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Invoice not found' });
    }

    const items = await pool.query(
      `SELECT si.*, p.name, p.code, p.cost 
       FROM sale_items si
       JOIN products p ON si.product_id = p.id
       WHERE si.invoice_id = $1`,
      [id]
    );

    res.json({
      success: true,
      data: {
        ...invoice.rows[0],
        items: items.rows,
      },
    });
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch invoice' });
  }
};

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const { invoice_number, date, items, notes } = req.body;

    if (!invoice_number || !date || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields or empty items',
      });
    }

    // Calculate total
    let total = 0;
    for (const item of items) {
      total += item.subtotal;
    }

    // Create invoice
    const invoiceResult = await pool.query(
      `INSERT INTO sales_invoices (invoice_number, date, total, notes)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [invoice_number, date, total, notes || null]
    );

    const invoiceId = invoiceResult.rows[0].id;

    // Create sale items
    for (const item of items) {
      await pool.query(
        `INSERT INTO sale_items (invoice_id, product_id, quantity, unit_price, margin_percent, subtotal)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          invoiceId,
          item.product_id,
          item.quantity,
          item.unit_price,
          item.margin_percent,
          item.subtotal,
        ]
      );

      // Update product stock
      await pool.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2',
        [item.quantity, item.product_id]
      );
    }

    res.status(201).json({
      success: true,
      data: invoiceResult.rows[0],
      message: 'Invoice created successfully',
    });
  } catch (error: any) {
    console.error('Error creating invoice:', error);
    if (error.code === '23505') {
      return res
        .status(400)
        .json({ success: false, error: 'Invoice number already exists' });
    }
    res.status(500).json({ success: false, error: 'Failed to create invoice' });
  }
};

export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Get invoice items to restore stock
    const items = await pool.query(
      'SELECT product_id, quantity FROM sale_items WHERE invoice_id = $1',
      [id]
    );

    // Restore product stock
    for (const item of items.rows) {
      await pool.query(
        'UPDATE products SET stock = stock + $1 WHERE id = $2',
        [item.quantity, item.product_id]
      );
    }

    // Delete invoice (cascade will delete items)
    const result = await pool.query(
      'DELETE FROM sales_invoices WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Invoice not found' });
    }

    res.json({ success: true, message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ success: false, error: 'Failed to delete invoice' });
  }
};
