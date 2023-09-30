import React from "react";
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import 'chart.js/auto';

const Graph = () => {
    const records = JSON.parse(localStorage.getItem("records") || "[]");
    
  const dataDoughnut = {
    labels: ["NFT", "Funds Transfer", "Staking", "Subscription", "Donations"],
    datasets: [
      {
        data: [0.01, 0.1, 0.03, 0.05, 0.06],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
        hoverBackgroundColor: [
          "#FF5A5E",
          "#5AD3D1",
          "#FFC870",
          "#A8B3C5",
          "#616774"
        ],
      }
    ]
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '35vh', // Adjust the height as needed
  };

  const chartStyle = {
    width: '24%', // Adjust the chart width as needed
  };

  return (
    <div style={containerStyle}>
      <div style={chartStyle}>
        <Doughnut data={dataDoughnut} options={{ responsive: true }} />
      </div>
    </div>
  );
}

export default Graph;

