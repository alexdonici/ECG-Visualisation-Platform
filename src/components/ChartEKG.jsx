const EKGChart = ({ darkMode }) => {
  const [ekgData, setEkgData] = useState([]);

  useEffect(() => {
    // ... your fetchData logic here
  }, []);

  if (!Array.isArray(ekgData)) return <p>Invalid EKG data</p>;

  const data = {
    labels: ekgData.map(point => point.time),
    datasets: [
      {
        label: 'EKG Signal',
        data: ekgData.map(point => point.voltage),
        fill: false,
        borderColor: 'red',
        borderWidth: 1,
        pointRadius: 0,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    elements: {
      line: {
        tension: 0
      },
      point: {
        radius: 0
      }
    },
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
          mode: 'x',
        },
        limits: {
          x: { minRange: 10 }
        }
      }
    },
    scales: {
      x: {
        type: 'linear',
        min: 0,
        max: 300,
        ticks: { color: darkMode ? '#eee' : '#000' },
        grid: { color: darkMode ? '#444' : '#ccc' },
        title: {
          display: true,
          text: 'Time',
          color: darkMode ? '#fff' : '#000'
        }
      },
      y: {
        min: -1,
        max: 1.5,
        ticks: { color: darkMode ? '#eee' : '#000' },
        grid: { color: darkMode ? '#444' : '#ccc' },
        title: {
          display: true,
          text: 'Voltage (mV)',
          color: darkMode ? '#fff' : '#000'
        }
      }
    }
  };

  // ✅ ⬇️ Put this RETURN at the end:
  return (
    <div className={`ekg-wrapper ${darkMode ? 'dark' : ''}`}>
      <h2>EKG Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};
