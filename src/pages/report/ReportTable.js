import React, { useContext, useMemo } from "react";
import TransListBasic from "../pre-built/trans-list/TransListBasic";
import { ReportContext } from "./ReportContext";
import { ReactDataTable } from "../../components/Component";

const ReportTable = () => {
  const { salesData } = useContext(ReportContext);

  const column = [
    {
      name: "Invoice No",
      selector: (row) => row.Invoice_No,
    },
    {
      name: "Name",
      selector: (row) => row.Item_Name,
    },
    {
      name: "Group",
      selector: (row) => row.Item_Group,
    },
    {
      name: "Invoice Status",
      selector: (row) => row.Invoice_Status,
    },
    {
      name: "Transaction Status",
      selector: (row) => row.transaction_status,
    },
    {
      name: "Invoice Date",
      selector: (row) => row.Invoice_Date,
    },
  ];
  const tableData = useMemo(() => {
    return salesData?.map((item) => ({
      Invoice_No: item.Invoice_No,
      Item_Name: item.Item_Name,
      Item_Group: item.Item_Group,
      Invoice_Status: item.Invoice_Status,
      transaction_status: item.transaction_status,
      Invoice_Date: item.Invoice_Date,
    }));
  }, [salesData]);
  return <>{salesData?.length > 0 && <ReactDataTable data={tableData} columns={column} actions pagination />}</>;
};

export default ReportTable;
