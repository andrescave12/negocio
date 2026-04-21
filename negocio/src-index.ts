import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'accounting_db',
});

// Test DB connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection error:', err);
  } else {
    console.log('✅ Connected to database at', res.rows[0].now);
  }
});

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Accounting & Sales API v1.0' });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK' });
});

// Products routes (placeholder)
app.get('/api/products', (req: Request, res: Response) => {
  res.json({ message: 'Get products endpoint' });
});

app.post('/api/products', (req: Request, res: Response) => {
  res.json({ message: 'Create product endpoint' });
});

// Invoices routes (placeholder)
app.get('/api/invoices', (req: Request, res: Response) => {
  res.json({ message: 'Get invoices endpoint' });
});

app.post('/api/invoices', (req: Request, res: Response) => {
  res.json({ message: 'Create invoice endpoint' });
});

// Expenses routes (placeholder)
app.get('/api/expenses', (req: Request, res: Response) => {
  res.json({ message: 'Get expenses endpoint' });
});

app.post('/api/expenses', (req: Request, res: Response) => {
  res.json({ message: 'Create expense endpoint' });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

export { pool, app };
