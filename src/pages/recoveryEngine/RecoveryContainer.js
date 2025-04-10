import React, { useContext, useMemo, useState } from "react";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockBetween,
  PreviewCard,
  LineChartExample,
  BarChartExample,
} from "../../components/Component";
import moment from "moment";
import FormContainer from "./FormContainer";
import { RecoveryContext } from "./RecoveryContext";
import ActiveUser from "../../components/partials/analytics/active-user/ActiveUser";
import { Card, Col, Row } from "reactstrap";
import RecoveryDataCard from "./RecoveryDataCard";

const Recovery = () => {
  const { salesSummaryReportData, noReportData, compareValue, summaryValue } = useContext(RecoveryContext);
  const chartData = useMemo(() => {
    const getLabelKey = () => {
      return compareValue === "QoQ" ? "FYQR" : "MNYR";
    };

    const modelKeyMap = {
      Basket_Size: "QWBS",
      Full_Price_Ratio: "FPSR",
      Discounted_Price_Ratio: "DPSR",
    };

    const labelKey = getLabelKey();
    const valueKey = "RPTV";
    // const valueKey = modelKeyMap[summaryValue] || "QWBS";

    const sortedData = [...salesSummaryReportData].sort((a, b) => {
      if (labelKey === "MNYR") {
        const dateA = moment(a.MNYR, "MM-YYYY");
        const dateB = moment(b.MNYR, "MM-YYYY");
        return dateA - dateB;
      } else {
        const fyA = parseInt(a.FYQR.replace(/[^\d]/g, ""));
        const fyB = parseInt(b.FYQR.replace(/[^\d]/g, ""));
        return fyA - fyB;
      }
    });

    // const customTooltipLabels = sortedData.map((item) => (item.BK02 ? `${item.BK01} - ${item.BK02}` : item.BK01));
    if (compareValue === "QoQ") {
      // const valueKey = modelKeyMap[summaryValue] || "QWBS";

      const yearQuarterMap = {};

      salesSummaryReportData.forEach((item) => {
        const [quarter, year] = item.FYQR.split("-");
        if (!yearQuarterMap[year]) {
          yearQuarterMap[year] = {};
        }
        yearQuarterMap[year][quarter] = item[valueKey] ?? 0;
      });

      const years = Object.keys(yearQuarterMap).sort(); // X-axis labels
      const quarters = [
        {
          label: "Q1",
          backgroundColor: `rgba(26, 120, 255, 0.6)`,
          borderColor: `#0069FF`,
        },
        {
          label: "Q2",
          backgroundColor: `rgba(255, 85, 0, 0.6)`,
          borderColor: `#ff5500`,
        },
        {
          label: "Q3",
          backgroundColor: `rgba(89, 217, 54, 0.6)`,
          borderColor: `#59d936`,
        },
        {
          label: "Q4",
          backgroundColor: `rgba(255, 211, 135, 0.6)`,
          borderColor: `#ffd387`,
        },
      ]; // Datasets

      const datasets = quarters.map((quarter, index) => ({
        label: quarter.label,
        data: years.map((year) => yearQuarterMap[year]?.[quarter.label] ?? 0),
        backgroundColor: quarter.backgroundColor,
        borderColor: quarter.borderColor,
        borderWidth: 1,
      }));

      return {
        labels: years,
        datasets,
      };
    } else if (compareValue === "YoY") {
      const labelKey = "MNYR";
      const labels = salesSummaryReportData.map((item) => item[labelKey]);
      const values = salesSummaryReportData.map((item) => item[valueKey] ?? 0);
      return {
        labels,
        datasets: [
          {
            label: summaryValue,
            data: values,
            backgroundColor: ["rgba(26, 120, 255,0.6)", "rgba(255, 85, 0, 0.6)", "rgba(89, 217, 54, 0.6)"],
            borderColor: ["#0069FF", "#ff5500", "#59d936"],
            borderWidth: 1,
          },
        ],
      };
    } else {
      // Default case: show normal bar chart by MNYR or FYQR
      const labelKey = compareValue === "QoQ" ? "FYQR" : "MNYR";

      const labels = sortedData.map((item) =>
        labelKey === "MNYR" ? moment(item.MNYR, "MM-YYYY").format("MMM-YYYY") : item.FYQR
      );

      const values = sortedData.map((item) => item[valueKey] ?? 0);

      return {
        labels,
        datasets: [
          {
            label: summaryValue,
            data: values,
            backgroundColor: "rgba(26, 120, 255,0.6)",
            borderColor: "#0069FF",
            borderWidth: 1,
          },
        ],
      };
    }
  }, [salesSummaryReportData, compareValue, summaryValue]);

  return (
    <>
      <Head title="Data Prism"></Head>
      <Content>
        <Block>
          <PreviewCard>
            <FormContainer />
            <div className="border-bottom mt-4" />

            {salesSummaryReportData.length > 0 ? (
              <Row>
                <Col md={12}>
                  {(compareValue === "QoQ" || compareValue === "YoY") && (
                    <h5 className="mt-3 text-center">{summaryValue}</h5>
                  )}
                  <div className="nk-sales-ck large pt-2" style={{ height: "300px" }}>
                    <BarChartExample data={chartData} yTickLabel="" legend={compareValue !== "YoY"} />
                  </div>
                </Col>
                <Col md={12}>
                  <div className="border-bottom mt-4 mb-4" />
                </Col>
              </Row>
            ) : noReportData ? (
              <Col md={12}>
                <div className="border-bottom mb-3 mt-1 " />
                <h3 className="text-center">No data available</h3>
              </Col>
            ) : null}
          </PreviewCard>
        </Block>
      </Content>
    </>
  );
};
export default Recovery;
