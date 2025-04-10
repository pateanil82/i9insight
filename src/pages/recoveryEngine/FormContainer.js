import React, { useContext } from "react";
import { Button, RSelect } from "../../components/Component";
import { Col, Row, Spinner } from "reactstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { FormGroup, Label } from "reactstrap";
import { RecoveryContext } from "./RecoveryContext";
import SalesTable from "./SalesTable";
import RecoveryDataCard from "./RecoveryDataCard";

const StyledErrorMessage = styled.span`
  color: #e85347;
  font-size: 11px;
  font-style: italic;
`;

const FormContainer = () => {
  const recoverySchema = Yup.object().shape({
    entity_type: Yup.object().required("Field is required"),
    group_attr_1: Yup.object().required("Field is required"),
  });

  const {
    handleFormSubmit,
    recoveryData,
    setRecoveryData,
    entityTypesList,
    itemGroupData,
    fetchSalesKeyList,
    salesKeyList,
    fetchSalesKeyDistinctValue,
    salesKeyDistinctValueAttr1,
    salesKeyDistinctValueAttr2,
    summaryReport,
    salesSummaryData,
    groupValue1Option,
    groupValue2Option,
    reportAttrValue1Option,
    setReportAttrValue1Option,
    reportAttrValue2Option,
    setReportAttrValue2Option,
    salesSummaryReportData,
    handleReportSubmit,
    viewDataLoader,
    viewReportLoader,
    noData,
    tileData,
    setCompareValue,
    setSummaryValue,
    setSalesSummaryData,
    setSalesSummaryReportData,
  } = useContext(RecoveryContext);

  const handleSubmitViewDataForm = async (value) => {
    await handleFormSubmit(value);
    // handleResetForm(setFieldValue, setFieldTouched);
    // resetForm();
  };

  const handleSubmitViewReportDataForm = async (value) => {
    await handleReportSubmit(value);
    // handleResetForm(setFieldValue, setFieldTouched);
    // resetForm();
  };

  return (
    <Formik
      initialValues={{
        entity_type: null,
        item_group: null,
        filter_attr_1: null,
        filter_values_1: null,
        filter_attr_2: null,
        filter_values_2: null,
        group_attr_1: null,
        group_attr_2: null,
        process_type: null,
        group_values_1: null,
        group_values_2: null,
        report_name: null,
        filter_attr_r1: null,
        filter_values_r1: null,
        filter_attr_r2: null,
        filter_values_r2: null,
        period_filter: null,
      }}
      validate={(values) => {
        const errors = {};

        try {
          recoverySchema.validateSync(values, { abortEarly: false });
        } catch (yupError) {
          yupError.inner.forEach((error) => {
            errors[error.path] = error.message;
          });
        }

        // Return Formik-compatible errors object
        return errors;
      }}
      // onSubmit={(values, { resetForm }) => handleSubmitForm(values, resetForm)}
    >
      {({ values, setFieldValue, setFieldError, setFieldTouched }) => (
        <Form>
          <Row>
            <Col md={12} className="mb-2">
              <h6>Master</h6>
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
                        placeholder="Select Entity type"
                        isClearable
                        onChange={(value) => {
                          form.setFieldValue(field.name, value);
                          fetchSalesKeyList(value?.value);
                          setSalesSummaryData([]);
                          setSalesSummaryReportData([]);
                        }}
                        options={entityTypesList?.map((item) => ({ label: item, value: item }))}
                        value={field.value}
                      />
                    </>
                  )}
                </Field>
                <ErrorMessage name="entity_type" component={StyledErrorMessage} className="invalid" />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label htmlFor="item_group">Select Item Group</Label>
                <Field name="item_group" className="form-control">
                  {({ field, form }) => (
                    <>
                      <RSelect
                        {...field}
                        placeholder="Select Item Group"
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
                <ErrorMessage name="item_group" component={StyledErrorMessage} className="invalid" />
              </FormGroup>
            </Col>
            <Col md={12} className="mb-2">
              <div className="border-bottom mb-3 mt-1" />
              <h6>Data Range</h6>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor="filter_attr_1">Filter Attribute #1</Label>
                <Field name="filter_attr_1" className="form-control">
                  {({ field, form }) => (
                    <>
                      <RSelect
                        {...field}
                        placeholder="Filter Attribute #1"
                        isClearable
                        onChange={(value) => {
                          form.setFieldValue(field.name, value);
                          setSalesSummaryData([]);
                          setSalesSummaryReportData([]);

                          setFieldValue("filter_values_1", null);
                          if (value?.value) {
                            fetchSalesKeyDistinctValue(values.entity_type.value, value.value, "1");
                          }
                        }}
                        options={salesKeyList?.map((item) => ({ label: item, value: item }))}
                        value={field.value}
                      />
                    </>
                  )}
                </Field>
                <ErrorMessage name="filter_attr_1" component={StyledErrorMessage} className="invalid" />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label htmlFor="filter_values_1">Attribute Value #1</Label>
                <Field name="filter_values_1" className="form-control">
                  {({ field, form }) => (
                    <>
                      <RSelect
                        {...field}
                        placeholder="Attribute Value #1"
                        isClearable
                        onChange={(value) => {
                          form.setFieldValue(field.name, value);
                          setSalesSummaryData([]);
                          setSalesSummaryReportData([]);
                        }}
                        options={salesKeyDistinctValueAttr1?.map((item) => ({ label: item, value: item }))}
                        value={field.value}
                      />
                    </>
                  )}
                </Field>
                <ErrorMessage name="filter_values_1" component={StyledErrorMessage} className="invalid" />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label htmlFor="filter_attr_2">Filter Attribute #2</Label>
                <Field name="filter_attr_2" className="form-control">
                  {({ field, form }) => (
                    <>
                      <RSelect
                        {...field}
                        placeholder="Filter Attribute #2"
                        isClearable
                        onChange={(value) => {
                          form.setFieldValue(field.name, value);
                          setFieldValue("filter_values_2", null);
                          setSalesSummaryData([]);
                          setSalesSummaryReportData([]);

                          if (value?.value) {
                            fetchSalesKeyDistinctValue(values.entity_type.value, value.value, "2");
                          }
                        }}
                        options={salesKeyList?.map((item) => ({ label: item, value: item }))}
                        value={field.value}
                      />
                    </>
                  )}
                </Field>
                <ErrorMessage name="filter_attr_2" component={StyledErrorMessage} className="invalid" />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label htmlFor="filter_values_2">Attribute Value #2</Label>
                <Field name="filter_values_2" className="form-control">
                  {({ field, form }) => (
                    <>
                      <RSelect
                        {...field}
                        placeholder="Attribute Value #2"
                        isClearable
                        onChange={(value) => {
                          form.setFieldValue(field.name, value);
                          setSalesSummaryData([]);
                          setSalesSummaryReportData([]);
                        }}
                        options={salesKeyDistinctValueAttr2?.map((item) => ({ label: item, value: item }))}
                        value={field.value}
                      />
                    </>
                  )}
                </Field>
                <ErrorMessage name="filter_values_2" component={StyledErrorMessage} className="invalid" />
              </FormGroup>
            </Col>
            <Col md={12} className="mb-2">
              <div className="border-bottom mb-3 mt-1" />
              <h6>Data Set</h6>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor="group_attr_1">
                  Bucket Attribute #1<span className="text-danger"> *</span>
                </Label>
                <Field name="group_attr_1" className="form-control">
                  {({ field, form }) => (
                    <>
                      <RSelect
                        {...field}
                        placeholder="Bucket Attribute #1"
                        isClearable
                        onChange={(value) => {
                          form.setFieldValue(field.name, value);
                          setFieldValue("group_values_1", null);
                          setSalesSummaryData([]);
                          setSalesSummaryReportData([]);
                        }}
                        options={salesKeyList?.map((item) => ({ label: item, value: item }))}
                        value={field.value}
                      />
                    </>
                  )}
                </Field>
                <ErrorMessage name="group_attr_1" component={StyledErrorMessage} className="invalid" />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label htmlFor="group_attr_2">Bucket Attribute #2</Label>
                <Field name="group_attr_2" className="form-control">
                  {({ field, form }) => (
                    <>
                      <RSelect
                        {...field}
                        placeholder="Bucket Attribute #2"
                        isClearable
                        onChange={(value) => {
                          form.setFieldValue(field.name, value);
                          setFieldValue("group_values_2", null);
                          setSalesSummaryData([]);
                          setSalesSummaryReportData([]);
                        }}
                        options={salesKeyList?.map((item) => ({ label: item, value: item }))}
                        value={field.value}
                      />
                    </>
                  )}
                </Field>
                <ErrorMessage name="group_attr_2" component={StyledErrorMessage} className="invalid" />
              </FormGroup>
            </Col>
            {salesSummaryData.length > 0 && (
              <>
                {" "}
                <Col md={12} className="mb-2">
                  <div className="border-bottom mb-3 mt-3" />
                  <h6>Data Set Filters</h6>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="group_values_1">Filter value for Bucket #1</Label>
                    <Field name="group_values_1" className="form-control">
                      {({ field, form }) => (
                        <>
                          <RSelect
                            {...field}
                            placeholder="Filter value for Bucket #1"
                            isClearable
                            onChange={(value) => {
                              form.setFieldValue(field.name, value);
                            }}
                            options={groupValue1Option?.map((item) => ({ label: item, value: item }))}
                            value={field.value}
                          />
                        </>
                      )}
                    </Field>
                    <ErrorMessage name="group_values_1" component={StyledErrorMessage} className="invalid" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="group_values_2">Filter value for Bucket #2</Label>
                    <Field name="group_values_2" className="form-control">
                      {({ field, form }) => (
                        <>
                          <RSelect
                            {...field}
                            isDisabled={values.group_attr_2 === null}
                            placeholder="Filter value for Bucket #2"
                            isClearable
                            onChange={(value) => {
                              form.setFieldValue(field.name, value);
                            }}
                            options={groupValue2Option?.map((item) => ({ label: item, value: item }))}
                            value={field.value}
                          />
                        </>
                      )}
                    </Field>
                    <ErrorMessage name="group_values_2" component={StyledErrorMessage} className="invalid" />
                  </FormGroup>
                </Col>
              </>
            )}
            <Col md={12} className="mb-2">
              <div className="border-bottom mb-3 mt-1" />
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor="process_type">Compare Data</Label>
                <Field name="process_type" className="form-control">
                  {({ field, form }) => (
                    <>
                      <RSelect
                        {...field}
                        placeholder="Compare Data"
                        isClearable
                        onChange={(value) => {
                          form.setFieldValue(field.name, value);
                          if (value?.value) {
                            setCompareValue(value.value);
                            setSalesSummaryReportData([]);
                          } else {
                            setCompareValue(null);
                          }
                        }}
                        options={["Data", "MoM", "QoQ", "YoY"]?.map((item) => ({ label: item, value: item }))}
                        value={field.value}
                      />
                    </>
                  )}
                </Field>
                <ErrorMessage name="process_type" component={StyledErrorMessage} className="invalid" />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label htmlFor="period_filter">Period</Label>
                <Field name="period_filter" className="form-control" />
                <ErrorMessage name="period_filter" component={StyledErrorMessage} className="invalid" />
              </FormGroup>
            </Col>
            <Col md={3}>
              <ul className="align-end h-100 justify-content-end flex-wrap flex-sm-nowrap gx-4 gy-2">
                <li>
                  <Button
                    color="primary"
                    size="md"
                    // type="submit"
                    onClick={() => handleSubmitViewDataForm(values, "data")}
                    disabled={viewDataLoader}
                  >
                    {viewDataLoader && <Spinner size="sm" />}
                    View Data
                  </Button>
                </li>
                {/* <li className="custom-control-group">
                  <Field name="compareData" className="form-control">
                    {({ field, form }) => (
                      <>
                        <div className="custom-control custom-control-sm custom-checkbox custom-control-pro">
                          <input
                            disabled={recoveryData.length === 0}
                            type="checkbox"
                            className="custom-control-input"
                            name="btnCheckControl"
                            id="btnCheckControl1"
                            value={field.value}
                            onChange={(e) => {
                              form.setFieldValue(field.name, e.target.checked);
                              if (!e.target.checked) {
                                setRecoveryData([recoveryData[0]]);
                              }
                            }}
                          ></input>
                          <label
                            className="custom-control-label"
                            for="btnCheckControl1"
                            style={{ padding: "7px 18px 7px 38px" }}
                          >
                            Compare Data
                          </label>
                        </div>
                      </>
                    )}
                  </Field>
                </li> */}
              </ul>
            </Col>
            {salesSummaryData.length > 0 ? (
              <>
                <Col md={12}>
                  <div className="border-bottom mb-3 mt-1" />
                </Col>
                <Col md={3} className="mt-2">
                  <RecoveryDataCard
                    title="Sale as per MRP"
                    subtitle1="Amount"
                    value1={tileData.TAIM.toFixed(2)}
                    subtitle2="Qty"
                    value2={tileData.TOTQ}
                  />
                </Col>
                <Col md={3} className="mt-2">
                  <RecoveryDataCard
                    title="Full Price Sale"
                    subtitle1="Amount"
                    value1={tileData.TAND.toFixed(2)}
                    subtitle2="Qty"
                    value2={tileData.TQND}
                  />
                </Col>
                <Col md={3} className="mt-2">
                  <RecoveryDataCard
                    title="Discount Sale"
                    subtitle1="Amount"
                    value1={tileData.TAWD.toFixed(2)}
                    subtitle2="Qty"
                    value2={tileData.TQWD}
                  />
                </Col>
                <Col md={3} className="mt-2">
                  <RecoveryDataCard
                    title="Invoice"
                    subtitle1="Invoice count"
                    value1={tileData.INVC.toFixed(2)}
                    subtitle2="Ave disc/ Invoice"
                    value2={Number(tileData.avgDisc).toFixed(2)}
                  />
                </Col>

                <Col md={12} className="mb-2">
                  <div className="border-bottom mb-3 mt-3" />
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="report_name">Data Model</Label>
                    <Field name="report_name" className="form-control">
                      {({ field, form }) => (
                        <>
                          <RSelect
                            {...field}
                            placeholder="Select Model"
                            isClearable
                            onChange={(value) => {
                              form.setFieldValue(field.name, value);
                              setSalesSummaryReportData([]);
                              if (value?.value) {
                                setSummaryValue(value.value);
                              } else {
                                setSummaryValue(null);
                              }
                            }}
                            options={summaryReport?.map((item) => ({ label: item, value: item }))}
                            value={field.value}
                          />
                        </>
                      )}
                    </Field>
                    <ErrorMessage name="report_name" component={StyledErrorMessage} className="invalid" />
                  </FormGroup>
                </Col>
                <Col md={12} className="mb-2 mt-2">
                  <h6>Model Data Filter</h6>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="filter_attr_r1">Filter Attribute #1</Label>
                    <Field name="filter_attr_r1" className="form-control">
                      {({ field, form }) => (
                        <>
                          <RSelect
                            {...field}
                            placeholder="Filter Attribute #1"
                            isClearable
                            onChange={(value) => {
                              form.setFieldValue(field.name, value);
                              setFieldValue("filter_values_r1", null);
                              setSalesSummaryReportData([]);
                              if (value?.value) {
                                setReportAttrValue1Option([
                                  ...new Set(salesSummaryData.map((item) => item[value.value])),
                                ]);
                              } else {
                                setReportAttrValue1Option([]);
                              }
                            }}
                            options={["BK01", "BK02", "FYQR", "MNYR"]?.map((item) => ({ label: item, value: item }))}
                            value={field.value}
                          />
                        </>
                      )}
                    </Field>
                    <ErrorMessage name="filter_attr_r1" component={StyledErrorMessage} className="invalid" />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="filter_values_r1">Attribute Value #1</Label>
                    <Field name="filter_values_r1" className="form-control">
                      {({ field, form }) => (
                        <>
                          <RSelect
                            {...field}
                            placeholder="Attribute Value #1"
                            isClearable
                            onChange={(value) => {
                              form.setFieldValue(field.name, value);
                              setSalesSummaryReportData([]);
                            }}
                            options={reportAttrValue1Option?.map((item) => ({ label: item, value: item }))}
                            value={field.value}
                          />
                        </>
                      )}
                    </Field>
                    <ErrorMessage name="filter_values_r1" component={StyledErrorMessage} className="invalid" />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="filter_attr_r2">Filter Attribute #2</Label>
                    <Field name="filter_attr_r2" className="form-control">
                      {({ field, form }) => (
                        <>
                          <RSelect
                            {...field}
                            placeholder="Filter Attribute #2"
                            isClearable
                            onChange={(value) => {
                              form.setFieldValue(field.name, value);
                              setFieldValue("filter_values_r2", null);
                              setSalesSummaryReportData([]);

                              if (value?.value) {
                                setReportAttrValue2Option([
                                  ...new Set(salesSummaryData.map((item) => item[value.value])),
                                ]);
                              } else {
                                setReportAttrValue2Option([]);
                              }
                            }}
                            options={["BK01", "BK02", "FYQR", "MNYR"]?.map((item) => ({ label: item, value: item }))}
                            value={field.value}
                          />
                        </>
                      )}
                    </Field>
                    <ErrorMessage name="filter_attr_r2" component={StyledErrorMessage} className="invalid" />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="filter_values_r2">Attribute Value #2</Label>
                    <Field name="filter_values_r2" className="form-control">
                      {({ field, form }) => (
                        <>
                          <RSelect
                            {...field}
                            placeholder="Attribute Value #2"
                            isClearable
                            onChange={(value) => {
                              setSalesSummaryReportData([]);
                              form.setFieldValue(field.name, value);
                            }}
                            options={reportAttrValue2Option?.map((item) => ({ label: item, value: item }))}
                            value={field.value}
                          />
                        </>
                      )}
                    </Field>
                    <ErrorMessage name="filter_values_r2" component={StyledErrorMessage} className="invalid" />
                  </FormGroup>
                </Col>
                <Col md={12} className="mt-3">
                  <ul className="align-end h-100 justify-content-end flex-wrap flex-sm-nowrap gx-4 gy-2">
                    <li>
                      <Button
                        color="primary"
                        size="md"
                        disabled={viewReportLoader}
                        onClick={() => handleSubmitViewReportDataForm(values)}
                      >
                        {viewReportLoader && <Spinner size="sm" />}
                        View Report
                      </Button>
                    </li>
                  </ul>
                </Col>
              </>
            ) : noData ? (
              <Col md={12}>
                <div className="border-bottom mb-3 mt-1 " />
                <h3 className="text-center">No data available</h3>
              </Col>
            ) : null}
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default FormContainer;
