import React, { useContext, useMemo } from "react";
import { BarChartExample, Icon } from "../../components/Component";
import { RecoveryContext } from "./RecoveryContext";
import { KEY_NAME } from "./constants";
import moment from "moment";


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

const TileBarChart = () => {
  const { barChartData, tileName, compareValue, recoveryData, groupAttr1, groupValue1, groupValue2, groupAttr2 } =
    useContext(RecoveryContext);
  const groupingKey = groupValue1 ? "BK02" : groupValue2 ? "BK01" : null;
  const groupingAttr = groupValue1 ? groupAttr1 : groupValue2 ? groupAttr2 : null;

  const allSizes = useMemo(() => {
    const sizes = new Set();
    barChartData.forEach((item) => {
      if (item[groupingKey]) sizes.add(item[groupingKey]);
    });
    return Array.from(sizes);
  }, [barChartData, groupingKey]);

  const colorPalette = useMemo(() => generateColorPalette(allSizes.length), [allSizes.length]);
  const chartLabel = useMemo(() => {
    switch (tileName) {
      case KEY_NAME.KEY_1:
        return "Sale as per MRP";
      case KEY_NAME.KEY_2:
        return "Full Price Sale";
      case KEY_NAME.KEY_3:
        return "Discount Sale";
      case KEY_NAME.KEY_4:
        return "Invoice";
      default:
        return "";
    }
  }, [tileName]);

  const transformedData = useMemo(() => {
    const monthMap = {};

    barChartData.forEach((item) => {
      const { MNYR, TAIM, TAND, TAWD, TOTA, INVC } = item;
      const size = groupingKey ? item[groupingKey] : null;
      if (!MNYR || !size) return;

      if (!monthMap[MNYR]) {
        monthMap[MNYR] = {};
        allSizes.forEach((s) => {
          monthMap[MNYR][s] = { value: 0, qty: 0 };
        });
      }

      let value = 0;
      let qty = 0;
      switch (tileName) {
        case KEY_NAME.KEY_1:
          value = TAIM || 0;
          qty = item.TOTQ;
          break;
        case KEY_NAME.KEY_2:
          value = TAND || 0;
          qty = item.TQND;
          break;
        case KEY_NAME.KEY_3:
          value = TAWD || 0;
          qty = item.TQWD;
          break;
        case KEY_NAME.KEY_4:
          value = item.INVC;
          qty = item.TDIS / item.INVC;
          break;
        default:
          value = 0;
      }

      monthMap[MNYR][size] = { value, qty };
    });

    return Object.entries(monthMap).map(([label, sizeData]) => ({
      label,
      ...sizeData,
    }));
  }, [barChartData, tileName, allSizes, groupingKey]);

  const datasets = allSizes.map((size, index) => ({
    label: size,
    data: transformedData.map((d) => d[size].value ?? 0),
    qtyData: transformedData.map((d) => d[size].qty ?? 0),
    backgroundColor: colorPalette[index % colorPalette.length],
    borderRadius: 8,
  }));

  const chartData = useMemo(() => {
    if (allSizes.length > 0 && groupingKey) {
      const labels = transformedData.map((item) =>
        compareValue === "MoM" ? moment(item.label, "MM-YYYY").format("MMM-YYYY") : item.label
      );

      return {
        labels,
        datasets,
      };
    } else {
      const labels = barChartData.map((item) =>  compareValue === "MoM" ? moment(item.label, "MM-YYYY").format("MMM-YYYY") : item.label);
      return {
        labels: labels,
        datasets: [
          {
            label: chartLabel,
            data: barChartData.map((d) => d.value),
            qtyData: barChartData.map((d) => d.qty),
            backgroundColor: "#3b82f6",
            borderRadius: 8,
          },
        ],
      };
    }
  }, [datasets, chartLabel, barChartData]);

  function customToolTipFunction(context) {
    const index = context.dataIndex;
    const dataset = context.dataset;
    const value = dataset.data[index];
    const qty = dataset.qtyData ? dataset.qtyData[index] : undefined;

    return [
      `${chartLabel === "Invoice" ? "Count" : "Amount"}: ${value.toFixed(2).toLocaleString()}`,
      qty !== undefined ? (chartLabel === "Invoice" ? `Average: ${qty.toFixed(2)}` : `Qty: ${qty}`) : null,
    ].filter(Boolean);
  }

  // const chartComparison = useMemo(() => {
  //   if (recoveryData && tileName) {
  //     const data = chartData.datasets[0].data;
  //     return ((data[1] - data[0]) / data[0]) * 100;
  //   }
  // }, [recoveryData, tileName, chartData]);

  const apiComparison = useMemo(() => {
    if (!barChartData || barChartData.length === 0 || !tileName) return null;

    const timeKey = compareValue === "QoQ" ? "FYQR" : "MNYR";

    const [month1, month2] = Array.from(new Set(barChartData.map((item) => item[timeKey]))).sort((a, b) => {
      if (compareValue === "QoQ") {
        const [qa, ya] = a.split("-Q").reverse(); // ["2025", "1"]
        const [qb, yb] = b.split("-Q").reverse();
        const dateA = new Date(+ya, (parseInt(qa) - 1) * 3); // Q1 = Jan, Q2 = Apr...
        const dateB = new Date(+yb, (parseInt(qb) - 1) * 3);
        return dateA - dateB;
      } else {
        return moment(a, "MM-YYYY").toDate() - moment(b, "MM-YYYY").toDate();
      }
    });

    let total1 = 0;
    let total2 = 0;

    barChartData.forEach((item) => {
      const period = item[timeKey];
      let value = 0;

      switch (tileName) {
        case KEY_NAME.KEY_1:
          value = item.TAIM || 0;
          break;
        case KEY_NAME.KEY_2:
          value = item.TAND || 0;
          break;
        case KEY_NAME.KEY_3:
          value = item.TAWD || 0;
          break;
        case KEY_NAME.KEY_4:
          value = item.INVC || 0;
          break;
        default:
          value = 0;
      }

      if (period === month1) total1 += value;
      if (period === month2) total2 += value;
    });

    if (total1 === 0) return { variance: 0, month1, month2 };

    const variance = ((total2 - total1) / total1) * 100;

    return {
      variance,
      month1,
      month2,
    };
  }, [barChartData, tileName, compareValue]);

  return (
    <div className="mt-3" style={{ position: "relative" }}>
      {allSizes?.length > 0 && (groupValue1 || groupValue2) && (
        <h5 className="text-center">
          {chartLabel} {groupingAttr ? "-" : ""} {groupingAttr ?? ""} {groupValue1 || groupValue2 ? "-" : ""}{" "}
          {groupValue1 ?? groupValue2 ?? ""}
        </h5>
      )}
      {recoveryData && tileName && (
        <h6 className="text-end" style={{ position: "absolute", right: "10px", top: "5px" }}>
          Variance:{" "}
          <span
            className={
              apiComparison.variance > 0 ? "text-success" : apiComparison.variance < 0 ? "text-danger" : "text-dark"
            }
          >
            {apiComparison.variance ? Math.abs(apiComparison.variance).toFixed(2) : 0}%
          </span>
          <Icon
            className={
              apiComparison.variance > 0
                ? "text-success"
                : apiComparison.variance < 0
                ? "text-danger"
                : "text-dark" + "m-0"
            }
            name={apiComparison.variance > 0 ? "arrow-long-up" : "arrow-long-down"}
          />
        </h6>
      )}
      <div style={{ height: "350px" }} className="mt-3">
        <BarChartExample data={chartData} legend customToolTip={customToolTipFunction} />
      </div>
    </div>
  );
};

export default TileBarChart;
