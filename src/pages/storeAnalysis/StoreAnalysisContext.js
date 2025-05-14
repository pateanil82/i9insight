import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getEntityTypeList } from "../../services/reportServices";
import { getNDHDData, getSalesKeyDistinctValue, getSalesKeyList, getStoreData } from "../../services/dataPrismServices";

export const StoreAnalysisContext = createContext();

const StoreAnalysisProvider = () => {
  const [entityTypesList, setEntityTypeList] = useState([]);
  const [entityName, setEntityName] = useState([]);
  const [salesKeyDistinctValueAttr1, setSalesKeyDistinctValueAttr1] = useState([]);
  const [salesKeyList, setSalesKeyList] = useState([]);
  const [viewDataLoader, setViewDataLoader] = useState(false);
  const [isAccordionOpen, setAccordionOpen] = useState("1");
  const [storeApiData, setStoreApiData] = useState(null);
  const [bucketAtt1, setBucketAtt1] = useState(null);
  const [submitData, setSubmitData] = useState({});
  const [clickedBlockValue, setClickedBlockValue] = useState(null);
  const [blockApiData, setBlockApiData] = useState(null);
  const [blockApiLoader, setBlockApiLoader] = useState(false);

  const fetchEntityTypeList = async () => {
    try {
      const response = await getEntityTypeList();
      if (response.statusCode === 200) {
        setEntityTypeList(response.data);
      }
    } catch (error) {
      console.log("console_error", error);
    }
  };

  const fetchNDHDData = async (params) => {
    setEntityName([]);
    setSalesKeyDistinctValueAttr1([]);

    try {
      const response = await getNDHDData(params);
      if (response.statusCode === 200) {
        return response.data;
      }
    } catch (error) {
      console.log("console_error", error);
    }
  };

  const fetchEntityNameList = async (data) => {
    const params = {
      entity_type: data,
      attr_1_name: "Parent_Name",
    };
    const response = await fetchNDHDData(params);
    setEntityName(response);
  };

  const fetchSalesKeyList = async (key) => {
    try {
      const response = await getSalesKeyList(key);
      if (response.statusCode === 200) {
        setSalesKeyList(response.data);
      }
    } catch (error) {
      console.log("console_error", error);
    }
  };
  const fetchSalesKeyDistinctValue = async (type, key) => {
    setSalesKeyDistinctValueAttr1([]);
    try {
      const response = await getSalesKeyDistinctValue(type, key);
      if (response.statusCode === 200) {
        setSalesKeyDistinctValueAttr1(response.data);
      }
    } catch (error) {
      console.log("console_error", error);
    }
  };

  const handleFormSubmit = async (data) => {
    setViewDataLoader(true);
    setStoreApiData(null);
    setBlockApiData(null);
    try {
      const payload = {
        entity_type: data.entity_type.value,
        entity_name: data.entity_name.value,
        filter_attr_1: data.filter_attr_1.value,
        filter_values_1: data.filter_values_1.value,
        group_attr_1: data.group_attr_1.value,
      };
      if (data?.period?.value) {
        payload.period = data.period.value;
      }
      setSubmitData(payload);
      const response = await getStoreData(payload);
      if (response.statusCode === 200) {
        setStoreApiData(response.data);
        setAccordionOpen("");
      }
    } catch (error) {
      console.log("console_error", error);
    } finally {
      setViewDataLoader(false);
    }
  };
  const handleClickedBlock = async (data) => {
    setBlockApiLoader(true);
    setBlockApiData(null);
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // optional: adds animation
    });
    try {
      const payload = {
        group_attr_2: "Item_Code",
        bucket_1_filter: data,
        ...submitData,
      };
      const response = await getStoreData(payload);
      if (response.statusCode === 200) {
        // setBlockApiData(response.data.map((item) => Object.values(item)[0]));
        setBlockApiData(response.data);
      }
    } catch (error) {
      console.log("console_error", error);
    } finally {
      setBlockApiLoader(false);
    }
  };

  useEffect(() => {
    fetchEntityTypeList();
  }, []);

  const value = {
    entityTypesList,
    salesKeyList,
    entityName,
    fetchSalesKeyList,
    fetchEntityNameList,
    salesKeyDistinctValueAttr1,
    fetchSalesKeyDistinctValue,
    viewDataLoader,
    setViewDataLoader,
    handleFormSubmit,
    isAccordionOpen,
    setAccordionOpen,
    storeApiData,
    bucketAtt1,
    setBucketAtt1,
    clickedBlockValue,
    setClickedBlockValue,
    handleClickedBlock,
    blockApiData,
    blockApiLoader,
  };

  return (
    <StoreAnalysisContext.Provider value={value}>
      <Outlet />
    </StoreAnalysisContext.Provider>
  );
};

export default StoreAnalysisProvider;
