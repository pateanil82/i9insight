import React, { useContext, useMemo } from "react";
import { Card, CardBody, Row, Spinner } from "reactstrap";
import { Col, ReactDataTable } from "../../components/Component";
import { StoreAnalysisContext } from "./StoreAnalysisContext";

const BlockTable = () => {
  const { blockApiData, blockApiLoader } = useContext(StoreAnalysisContext);

  const tableData = useMemo(() => {
    return blockApiData?.Depth?.[0]?.Item_List.map((item) => Object.values(item)[0]);
  }, [blockApiData]);

  const columns = [
    {
      name: "Item Code",
      selector: (row) => row.item_code,
      sortable: true,
    },
    {
      name: "Avg Stock",
      selector: (row) => row.avg_stock,
      sortable: true,
    },
    {
      name: "Sold Qty",
      selector: (row) => row.total_sold_qty,
      sortable: true,
    },
    {
      name: "Cover in days",
      selector: (row) => row.stock_cover_for_days,
      sortable: true,
    },
    {
      name: "Inventory turn",
      selector: (row) => row.inventory_turn,
      sortable: true,
    },
  ];
  return (
    <>
      <Row>
        <Col md={12} className="d-flex justify-center gap-3">
          {blockApiLoader ? (
            <>
              <span className="placeholder col-2 rounded"></span>
              <span className="placeholder col-2 rounded"></span>
              <span className="placeholder col-2 rounded"></span>
            </>
          ) : blockApiData?.Depth ? (
            <>
              <h6>Item Count: {blockApiData?.Depth?.[0]?.No_of_Items}</h6>
              <h6>Availability: {blockApiData?.Depth?.[0]?.Availability}</h6>
              <h6>Depth: {blockApiData?.Depth?.[0]?.Depth}</h6>
            </>
          ) : null}
        </Col>
        <Col md={12} className="mt-2">
          {blockApiLoader ? (
            <Card>
              <CardBody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <Row key={i} className="mb-2">
                    {Array.from({ length: 6 }).map((__, j) => (
                      <Col key={j} md={2}>
                        <span className="placeholder col-12 rounded" style={{ height: "20px" }}></span>
                      </Col>
                    ))}
                  </Row>
                ))}
              </CardBody>
            </Card>
          ) : tableData?.length > 0 ? (
            <ReactDataTable
              data={tableData}
              columns={columns}
              pagination
              searchName="item_code"
              searchPlaceHolder="Search by Item Code"
            />
          ) : (
            <div className="text-center py-5 text-muted">No data available</div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default BlockTable;
