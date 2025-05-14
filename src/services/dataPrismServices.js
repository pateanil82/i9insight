import axiosInstance from "./axiosInstance";

const handleError = (error) => {
  console.error(" ERROR : ", error);
  const statusCode = error.response ? error.response.status : "500";
  const errorMessage = error?.response?.data?.detail;
  let plainErrorMessage;
  if (errorMessage === "Could not validate credentials") {
    localStorage.clear();
    window.location.href = "/";
  } else {
    // console.error("Error message is undefined");
    plainErrorMessage = "An error occurred";
  }
  return { statusCode, errorMessage: plainErrorMessage };
};

export const getSalesKeyList = async (params) => {
  try {
    const response = await axiosInstance.get(`/sales/get_sales_key_list/?entity_type=${params}`);
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};
export const getSummaryReport = async () => {
  try {
    const response = await axiosInstance.get(`/sales/sales_summary_report_list`);
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};

export const getSalesKeyDistinctValue = async (type, key) => {
  try {
    const response = await axiosInstance.get(
      `/sales/get_sales_key_distinct_values/?entity_type=${type}&key_name=${key}`
    );
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};
export const getSalesSummary = async (params) => {
  try {
    const response = await axiosInstance.get(`/sales/sales_summary/`, { params });
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};
export const getSalesSummaryStatic = async () => {
  try {
    const response = await axiosInstance.get(
      `/sales/sales_summary/?entity_type=directdoor&filter_attr_1=Parent_Region&filter_values_1=WEST&group_attr_1=Parent_City&process_type=Data&bucket_1_filter=ANAND`
    );
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};
export const getSalesPeriodList = async () => {
  try {
    const response = await axiosInstance.get(`/sales/get_periods_list/`);
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};
export const getSalesCompareList = async (params) => {
  try {
    const response = await axiosInstance.get(`/sales/get_compare_list/?mode=${params}`);
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};

export const getNDHDData = async (params) => {
  try {
    const response = await axiosInstance.get(`/ndhd/ndhd/`, { params });
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};

export const getStoreData = async (params) => {
  try {
    const response = await axiosInstance.get(`/entities/store_analysis/`, { params });
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};
