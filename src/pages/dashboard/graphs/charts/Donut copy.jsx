/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto';

const DonutChart = ({ dataList }) => {
  const parallelGroupsTotal = dataList?.parallel_groups?.total || 0; // Default to 0 if not available

  const labels = ["Parallel Groups"];
  const data = [parallelGroupsTotal.toString()]; // Convert to string

  const colorPalette = ['rgb(255, 99, 132)'];

  const datasets = [
    {
      label: "Count of Items",
      backgroundColor: colorPalette,
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
  }

  return (
    <div className="chart_box">
      <Doughnut data={chartData} options={options} />
      {/* <div className="chart_label_total">
        <p>{`Parallel Groups: ${parallelGroupsTotal}`}</p>
      </div> */}
    </div>
  );
};

export default DonutChart;
