import React from "react";
import { Icon } from "../../../Component";
import { LineChart } from "../../charts/default/Charts";

const SalesOverview = () => {
  return (
    <React.Fragment>
      <div className="nk-sales-ck large pt-4" style={{ height: "300px" }}>
        <LineChart />
      </div>
    </React.Fragment>
  );
};
export default SalesOverview;
