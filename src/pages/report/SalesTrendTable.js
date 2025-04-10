import React, { useContext, useEffect, useMemo, useState } from "react";
import { ReactDataTable } from "../../components/Component";
import { ReportContext } from "./ReportContext";
import "./CustomTableStyles.css";

const SalesTrendTable = () => {
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
  //   const mainHeaders = salesData[1].split(",").map((header) => header.trim());
  const [selectValue, setSelectValue] = useState(null);

  const processCoverData = (data) => {
    const header = data[0].split(",").map((value) => value.trim());
    const dataRows = data.slice(1).map((row) => row.split(",").map((value) => value.trim()));
    const cleanedData = dataRows.map((row) => {
      const obj = {};
      obj[header[0]] = row[0];
      obj[header[1]] = row[1];
      obj[header[2]] = row[2];
      obj[header[3]] = row[3];
      obj[header[4]] = row[4];
      obj[header[5]] = row[5];
      obj[header[6]] = row[6];
      obj[header[7]] = row[7];
      obj[header[8]] = row[8];

      return obj;
    });
    return cleanedData;
  };

  const processCleanedSalesData = (rawData) => {
    const subHeaders = rawData[3].split(",").map((header) => header.trim());
    const value = Number(selectValue);
    const dataRows = rawData.slice(4).map((row) => row.split(",").map((value) => value.trim()));
    const cleanedData = dataRows.map((row) => {
      const obj = {};
      if (value === 1) {
        subHeaders.slice(1, 5).forEach((header, index) => {
          obj[`Week-1 ${header}`] = row[1 + index];
        });
      } else {
        subHeaders.slice(1 + (value - 1) * 4, 5 + (value - 1) * 4).forEach((header, index) => {
          obj[`Week-${value} ${header}`] = row[1 + (value - 1) * 4 + index];
        });
      }

      // Add NSQ Delta and GSV Delta
      obj["NSQ Delta"] = row[9];
      obj["GSV Delta"] = row[10];

      // Add Brand Cat (first column)
      obj[`${selectedItemName} ${selectedParaValue}`] = row[0];

      return obj;
    });

    return cleanedData;
  };

  const newSalesData = useMemo(() => {
    if (salesData?.length > 0) {
      if (reportName === "sales_trend") {
        return processCleanedSalesData(salesData);
      } else {
        return processCoverData(salesData);
      }
    } else {
      return [];
    }
  }, [salesData, selectValue]);

  const column = [
    {
      name: `Attributes`,
      selector: (row) => row[`${selectedItemName} ${selectedParaValue}`],
      sortable: true,
    },
    {
      name: "GSV",
      selector: (row) => row[`Week-${selectValue} GSV`],
      sortable: true,
    },
    {
      name: "NSQ",
      selector: (row) => row[`Week-${selectValue} NSQ`],
      sortable: true,
    },
    {
      name: "GSV Mix",
      selector: (row) => row[`Week-${selectValue} GSV Mix`],
      sortable: true,
    },
    {
      name: "MD%",
      selector: (row) => row[`Week-${selectValue} MD%`],
      sortable: true,
    },

    {
      name: "GSV Delta",
      selector: (row) => row["GSV Delta"],
      sortable: true,
    },
    {
      name: "NSQ Delta",
      selector: (row) => row["NSQ Delta"],
      sortable: true,
    },
  ];

  const stockColumn = [
    {
      name: `Entity Name`,
      selector: (row) => row[`Entity Name`],
      sortable: true,
      wrap: true,
    },
    {
      name: "Type",
      selector: (row) => row[`Type`],
      sortable: true,
    },
    {
      name: "Item Code",
      selector: (row) => row[`Item Code`],
      sortable: true,
    },
    {
      name: "Item Description",
      selector: (row) => row[`Item Description`],
      sortable: true,
      wrap: true,
    },
    {
      name: "Fashion Grade",
      selector: (row) => row[`Fashion Grade`],
      sortable: true,
    },

    {
      name: "Category Description",
      selector: (row) => row["Category Description"],
      sortable: true,
    },

    {
      name: "Rate",
      selector: (row) => row["Rate"],
      sortable: true,
    },
    {
      name: "Qty",
      selector: (row) => row["Qty"],
      sortable: true,
    },
    {
      name: "Value",
      selector: (row) => row["Value"],
      sortable: true,
    },
  ];

  const mainHeaders = useMemo(() => {
    if (salesData?.length > 0) {
      return salesData[1]
        .split(",")
        .map((header) => header.trim())
        .slice(1)
        .filter((item) => item);
    } else {
      return [];
    }
  }, [salesData]);

  useEffect(() => {
    if (mainHeaders.length > 0) {
      setSelectValue(mainHeaders[0].split("-")[1]);
    }
  }, [mainHeaders]);
  console.log("newSalesData", newSalesData);

  if (!newSalesData || newSalesData.length === 0) {
    return <div>No data available</div>;
  }
  return (
    <ReactDataTable
      data={newSalesData}
      columns={reportName === "sales_trend" ? column : stockColumn}
      actions
      pagination
      options={mainHeaders}
      searchName={reportName === "sales_trend" ? `${selectedItemName} ${selectedParaValue}` : "Entity Name"}
      exportName={{ reportName, selectedEntityType, startDate, endDate }}
      exportData={salesExportData}
      selectValue={selectValue}
      setSelectValue={setSelectValue}
    />
  );
};

export default SalesTrendTable;
