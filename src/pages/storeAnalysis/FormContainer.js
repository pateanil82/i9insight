import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { Button, Col, FormGroup, Label, Row, Spinner } from "reactstrap";
import { RSelect } from "../../components/Component";
import styled from "styled-components";
import { StoreAnalysisContext } from "./StoreAnalysisContext";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from "reactstrap";

const StyledErrorMessage = styled.span`
  color: #e85347;
  font-size: 11px;
  font-style: italic;
`;

const FormContainer = () => {
  const {
    entityTypesList,
    salesKeyList,
    fetchSalesKeyList,
    salesKeyDistinctValueAttr1,
    fetchSalesKeyDistinctValue,
    fetchEntityNameList,
    entityName,
    viewDataLoader,
    handleFormSubmit,
    isAccordionOpen,
    setAccordionOpen,
    setBucketAtt1,
  } = useContext(StoreAnalysisContext);
  const handleSubmitViewDataForm = async (value) => {
    await handleFormSubmit(value);
  };
  const toggle = (id) => {
    if (isAccordionOpen === id) {
      setAccordionOpen(null);
    } else {
      setAccordionOpen(id);
    }
  };

  return (
    <Accordion flush open={isAccordionOpen} toggle={toggle} className="border-0">
      <AccordionItem>
        <AccordionHeader targetId="1">Store Analysis</AccordionHeader>
        <AccordionBody accordionId="1" className="pt-3">
          <Formik
            initialValues={{
              entity_type: null,
              entity_name: null,
              period: { label: `Last 90`, value: 90 },
              filter_attr_1: null,
              filter_values_1: null,
              group_attr_1: null,
            }}
          >
            {({ values, setFieldValue, setFieldError, setFieldTouched }) => (
              <Form>
                <Row>
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
                                form.setFieldValue("entity_name", "");
                                form.setFieldValue("filter_attr_1", "");
                                form.setFieldValue("filter_values_1", "");
                                if (value.value) {
                                  fetchEntityNameList(value.value);
                                  fetchSalesKeyList(value.value);
                                }
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
                      <Label htmlFor="entity_name">
                        Select Entity Name<span className="text-danger"> *</span>
                      </Label>
                      <Field name="entity_name" className="form-control">
                        {({ field, form }) => (
                          <>
                            <RSelect
                              {...field}
                              placeholder="Select Entity Name"
                              isClearable
                              onChange={(value) => {
                                form.setFieldValue(field.name, value);
                              }}
                              options={entityName?.map((item) => ({ label: item, value: item }))}
                              value={field.value}
                            />
                          </>
                        )}
                      </Field>
                      <ErrorMessage name="entity_name" component={StyledErrorMessage} className="invalid" />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label htmlFor="period">Period</Label>
                      <Field name="period" className="form-control">
                        {({ field, form }) => (
                          <>
                            <RSelect
                              {...field}
                              placeholder="Period"
                              isClearable
                              onChange={(value) => {
                                form.setFieldValue(field.name, value);
                              }}
                              options={[30, 60, 90].map((item) => ({ label: `Last ${item}`, value: item }))}
                              value={field.value}
                            />
                          </>
                        )}
                      </Field>
                      <ErrorMessage name="period" component={StyledErrorMessage} className="invalid" />
                    </FormGroup>
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
                                setFieldValue("filter_values_1", null);
                                if (value?.value) {
                                  fetchSalesKeyDistinctValue(values?.entity_type?.value, value?.value);
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
                                if (value?.value) {
                                  setBucketAtt1(value.value);
                                } else {
                                  setBucketAtt1(null);
                                }
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
                  <Col md={12} className="mt-3">
                    <ul className="align-end h-100 justify-content-end flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button
                          color="primary"
                          size="md"
                          // type="submit"
                          onClick={() => handleSubmitViewDataForm(values)}
                          disabled={viewDataLoader}
                        >
                          {viewDataLoader && <Spinner size="sm" />}
                          View Data
                        </Button>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
};

export default FormContainer;
