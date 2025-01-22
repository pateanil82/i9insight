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

export const getDashboardData = async (order_id) => {
  try {
    const response = await axiosInstance.get(`/dashboard/dashboard/?display_order=${order_id}`);
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};
