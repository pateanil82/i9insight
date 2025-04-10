import React, { useContext, useMemo, useState } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { BarChartExample, PreviewCard } from "../../components/Component";
import { Col, Row, Card, CardTitle } from "reactstrap";
import ReportTable from "./ReportTable";
import { ReportContext } from "./ReportContext";
import ReportForm from "./ReportForm";
import SalesTrendTable from "./SalesTrendTable";
import SalesThroughTable from "./SalesThroughTable";

const ReportContainer = () => {
  const { noSalesData, salesExportData, reportName } = useContext(ReportContext);
  const [reportLoader, setReportLoader] = useState(false);
  // const formatDate = (timestamp) => {
  //   const date = new Date(timestamp);
  //   const month = date.toLocaleString("default", { month: "short" });
  //   const year = date.getFullYear();
  //   return `${month} ${year}`;
  // };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits for day
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // const chartData = salesData?.reduce((acc, { invoicedate, Billed_Amount }) => {
  //   const monthYear = formatDate(invoicedate);
  //   if (acc[monthYear]) {
  //     acc[monthYear] += Billed_Amount;
  //   } else {
  //     acc[monthYear] = Billed_Amount;
  //   }
  //   return acc;
  // }, {});

  const chartData = salesExportData?.reduce((acc, { invoicedate, Billed_Amount }) => {
    const formattedDate = formatDate(invoicedate);
    if (acc[formattedDate]) {
      acc[formattedDate] += Billed_Amount;
    } else {
      acc[formattedDate] = Billed_Amount;
    }
    return acc;
  }, {});

  const labels = useMemo(() => {
    if (chartData) {
      return Object.keys(chartData);
    }
  }, [chartData]);
  const data = useMemo(() => {
    if (chartData) {
      return Object.values(chartData);
    }
  }, [chartData]);

  const barChartData = {
    labels: labels,
    dataUnit: "INR",
    datasets: [
      {
        label: "Billed Amount",
        backgroundColor: "#1a78ff",
        data: data,
      },
    ],
  };

  return (
    <>
      <Head title="Report Page" />
      <Content>
        <PreviewCard className="h-100">
          <ReportForm reportLoader={reportLoader} setReportLoader={setReportLoader} />
          {noSalesData ? (
            <>
              <div className="border-bottom mt-4" />
              <Row>
                <Col sm="12">
                  <Card body>
                    <CardTitle tag="h5">No Data found </CardTitle>
                  </Card>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <div className="border-bottom mt-4" />
              {reportName === "sales_trend" || reportName === "stock_cover" ? (
                <SalesTrendTable />
              ) : reportName === "sales_through" ? (
                <SalesThroughTable />
              ) : (
                <ReportTable />
              )}
              {reportName === "date_wise" ||
                (reportName === "month_wise" && Object.keys(chartData).length > 0 && (
                  <>
                    <div className="border-bottom mt-4" />
                    <div style={{ height: "250px" }}>
                      <BarChartExample legend={true} data={barChartData} />
                    </div>
                  </>
                ))}
            </>
          )}
        </PreviewCard>
      </Content>
    </>
  );
};

export default ReportContainer;
