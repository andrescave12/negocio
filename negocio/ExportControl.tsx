import React, { useState } from 'react';
import { api } from '../api';

interface ExportControlProps {
  startDate: string;
  endDate: string;
}

export const ExportControl: React.FC<ExportControlProps> = ({
  startDate,
  endDate,
}) => {
  const [loading, setLoading] = useState(false);

  const handleExportPDF = async () => {
    try {
      setLoading(true);
      const response = await api.get('/reports/export/pdf', {
        params: { startDate, endDate },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `reporte-${new Date().toISOString().split('T')[0]}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      link.parentElement?.removeChild(link);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error al descargar PDF');
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = async () => {
    try {
      setLoading(true);
      const response = await api.get('/reports/export/excel', {
        params: { startDate, endDate },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `reporte-${new Date().toISOString().split('T')[0]}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.parentElement?.removeChild(link);
    } catch (error) {
      console.error('Error exporting Excel:', error);
      alert('Error al descargar Excel');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleExportPDF}
        disabled={loading}
        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
      >
        📄 PDF
      </button>
      <button
        onClick={handleExportExcel}
        disabled={loading}
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        📊 Excel
      </button>
    </div>
  );
};
