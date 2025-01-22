import { createContext, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext";
import {
  getChildName,
  getChildType,
  getDistinctAttrValues,
  getEntityList,
  getEntityTypeList,
  getItemName,
  getItemValue,
  getParentName,
  getZoneById,
  getZoneHierarchy,
} from "../../services/reportServices";

export const ReportContext = createContext();

const ReportProvider = ({ children }) => {
  const { userDetails } = useContext(AppContext);
  const [zoneData, setZoneData] = useState(null);
  const [singleZone, setSingleZone] = useState(null);
  const [entityData, setEntityData] = useState([]);
  const [entityTypeData, setEntityTypeData] = useState(null);
  const [selectedEntityType, setSelectedEntityType] = useState(null);
  const [zoneId, setZoneId] = useState(null);
  const [zoneCode, setZoneCode] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [salesExportData, setSalesExportData] = useState([]);
  const [noSalesData, setNoSalesData] = useState(null);
  const [itemGroupData, setItemGroupData] = useState([]);
  const [itemNameData, setItemNameData] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [itemValueData, setItemValueData] = useState([]);
  const [parentName, setParentName] = useState([]);
  const [selectedParentName, setSelectedParentName] = useState(null);
  const [childType, setChildType] = useState([]);
  const [childName, setChildName] = useState([]);
  const [reportName, setReportName] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
        setZoneCode(response.data.zone_name);
      }
    } catch (error) {
      console.log("console_error", error);
    }
  };

  const fetchEntityList = async () => {
    try {
      const params = {
        entity_type: selectedEntityType.toString(),
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

  const fetchItemName = async () => {
    try {
      const response = await getItemName();
      if (response.statusCode === 200) {
        setItemNameData(response.data);
      }
    } catch (error) {
      console.log("console_error", error);
    }
  };

  const fetchItemValue = async () => {
    try {
      const params = {
        para_name: selectedItemName,
      };
      const response = await getItemValue(params);
      if (response.statusCode === 200) {
        setItemValueData(response.data);
      }
    } catch (error) {
      console.log("console_error", error);
    }
  };

  const fetchParentName = async () => {
    try {
      const params = {
        entity_type: selectedEntityType,
        zone_code: zoneCode,
      };
      const response = await getParentName(params);
      if (response.statusCode === 200) {
        setParentName(response.data);
      }
    } catch (error) {
      console.log("console_error", error);
    }
  };
  const fetchChildType = async () => {
    try {
      const params = {
        entity_type: selectedEntityType,
        parent_name: selectedParentName,
      };
      const response = await getChildType(params);
      if (response.statusCode === 200) {
        setChildType(response.data);
      }
    } catch (error) {
      console.log("console_error", error);
    }
  };
  const fetchChildName = async () => {
    try {
      const params = {
        entity_type: selectedEntityType,
        parent_name: selectedParentName,
      };
      const response = await getChildName(params);
      if (response.statusCode === 200) {
        setChildName(response.data);
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
      fetchItemName();
    }
  }, [userDetails]);

  useEffect(() => {
    if (selectedEntityType) {
      fetchEntityList();
    }
  }, [selectedEntityType]);

  useEffect(() => {
    if (selectedItemName) {
      fetchItemValue();
    }
  }, [selectedItemName]);

  useEffect(() => {
    if (zoneCode && selectedEntityType) {
      fetchParentName();
    }
  }, [zoneCode, selectedEntityType]);

  useEffect(() => {
    if (selectedEntityType) {
      fetchChildType();
      fetchChildName();
    }
  }, [selectedEntityType, selectedParentName]);

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
    selectedEntityType,
    salesData,
    setSalesData,
    itemGroupData,
    noSalesData,
    setNoSalesData,
    itemNameData,
    itemValueData,
    setSelectedItemName,
    setItemValueData,
    parentName,
    setSelectedParentName,
    childType,
    childName,
    reportName,
    setReportName,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    salesExportData,
    setSalesExportData,
  };
  return <ReportContext.Provider value={value}>{children}</ReportContext.Provider>;
};
export default ReportProvider;
