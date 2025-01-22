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
} from "../components/Component";
import { AppContext } from "../context/appContext";

const Homepage = () => {
  const [sm, updateSm] = useState(true);
  const { chartData } = useContext(AppContext);

  const firstChartData = useMemo(() => {
    const data = chartData["1"]?.slot_data;
    const chartDataNew = data?.reduce((acc, { month, sale_amt }) => {
      const monthYear = month;
      if (acc[monthYear]) {
        acc[monthYear] += sale_amt;
      } else {
        acc[monthYear] = sale_amt;
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
      if (acc[monthYear]) {
        acc[monthYear] += sale_amt;
      } else {
        acc[monthYear] = sale_amt;
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
        // dataUnit: "USD",
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
      if (acc[monthYear]) {
        acc[monthYear] += sum_equal;
      } else {
        acc[monthYear] = sum_equal;
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

  const forthChartData = useMemo(() => {
    const data = chartData["4"]?.slot_data;
    const chartDataNew = data?.reduce((acc, { month, total_billed_amount }) => {
      const monthYear = month;
      if (acc[monthYear]) {
        acc[monthYear] += total_billed_amount;
      } else {
        acc[monthYear] = total_billed_amount;
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
            label: chartData["4"]?.title,
            backgroundColor: ["rgba(156, 171, 255, 0.8)", "rgba(244, 170, 164, 0.8)"],
            borderColor: "#fff",

            data: sortedData && Object.values(sortedData),
          },
        ],
      },
    };
  }, [chartData]);

  const fifthChartData = useMemo(() => {
    const data = chartData["5"]?.slot_data;
    const chartDataNew = data?.reduce((acc, { month, total_billed_amount }) => {
      const monthYear = month;
      if (acc[monthYear]) {
        acc[monthYear] += total_billed_amount;
      } else {
        acc[monthYear] = total_billed_amount;
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
        // dataUnit: "USD",
        datasets: [
          {
            label: chartData["5"]?.title,
            backgroundColor: ["rgba(156, 171, 255, 0.8)", "rgba(143, 234, 197, 0.8)"],
            borderColor: "#fff",

            data: sortedData && Object.values(sortedData),
          },
        ],
      },
    };
  }, [chartData]);

  const sixthChartData = useMemo(() => {
    const data = chartData["6"]?.slot_data;
    const chartDataNew = data?.reduce((acc, { month, total_billed_amount }) => {
      const monthYear = month;
      if (acc[monthYear]) {
        acc[monthYear] += total_billed_amount;
      } else {
        acc[monthYear] = total_billed_amount;
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
        // dataUnit: "USD",
        datasets: [
          {
            label: chartData["6"]?.title,
            color: "#8feac5",
            backgroundColor: "#8feac5",
            barPercentage: 0.8,
            categoryPercentage: 0.6,
            data: sortedData && Object.values(sortedData),
          },
        ],
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
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v" />
                </Button>
              </div>
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
                  <LineChartExample data={firstChartData.data} options={firstChartData.options} />
                </div>
              </PreviewAltCard>
            </Col>
            <Col md="6" xxl="4">
              <PreviewCard className="h-100">
                <h6 className="title">{chartData["2"]?.title}</h6>
                <p>{chartData["2"]?.tag}</p>
                <div className="nk-order-ovwg-ck" style={{ height: "300px" }}>
                  <LineChartExample data={secondChartData.data} options={secondChartData.options} />
                </div>
              </PreviewCard>
            </Col>
            <Col md="6" xxl="4">
              <PreviewCard className="h-100">
                <h6 className="title">{chartData["3"]?.title}</h6>
                <p>{chartData["3"]?.tag}</p>
                <div className="nk-sales-ck large pt-4" style={{ height: "300px" }}>
                  <LineChartExample data={thirdChartData.data} options={thirdChartData.options} />
                </div>
              </PreviewCard>
            </Col>
            <Col md="6" xxl="4">
              <PreviewCard className="h-100">
                <h6 className="title">{chartData["4"]?.title}</h6>
                <p>{chartData["4"]?.tag}</p>
                <div style={{ height: "250px" }}>
                  <PieChartExample data={forthChartData.data} />
                </div>
              </PreviewCard>
            </Col>
            <Col md="6" xxl="4">
              <PreviewCard className="h-100">
                <h6 className="title">{chartData["5"]?.title}</h6>
                <p>{chartData["5"]?.tag}</p>
                <div style={{ height: "250px" }}>
                  <PieChartExample data={fifthChartData.data} />
                </div>
              </PreviewCard>
            </Col>
            <Col md="6" xxl="4">
              <PreviewCard className="h-100">
                <h6 className="title">{chartData["6"]?.title}</h6>
                <p>{chartData["6"]?.tag}</p>
                <div style={{ height: "300px" }}>
                  <BarChartExample data={sixthChartData.data} />
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
