import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface ChartProps {
  type: 'line' | 'bar' | 'pie' | 'doughnut';
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      fill?: boolean;
      tension?: number;
    }>;
  };
  options?: any;
  title?: string;
}

export const ChartComponent: React.FC<ChartProps> = ({
  type,
  data,
  options,
  title,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
          title: {
            display: !!title,
            text: title,
          },
        },
        ...options,
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, data, options, title]);

  return (
    <div className="bg-white p-6 rounded shadow">
      <canvas ref={chartRef} />
    </div>
  );
};
