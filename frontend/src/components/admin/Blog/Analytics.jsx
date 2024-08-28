import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components with Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = ({ analytics }) => {
    // Check if analytics data is available
    if (!analytics || analytics.length === 0) {
        return <p>No data available for analytics.</p>;
    }

    const data = {
        labels: analytics.map(item => item.date),
        datasets: [
            {
                label: 'Page Views',
                data: analytics.map(item => item.views),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                labels: analytics.map(item => item.date),
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Analytics</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default Analytics;
