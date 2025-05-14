import React, { useContext, useMemo } from "react";
import { BarChartExample } from "../../components/Component";
import { RecoveryContext } from "./RecoveryContext";

const MixTileChart = () => {
  const generateColorPalette = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    // Generate HSL with low lightness for dark colors
    const hue = Math.floor(Math.random() * 360);
    const saturation = 55 + Math.random() * 10; // 85–95% for vibrancy
    const lightness = 70 + Math.random() * 10; // 35–45% for dark tones
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
};
  const { salesSummaryData } = useContext(RecoveryContext);
  const chartData = useMemo(() => {
    const labels = salesSummaryData.map((item) => item.MNYR);
    const amountKeys = ["AAND", "AAWD", "ADIS", "TAND", "TAWD", "TDIS", "TOTA", "TAIM"];
    const colors = generateColorPalette(8)
    const datasets = amountKeys.map((key, index) => ({
      label: key,
      data: salesSummaryData.map((item) => item[key]),
      backgroundColor: colors[index % colors.length],
      borderRadius: 8,
    }));
    return {
      labels,
      datasets,
    }
  }, [salesSummaryData]);
  return (
    <div style={{ height: "350px" }} className="mt-3">
      <BarChartExample data={chartData} legend />
    </div>
  );
};

export default MixTileChart;
