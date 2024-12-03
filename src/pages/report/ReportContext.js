import { createContext, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext";
import {
  getDistinctAttrValues,
  getEntityList,
  getEntityTypeList,
  getZoneById,
  getZoneHierarchy,
} from "../../services/reportServices";

export const ReportContext = createContext();

const ReportProvider = ({ children }) => {
  const { userDetails } = useContext(AppContext);
  const [zoneData, setZoneData] = useState(null);
  const [singleZone, setSingleZone] = useState(null);
  const [entityData, setEntityData] = useState(null);
  const [entityTypeData, setEntityTypeData] = useState(null);
  const [selectedEntityType, setSelectedEntityType] = useState(null);
  const [zoneId, setZoneId] = useState(null);
  const [zoneCode, setZoneCode] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [noSalesData, setNoSalesData] = useState(null);
  const [itemGroupData, setItemGroupData] = useState([]);

  const fetchZoneHierarchy = async () => {
    try {
      const response = await getZoneHierarchy(userDetails.zone_id);
      if (response.statusCode === 200) {
        setZoneData(response.data);
      }
    } catch (error) {
      console.log("console_error", error);
    }
  };

  const fetchZoneById = async () => {
    try {
      const response = await getZoneById(userDetails.zone_id);
      if (response.statusCode === 200) {
        setSingleZone(response.data);
      }
    } catch (error) {
      console.log("console_error", error);
    }
  };

  const fetchEntityList = async () => {
    try {
      const params = {
        entity_type: selectedEntityType,
      };
      const response = await getEntityList(params);
      if (response.statusCode === 200) {
        setEntityData(response.data);
      }
    } catch (error) {
      console.log("console_error", error);
    }
  };
  const fetchEntityTypeList = async () => {
    try {
      const response = await getEntityTypeList();
      if (response.statusCode === 200) {
        setEntityTypeData(response.data);
      }
    } catch (error) {
      console.log("console_error", error);
    }
  };
  const fetchDistinctAttrValues = async () => {
    try {
      const response = await getDistinctAttrValues();
      if (response.statusCode === 200) {
        setItemGroupData(response.data);
      }
    } catch (error) {
      console.log("console_error", error);
    }
  };

  useEffect(() => {
    if (userDetails) {
      fetchZoneHierarchy();
      fetchEntityTypeList();
      fetchZoneById();
      fetchDistinctAttrValues();
    }
  }, [userDetails]);
  useEffect(() => {
    if (selectedEntityType) {
      fetchEntityList();
    }
  }, [selectedEntityType]);
  const value = {
    zoneData,
    entityData,
    singleZone,
    setZoneData,
    zoneId,
    setZoneId,
    zoneCode,
    setZoneCode,
    entityTypeData,
    setSelectedEntityType,
    salesData,
    setSalesData,
    itemGroupData,
    noSalesData,
    setNoSalesData,
  };
  return <ReportContext.Provider value={value}>{children}</ReportContext.Provider>;
};
export default ReportProvider;
