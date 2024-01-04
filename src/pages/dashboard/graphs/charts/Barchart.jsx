/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import 'chart.js/auto';

const BarChart = ({ dataList }) => {
  console.log("barchart", dataList);

  const parallelMembershipStatusData = dataList.parallel_memship_status || {};

  const labels = Object.keys(parallelMembershipStatusData)
    .filter(label => !label.includes("Parallel Group Membership Status 3/"))
    .map(label => label.replace(/^Parallel Group Membership Status [1-3]\//, ""));

  const data = Object.values(parallelMembershipStatusData);

  const colorPalette = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
  ];

  const datasets = [
    {
      label: "Count of Items",
      backgroundColor: colorPalette.slice(0, labels.length),
      borderColor: "rgb(255, 99, 132)",
      data: data,
    },
  ];

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <div className="chart_box">
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
