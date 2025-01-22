import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import exportFromJSON from "export-from-json";
import CopyToClipboard from "react-copy-to-clipboard";
import { Col, Modal, ModalBody, Row, Button } from "reactstrap";
import { DataTablePagination } from "../Component";

const Export = ({ data, exportName }) => {
  const [modal, setModal] = useState(false);
  console.log("exportName", exportName);
  useEffect(() => {
    if (modal === true) {
      setTimeout(() => setModal(false), 2000);
    }
  }, [modal]);

  const fileName = `${exportName.reportName}-${exportName.selectedEntityType}-${exportName.startDate}-${exportName.endDate}`;

  const exportCSV = () => {
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };

  const exportExcel = () => {
    const exportType = exportFromJSON.types.xls;
    exportFromJSON({ data, fileName, exportType });
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
  exportData
}) => {
  const [tableData, setTableData] = useState(data);
  const [searchText, setSearchText] = useState("");
  const [mobileView, setMobileView] = useState();
  console.log("data, columns", data, columns);
  useEffect(() => {
    setTableData(data);
  }, [data]);
  useEffect(() => {
    let defaultData = tableData;
    if (searchText !== "") {
      defaultData = data.filter((item) => {
        return item.Child_Name.toLowerCase().includes(searchText.toLowerCase());
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
                placeholder="Search by Customer Name"
                onChange={(ev) => setSearchText(ev.target.value)}
              />
            </label>
          </div>
        </Col>
        <Col className="col-5 text-end" sm="12" md="6">
          <div className="datatable-filter">
            <div className="d-flex justify-content-end g-2">
              {actions && <Export data={exportData} exportName={exportName} />}
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
        noDataComponent={<div className="p-2">There are no records found</div>}
        // sortIcon={
        //   <div>
        //     <span>&darr;</span>
        //     <span>&uarr;</span>
        //   </div>
        // }
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
