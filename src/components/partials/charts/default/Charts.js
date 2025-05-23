import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import {
  saleRevenue,
  activeSubscription,
  userActivity,
  userActivitySet2,
  userActivitySet3,
  userActivitySet4,
} from "./Data";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
  
);

export const BarChart = ({ sales }) => {
  return (
    <Bar
      className="sales-bar-chart chartjs-render-monitor"
      data={sales ? saleRevenue : activeSubscription}
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
              size: "11px",
            },
            titleColor: "#6783b8",
            titleMarginBottom: 4,
            bodyColor: "#9eaecf",
            bodyFont: {
              size: "10px",
            },
            bodySpacing: 3,
            padding: 8,
            footerMarginTop: 0,
          },
        },
        scales: {
          y: {
            display: false,
          },
          x: {
            display: false,
          },
        },
        maintainAspectRatio: false,
      }}
    />
  );
};

export const LineChart = ({ options, data }) => {
  return <Line className="sales-overview-chart" data={data} options={options} />;
};

export const DoubleBar = ({ options, data }) => {
  return <Bar className="chartjs-render-monitor" data={data} options={options} />;
};

export const HorizontalBarChart = ({ data, yScale = false, datalabelsDisplay = false }) => {
  return (
    <Bar
      data={data}
      className="coin-overview-chart"
      plugins={datalabelsDisplay ? [ChartDataLabels] : []}
      options={{
        plugins: {
          datalabels: {
            display: datalabelsDisplay,
            anchor: "center",
            align: "center",
            color: "#000",
            formatter: (value) => `${value}%`,
            font: {
              weight: "bold",
            },
          },
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
        indexAxis: "y",
        maintainAspectRatio: false,
        scales: {
          y: {
            display: yScale,
            stacked: true,
            ticks: {
              beginAtZero: true,
              padding: 0,
            },
            grid: {
              tickMarkLength: 0,
              display: false,
            },
          },
          x: {
            display: false,
            stacked: true,
            ticks: {
              color: "#9eaecf",
              font: {
                size: "9px",
              },
              source: "auto",
              padding: 0,
            },
            grid: {
              color: "transparent",
              tickMarkLength: 0,
              zeroLineColor: "transparent",
            },
          },
        },
      }}
    />
  );
};

export const StackedBarChart = ({ state }) => {
  const [data, setData] = useState(userActivity);
  useEffect(() => {
    let object;
    if (state === "day") {
      object = userActivitySet2;
    } else if (state === "month") {
      object = userActivitySet3;
    } else {
      object = userActivitySet4;
    }
    setData(object);
  }, [state]);
  return (
    <Bar
      className="usera-activity-chart"
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
            bodySpacing: 1,
            padding: 12,
            footerMarginTop: 0,
          },
        },
        maintainAspectRatio: false,
        scales: {
          y: {
            display: false,
            stacked: true,
            ticks: {
              beginAtZero: true,
            },
          },
          x: {
            display: false,
            stacked: true,
          },
        },
      }}
    />
  );
};
