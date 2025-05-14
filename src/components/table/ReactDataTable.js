import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import exportFromJSON from "export-from-json";
import CopyToClipboard from "react-copy-to-clipboard";
import { Col, Modal, ModalBody, Row, Button, Label } from "reactstrap";
import { DataTablePagination } from "../Component";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const Export = ({ data, exportName }) => {
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (modal === true) {
      setTimeout(() => setModal(false), 2000);
    }
  }, [modal]);
  const convertToCSV = () => {
    return data.join("\n");
  };
  const fileName = `${exportName.reportName}-${exportName.selectedEntityType}-${exportName.startDate}-${exportName.endDate}`;

  const exportCSV = () => {
    switch (exportName.reportName) {
      case "sales_trend":
        const csvData = convertToCSV();
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, `${exportName.reportName}-${exportName.selectedEntityType}.csv`);
        break;
      case "stock_cover":
        const csvData1 = convertToCSV();
        const blob1 = new Blob([csvData1], { type: "text/csv;charset=utf-8;" });
        saveAs(blob1, `${exportName.reportName}.csv`);
        break;
      case "sales_through":
        const csvData2 = convertToCSV();
        const blob2 = new Blob([csvData2], { type: "text/csv;charset=utf-8;" });
        saveAs(blob2, `${exportName.reportName}-${exportName.selectedEntityType}.csv`);
        break;
      default:
        const exportType = exportFromJSON.types.csv;
        exportFromJSON({ data, fileName, exportType });
    }
  };

  const exportExcel = () => {
    switch (exportName.reportName) {
      case "sales_trend":
        const sheetData = data.map((row) => row.split(",")); // Split data rows into arrays
        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        const xlsData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([xlsData], { type: "application/octet-stream" });
        saveAs(blob, `${exportName.reportName}-${exportName.selectedEntityType}.xlsx`);
        break;
      case "stock_cover":
        const sheetData1 = data.map((row) => row.split(",")); // Split data rows into arrays
        const worksheet1 = XLSX.utils.aoa_to_sheet(sheetData1);
        const workbook1 = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook1, worksheet1, "Sheet1");
        const xlsData1 = XLSX.write(workbook1, { bookType: "xlsx", type: "array" });
        const blob1 = new Blob([xlsData1], { type: "application/octet-stream" });
        saveAs(blob1, `${exportName.reportName}-${exportName.selectedEntityType}.xlsx`);
        break;
      case "sales_through":
        const sheetData2 = data.map((row) => row.split(",")); // Split data rows into arrays
        const worksheet2 = XLSX.utils.aoa_to_sheet(sheetData2);
        const workbook2 = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook2, worksheet2, "Sheet1");
        const xlsData2 = XLSX.write(workbook2, { bookType: "xlsx", type: "array" });
        const blob2 = new Blob([xlsData2], { type: "application/octet-stream" });
        saveAs(blob2, `${exportName.reportName}-${exportName.selectedEntityType}.xlsx`);
        break;
      default:
        const exportType = exportFromJSON.types.xls;
        exportFromJSON({ data, fileName, exportType });
    }
  };

  const copyToClipboard = () => {
    setModal(true);
  };

  return (
    <React.Fragment>
      <div className="dt-export-buttons d-flex align-center">
        <div className="dt-export-title d-none d-md-inline-block">Export</div>
        <div className="dt-buttons btn-group flex-wrap">
          <CopyToClipboard text={JSON.stringify(data)}>
            <Button
              className="buttons-copy buttons-html5"
              onClick={() => copyToClipboard()}
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Copy to clipboard"
            >
              <span>Copy</span>
            </Button>
          </CopyToClipboard>{" "}
          <button
            className="btn btn-secondary buttons-csv buttons-html5"
            type="button"
            onClick={() => exportCSV()}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Export with CSV"
          >
            <span>CSV</span>
          </button>{" "}
          <button
            className="btn btn-secondary buttons-excel buttons-html5"
            type="button"
            onClick={() => exportExcel()}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Export with Excel"
          >
            <span>Excel</span>
          </button>{" "}
        </div>
      </div>
      <Modal isOpen={modal} className="modal-dialog-centered text-center" size="sm">
        <ModalBody className="text-center m-2">
          <h5>Copied to clipboard</h5>
        </ModalBody>
        <div className="p-3 bg-light">
          <div className="text-center">Copied {data.length} rows to clipboard</div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

const ExpandableRowComponent = ({ data }) => {
  return (
    <ul className="dtr-details p-2 border-bottom ms-1">
      <li className="d-block d-sm-none">
        <span className="dtr-title">Company</span> <span className="dtr-data">{data.company}</span>
      </li>
      <li className="d-block d-sm-none">
        <span className="dtr-title ">Gender</span> <span className="dtr-data">{data.gender}</span>
      </li>
      <li>
        <span className="dtr-title">Start Date</span> <span className="dtr-data">{data.startDate}</span>
      </li>
      <li>
        <span className="dtr-title">Salary</span> <span className="dtr-data">{data.salary}</span>
      </li>
    </ul>
  );
};

const CustomCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
  <div className="custom-control custom-control-sm custom-checkbox notext">
    <input id={rest.name} type="checkbox" className="custom-control-input" ref={ref} onClick={onClick} {...rest} />
    <label className="custom-control-label" htmlFor={rest.name} />
  </div>
));

const ReactDataTable = ({
  data,
  columns,
  pagination,
  actions,
  className,
  selectableRows,
  expandableRows,
  exportName,
  exportData,
  searchName,
  subHeader,
  subHeaderComponent,
  customStyles,
  options,
  selectValue,
  setSelectValue,
  searchPlaceHolder="Search by Customer Name"
}) => {
  const [tableData, setTableData] = useState(data);
  const [searchText, setSearchText] = useState("");
  const [mobileView, setMobileView] = useState();

  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    let defaultData = tableData;
    if (searchText !== "") {
      defaultData = data.filter((item) => {
        return (
          item?.Child_Name?.toLowerCase().includes(searchText.toLowerCase()) ||
          item?.[searchName]?.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setTableData(defaultData);
    } else {
      setTableData(data);
    }
  }, [searchText]);

  const viewChange = () => {
    if (window.innerWidth < 960 && expandableRows) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  };

  useEffect(() => {
    window.addEventListener("load", viewChange);
    window.addEventListener("resize", viewChange);
    return () => {
      window.removeEventListener("resize", viewChange);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`dataTables_wrapper dt-bootstrap4 no-footer mt-3 ${className ? className : ""}`}>
      <Row className={`justify-between g-2 ${actions ? "with-export" : ""}`}>
        <Col className="col-7 text-start" sm="12" md="6">
          <div id="DataTables_Table_0_filter" className="dataTables_filter">
            <label>
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder={searchPlaceHolder}
                onChange={(ev) => setSearchText(ev.target.value)}
              />
            </label>
          </div>
        </Col>
        <Col className="col-5 text-end" sm="12" md="6">
          <div className="datatable-filter">
            <div className="d-flex justify-content-end g-2">
              {actions && <Export data={exportData} exportName={exportName} />}
              {actions && exportName.reportName === "sales_trend" && (
                <div>
                  <div className="form-group">
                    <div className="form-control-wrap">
                      <div className="form-control-select">
                        <select
                          className="form-control form-select"
                          id="fv-topics"
                          placeholder="Select a week"
                          value={selectValue}
                          onChange={(e) => setSelectValue(e.target.value)}
                        >
                          <option label="Select a week" value="" disabled></option>
                          {options.map((item) => (
                            <option value={item.split("-")[1]}>{item}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
      <DataTable
        data={tableData}
        columns={columns}
        className={className}
        selectableRows={selectableRows}
        selectableRowsComponent={CustomCheckbox}
        expandableRowsComponent={ExpandableRowComponent}
        expandableRows={mobileView}
        subHeader={subHeader}
        customStyles={customStyles}
        subHeaderComponent={subHeaderComponent}
        noDataComponent={<div className="p-2">There are no records found</div>}
        pagination={pagination}
        paginationComponent={({ currentPage, rowsPerPage, rowCount, onChangePage, onChangeRowsPerPage }) => (
          <DataTablePagination
            itemPerPage={rowsPerPage}
            totalItems={rowCount}
            paginate={onChangePage}
            currentPage={currentPage}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        )}
      ></DataTable>
    </div>
  );
};

export default ReactDataTable;
