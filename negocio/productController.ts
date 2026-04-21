import { Request, Response } from 'express';
import pool from '../db';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY created_at DESC'
    );
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch product' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { code, name, description, cost, base_price, category, stock } =
      req.body;

    if (!code || !name || !cost || !base_price) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: code, name, cost, base_price',
      });
    }

    const result = await pool.query(
      `INSERT INTO products (code, name, description, cost, base_price, category, stock)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [code, name, description || null, cost, base_price, category || null, stock || 0]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    console.error('Error creating product:', error);
    if (error.code === '23505') {
      return res
        .status(400)
        .json({ success: false, error: 'Product code already exists' });
    }
    res.status(500).json({ success: false, error: 'Failed to create product' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { code, name, description, cost, base_price, category, stock } =
      req.body;

    const result = await pool.query(
      `UPDATE products 
       SET code = COALESCE($1, code),
           name = COALESCE($2, name),
           description = COALESCE($3, description),
           cost = COALESCE($4, cost),
           base_price = COALESCE($5, base_price),
           category = COALESCE($6, category),
           stock = COALESCE($7, stock),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING *`,
      [code, name, description, cost, base_price, category, stock, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM products WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, error: 'Failed to delete product' });
  }
};
