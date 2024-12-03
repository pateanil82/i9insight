import React from "react";
import ReportContainer from "./ReportContainer";
import ReportProvider from "./ReportContext";

const Report = () => {
  return (
    <>
      <ReportProvider>
        <ReportContainer />
      </ReportProvider>
    </>
  );
};

export default Report;
