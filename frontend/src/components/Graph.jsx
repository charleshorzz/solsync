import React from 'react';
import { Pie } from 'react-chartjs-2';

const Graph = ({ data }) => {
  // Assuming data is an array of objects with 'description' and 'amount' properties
  const labels = data.map((item) => item.description);
  const amounts = data.map((item) => item.amount);

  const chartData = {
    labels,
    datasets: [
      {
        data: amounts,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#C1C1C1'], // You can customize colors
      },
    ],
  };

  return (
    <div>
      <h2>Amount Spent by Description</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default Graph;