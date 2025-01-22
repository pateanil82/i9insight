import React, { useState } from "react";
import Icon from "../../../icon/Icon";
import { UncontrolledDropdown, CardTitle, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
import { DoubleBar } from "../../charts/default/Charts";
import { Row, Col } from "../../../grid/Grid";
import { Link } from "react-router-dom";

const OrderOverview = () => {
  return (
    <React.Fragment>
      <div className="nk-order-ovwg">
        <Row className="g-4 align-end">
          <Col xxl="12">
            <div className="nk-order-ovwg-ck" style={{height:"300px"}}>
              <DoubleBar  />
            </div>
          </Col>
         
        </Row>
      </div>
    </React.Fragment>
  );
};
export default OrderOverview;
