import React, { useContext, useMemo } from "react";
import { Block, BlockHead, BlockTitle } from "../../components/Component";
import { StoreAnalysisContext } from "./StoreAnalysisContext";
import { Card } from "reactstrap";

const StoreDetails = () => {
  const { storeApiData } = useContext(StoreAnalysisContext);

  const storeInfoDate = useMemo(() => {
    if (storeApiData) {
      return [
        { label: "Store Name", value: storeApiData.Store_Detail[0] },
        { label: "Store Code", value: storeApiData.Store_Detail[1] },
        { label: "ASM", value: storeApiData.Store_Detail[2] },
        { label: "RSM", value: storeApiData.Store_Detail[3] },
        { label: "Last Stock Update", value: storeApiData.Last_Stock_Date },
        { label: "Last Sales invoice", value: storeApiData.Last_Invoice_Date },
        { label: "Width %", value: storeApiData.Width },
        { label: "Store Profitability", value: storeApiData.Store_Profitability },
      ];
    } else {
      return [];
    }
  }, [storeApiData]);

  return (
    <div className="card-inner">
      <Block>
        <BlockHead>
          <BlockTitle tag="h5">Store Information</BlockTitle>
        </BlockHead>
        <Card className="card-bordered">
          <ul className="data-list is-compact">
            {storeInfoDate &&
              storeInfoDate.map((item) => (
                <li className="data-item">
                  <div className="data-col">
                    <div className="data-label">{item.label}</div>
                    <div className="data-value">{item.value}</div>
                  </div>
                </li>
              ))}
          </ul>
        </Card>
      </Block>
    </div>
  );
};

export default StoreDetails;
