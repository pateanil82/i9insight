import React, { forwardRef, useContext, useMemo, useState } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { BarChartExample, Icon, LineChartExample, PreviewCard, RSelect } from "../../components/Component";
import { Button, Col, Label, Row, FormGroup, Spinner, Card, CardTitle } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import * as Yup from "yup";
import ReportTable from "./ReportTable";
import { barChartMultiple, solidLineChart } from "../components/charts/ChartData";
import { ReportContext } from "./ReportContext";
import moment from "moment";
import { getSalesReport } from "../../services/reportServices";
import ZoneField from "./ZoneField";

const viewReportSchema = Yup.object().shape({
  zone: Yup.string().required("Field is required"),
  startRange: Yup.string().required("Field is required"),
  endRange: Yup.string().required("Field is required"),
  customerType: Yup.object().required("Field is required"),
  // customerName: Yup.object().required("Field is required"),
});

const StyledErrorMessage = styled.span`
  color: #e85347;
  font-size: 11px;
  font-style: italic;
`;
const ExampleCustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
  <div onClick={onClick} ref={ref}>
    <div className="form-icon form-icon-right">
      <Icon name="calendar"></Icon>
    </div>
    <input className="form-control date-picker" type="text" value={value} onChange={onChange} />
  </div>
));

const ReportContainer = () => {
  const {
    entityData,
    entityTypeData,
    setSelectedEntityType,
    zoneCode,
    setSalesData,
    itemGroupData,
    salesData,
    noSalesData,
    setNoSalesData,
  } = useContext(ReportContext);
  const [reportLoader, setReportLoader] = useState(false);
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    console.log("console_date", date);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };
  const handleSubmit = async (data) => {
    const params = {
      from_date: moment(data.startRange).format("DD-MM-YYYY"),
      to_date: moment(data.endRange).format("DD-MM-YYYY"),
      entity_type: data.customerType.value,
      // customerName: data.customerName.id,
      zone_code: zoneCode,
    };
    try {
      setReportLoader(true);
      const response = await getSalesReport(params);
      if (response?.data) {
        setSalesData(response.data);
      } else {
        setNoSalesData("No data Found");
      }
      console.log("console_sales_res", response);
    } catch (error) {
      console.log("console_sales_error", error);
    } finally {
      setReportLoader(false);
    }
  };
  const chartData = salesData?.reduce((acc, { invoicedate, Billed_Amount }) => {
    const monthYear = formatDate(invoicedate);
    if (acc[monthYear]) {
      acc[monthYear] += Billed_Amount;
    } else {
      acc[monthYear] = Billed_Amount;
    }
    return acc;
  }, {});

  const labels = useMemo(() => {
    if (chartData) {
      return Object.keys(chartData);
    }
  }, [chartData]);
  const data = useMemo(() => {
    if (chartData) {
      return Object.values(chartData);
    }
  }, [chartData]);

  const barChartData = {
    labels: labels,
    dataUnit: "INR",
    datasets: [
      {
        label: "Billed Amount",
        backgroundColor: "#1a78ff",
        data: data,
      },
    ],
  };
  return (
    <>
      <Head title="Blank Page" />
      <Content>
        <PreviewCard className="h-100">
          <Formik
            initialValues={{
              startRange: null,
              endRange: null,
              zone: null,
              customerType: null,
              customerName: null,
              itemGroup: null,
              reportName: null,
            }}
            validationSchema={viewReportSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Row>
                  <Col md={6}>
                    <ZoneField fieldName="zone" setFieldValue={setFieldValue} />
                    <ErrorMessage name="zone" component={StyledErrorMessage} className="invalid" />
                  </Col>
                  <Col md={3}>
                    <FormGroup className="form-group">
                      <Label>
                        Start Date<span className="text-danger"> *</span>
                      </Label>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="calendar"></Icon>
                        </div>
                        <DatePicker
                          name="startRange"
                          selected={values.startRange}
                          className="form-control date-picker"
                          onChange={(value) => {
                            setFieldValue("startRange", value);
                          }}
                          customInput={<ExampleCustomInput />}
                        />
                      </div>
                      <ErrorMessage name="startRange" component={StyledErrorMessage} className="invalid" />
                    </FormGroup>
                  </Col>

                  <Col md={3}>
                    <FormGroup>
                      <Label>
                        End Date<span className="text-danger"> *</span>
                      </Label>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="calendar"></Icon>
                        </div>
                        <DatePicker
                          name="endRange"
                          selected={values.endRange}
                          className="form-control date-picker"
                          onChange={(value) => {
                            setFieldValue("endRange", value);
                          }}
                          customInput={<ExampleCustomInput />}
                        />
                      </div>
                      <ErrorMessage name="endRange" component={StyledErrorMessage} className="invalid" />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="customerType">
                        Customer Type<span className="text-danger"> *</span>
                      </Label>
                      <Field name="customerType" className="form-control">
                        {({ field, form }) => (
                          <>
                            <RSelect
                              {...field}
                              placeholder="Customer Type"
                              isClearable
                              onChange={(value) => {
                                form.setFieldValue(field.name, value);
                                setSelectedEntityType(value.value);
                                setFieldValue("customerName", "");
                              }}
                              options={entityTypeData?.map((item) => ({ label: item, value: item }))}
                              value={field.value}
                            />
                          </>
                        )}
                      </Field>
                      <ErrorMessage name="customerType" component={StyledErrorMessage} className="invalid" />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="customerName">
                        Customer Name <span className="text-danger"> *</span>
                      </Label>
                      <Field name="customerName" className="form-control">
                        {({ field, form }) => (
                          <>
                            <RSelect
                              {...field}
                              placeholder="Customer Name"
                              isClearable
                              onChange={(value) => {
                                form.setFieldValue(field.name, value);
                              }}
                              options={entityData || []}
                              value={field.value}
                              getOptionLabel={(item) => item.entity_name}
                              getOptionValue={(item) => item.id}
                            />
                          </>
                        )}
                      </Field>
                      <ErrorMessage name="customerName" component={StyledErrorMessage} className="invalid" />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="itemGroup">Item Group</Label>
                      <Field name="itemGroup" className="form-control">
                        {({ field, form }) => (
                          <>
                            <RSelect
                              {...field}
                              placeholder="Item Group"
                              isClearable
                              onChange={(value) => {
                                form.setFieldValue(field.name, value);
                              }}
                              options={itemGroupData?.map((item) => ({ label: item, value: item }))}
                              value={field.value}
                            />
                          </>
                        )}
                      </Field>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="reportName">Report Name</Label>
                      <Field name="reportName" className="form-control">
                        {({ field, form }) => (
                          <>
                            <RSelect
                              {...field}
                              placeholder="Report Name"
                              isClearable
                              onChange={(value) => {
                                form.setFieldValue(field.name, value);
                              }}
                              options={[{ value: "test", label: "Test" }]}
                              value={field.value}
                            />
                          </>
                        )}
                      </Field>
                    </FormGroup>
                  </Col>

                  <Col className="col-12">
                    <ul className="align-center justify-content-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit" disabled={reportLoader}>
                          {reportLoader && <Spinner size="sm" />}
                          View Report
                        </Button>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
          {noSalesData ? (
            <>
              <div className="border-bottom mt-4" />
              <Row>
                <Col sm="12">
                  <Card body>
                    <CardTitle tag="h5">No Data found </CardTitle>
                  </Card>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <div className="border-bottom mt-4" />
              <ReportTable />
              {Object.keys(chartData).length > 0 && (
                <>
                  <div className="border-bottom mt-4" />
                  <div style={{ height: "250px" }}>
                    <BarChartExample legend={true} data={barChartData} />
                  </div>
                </>
              )}
            </>
          )}
        </PreviewCard>
      </Content>
    </>
  );
};

export default ReportContainer;
