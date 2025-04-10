import React from "react";
import { Line, Bar, Pie, PolarArea, Doughnut } from "react-chartjs-2";

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
} from "chart.js";
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Filler,
  Legend,
  ArcElement
);

export const LineChartExample = ({ data, legend, yTickLabel = "" }) => {
  return (
    <Line
      className="line-chart"
      data={data}
      options={{
        plugins: {
          legend: {
            display: legend,
            labels: {
              boxWidth: 12,
              padding: 20,
              fontColor: "#6783b8",
            },
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: ${Number(tooltipItem.raw).toFixed(2)} ${yTickLabel}`;
              },
            },
            enabled: true,
            displayColors: false,
            backgroundColor: "#eff6ff",
            titleFont: {
              size: "13px",
            },
            titleColor: "#6783b8",
            titleMarginBottom: 6,
            bodyColor: "#9eaecf",
            bodyFont: {
              size: "12px",
            },
            bodySpacing: 4,
            padding: 10,
            footerMarginTop: 0,
          },
        },
        maintainAspectRatio: false,
        scales: {
          y: {
            display: true,
            ticks: {
              callback: function (value) {
                return value + yTickLabel;
              },
              beginAtZero: false,
              color: "#9eaecf",
              font: {
                size: "12px",
              },
              padding: 10,
            },
            grid: {
              tickMarkLength: 0,
            },
          },
          x: {
            display: true,
            ticks: {
              color: "#9eaecf",
              font: {
                size: "12px",
              },
              source: "auto",
              padding: 5,
            },
            grid: {
              color: "transparent",
              tickMarkLength: 10,
              offsetGridLines: true,
            },
          },
        },
      }}
    />
  );
};

export const BarChartExample = ({ data, stacked, yTickLabel = "", legend = false }) => {
  return (
    <Bar
      data={data}
      options={{
        plugins: {
          legend: {
            display: legend ,
            labels: {
              font: {
                size: legend ? 18 :14,
              
              },
            }
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                console.log('console_tooltipItem', tooltipItem);
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw} ${yTickLabel}`;
              },
            },
            enabled: true,
            displayColors: false,
            backgroundColor: "#eff6ff",
            titleFont: {
              size: "13px",
            },
            titleColor: "#6783b8",
            titleMarginBottom: 6,
            bodyColor: "#9eaecf",
            bodyFont: {
              size: "12px",
            },
            bodySpacing: 4,
            padding: 10,
            footerMarginTop: 0,
          },
        },
        maintainAspectRatio: false,
        scales: {
          y: {
            display: true,
            stacked: stacked ? true : false,
            ticks: {
              callback: function (value) {
                return value + yTickLabel;
              },
              beginAtZero: true,
              color: "#9eaecf",
              font: {
                size: "12px",
              },
              padding: 5,
            },
            grid: {
              tickMarkLength: 0,
            },
          },
          x: {
            display: true,
            stacked: stacked ? true : false,
            ticks: {
              color: "#9eaecf",
              font: {
                size: "12px",
              },
              source: "auto",
              padding: 5,
            },
            grid: {
              color: "transparent",
              tickMarkLength: 10,
              zeroLineColor: "transparent",
            },
          },
        },
      }}
    />
  );
};

export const PieChartExample = ({ data, yTickLabel }) => {
  return (
    <Pie
      data={data}
      options={{
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${Number(tooltipItem.raw).toFixed(2)} ${yTickLabel}`;
              },
            },
            enabled: true,
            displayColors: false,
            backgroundColor: "#eff6ff",
            titleFont: {
              size: "13px",
            },
            titleColor: "#6783b8",
            titleMarginBottom: 6,
            bodyColor: "#9eaecf",
            bodyFont: {
              size: "12px",
            },
            bodySpacing: 4,
            padding: 10,
            footerMarginTop: 0,
          },
        },
        rotation: -0.2,
        maintainAspectRatio: false,
      }}
    />
  );
};

export const DoughnutExample = ({ data }) => {
  return (
    <Doughnut
      data={data}
      options={{
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            displayColors: false,
            backgroundColor: "#eff6ff",
            titleFont: {
              size: "13px",
            },
            titleColor: "#6783b8",
            titleMarginBottom: 6,
            bodyColor: "#9eaecf",
            bodyFont: {
              size: "12px",
            },
            bodySpacing: 4,
            padding: 10,
            footerMarginTop: 0,
          },
        },
        rotation: 1,
        cutoutPercentage: 40,
        maintainAspectRatio: false,
      }}
    />
  );
};

export const PolarExample = ({ data }) => {
  return (
    <PolarArea
      data={data}
      options={{
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            displayColors: false,
            backgroundColor: "#eff6ff",
            titleFont: {
              size: "13px",
            },
            titleColor: "#6783b8",
            titleMarginBottom: 6,
            bodyColor: "#9eaecf",
            bodyFont: {
              size: "12px",
            },
            bodySpacing: 4,
            padding: 10,
            footerMarginTop: 0,
          },
        },
        maintainAspectRatio: false,
      }}
    />
  );
};
