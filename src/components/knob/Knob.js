import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";

// Register necessary components for Chart.js
Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const Knob = ({ data, type = "half", centerText = "" }) => {
  return (
    <div
      className="nk-knob position-relative"
      style={{ height: "100px", width: "100%", maxWidth: "200px",  }}
    >
      <Doughnut
        data={data}
        options={{
          plugins: {
            datalabels: {
              display: false,
            },
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
          rotation: type === "half" ? 270 : 0,
          circumference: type === "half" ? 180 : 360,
          cutout: "85%",
          maintainAspectRatio: false,
          responsive: true,
        }}
      />
      <div
        className={`position-absolute top-50 start-50 translate-middle fs-5 fw-semibold text-center ${
          type === "full" ? "pb-2" : "pt-3"
        }`}
        style={{ pointerEvents: "none" }}
      >
        <div className="text-lead">{centerText}</div>
      </div>
    </div>
  );
};

export default Knob;
