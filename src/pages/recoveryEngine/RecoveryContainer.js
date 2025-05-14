import React, { useContext, useMemo } from "react";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import { Block, PreviewCard, BarChartExample } from "../../components/Component";
import moment from "moment";
import FormContainer from "./FormContainer";
import { RecoveryContext } from "./RecoveryContext";
import { Col, Row } from "reactstrap";

const generateColorPalette = (total) => {
  const colors = [];
  for (let i = 0; i < total; i++) {
    // Generate HSL with low lightness for dark colors
    const hue = Math.floor(Math.random() * 360);
    const saturation = 55 + Math.random() * 10; // 85–95% for vibrancy
    const lightness = 70 + Math.random() * 10; // 35–45% for dark tones
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
};
const Recovery = () => {
  const {
    salesSummaryReportData,
    noReportData,
    compareValue,
    summaryValue,
    groupValue1,
    groupAttr2,
  } = useContext(RecoveryContext);


  const chartData = useMemo(() => {
    if (groupValue1 || groupAttr2) {
      const grouped = {};

      salesSummaryReportData.forEach((item) => {
        const key = compareValue === "QoQ" ? item.FYQR : item.MNYR;
        if (!grouped[key]) grouped[key] = {};

        if (item.RPTV >= 0) {
          if (groupValue1) {
            grouped[key][item.BK02] = item.RPTV;
          } else {
            grouped[key][item.BK01] = item.RPTV;
          }
        }
      });
      const allLabels = Object.keys(grouped).sort((a, b) => {
        return moment(a, "MM-YYYY").toDate() - moment(b, "MM-YYYY").toDate();
      });

      const allSizes = Array.from(new Set(Object.values(grouped).flatMap((entry) => Object.keys(entry))));

      const datasets = allSizes.map((size, idx) => {
        const color = generateColorPalette(allSizes.length);
        return {
          label: size,
          data: allLabels.map((label) => grouped[label]?.[size] ?? 0),
          backgroundColor: color,
          borderColor: color,
          borderRadius: 8,
          borderWidth: 1,
        };
      });

      return {
        labels: allLabels,
        datasets,
      };
    } else {
      const getLabelKey = () => {
        return compareValue === "QoQ" ? "FYQR" : "MNYR";
      };

      const labelKey = getLabelKey();
      const valueKey = "RPTV";

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

      if (compareValue === "QoQ") {
        const yearQuarterMap = {};

        salesSummaryReportData.forEach((item) => {
          const [quarter, year] = item.FYQR.split("-");
          if (!yearQuarterMap[year]) {
            yearQuarterMap[year] = {};
          }
          yearQuarterMap[year][quarter] = item[valueKey] ?? 0;
        });

        const years = Object.keys(yearQuarterMap).sort();
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
              borderRadius: 8,
            },
          ],
        };
      }
    }
  }, [salesSummaryReportData, compareValue, summaryValue, groupValue1, groupAttr2]);

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
                  {groupValue1 && <h5 className="mt-3 text-center">{summaryValue}</h5>}
                  <div className="nk-sales-ck large pt-2" style={{ minHeight: "350px" }}>
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
