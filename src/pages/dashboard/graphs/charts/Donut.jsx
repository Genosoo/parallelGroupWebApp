/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto';

const DonutChart = () => {
  const labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
  const data = [12, 19, 3, 5, 2, 3]; // Sample data for the chart

  const colorPalette = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
  ];

  const datasets = [
    {
      label: "Count of Items",
      backgroundColor: colorPalette.slice(0, labels.length),
      data: data,
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
    },
  };

  return (
    <div className="chart_box">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DonutChart;
