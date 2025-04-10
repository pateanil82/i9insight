import React, { useContext, useMemo } from "react";
import { ReportContext } from "./ReportContext";
import { ReactDataTable } from "../../components/Component";

const ReportTable = () => {
  const {
    salesData,
    reportName,
    selectedItemName,
    selectedEntityType,
    selectedParaValue,
    startDate,
    endDate,
    salesExportData,
  } = useContext(ReportContext);
  const column = useMemo(() => {
    switch (reportName) {
      default:
        return [
          {
            name: "Invoice No",
            selector: (row) => row.Invoice_No,
            sortable: true,
          },
          {
            name: "Invoice Date",
            selector: (row) => row.Invoice_Date,
            sortable: true,
          },
          {
            name: "Customer Name",
            selector: (row) => row.Child_Name,
            sortable: true,
          },
          {
            name: "Customer Type",
            selector: (row) => row.Child_Type,
            sortable: true,
          },
          {
            name: "Quantity",
            selector: (row) => row.Billed_QTY,
            sortable: true,
          },
          {
            name: "MRP",
            selector: (row) => row.Mrp,
            sortable: true,
          },
          {
            name: "Discount",
            selector: (row) => row.Discount_Percent,
            sortable: true,
          },
          {
            name: "Amount",
            selector: (row) => row.Billed_Amount,
            sortable: true,
          },

          {
            name: "Transaction Status",
            selector: (row) => row.transaction_status,
            sortable: true,
          },
        ];
    }
  }, [reportName, selectedItemName, selectedParaValue]);

  const tableData = useMemo(() => {
    switch (reportName) {
      default:
        return salesData?.map((item) => ({
          Invoice_No: item.Invoice_No,
          Invoice_Date: item.Invoice_Date,
          Item_Name: item.Item_Name,
          Child_Name: item.Child_Name,
          Child_Type: item.Child_Type,
          Billed_QTY: item.Billed_QTY,
          Mrp: Number(item.Mrp),
          Discount_Percent: item.Discount_Percent,
          Billed_Amount: item.Billed_Amount,
          transaction_status: item.transaction_status,
        }));
    }
  }, [salesData]);

  const exportData = useMemo(() => {
    switch (reportName) {
      default:
        return salesExportData.map(({ _id, updatedate, invoicedate, createdate, ...rest }) => rest);
    }
  }, [salesExportData]);

  return (
    <>
      {salesData?.length > 0 && (
        <ReactDataTable
          data={tableData}
          columns={column}
          actions
          pagination
          searchName={`${selectedItemName} ${selectedParaValue}`}
          exportName={{ reportName, selectedEntityType, startDate, endDate }}
          exportData={exportData}
        />
      )}
    </>
  );
};

export default ReportTable;
