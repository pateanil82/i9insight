import React, { useContext } from "react";
import { Col, FormGroup, Label } from "reactstrap";
import { Field, ErrorMessage } from "formik";
import { ReportContext } from "./ReportContext";
import styled from "styled-components";
import { RSelect } from "../../components/Component";

const StyledErrorMessage = styled.span`
  color: #e85347;
  font-size: 11px;
  font-style: italic;
`;
const SalesThroughReport = ({ setFieldValue }) => {
  const { itemNameData, setSelectedEntityType, itemValueData, entityTypeData, childName, setSelectedItemName } =
    useContext(ReportContext);

  return (
    <>
      <Col md={6}>
        <FormGroup>
          <Label htmlFor="child_type">
            Select Child Type<span className="text-danger"> *</span>
          </Label>
          <Field name="child_type" className="form-control">
            {({ field, form }) => (
              <>
                <RSelect
                  {...field}
                  placeholder="Select Child Type"
                  isClearable
                  onChange={(value) => {
                    form.setFieldValue(field.name, value);
                    setSelectedEntityType(value.value);
                    setFieldValue("para_value", null);
                  }}
                  options={entityTypeData?.map((item) => ({ label: item, value: item }))}
                  value={field.value}
                />
              </>
            )}
          </Field>
          <ErrorMessage name="child_type" component={StyledErrorMessage} className="invalid" />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label htmlFor="child_name">
            Select Child Name<span className="text-danger"> *</span>
          </Label>
          <Field name="child_name" className="form-control">
            {({ field, form }) => (
              <>
                <RSelect
                  {...field}
                  placeholder="Select Child Name"
                  isClearable
                  onChange={(value) => {
                    form.setFieldValue(field.name, value);
                  }}
                  options={childName?.map((item) => ({ label: item, value: item }))}
                  value={field.value}
                />
              </>
            )}
          </Field>
          <ErrorMessage name="child_name" component={StyledErrorMessage} className="invalid" />
        </FormGroup>
      </Col>
      <Col md={12}>
        <div className="border-bottom mt-3 mb-3" />
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label htmlFor="para_name">
            Parameter Name <span className="text-danger"> *</span>
          </Label>
          <Field name="para_name" className="form-control">
            {({ field, form }) => (
              <>
                <RSelect
                  {...field}
                  placeholder="Parameter Name "
                  isClearable
                  onChange={(value) => {
                    form.setFieldValue(field.name, value);
                    setSelectedItemName(value.value);
                    setFieldValue("para_value", null);
                  }}
                  options={itemNameData?.map((item) => ({ label: item, value: item }))}
                  value={field.value}
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
            Parameters Value <span className="text-danger"> *</span>
          </Label>
          <Field name="para_value" className="form-control">
            {({ field, form }) => (
              <>
                <RSelect
                  {...field}
                  placeholder="Parameters Value"
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
  );
};

export default SalesThroughReport;
