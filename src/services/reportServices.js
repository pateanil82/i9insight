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

export const getZoneHierarchy = async (zone_id) => {
  try {
    const response = await axiosInstance.get(`/zones/zone_hierarchy/?zone_id=${zone_id}`);
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};
export const getZoneById = async (zone_id) => {
  try {
    const response = await axiosInstance.get(`/zones/zone_by_id/?zone_id=${zone_id}`);
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};
export const getZoneCode = async (zone_id) => {
  try {
    const response = await axiosInstance.get(`/zones/zone_code/?zone_id=${zone_id}`);
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};
export const getEntityList = async (params) => {
  try {
    const response = await axiosInstance.get(`/entities/entities_list/`, { params });
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};
export const getEntityTypeList = async () => {
  try {
    const response = await axiosInstance.get(`/entities/entity_types_list/`);
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};
export const getDistinctAttrValues = async () => {
  try {
    const response = await axiosInstance.get(`/items/distinct_item_groups/`);
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};
export const getSalesReport = async (params, uri) => {
  try {
    const response = await axiosInstance.get(`/${uri}/`, { params });
    return { statusCode: response.status, data: JSON.parse(response.data) };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};

export const getItemName = async () => {
  try {
    const response = await axiosInstance.get(`/items/parameters_list/`);
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};
export const getItemValue = async (params) => {
  try {
    const response = await axiosInstance.get(`/items/distinct_para_values/`, { params });
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};
export const getParentName = async (params) => {
  try {
    const response = await axiosInstance.get(`/entities/parent_list_by_zone_and_type/`, { params });
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};
export const getChildType = async (params) => {
  try {
    const response = await axiosInstance.get(`/entities/child_type_list/`, { params });
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};
export const getChildName = async (params) => {
  try {
    const response = await axiosInstance.get(`/entities/child_list_by_parent_name/`, { params });
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};
