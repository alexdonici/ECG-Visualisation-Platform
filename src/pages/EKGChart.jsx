// src/pages/EKGChart.jsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  Decimation
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import './EKGChart.css';

ChartJS.register(
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  zoomPlugin,
  Decimation
);

const EKGChart = () => {
  const [ekgData, setEkgData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/ekg/');
        const json = await response.json();
        const dataArray = Array.isArray(json) ? json : json.data;

        if (!Array.isArray(dataArray)) {
          throw new Error('Invalid EKG data format');
        }

        setEkgData(dataArray);
      } catch (err) {
        console.error('Failed to fetch EKG data:', err);
      }
    };

    fetchData();
  }, []);

  if (!Array.isArray(ekgData)) return <p>Invalid EKG data</p>;

  const data = {
    labels: ekgData.map(point => point.time),
    datasets: [
      {
        label: 'EKG Signal',
        data: ekgData.map(point => point.voltage),
        borderColor: 'red',
        borderWidth: 1,
        pointRadius: 0,
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    interaction: {
      mode: 'nearest',
      intersect: false
    },
    plugins: {
      legend: { display: false },
      zoom: {
        pan: { enabled: true, mode: 'x' },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: 'x'
        }
      },
      decimation: {
        enabled: true,
        algorithm: 'min-max',
        samples: 1000,
      }
    },
    scales: {
      x: {
        type: 'linear',
        min: 0,
        max: 15,
        title: {
          display: true,
          text: 'Time (s)',
        },
        grid: {
          color: '#ccc',
        }
      },
      y: {
        min: -1,
        max: 1.5,
        title: {
          display: true,
          text: 'Voltage (mV)',
        },
        grid: {
          color: '#ccc',
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <h2>EKG Chart</h2>
      <div className="chart-wrapper">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default EKGChart;
