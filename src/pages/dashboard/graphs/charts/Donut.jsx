/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto';

const DonutChart = ({ dataList }) => {
  const labels = ["Red"];

  const parallelGroupsTotal = dataList.parallel_groups?.total || 0;

  const colorPalette = ['rgb(255, 99, 132)'];

  const datasets = [
    {
      label: "Count of Items",
      backgroundColor: colorPalette.slice(0, labels.length),
      data: [parallelGroupsTotal], // Wrap the total value in an array
    },
  ];

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
      },
      datalabels: {
        formatter: (value, context) => {
          return value; // Display the total value on the chart
        },
        color: 'white', // Set the color of the label
        display: true, // Show the label
      },
    },
  };

  return (
    <div className="chart_box">
      <p>Parallel Groups</p>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DonutChart;
