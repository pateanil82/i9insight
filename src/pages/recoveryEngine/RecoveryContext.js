import { createContext, useEffect, useState } from "react";
// import { getRecoveryList } from "../../services/warehousesServices";
import { Outlet } from "react-router-dom";
import { getDistinctAttrValues, getEntityTypeList } from "../../services/reportServices";
import {
  getSalesKeyDistinctValue,
  getSalesKeyList,
  getSalesSummary,
  getSalesSummaryStatic,
  getSummaryReport,
} from "../../services/dataPrismServices";

export const RecoveryContext = createContext();

const RecoveryProvider = () => {
  const [recoveryData, setRecoveryData] = useState([]);
  const [entityTypesList, setEntityTypeList] = useState([]);
  const [itemGroupData, setItemGroupData] = useState([]);
  const [salesKeyList, setSalesKeyList] = useState([]);
  const [salesKeyDistinctValueAttr1, setSalesKeyDistinctValueAttr1] = useState([]);
  const [salesKeyDistinctValueAttr2, setSalesKeyDistinctValueAttr2] = useState([]);
  const [summaryReport, setSummaryReport] = useState([]);
  const [salesSummaryData, setSalesSummaryData] = useState([]);
  const [salesSummaryReportData, setSalesSummaryReportData] = useState([]);
  const [groupValue1Option, setGroupValue1Option] = useState([]);
  const [groupValue2Option, setGroupValue2Option] = useState([]);
  const [reportAttrValue1Option, setReportAttrValue1Option] = useState([]);
  const [reportAttrValue2Option, setReportAttrValue2Option] = useState([]);
  const [viewDataLoader, setViewDataLoader] = useState(false);
  const [viewReportLoader, setViewReportLoader] = useState(false);
  const [noData, setNoData] = useState(false);
  const [noReportData, setNoReportData] = useState(false);
  const [tileData, setTileData] = useState(null);
  const [compareValue, setCompareValue] = useState(null);
  const [summaryValue, setSummaryValue] = useState(null);

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
  const fetchSummaryReport = async (key) => {
    try {
      const response = await getSummaryReport(key);
      if (response.statusCode === 200) {
        setSummaryReport(response.data);
      }
    } catch (error) {
      console.log("console_error", error);
    }
  };
  const fetchSalesKeyDistinctValue = async (type, key, attr) => {
    try {
      const response = await getSalesKeyDistinctValue(type, key);
      if (response.statusCode === 200) {
        if (attr === "1") {
          setSalesKeyDistinctValueAttr1(response.data);
        } else {
          setSalesKeyDistinctValueAttr2(response.data);
        }
      }
    } catch (error) {
      console.log("console_error", error);
    }
  };
  const fetchSalesSummaryStatic = async () => {
    try {
      const response = await getSalesSummaryStatic();
      if (response.statusCode === 200) {
        console.log("console_response", response);
      }
    } catch (error) {
      console.log("console_error", error);
    }
  };

  const callTileData = (data) => {
    const filteredData = data.filter((item) => item.MNYR.includes("2025"));

    const totals = filteredData.reduce(
      (acc, item) => {
        acc.TAIM += item.TAIM || 0;
        acc.TOTQ += item.TOTQ || 0;
        acc.TAND += item.TAND || 0;
        acc.TQND += item.TQND || 0;
        acc.TAWD += item.TAWD || 0;
        acc.TQWD += item.TQWD || 0;
        acc.TDIS += item.TDIS || 0;
        acc.INVC += item.INVC || 0;
        return acc;
      },
      {
        TAIM: 0,
        TOTQ: 0,
        TAND: 0,
        TQND: 0,
        TAWD: 0,
        TQWD: 0,
        TDIS: 0,
        INVC: 0,
      }
    );

    // Average discount per invoice
    const avgDisc = totals.INVC ? (totals.TDIS / totals.INVC).toFixed(4) : 0;

    setTileData({ ...totals, avgDisc });
  };

  const handleFormSubmit = async (values) => {
    setViewDataLoader(true);
    try {
      const params = {
        entity_type: values.entity_type.value,
        group_attr_1: values.group_attr_1.value,
      };
      if (values?.filter_attr_1?.value) {
        params.filter_attr_1 = values.filter_attr_1.value;
      }
      if (values?.filter_values_1?.value) {
        params.filter_values_1 = values.filter_values_1.value;
      }
      if (values?.filter_attr_2?.value) {
        params.filter_attr_2 = values.filter_attr_2.value;
      }
      if (values?.filter_values_2?.value) {
        params.filter_values_2 = values.filter_values_2.value;
      }
      if (values?.group_values_1?.value) {
        params.bucket_1_filter = values.group_values_1.value;
      }
      if (values?.group_values_2?.value) {
        params.bucket_2_filter = values.group_values_2.value;
      }
      if (values?.group_attr_2?.value) {
        params.group_attr_2 = values.group_attr_2.value;
      }
      if (values?.process_type?.value) {
        params.process_type = values.process_type.value;
      }
      if (values?.period_filter?.value) {
        params.period_filter = values.period_filter.value;
      }
      const response = await getSalesSummary(params);
      if (response.statusCode === 200) {
        setViewDataLoader(false);
        setSalesSummaryData(response.data);
        callTileData(response.data);
        setNoData(response.data.length === 0);
        const g1 = [...new Set(response.data.map((item) => item.BK01))];
        setGroupValue1Option(g1);
        if (values?.group_attr_2?.value) {
          const g2 = [...new Set(response.data.map((item) => item.BK02))];
          setGroupValue2Option(g2);
        }
      }
    } catch (error) {
      console.log("console_error", error);
    } finally {
      setViewDataLoader(false);
    }
  };

  const handleReportSubmit = async (values) => {
    try {
      setViewReportLoader(true);
      const params = {
        entity_type: values.entity_type.value,
        group_attr_1: values.group_attr_1.value,
      };
      if (values?.filter_attr_1?.value) {
        params.filter_attr_1 = values.filter_attr_1.value;
      }
      if (values?.filter_values_1?.value) {
        params.filter_values_1 = values.filter_values_1.value;
      }
      if (values?.filter_attr_2?.value) {
        params.filter_attr_2 = values.filter_attr_2.value;
      }
      if (values?.filter_values_2?.value) {
        params.filter_values_2 = values.filter_values_2.value;
      }

      if (values?.group_attr_2?.value) {
        params.group_attr_2 = values.group_attr_2.value;
      }
      if (values?.process_type?.value) {
        params.process_type = values.process_type.value;
      }
      if (values?.group_values_1?.value) {
        params.bucket_1_filter = values.group_values_1.value;
      }
      if (values?.group_values_2?.value) {
        params.bucket_2_filter = values.group_values_2.value;
      }
      if (values?.report_name?.value) {
        params.report_name = values.report_name.value;
      }
      if (values?.filter_attr_r1?.value) {
        params.filter_attr_r1 = values.filter_attr_r1.value;
      }
      if (values?.filter_values_r1?.value) {
        params.filter_values_r1 = values.filter_values_r1.value;
      }
      if (values?.filter_attr_r2?.value) {
        params.filter_attr_r2 = values.filter_attr_r2.value;
      }
      if (values?.filter_values_r2?.value) {
        params.filter_values_r2 = values.filter_values_r2.value;
      }
      if (values?.period_filter?.value) {
        params.period_filter = values.period_filter.value;
      }
      const response = await getSalesSummary(params);
      if (response.statusCode === 200) {
        setNoReportData(response.data.length === 0);
        setSalesSummaryReportData(response.data);
      }
    } catch (error) {
      console.log("console_error", error);
    } finally {
      setViewReportLoader(false);
    }
  };

  useEffect(() => {
    fetchEntityTypeList();
    fetchDistinctAttrValues();
    fetchSummaryReport();
    // fetchSalesSummaryStatic();
  }, []);

  const value = {
    handleFormSubmit,
    recoveryData,
    setRecoveryData,
    entityTypesList,
    itemGroupData,
    salesKeyList,
    fetchSalesKeyList,
    salesKeyDistinctValueAttr1,
    fetchSalesKeyDistinctValue,
    salesKeyDistinctValueAttr2,
    summaryReport,
    salesSummaryData,
    groupValue1Option,
    groupValue2Option,
    reportAttrValue1Option,
    setReportAttrValue1Option,
    reportAttrValue2Option,
    setReportAttrValue2Option,
    salesSummaryReportData,
    handleReportSubmit,
    setSalesSummaryReportData,
    viewDataLoader,
    viewReportLoader,
    noData,
    noReportData,
    tileData,
    compareValue,
    setCompareValue,
    summaryValue,
    setSummaryValue,
    setSalesSummaryData,
  };
  return (
    <RecoveryContext.Provider value={value}>
      <Outlet />
    </RecoveryContext.Provider>
  );
};
export default RecoveryProvider;
