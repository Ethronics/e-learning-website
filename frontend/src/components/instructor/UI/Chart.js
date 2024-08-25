// src/components/UI/Chart.js
import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Chart = ({ type, data, title }) => {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <Bar data={data} />;
      case 'line':
        return <Line data={data} />;
      case 'pie':
        return <Pie data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      {renderChart()}
    </div>
  );
};

export default Chart;
