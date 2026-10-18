import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ChartEKG = () => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const values = Array.from({ length: 100 }, (_, i) => {
      if (i % 20 === 0) return 1.0 + Math.random() * 0.2;
      if (i % 20 === 1) return -0.5;
      if (i % 20 === 2) return 0.3;
      return Math.random() * 0.1 - 0.05;
    });

    const chart = new ChartJS(ctx, {
      type: 'line',
      data: {
        labels: values.map((_, i) => i),
        datasets: [{
          label: 'EKG Simulat',
          data: values,
          borderColor: 'red',
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { type: 'category', title: { display: true, text: 'Timp (ms)' } },
          y: { min: -1, max: 1.5, title: { display: true, text: 'Tensiune (mV)' } }
        },
        plugins: { legend: { display: false } }
      }
    });

    return () => chart.destroy();
  }, []);

  return <canvas ref={chartRef} height="200" />;
};

export default ChartEKG;
