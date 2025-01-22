import React, { useState } from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import { TCDoughnut } from "../../charts/analytics/AnalyticsCharts";

const TrafficDougnut = () => {
  return (
    <React.Fragment>
      {" "}
      <div className="traffic-channel">
        <div className="traffic-channel-doughnut-ck" style={{ height: "200px" }}>
          <TCDoughnut className="analytics-doughnut"></TCDoughnut>
        </div>
      </div>
    </React.Fragment>
  );
};
export default TrafficDougnut;
