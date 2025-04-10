import React, { useContext, useEffect, useMemo } from "react";
import { ReportContext } from "./ReportContext";
import {
  Block,
  DataTableBody,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  ReactDataTable,
} from "../../components/Component";
import classNames from "classnames";

const SubHeaderComponent = ({ subHeaderData }) => {
  const tableClass = classNames({
    table: true,
    "table-bordered": true,
    "table-striped": true,
    "table-hover": true,
  });
  return (
    <div className="w-100">
      <div className="mt-4" />
      <div className="w-100">
        <table className={tableClass}>
          <thead>
            <tr>
              <th colSpan={6} style={{ textAlign: "center" }}>
                {subHeaderData.name[0]}
              </th>
            </tr>
            <tr>
              <th colSpan={3} style={{ textAlign: "center" }}>
                {subHeaderData.attribute[0]}:{" "}
                <span style={{ fontWeight: "normal" }}> {subHeaderData.attribute[2]}</span>
              </th>
              <th colSpan={3} style={{ textAlign: "center" }}>
                {subHeaderData.attribute[1]}:{" "}
                <span style={{ fontWeight: "normal" }}> {subHeaderData.attribute[3]}</span>
              </th>
            </tr>
            <tr>
              <th style={{ textAlign: "left" }}>Levels</th>
              <th>First Sale Date</th>
              <th>Last Sale date</th>
              <th>Number of Days</th>
              <th>Sale through %</th>
              <th>Weekly Run Rate</th>
            </tr>
          </thead>
          <tbody>
            {subHeaderData.levelData.map((item) => (
              <tr>
                <td style={{ background: "transparent", textAlign: "left" }}>{item["Levels"] ?? "-"}</td>
                <td style={{ background: "transparent" }}>{item["First Sale Date"] ?? "-"}</td>
                <td style={{ background: "transparent" }}>{item["Last Sale date"] ?? "-"}</td>
                <td style={{ background: "transparent" }}>{item["NoDs"] ?? "-"}</td>
                <td style={{ background: "transparent" }}>{item["Sale through %"] ?? "-"}</td>
                <td style={{ background: "transparent" }}>{item["Weekly Run Rate"] ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-bottom mt-4" />
    </div>
  );
};

const SalesThroughTable = () => {
  const {
    salesData,
    selectedItemName,
    selectedParaValue,
    reportName,
    selectedEntityType,
    startDate,
    endDate,
    salesExportData,
  } = useContext(ReportContext);
  ` `;

  const processThroughData = (rawData) => {
    const dataRows = rawData.slice(6).map((row) => row.split(",").map((value) => value.trim()));
    const cleanedData = dataRows.map((row, index) => {
      const obj = {};
      if (index === 1) {
        obj["Sale Through days"] = row[12] ?? "";
      }
      obj["Level-1"] = row[0] ?? "";
      obj["Level-2"] = row[1] ?? "";
      obj["Level-3"] = row[2] ?? "";
      obj["Sale Value"] = row[4] ?? "";
      obj["Billed Qty"] = row[5] ?? "";
      obj["Sale Date"] = row[6] ?? "";
      obj["Cumilative Sales Amount"] = row[7] ?? "";
      obj["Cumulative Sale Qty"] = row[8] ?? "";
      obj["Cumulative closing Stock Qty"] = row[10] ?? "";

      return obj;
    });
    return cleanedData;
  };

  const newSalesData = useMemo(() => {
    if (salesData.length > 0) {
      return processThroughData(salesData);
    } else {
      return [];
    }
  }, [salesData]);

  const getSubHeaderData = (data) => {
    const dataRows = data.slice(0, 5).map((row) => row.split(",").map((value) => value.trim()));
    const name = dataRows[0];
    const attribute = dataRows[1];
    const levelData = dataRows.slice(3).map((row, index) => {
      const obj = {};
      if (index === 1) {
        obj["Sale through %"] = ((Number(newSalesData[1]["Billed Qty"]) / Number(row[3])) * 100).toFixed(0) ?? "";
        obj["Weekly Run Rate"] = (Number(newSalesData[1]["Billed Qty"]) / 7).toFixed(0) ?? "";
      }
      obj["Levels"] = row[0] ?? "";
      obj["First Sale Date"] = row[1] ?? "";
      obj["Last Sale date"] = row[2] ?? "";
      obj["Number of Days"] = row[3] ?? "";
      return obj;
    });
    return { name, attribute, levelData };
  };

  const subHeaderData = useMemo(() => {
    if (salesData.length > 0 && newSalesData.length > 0) {
      return getSubHeaderData(salesData);
    } else {
      return [];
    }
  }, [salesData, newSalesData]);

  const column = [
    {
      name: `Level-1`,
      selector: (row) => row[`Level-1`],
      sortable: true,
      wrap: true,
    },
    {
      name: `Level-2`,
      selector: (row) => row[`Level-2`],
      sortable: true,
      wrap: true,
    },
    {
      name: `Level-3`,
      selector: (row) => row[`Level-3`],
      sortable: true,
      wrap: true,
    },
    {
      name: `Sale Value`,
      selector: (row) => row[`Sale Value`],
      sortable: true,
    },
    {
      name: `Billed Qty`,
      selector: (row) => row[`Billed Qty`],
      sortable: true,
    },
    {
      name: `Sale Date`,
      selector: (row) => row[`Sale Date`],
      sortable: true,
    },
    {
      name: `Cumilative Sales Amount`,
      selector: (row) => row[`Cumilative Sales Amount`],
      sortable: true,
    },
    {
      name: `Cumulative Sale Qty`,
      selector: (row) => row[`Cumulative Sale Qty`],
      sortable: true,
    },
    {
      name: `Cumulative closing Stock Qty`,
      selector: (row) => row[`Cumulative closing Stock Qty`],
      sortable: true,
    },
  ];
  console.log("subHeaderData", subHeaderData);
  if (!newSalesData || newSalesData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <ReactDataTable
      data={newSalesData}
      columns={column}
      actions
      pagination
      subHeader
      subHeaderComponent={<SubHeaderComponent subHeaderData={subHeaderData} />}
      searchName={`Level-3`}
      exportName={{ reportName, selectedEntityType }}
      exportData={salesExportData}
    />
  );
};

export default SalesThroughTable;
