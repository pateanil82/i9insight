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
const SalesTrendReportForm = ({ values, setFieldValue }) => {
  const { itemNameData, setSelectedItemName, setSelectedParaValue } = useContext(ReportContext);
  return (
    <>
      <Col md={12}>
        <div className="border-bottom mt-3 mb-3" />
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label htmlFor="attr1">
            Attribute-1 <span className="text-danger"> *</span>
          </Label>
          <Field name="attr1" className="form-control">
            {({ field, form }) => (
              <>
                <RSelect
                  {...field}
                  placeholder="Attribute-1"
                  isClearable
                  onChange={(value) => {
                    form.setFieldValue(field.name, value);
                    setSelectedItemName(value.value);
                    setFieldValue("attr2", null);
                    setSelectedParaValue(null);
                  }}
                  options={itemNameData?.map((item) => ({
                    label: item,
                    value: item,
                    isDisabled: values?.attr2?.value === item,
                  }))}
                  value={field.value}
                />
              </>
            )}
          </Field>
          <ErrorMessage name="attr1" component={StyledErrorMessage} className="invalid" />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label htmlFor="attr2">
            Attributes-2 <span className="text-danger"> *</span>
          </Label>
          <Field name="attr2" className="form-control">
            {({ field, form }) => (
              <>
                <RSelect
                  {...field}
                  placeholder="Attributes-2"
                  isClearable
                  onChange={(value) => {
                    form.setFieldValue(field.name, value);
                    setSelectedParaValue(value.value);
                  }}
                  options={itemNameData?.map((item) => ({
                    label: item,
                    value: item,
                    isDisabled: values?.attr1?.value === item,
                  }))}
                  value={field.value}
                />
              </>
            )}
          </Field>
          <ErrorMessage name="attr2" component={StyledErrorMessage} className="invalid" />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label htmlFor="days_block">Days block</Label>
          <Field name="days_block" type="number" min className="form-control"></Field>
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label htmlFor="no_of_blocks">Number of Week</Label>
          <Field name="no_of_blocks" type="number" min className="form-control"></Field>
        </FormGroup>
      </Col>
    </>
  );
};

export default SalesTrendReportForm;
