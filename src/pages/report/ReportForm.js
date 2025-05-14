import React, { useContext, useEffect } from "react";
import * as Yup from "yup";
import { Col, Row, FormGroup, Label, Button, Spinner } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ReportContext } from "./ReportContext";
import moment from "moment";
import { getSalesReport } from "../../services/reportServices";
import ZoneField from "./ZoneField";
import styled from "styled-components";
import { RSelect } from "../../components/Component";
import { reportData } from "./data";
import DateWiseReport from "./DateWiseReport";
import MonthWiseReportForm from "./MonthWiseReportForm";
import SalesTrendReportForm from "./SalesTrendReportForm";
import SalesThroughReport from "./SalesThroughReport";

const dateReportSchema = Yup.object().shape({
  from_date: Yup.string().required("Field is required"),
  to_date: Yup.string().required("Field is required"),
  entity_type: Yup.object().required("Field is required"),
  attr_value: Yup.object().required("Field is required"),
});
const monthReportSchema = Yup.object().shape({
  month: Yup.object().required("Field is required"),
  year: Yup.string().required("Field is required"),
  entity_type: Yup.object().required("Field is required"),
  attr_value: Yup.object().required("Field is required"),
});
const salesTrendReportSchema = Yup.object().shape({
  attr1: Yup.object().required("Field is required"),
  attr2: Yup.object().required("Field is required"),
  entity_type: Yup.object().required("Field is required"),
});
const salesThroughReportSchema = Yup.object().shape({
  child_type: Yup.object().required("Field is required"),
  child_name: Yup.object().required("Field is required"),
  para_name: Yup.object().required("Field is required"),
  para_value: Yup.object().required("Field is required"),
});
const stockCoverReportSchema = Yup.object().shape({
  entity_type: Yup.object().required("Field is required"),
  attr_value: Yup.object().required("Field is required"),
  para_value: Yup.object().required("Field is required"),
  child_name: Yup.object().required("Field is required"),
});

const StyledErrorMessage = styled.span`
  color: #e85347;
  font-size: 11px;
  font-style: italic;
`;

const ReportForm = ({ reportLoader, setReportLoader }) => {
  const {
    entityTypeData,
    setSelectedEntityType,
    zoneCode,
    setSalesData,
    itemGroupData,
    setNoSalesData,
    itemValueData,
    itemNameData,
    setReportName,
    reportName,
    selectedItemName,
    setSalesExportData,
    selectedParaValue,
    entityData,
    setSelectedItemName,
  } = useContext(ReportContext);

  const handleSubmit = async (data) => {
    let uri;
    let payload;
    switch (data.reportName.value) {
      case "date_wise":
        uri = "sales/date_wise_sales";
        payload = {
          from_date: moment(data.from_date).format("DD-MM-YYYY"),
          to_date: moment(data.to_date).format("DD-MM-YYYY"),
          entity_type: data.entity_type.value,
          zone_code: zoneCode,
          attr_name: "Item_Group",
          attr_value: data.attr_value.value,
          limit: 100,
        };
        if (data?.para_names?.value) {
          payload.para_names = data.para_names.value;
        }
        if (data?.para_values?.length > 0) {
          payload.para_values = data.para_values.map((item) => item.value).toString();
        }
        if (data?.parent_name?.length > 0) {
          payload.parent_name = data.parent_name.map((item) => item.value).toString();
        }
        if (data?.child_type?.length > 0) {
          payload.child_type = data.child_type.value;
        }
        if (data?.child_name?.length > 0) {
          payload.child_name = data.child_name.map((item) => item.value).toString();
        }
        break;
      case "month_wise":
        uri = "sales/month_wise_sales";
        payload = {
          month: data.month.value,
          year: moment(data.year).format("YYYY"),
          entity_type: data.entity_type.value,
          zone_code: zoneCode,
          attr_name: "Item_Group",
          attr_value: data.attr_value.value,
          limit: 100,
        };
        if (data?.para_names?.value) {
          payload.para_names = data.para_names.value;
        }
        if (data?.para_values?.length > 0) {
          payload.para_values = data.para_values.map((item) => item.value).toString();
        }
        if (data?.parent_name?.length > 0) {
          payload.parent_name = data.parent_name.map((item) => item.value).toString();
        }
        if (data?.child_type?.length > 0) {
          payload.child_type = data.child_type.value;
        }
        if (data?.child_name?.length > 0) {
          payload.child_name = data.child_name.map((item) => item.value).toString();
        }
        break;
      case "sales_trend":
        uri = "sales/sales_trend";
        payload = {
          zone_code: zoneCode,
          entity_type: data.entity_type.value,
          attr1: data.attr1.value,
          attr2: data.attr2.value,
          days_block: data.days_block ?? 7,
          no_of_blocks: data.no_of_blocks ?? 2,
        };
        break;
      case "sales_through":
        uri = "sales/sales_through";
        payload = {
          child_type: data.child_type.value,
          child_name: data.child_name.value,
          para_name: data.para_name.value,
          para_value: data.para_value.value,
        };
        break;
      case "stock_cover":
        uri = "stocks/stock_cover";
        payload = {
          entity_type: data.entity_type.value,
          entity_name: data.child_name.value,
          item_group: data.attr_value.value,
          fashion_grade: data.para_value.value,
        };
        break;
      default:
        return null;
    }

    try {
      setReportLoader(true);

      const response = await getSalesReport(payload, uri);
      if (data.reportName.value === "date_wise" || data.reportName.value === "month_wise") {
        const responseExport = await getSalesReport({ ...payload, limit: 0 }, uri);
        if (responseExport) {
          setSalesExportData(JSON.parse(responseExport.data));
        }
      }
      if (
        data.reportName.value === "sales_trend" ||
        data.reportName.value === "sales_through" ||
        data.reportName.value === "stock_cover"
      ) {
        setSalesData(response.data);
        setSalesExportData(response.data);
      } else {
        if (response.data) {
          setSalesData(JSON.parse(response.data));
        } else {
          setNoSalesData("No data Found");
          setSalesData([]);
          setSalesExportData([]);
        }
      }
    } catch (error) {
      console.log("console_sales_error", error);
    } finally {
      setReportLoader(false);
    }
  };

  const removeErrors = (setFieldError, setFieldTouched, setFieldValue) => {
    setFieldError("from_date", null);
    setFieldError("to_date", null);
    setFieldError("zone_code", null);
    setFieldError("entity_type", null);
    setFieldError("attr_value", null);
    setFieldError("para_values", null);
    setFieldError("para_names", null);
    setFieldError("parent_name", null);
    setFieldError("child_name", null);
    setFieldError("child_type", null);
    setFieldError("month", null);
    setFieldError("year", null);
    setFieldError("attr1", null);
    setFieldError("attr2", null);
    setFieldError("para_name", null);
    setFieldError("para_value", null);
    setFieldError("item_group", null);
    setFieldValue("from_date", null);
    setFieldValue("to_date", null);
    setFieldValue("zone_code", null);
    setFieldValue("entity_type", null);
    setFieldValue("attr_value", null);
    setFieldValue("para_values", null);
    setFieldValue("para_names", null);
    setFieldValue("parent_name", null);
    setFieldValue("child_name", null);
    setFieldValue("child_type", null);
    setFieldValue("month", null);
    setFieldValue("year", null);
    setFieldValue("attr1", null);
    setFieldValue("attr2", null);
    setFieldValue("para_name", null);
    setFieldValue("para_value", null);
    setFieldValue("item_group", null);
    setFieldValue("days_block", 7);
    setFieldValue("no_of_blocks", 2);
    setFieldTouched("from_date", false);
    setFieldTouched("to_date", false);
    setFieldTouched("zone_code", false);
    setFieldTouched("entity_type", false);
    setFieldTouched("attr_value", false);
    setFieldTouched("para_values", false);
    setFieldTouched("para_names", false);
    setFieldTouched("parent_name", false);
    setFieldTouched("child_name", false);
    setFieldTouched("child_type", false);
    setFieldTouched("month", false);
    setFieldTouched("year", false);
    setFieldTouched("attr1", false);
    setFieldTouched("attr2", false);
    setFieldTouched("para_name", false);
    setFieldTouched("para_value", false);
    setFieldTouched("item_group", false);
  };

  useEffect(() => {
    if (reportName === "stock_cover") {
      setSelectedItemName("Fashion_Grade");
    }
  }, [reportName]);

  return (
    <Formik
      initialValues={{
        from_date: null,
        to_date: null,
        zone_code: null,
        entity_type: null,
        reportName: null,
        attr_value: null,
        para_values: null,
        para_names: null,
        parent_name: null,
        child_name: null,
        child_type: null,
        month: null,
        year: null,
        attr1: null,
        attr2: null,
        para_name: null,
        para_value: null,
        item_group: null,
        days_block: null,
        no_of_blocks: null,
      }}
      validate={(values) => {
        const errors = {};

        // Dynamically determine the schema based on reportName
        let schema;
        switch (values.reportName?.value) {
          case "date_wise":
            schema = dateReportSchema;
            break;
          case "month_wise":
            schema = monthReportSchema;
            break;
          case "sales_trend":
            schema = salesTrendReportSchema;
            break;
          case "sales_through":
            schema = salesThroughReportSchema;
            break;
          case "stock_cover":
            schema = stockCoverReportSchema;
            break;
          default:
            schema = null;
        }
        if (schema) {
          try {
            schema.validateSync(values, { abortEarly: false });
          } catch (yupError) {
            yupError.inner.forEach((error) => {
              errors[error.path] = error.message;
            });
          }
        }

        // Return Formik-compatible errors object
        return errors;
      }}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ values, setFieldValue, setFieldError, setFieldTouched }) => (
        <Form>
          <Row>
            <Col md={12}>
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
                          removeErrors(setFieldError, setFieldTouched, setFieldValue);
                          form.setFieldValue(field.name, value);
                          setReportName(value.value);
                          setSalesData([]);
                          setSalesExportData([]);
                        }}
                        options={reportData}
                        value={field.value}
                      />
                    </>
                  )}
                </Field>
              </FormGroup>
            </Col>
            {values?.reportName?.value !== "sales_through" && (
              <>
                <Col md={12}>
                  <FormGroup>
                    <ZoneField fieldName="zone_code" setFieldValue={setFieldValue} />
                    <ErrorMessage name="zone_code" component={StyledErrorMessage} className="invalid" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="entity_type">
                      Select Entity Type<span className="text-danger"> *</span>
                    </Label>
                    <Field name="entity_type" className="form-control">
                      {({ field, form }) => (
                        <>
                          <RSelect
                            {...field}
                            placeholder="Select Entity Type"
                            isClearable
                            onChange={(value) => {
                              form.setFieldValue(field.name, value);
                              setSelectedEntityType(value.value);
                              setFieldValue("child_type", null);
                              setFieldValue("child_name", null);
                              setFieldValue("parent_name", null);
                            }}
                            options={entityTypeData?.map((item) => ({ label: item, value: item }))}
                            value={field.value}
                          />
                        </>
                      )}
                    </Field>
                    <ErrorMessage name="entity_type" component={StyledErrorMessage} className="invalid" />
                  </FormGroup>
                </Col>
                {values?.reportName?.value === "stock_cover" && (
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="child_name">
                        Select Entity Name<span className="text-danger"> *</span>
                      </Label>
                      <Field name="child_name" className="form-control">
                        {({ field, form }) => (
                          <>
                            <RSelect
                              {...field}
                              placeholder="Select Entity Name"
                              isClearable
                              onChange={(value) => {
                                form.setFieldValue(field.name, value);
                              }}
                              options={entityData?.map((item) => ({ label: item, value: item }))}
                              value={field.value}
                            />
                          </>
                        )}
                      </Field>
                      <ErrorMessage name="child_name" component={StyledErrorMessage} className="invalid" />
                    </FormGroup>
                  </Col>
                )}
                <Col md={values?.reportName?.value === "stock_cover" ? 12 : 6}>
                  <FormGroup>
                    <Label htmlFor="attr_value">
                      Brand<span className="text-danger"> *</span>
                    </Label>
                    <Field name="attr_value" className="form-control">
                      {({ field, form }) => (
                        <>
                          <RSelect
                            {...field}
                            placeholder="Brand"
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
                    <ErrorMessage name="attr_value" component={StyledErrorMessage} className="invalid" />
                  </FormGroup>
                </Col>
              </>
            )}
            {values?.reportName?.value === "date_wise" && (
              <DateWiseReport values={values} setFieldValue={setFieldValue} />
            )}
            {values?.reportName?.value === "month_wise" && (
              <MonthWiseReportForm values={values} setFieldValue={setFieldValue} />
            )}
            {values?.reportName?.value === "sales_trend" && (
              <SalesTrendReportForm values={values} setFieldValue={setFieldValue} />
            )}
            {values?.reportName?.value === "sales_through" && (
              <SalesThroughReport values={values} setFieldValue={setFieldValue} />
            )}
            {values?.reportName?.value === "stock_cover" && (
              <>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="para_name">
                      Attribute Name <span className="text-danger"> *</span>
                    </Label>
                    <Field name="para_name" className="form-control">
                      {({ field, form }) => (
                        <>
                          <RSelect
                            {...field}
                            placeholder="Attribute Name "
                            isClearable
                            isDisabled
                            onChange={(value) => {
                              form.setFieldValue(field.name, value);
                              setSelectedItemName(value.value);
                              setFieldValue("para_value", null);
                            }}
                            options={itemNameData?.map((item) => ({ label: item, value: item }))}
                            value={{ label: "Fashion_Grade", value: "Fashion_Grade" }}
                          />
                        </>
                      )}
                    </Field>
                    <ErrorMessage name="para_name" component={StyledErrorMessage} className="invalid" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="para_value">
                      Attributes Value<span className="text-danger"> *</span>
                    </Label>
                    <Field name="para_value" className="form-control">
                      {({ field, form }) => (
                        <>
                          <RSelect
                            {...field}
                            placeholder="Attributes Value"
                            isClearable
                            onChange={(value) => {
                              form.setFieldValue(field.name, value);
                            }}
                            options={itemValueData?.map((item) => ({ label: item, value: item }))}
                            value={field.value}
                          />
                        </>
                      )}
                    </Field>
                    <ErrorMessage name="para_value" component={StyledErrorMessage} className="invalid" />
                  </FormGroup>
                </Col>
              </>
            )}

            <Col className="col-12">
              <ul className="align-center justify-content-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                <li>
                  <Button color="primary" size="md" type="submit" disabled={reportLoader || !values?.reportName?.value}>
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
  );
};

export default ReportForm;
