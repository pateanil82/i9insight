import React, { useContext, useMemo, useState } from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  PreviewCard,
  PreviewAltCard,
  BlockBetween,
  PieChartExample,
  LineChartExample,
  BarChartExample,
  BlockDes,
} from "../components/Component";
import { AppContext } from "../context/appContext";

const Homepage = () => {
  const [sm, updateSm] = useState(true);
  const { chartData } = useContext(AppContext);

  const firstChartData = useMemo(() => {
    const data = chartData["1"]?.slot_data;
    const chartDataNew = data?.reduce((acc, { month, sale_amt }) => {
      const monthYear = month;
      const saleInCr = sale_amt / 10000000;
      if (acc[monthYear]) {
        acc[monthYear] += saleInCr;
      } else {
        acc[monthYear] = saleInCr;
      }
      return acc;
    }, {});

    const sortedData =
      chartDataNew &&
      Object.fromEntries(
        Object.entries(chartDataNew)?.sort(([dateA], [dateB]) => {
          // Parse the dates in "MM-YYYY" format
          const [monthA, yearA] = dateA.split("-").map(Number);
          const [monthB, yearB] = dateB.split("-").map(Number);
          const dateObjA = new Date(yearA, monthA - 1); // JS months are 0-indexed
          const dateObjB = new Date(yearB, monthB - 1);
          return dateObjA - dateObjB;
        })
      );
    return {
      data: {
        labels: sortedData && Object.keys(sortedData),

        datasets: [
          {
            label: chartData["1"]?.title,
            color: "#0069FF",
            fill: true,
            backgroundColor: "rgba(26, 120, 255,0.25)",
            borderColor: "#0069FF",
            barPercentage: 0.1,
            categoryPercentage: 0.1,
            borderWidth: 2,
            lineTension: 0.1,
            pointBorderColor: "transparent",
            pointBackgroundColor: "transparent",
            pointHoverBorderColor: "#0069FF",
            pointHoverBackgroundColor: "#fff",
            data: sortedData && Object.values(sortedData),
          },
        ],
      },
    };
  }, [chartData]);

  const secondChartData = useMemo(() => {
    const data = chartData["2"]?.slot_data;
    const chartDataNew = data?.reduce((acc, { month, sale_amt }) => {
      const monthYear = month;
      const saleInCr = sale_amt / 10000000;
      if (acc[monthYear]) {
        acc[monthYear] += saleInCr;
      } else {
        acc[monthYear] = saleInCr;
      }
      return acc;
    }, {});

    const sortedData =
      chartDataNew &&
      Object.fromEntries(
        Object.entries(chartDataNew)?.sort(([dateA], [dateB]) => {
          // Parse the dates in "MM-YYYY" format
          const [monthA, yearA] = dateA.split("-").map(Number);
          const [monthB, yearB] = dateB.split("-").map(Number);
          const dateObjA = new Date(yearA, monthA - 1); // JS months are 0-indexed
          const dateObjB = new Date(yearB, monthB - 1);
          return dateObjA - dateObjB;
        })
      );
    return {
      data: {
        labels: sortedData && Object.keys(sortedData),
        datasets: [
          {
            label: chartData["2"]?.title,
            color: "#8feac5",
            backgroundColor: "rgba(143, 234, 197, .25)",
            borderColor: "#8feac5",
            pointHoverBorderColor: "#8feac5",
            fill: true,
            barPercentage: 0.1,
            categoryPercentage: 0.1,
            borderWidth: 2,
            lineTension: 0.1,
            pointBorderColor: "transparent",
            pointBackgroundColor: "transparent",
            pointHoverBackgroundColor: "#fff",
            data: sortedData && Object.values(sortedData),
          },
        ],
      },
    };
  }, [chartData]);

  const thirdChartData = useMemo(() => {
    const data = chartData["3"]?.slot_data;
    const chartDataNew = data?.reduce((acc, { month, sum_equal }) => {
      const monthYear = month;
      const saleInCr = sum_equal / 10000000;
      if (acc[monthYear]) {
        acc[monthYear] += saleInCr;
      } else {
        acc[monthYear] = saleInCr;
      }
      return acc;
    }, {});

    const sortedData =
      chartDataNew &&
      Object.fromEntries(
        Object.entries(chartDataNew)?.sort(([dateA], [dateB]) => {
          // Parse the dates in "MM-YYYY" format
          const [monthA, yearA] = dateA.split("-").map(Number);
          const [monthB, yearB] = dateB.split("-").map(Number);
          const dateObjA = new Date(yearA, monthA - 1); // JS months are 0-indexed
          const dateObjB = new Date(yearB, monthB - 1);
          return dateObjA - dateObjB;
        })
      );
    return {
      data: {
        labels: sortedData && Object.keys(sortedData),
        dataUnit: "BTC",
        datasets: [
          {
            label: chartData["3"]?.title,
            color: "#0069FF",
            backgroundColor: "rgba(26, 120, 255,0.25)",
            borderColor: "#0069FF",
            pointHoverBorderColor: "#0069FF",
            fill: true,
            barPercentage: 0.1,
            categoryPercentage: 0.1,
            borderWidth: 2,
            lineTension: 0.1,
            pointBorderColor: "transparent",
            pointBackgroundColor: "transparent",
            pointHoverBackgroundColor: "#fff",
            data: sortedData && Object.values(sortedData),
          },
        ],
      },
    };
  }, [chartData]);

  // const themeColors = [
  //   "rgba(0, 105, 255, 0.7)",   // Blue with 70% opacity
  //   "rgba(255, 106, 0, 0.7)",   // Orange with 70% opacity
  //   "rgba(75, 168, 8, 0.7)",    // Green with 70% opacity
  //   "rgba(0, 105, 255, 0.5)",   // Blue with 50% opacity
  //   "rgba(255, 106, 0, 0.5)",   // Orange with 50% opacity
  //   "rgba(75, 168, 8, 0.5)",    // Green with 50% opacity
  //   "rgba(0, 105, 255, 0.3)",   // Blue with 30% opacity
  //   "rgba(255, 106, 0, 0.3)",   // Orange with 30% opacity
  //   "rgba(75, 168, 8, 0.3)",    // Green with 30% opacity
  // ];
  // const forthChartData = useMemo(() => {
  //   const groupedData = {};
  //   const data = chartData["4"]?.slot_data;
  //   data?.forEach(({ month, item_code, total_billed_amount }) => {
  //     if (!groupedData[month]) {
  //       groupedData[month] = {};
  //     }
  //     groupedData[month][item_code] = (groupedData[month][item_code] || 0) + total_billed_amount;
  //   });

  //   // Extract unique months and item codes
  //   const months = Object.keys(groupedData).sort((a, b) => {
  //     const [monthA, yearA] = a.split("-")?.map(Number);
  //     const [monthB, yearB] = b.split("-")?.map(Number);
  //     return new Date(yearA, monthA - 1) - new Date(yearB, monthB - 1);
  //   });

  //   const itemCodes = [...new Set(data?.map((d) => d.item_code))];

  //   // Prepare datasets
  //   const datasets = itemCodes?.map((item_code, index) => ({
  //     label: item_code,
  //     data: months.map((month) => (groupedData[month][item_code] || 0) / 10000000), // Convert to Cr
  //     backgroundColor:themeColors[index % themeColors.length],
  //   }));

  //   return {
  //     data: {
  //       labels: months,
  //       datasets,
  //     },
  //   };
  // }, [chartData]);

  const forthChartData = useMemo(() => {
    const data = chartData["4"]?.slot_data || [];

    // Group data by item_code and sum total_billed_amount
    const groupedData = data.reduce((acc, { item_code, total_billed_amount }) => {
      acc[item_code] = (acc[item_code] || 0) + total_billed_amount;
      return acc;
    }, {});

    // Extract labels (item codes) and values (total_billed_amount)
    const labels = Object.keys(groupedData);
    const values = Object.values(groupedData).map((amount) => (amount / 10000000).toFixed(2)); // Convert to Cr format

    // Define theme colors
    const themeColors = [
      "#0069FF",
      "#ff6a00",
      "#4ba808",
      "rgba(0, 105, 255, 0.7)",
      "rgba(255, 106, 0, 0.7)",
      "rgba(75, 168, 8, 0.7)",
      "rgba(0, 105, 255, 0.5)",
      "rgba(255, 106, 0, 0.5)",
      "rgba(75, 168, 8, 0.5)",
      "rgba(255, 106, 0, 0.3)",
    ];

    return {
      data: {
        labels, // Labels are now item codes
        datasets: [
          {
            data: values,
            backgroundColor: themeColors.slice(0, labels.length), // Use theme colors dynamically
            hoverOffset: 4,
          },
        ],
      },
    };
  }, [chartData]);

  const fifthChartData = useMemo(() => {
    const data = chartData["5"]?.slot_data || [];

    // Group data by region (item_code) and sum total_billed_amount
    const groupedData = data.reduce((acc, { item_code, total_billed_amount }) => {
      acc[item_code] = (acc[item_code] || 0) + total_billed_amount;
      return acc;
    }, {});

    // Extract labels (regions) and values (total_billed_amount in Cr format)
    const labels = Object.keys(groupedData);
    const values = Object.values(groupedData).map((amount) => (amount / 1_00_00_000).toFixed(2)); // Convert to Cr format

    // Define theme colors for each region
    const themeColors = ["#0069FF", "#ff6a00", "#4ba808", "rgba(0, 105, 255, 0.7)", "rgba(255, 106, 0, 0.7)"];

    return {
      data: {
        labels, // Labels are now regions
        datasets: [
          {
            data: values,
            backgroundColor: themeColors.slice(0, labels.length), // Assign theme colors dynamically
            hoverOffset: 4,
          },
        ],
      },
    };
  }, [chartData]);

  const themeColors = [
    "rgba(0, 105, 255, 0.7)", // Blue
    "rgba(255, 106, 0, 0.7)", // Orange
    "rgba(75, 168, 8, 0.7)", // Green
  ];
  const sixthChartData = useMemo(() => {
    const data = chartData["6"]?.slot_data || [];

    // Group data by item_code
    const groupedData = data.reduce((acc, { month, item_code, total_billed_amount }) => {
      if (!acc[item_code]) acc[item_code] = {};
      acc[item_code][month] = (acc[item_code][month] || 0) + total_billed_amount;
      return acc;
    }, {});

    // Extract unique months and sort them in ascending order (YYYY-MM format)
    const allMonths = [...new Set(data.map(({ month }) => month))].sort((a, b) => {
      const [aMonth, aYear] = a.split("-").map(Number);
      const [bMonth, bYear] = b.split("-").map(Number);
      return aYear === bYear ? aMonth - bMonth : aYear - bYear;
    });

    // Create datasets
    const datasets = Object.keys(groupedData).map((item_code, index) => ({
      label: item_code,
      backgroundColor: themeColors[index % themeColors.length], // Cycle through theme colors
      data: allMonths.map(
        (month) => ((groupedData[item_code][month] || 0) / 1_00_00_000).toFixed(2) // Convert to Cr format
      ),
    }));

    return {
      data: {
        labels: allMonths,
        datasets,
      },
    };
  }, [chartData]);

  return (
    <>
      <Head title="Homepage"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Welcome to i9-Insights!
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <BlockDes>
                <b>Values are in crores</b>
              </BlockDes>
              <BlockDes>
                <b>Entity Type:</b> Distributor Door{" "}
              </BlockDes>
              <BlockDes>(Last 4 months data)</BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            <Col md="6" xxl="4">
              <PreviewAltCard className="h-100">
                <h6 className="title">{chartData["1"]?.title}</h6>
                <p>{chartData["1"]?.tag}</p>
                <div className="nk-sales-ck large pt-4" style={{ height: "300px" }}>
                  <LineChartExample data={firstChartData.data} yTickLabel="Cr" />
                </div>
              </PreviewAltCard>
            </Col>
            <Col md="6" xxl="4">
              <PreviewCard className="h-100">
                <h6 className="title">{chartData["2"]?.title}</h6>
                <p>{chartData["2"]?.tag}</p>
                <div className="nk-order-ovwg-ck" style={{ height: "300px" }}>
                  <LineChartExample data={secondChartData.data} yTickLabel="Cr" />
                </div>
              </PreviewCard>
            </Col>
            <Col md="6" xxl="4">
              <PreviewCard className="h-100">
                <h6 className="title">{chartData["3"]?.title}</h6>
                <p>{chartData["3"]?.tag}</p>
                <div className="nk-sales-ck large pt-4" style={{ height: "300px" }}>
                  <LineChartExample data={thirdChartData.data} yTickLabel="Cr" />
                </div>
              </PreviewCard>
            </Col>
            <Col md="6" xxl="4">
              <PreviewCard className="h-100">
                <h6 className="title">{chartData["4"]?.title}</h6>
                {/* <p>Month: {chartData["4"]?.slot_data?.[0].month}</p> */}
                <div style={{ height: "250px" }}>
                  <PieChartExample data={forthChartData.data} yTickLabel="Cr" />
                </div>
              </PreviewCard>
            </Col>
            <Col md="6" xxl="4">
              <PreviewCard className="h-100">
                <h6 className="title">{chartData["5"]?.title}</h6>
                <p>{chartData["5"]?.tag}</p>
                <div style={{ height: "250px" }}>
                  <PieChartExample data={fifthChartData.data} yTickLabel="Cr" />
                </div>
              </PreviewCard>
            </Col>
            <Col md="6" xxl="4">
              <PreviewCard className="h-100">
                <h6 className="title">{chartData["6"]?.title}</h6>
                <p>{chartData["6"]?.tag}</p>
                <div style={{ height: "300px" }}>
                  <BarChartExample data={sixthChartData.data} yTickLabel="Cr" />
                </div>
              </PreviewCard>
            </Col>
          </Row>
        </Block>
      </Content>
    </>
  );
};
export default Homepage;
