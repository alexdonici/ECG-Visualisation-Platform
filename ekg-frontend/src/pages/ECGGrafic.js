import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const EKGChart = () => {
  const [ekgData, setEkgData] = useState([]);
  const chartRef = useRef(null); // referință către chart

  useEffect(() => {
    axios.get('http://localhost:8000/api/ekg/')
      .then(res => {
        const rawData = res.data.data;
        const limitedData = rawData.slice(0, 6000); // ✅ primele 200
        console.log("Limited EKG data:", limitedData);
        setEkgData(limitedData);
      })
      .catch(err => console.error(err));
  }, []);
  

  const data = {
    labels: ekgData.map(point => point.time),
    datasets: [
      {
        label: 'EKG Signal',
        data: ekgData.map(point => point.voltage),
        fill: false,
        borderColor: 'red',
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Timestamp',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Voltage (mV)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
      },
    },
  };

  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom(); // metoda oferită de plugin
    }
  };

  return React.createElement(
    'div',
    null,
    React.createElement('h2', null, 'EKG Chart'),
    React.createElement(Line, {
      data: data,
      options: options,
      ref: chartRef
    }),
    React.createElement('button', {
      onClick: handleResetZoom,
      style: { marginTop: '10px', padding: '6px 12px', cursor: 'pointer' }
    }, 'Reset Zoom')
  );
};

export default EKGChart;
