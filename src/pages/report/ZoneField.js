import React, { useContext, useState, useEffect } from "react";
import { Collapse, CardBody, Card, Label } from "reactstrap";
import { ReportContext } from "./ReportContext";
import { getZoneCode, getZoneHierarchy } from "../../services/reportServices";

const ZoneField = ({ fieldName, setFieldValue }) => {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const { singleZone, zoneData, setZoneData, zoneId, setZoneId, zoneCode, setZoneCode } = useContext(ReportContext);
  const [openAccordion, setOpenAccordion] = useState({});

  const toggleCollapse = () => setIsCollapseOpen(!isCollapseOpen);

  const fetchZoneCode = async () => {
    try {
      const response = await getZoneCode(zoneId);
      if (response.statusCode === 200) {
        setZoneCode(response.data);
        setFieldValue(fieldName, response.data);
      }
    } catch (error) {
      console.error("Error fetching zone code:", error);
    }
  };

  useEffect(() => {
    if (zoneId) {
      fetchZoneCode();
    }
  }, [zoneId]);

  const updateNestedZoneData = (zones, zoneId, newChildren) => {
    return zones.map((zoneItem) => {
      if (zoneItem.zone_id === zoneId) {
        return { ...zoneItem, children: newChildren };
      }
      if (zoneItem.children) {
        return { ...zoneItem, children: updateNestedZoneData(zoneItem.children, zoneId, newChildren) };
      }
      return zoneItem;
    });
  };

  const fetchChildren = async (zone) => {
    try {
      const response = await getZoneHierarchy(zone.zone_id);
      if (response.statusCode === 200) {
        setZoneData((prevState) => updateNestedZoneData(prevState, zone.zone_id, response.data));
      }
    } catch (error) {
      console.error("Error fetching zone children:", error);
    }
  };

  const toggleAcc = async (zone) => {
    const zone_id = zone.zone_id;
    if (openAccordion[zone_id]) {
      setOpenAccordion((prevState) => {
        const newState = { ...prevState };
        delete newState[zone_id];
        return newState;
      });
    } else {
      setOpenAccordion((prevState) => {
        const newState = { ...prevState };
        newState[zone_id] = true;
        return newState;
      });
      const zoneWithChildren = zoneData.find((zoneItem) => zoneItem.zone_id === zone_id);
      if (!zoneWithChildren?.children) {
        await fetchChildren(zone);
      }
    }
  };

  const renderNestedAccordion = (zones) => {
    return (
      <div className="accordion">
        {zones?.map((item) => (
          <div className="accordion-item" key={item.zone_id}>
            {item.zone_type === "BottomMost" ? (
              <div
                className="accordion-head"
                onClick={() => {
                  setZoneId(item.zone_id);
                  setOpenAccordion({});
                  toggleCollapse();
                }}
                style={{ cursor: "pointer" }}
              >
                <h6 className="title">{item.zone_name}</h6>
              </div>
            ) : (
              <div
                className={`accordion-head ${openAccordion[item.zone_id] ? "" : "collapsed"}`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  toggleAcc(item);
                  setZoneId(item.zone_id);
                }}
              >
                <h6 className="title">{item.zone_name}</h6>
                <span className="accordion-icon"></span>
              </div>
            )}
            <Collapse className="accordion-body" isOpen={openAccordion[item.zone_id] || false}>
              <div className="accordion-inner">{renderNestedAccordion(item?.children)}</div>
            </Collapse>
          </div>
        ))}
      </div>
    );
  };

  return (
    <React.StrictMode>
      <Label>
        Select Zone<span className="text-danger"> *</span>
      </Label>
      <div className="pos-rel">
        <input
          name={fieldName}
          value={zoneCode || singleZone?.zone_name}
          className="form-control"
          color="primary"
          onClick={toggleCollapse}
          style={{ marginBottom: "5px" }}
          readOnly
        />
        <Collapse isOpen={isCollapseOpen} className="pos-abs w-100" style={{ zIndex: "1" }}>
          <Card className="border-1 h-max-300px" style={{ overflow: "auto" }}>
            <CardBody className="p-0">
              <div className="accordion">
                {zoneData?.map((item) => (
                  <div className="accordion-item" key={item.zone_id}>
                    <div
                      className={`accordion-head ${openAccordion[item.zone_id] ? "" : "collapsed"}`}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        toggleAcc(item);
                        setZoneId(item.zone_id);
                      }}
                    >
                      <h6 className="title">{item.zone_name}</h6>
                      <span className="accordion-icon"></span>
                    </div>
                    <Collapse className="accordion-body" isOpen={openAccordion[item.zone_id] || false}>
                      <div className="accordion-inner">{renderNestedAccordion(item?.children)}</div>
                    </Collapse>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    </React.StrictMode>
  );
};

export default ZoneField;
