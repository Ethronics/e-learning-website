// src/components/Dashboard/StudentEngagementMetrics.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../UI/Card';
import Chart from '../UI/Chart';

const StudentEngagementMetrics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the data from the local api.json file
    axios.get('/inst1.json')
      .then(response => {
        setData(response.data.engagementData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError("There was an error loading the data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Card title="Student Engagement Metrics">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Chart type="bar" data={{
          labels: data.lessonCompletion.labels,
          datasets: data.lessonCompletion.datasets
        }} title="Lesson Completion Rates" />
        
        <Chart type="line" data={{
          labels: data.quizPerformance.labels,
          datasets: data.quizPerformance.datasets
        }} title="Quiz Performance" />
        
        <Chart type="pie" data={{
          labels: data.interactionLevels.labels,
          datasets: data.interactionLevels.datasets
        }} title="Interaction Levels" />
      </div>
    </Card>
  );
};

export default StudentEngagementMetrics;
