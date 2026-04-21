import { Request, Response } from 'express';
import pool from '../db';
import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';

export const exportReportPDF = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    // Get report data
    const dateFilter =
      startDate && endDate
        ? `WHERE date BETWEEN '${startDate}' AND '${endDate}'`
        : '';

    const salesResult = await pool.query(
      `SELECT SUM(total) as total_sales, COUNT(*) as invoice_count 
       FROM sales_invoices ${dateFilter.replace('date', 'sales_invoices.date')}`
    );

    const expensesResult = await pool.query(
      `SELECT SUM(amount) as total_expenses, COUNT(*) as expense_count 
       FROM expenses ${dateFilter.replace('date', 'expenses.date')}`
    );

    const sales = salesResult.rows[0] || { total_sales: 0, invoice_count: 0 };
    const expenses = expensesResult.rows[0] || {
      total_expenses: 0,
      expense_count: 0,
    };

    const netProfit =
      (sales.total_sales || 0) - (expenses.total_expenses || 0);

    // Create PDF
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="report-${new Date().toISOString().split('T')[0]}.pdf"`
    );

    doc.pipe(res);

    // Header
    doc.fontSize(20).font('Helvetica-Bold').text('📊 Reporte Contable', {
      align: 'center',
    });
    doc
      .fontSize(10)
      .font('Helvetica')
      .text(
        `Período: ${startDate || 'Inicio'} - ${endDate || 'Fin'}`,
        { align: 'center' }
      );
    doc.moveDown();

    // Summary
    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .text('Resumen Financiero');
    doc.fontSize(10).font('Helvetica');
    doc.text(`Total Ventas: $${parseFloat(sales.total_sales).toFixed(2)}`);
    doc.text(`Facturas: ${sales.invoice_count}`);
    doc.text(`Total Gastos: $${parseFloat(expenses.total_expenses).toFixed(2)}`);
    doc.text(`Registros: ${expenses.expense_count}`);
    doc
      .font('Helvetica-Bold')
      .text(`Utilidad Neta: $${netProfit.toFixed(2)}`);

    doc.end();
  } catch (error) {
    console.error('Error exporting PDF:', error);
    res.status(500).json({ success: false, error: 'Failed to export PDF' });
  }
};

export const exportReportExcel = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    const workbook = new ExcelJS.Workbook();

    // Get all data
    let invoiceQuery = 'SELECT * FROM sales_invoices';
    let expenseQuery = 'SELECT * FROM expenses';
    const params: any[] = [];

    if (startDate && endDate) {
      invoiceQuery += ' WHERE date BETWEEN $1 AND $2';
      expenseQuery += ' WHERE date BETWEEN $1 AND $2';
      params.push(startDate, endDate);
    }

    const invoices = await pool.query(invoiceQuery, params);
    const expenses = await pool.query(expenseQuery, params);

    // Invoices Sheet
    const invoiceSheet = workbook.addWorksheet('Facturas');
    invoiceSheet.columns = [
      { header: 'ID', key: 'id', width: 8 },
      { header: 'Factura #', key: 'invoice_number', width: 15 },
      { header: 'Fecha', key: 'date', width: 12 },
      { header: 'Total', key: 'total', width: 12 },
      { header: 'Notas', key: 'notes', width: 30 },
    ];

    invoices.rows.forEach((invoice) => {
      invoiceSheet.addRow(invoice);
    });

    invoiceSheet.getRow(1).font = { bold: true };
    invoiceSheet.getColumn('total').numFmt = '$#,##0.00';

    // Expenses Sheet
    const expenseSheet = workbook.addWorksheet('Gastos');
    expenseSheet.columns = [
      { header: 'ID', key: 'id', width: 8 },
      { header: 'Fecha', key: 'date', width: 12 },
      { header: 'Categoría', key: 'category', width: 15 },
      { header: 'Monto', key: 'amount', width: 12 },
      { header: 'Descripción', key: 'description', width: 30 },
    ];

    expenses.rows.forEach((expense) => {
      expenseSheet.addRow(expense);
    });

    expenseSheet.getRow(1).font = { bold: true };
    expenseSheet.getColumn('amount').numFmt = '$#,##0.00';

    // Summary Sheet
    const salesResult = await pool.query(
      `SELECT SUM(total) as total_sales FROM sales_invoices`
    );
    const expensesResult = await pool.query(
      `SELECT SUM(amount) as total_expenses FROM expenses`
    );

    const sales = salesResult.rows[0] || { total_sales: 0 };
    const expensesTotal = expensesResult.rows[0] || { total_expenses: 0 };

    const summarySheet = workbook.addWorksheet('Resumen');
    summarySheet.addRow(['Concepto', 'Monto']);
    summarySheet.addRow(['Total Ventas', parseFloat(sales.total_sales)]);
    summarySheet.addRow([
      'Total Gastos',
      parseFloat(expensesTotal.total_expenses),
    ]);
    summarySheet.addRow([
      'Utilidad Neta',
      parseFloat(sales.total_sales) - parseFloat(expensesTotal.total_expenses),
    ]);

    summarySheet.getRow(1).font = { bold: true };

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="report-${new Date().toISOString().split('T')[0]}.xlsx"`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error exporting Excel:', error);
    res.status(500).json({ success: false, error: 'Failed to export Excel' });
  }
};
