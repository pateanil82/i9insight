import React, { useState } from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import SaleRevenue from "../components/partials/default/sale-revenue/SaleRevenue";
import ActiveSubscription from "../components/partials/default/active-subscription/ActiveSubscription";
import AvgSubscription from "../components/partials/default/avg-subscription/AvgSubscription";
import SalesOverview from "../components/partials/default/sales-overview/SalesOverview";
import TransactionTable from "../components/partials/default/transaction/Transaction";
import RecentActivity from "../components/partials/default/recent-activity/Activity";
import NewsUsers from "../components/partials/default/new-users/User";
import Support from "../components/partials/default/support-request/Support";
import Notifications from "../components/partials/default/notification/Notification";
import { DropdownToggle, DropdownMenu, Card, UncontrolledDropdown, DropdownItem } from "reactstrap";
import {
  Block,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  PreviewCard,
  PreviewAltCard,
  BlockBetween,
  PieChartExample,
  LineChartExample,
  BarChartExample,
} from "../components/Component";
import TransListBasic from "./pre-built/trans-list/TransListBasic";
import { DoubleBar, StackedBarChart } from "../components/partials/charts/default/Charts";
import { PieController } from "chart.js";
import { saleRevenue } from "../components/partials/charts/default/Data";
import { barChartData, barChartStacked, doughnutChartData, solidLineChart } from "./components/charts/ChartData";
import OrderOverview from "../components/partials/crypto/order-overview/OrderOverview";
import UserActivity from "../components/partials/crypto/user-activity/UserActivity";
import TrafficDougnut from "../components/partials/analytics/traffic-dougnut/TrafficDoughnut";
import ActiveUser from "../components/partials/analytics/active-user/ActiveUser";

const Homepage = () => {
  const [sm, updateSm] = useState(false);
  return (
    <>
      <Head title="Homepage"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Welcome to I9-Insights!
              </BlockTitle>
              {/* <BlockDes className="text-soft">
                <p>Welcome to DashLite Dashboard Template</p>
              </BlockDes> */}
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v" />
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    {/* <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                          <Icon className="d-none d-sm-inline" name="calender-date" />
                          <span>
                            <span className="d-none d-md-inline">Last</span> 30 Days
                          </span>
                          <Icon className="dd-indc" name="chevron-right" />
                        </DropdownToggle>
                        <DropdownMenu>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#!"
                              >
                                <span>Last 30 days</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#dropdownitem"
                              >
                                <span>Last 6 months</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#dropdownitem"
                              >
                                <span>Last 3 weeks</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li> */}
                    {/* <li className="nk-block-tools-opt">
                      <Button color="primary">
                        <Icon name="reports" />
                        <span>Reports</span>
                      </Button>
                    </li> */}
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            <Col xxl="4">
              <PreviewAltCard className="h-100">
                <h6 className="title">Sales Overview</h6>
                <p>In 30 days sales of product subscription.</p>  
                <SalesOverview />
              </PreviewAltCard>
            </Col>
            <Col xxl="4">
              <PreviewCard className="h-100">
                <h6 className="title">Orders Overview</h6>
                <p>In last days buy and sells overview.</p>
                <OrderOverview />
              </PreviewCard>
            </Col>
            <Col xxl="4">
              <PreviewCard className="h-100">
                <h6 className="title">User Activities</h6>
                <p> Data of last 15 days is shown in given graph.</p>
                <UserActivity />
              </PreviewCard>
            </Col>
            <Col xxl="4">
              <PreviewCard className="h-100">
                <h6 className="title">Traffic Channel</h6>
                <p>In last 15 days buy and sells overview.</p>
                <TrafficDougnut />
              </PreviewCard>
            </Col>
            <Col xxl="4">
              <PreviewCard className="h-100">
                <div style={{ height: "250px" }}>
                  <h6 className="title">Trend Intersection</h6>
                  <p>A chart highlight relation between two values.</p>
                  <LineChartExample legend={true} data={solidLineChart} />
                </div>
              </PreviewCard>
            </Col>
            <Col xxl="4">
              <PreviewCard className="h-100">
                <h6 className="title">Active Users</h6>
                <p>How do your users visited in the time.</p>
                <ActiveUser />
              </PreviewCard>
            </Col>
            <Col>
              <Card className="card-bordered card-full w-100">
                {/* <TransactionTable /> */}
                <TransListBasic />
              </Card>
            </Col>
            <Col xxl="4" md="6">
              {/* <Card className="card-bordered card-full">
                <RecentActivity />
              </Card> */}
            </Col>
            {/* <Col xxl="4" md="6">
              <Card className="card-bordered card-full">
                <NewsUsers />
              </Card>
            </Col> */}
            {/* <Col lg="6" xxl="4">
              <Card className="card-bordered h-100">
                <Support />
              </Card>
            </Col> */}
            {/* <Col lg="6" xxl="4">
              <Card className="card-bordered h-100">
                <Notifications />
              </Card>
            </Col> */}
          </Row>
        </Block>
      </Content>
    </>
  );
};
export default Homepage;
