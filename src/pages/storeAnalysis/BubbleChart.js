import React from "react";
import { Bubble } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, PointElement, LinearScale, BubbleController } from "chart.js";

ChartJS.register(BubbleController, LinearScale, PointElement, Tooltip, Legend);

const BubbleChart = ({ dataItems }) => {
  // Example size scaling (adjust as needed)

 

  const bubbleChartOptions = {
    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw.r ** 2;
            return `${context.dataset.label}: ${Math.round(value)}`;
          },
        },
      },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
    maintainAspectRatio: false,
  };

  return <Bubble data={dataItems} options={bubbleChartOptions} />;
};

export default BubbleChart;
