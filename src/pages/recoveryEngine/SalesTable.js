import React, { useContext, useMemo } from "react";
import { ReactDataTable } from "../../components/Component";
import { RecoveryContext } from "./RecoveryContext";

const SalesTable = () => {
  const { salesSummaryData } = useContext(RecoveryContext);
  const column = useMemo(() => {
    return Object.keys(salesSummaryData[0]).map((item) => ({
      name: item,
      selector: (row) => row[item],
      sortable: true,
    }));
  }, [salesSummaryData]);

  if (salesSummaryData.length === 0) {
    return <div>No data available</div>;
  }
  return <>{salesSummaryData?.length > 0 && <ReactDataTable data={salesSummaryData} columns={column} pagination />}</>;
};

export default SalesTable;
