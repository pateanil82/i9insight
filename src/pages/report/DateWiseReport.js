import React, { forwardRef, useContext } from "react";
import { Col, FormGroup, Label } from "reactstrap";
import { Field, ErrorMessage } from "formik";
import { ReportContext } from "./ReportContext";
import styled from "styled-components";
import { Icon, RSelect } from "../../components/Component";
import DatePicker from "react-datepicker";
import moment from "moment";

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

const DateWiseReport = ({ values, setFieldValue }) => {
  const {
    itemNameData,
    setSelectedItemName,
    itemValueData,
    parentName,
    setSelectedParentName,
    childType,
    childName,
    setStartDate,
    setEndDate,
  } = useContext(ReportContext);
  return (
    <>
      <Col md={12}>
        <div className="border-bottom mt-3 mb-3" />
      </Col>
      <Col md={6}>
        <FormGroup className="form-group">
          <Label>
            Select From date<span className="text-danger"> *</span>
          </Label>
          <div className="form-control-wrap">
            <div className="form-icon form-icon-right">
              <Icon name="calendar"></Icon>
            </div>
            <DatePicker
              name="from_date"
              selected={values.from_date}
              className="form-control date-picker"
              onChange={(value) => {
                setFieldValue("from_date", value);
                setStartDate(moment(value).format("DD-MM-YYYY"));
              }}
              customInput={<ExampleCustomInput />}
            />
          </div>
          <ErrorMessage name="from_date" component={StyledErrorMessage} className="invalid" />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label>
            Select End Date<span className="text-danger"> *</span>
          </Label>
          <div className="form-control-wrap">
            <div className="form-icon form-icon-right">
              <Icon name="calendar"></Icon>
            </div>
            <DatePicker
              name="to_date"
              selected={values.to_date}
              className="form-control date-picker"
              onChange={(value) => {
                setFieldValue("to_date", value);
                setEndDate(moment(value).format("DD-MM-YYYY"))
              }}
              customInput={<ExampleCustomInput />}
            />
          </div>
          <ErrorMessage name="to_date" component={StyledErrorMessage} className="invalid" />
        </FormGroup>
      </Col>
      <Col md={12}>
        <div className="border-bottom mt-3  mb-3" />
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label htmlFor="para_names">Attribute Name </Label>
          <Field name="para_names" className="form-control">
            {({ field, form }) => (
              <>
                <RSelect
                  {...field}
                  placeholder="Attribute Name "
                  isClearable
                  onChange={(value) => {
                    form.setFieldValue(field.name, value);
                    setSelectedItemName(value.value);
                    setFieldValue("para_values", null);
                  }}
                  options={itemNameData?.map((item) => ({ label: item, value: item }))}
                  value={field.value}
                />
              </>
            )}
          </Field>
          <ErrorMessage name="para_names" component={StyledErrorMessage} className="invalid" />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label htmlFor="para_values">Attributes Value(s)</Label>
          <Field name="para_values" className="form-control">
            {({ field, form }) => (
              <>
                <RSelect
                  isMulti
                  {...field}
                  placeholder="Attributes Value(s)"
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
          <ErrorMessage name="para_values" component={StyledErrorMessage} className="invalid" />
        </FormGroup>
      </Col>
      <Col md={12}>
        <FormGroup>
          <Label htmlFor="parent_name">Parent Name</Label>
          <Field name="parent_name" className="form-control">
            {({ field, form }) => (
              <>
                <RSelect
                  isMulti
                  {...field}
                  placeholder="Parent Name"
                  isClearable
                  onChange={(value) => {
                    form.setFieldValue(field.name, value);
                    setSelectedParentName(value.map((item) => item.value).toString());
                    setFieldValue("child_type", "");
                    setFieldValue("child_name", "");
                  }}
                  options={parentName?.map((item) => ({ label: item, value: item }))}
                  value={field.value}
                />
              </>
            )}
          </Field>
          <ErrorMessage name="parent_name" component={StyledErrorMessage} className="invalid" />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label htmlFor="child_type">Child Type</Label>
          <Field name="child_type" className="form-control">
            {({ field, form }) => (
              <>
                <RSelect
                  {...field}
                  placeholder="Child Type"
                  isClearable
                  onChange={(value) => {
                    form.setFieldValue(field.name, value);
                  }}
                  options={childType?.map((item) => ({ label: item, value: item }))}
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
          <Label htmlFor="child_name">Child Name</Label>
          <Field name="child_name" className="form-control">
            {({ field, form }) => (
              <>
                <RSelect
                  isMulti
                  {...field}
                  placeholder="Child Name"
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
    </>
  );
};

export default DateWiseReport;
