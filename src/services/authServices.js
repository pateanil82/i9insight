import axiosInstance from "./axiosInstance";

export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};
export const setUserName = (name) => {
  localStorage.setItem("UserName", name);
};

export const getUserName = () => {
  return localStorage.getItem("UserName");
};

const handleError = (error) => {
  console.error(" ERROR : ", error);
  const statusCode = error.response ? error.response.status : "500";
  const errorMessage = error?.response?.data?.detail;
  let plainErrorMessage;
  if (errorMessage === "Could not validate credentials") {
    localStorage.clear();
    window.location.href = "/";
  } else {
    console.error("Error message is undefined");
    plainErrorMessage = "An error occurred";
  }
  return { statusCode, errorMessage: plainErrorMessage };
};

// Set headers
const headers = {
  Accept: "application/json",
  "Content-Type": "application/x-www-form-urlencoded",
};

export const token = async (payload) => {
  try {
    const response = await axiosInstance.post("/token", payload, { headers });
    setAccessToken(response.data.access_token);
    return { statusCode: response.status, successMessage: "Login successful", data: response.data };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};
export const login = async () => {
  try {
    const response = await axiosInstance.get("/users/login/");
    return { statusCode: response.status, successMessage: "Login successful", data: response.data };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};

export const signup = async (fullName, email, password) => {
  try {
    const response = await axiosInstance.post("/auths/signUp", { fullName, email, password });
    return {
      statusCode: response.status,
      successMessage: "Signup successful",
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const currentUserDetails = async () => {
  try {
    const response = await axiosInstance.get("/users/current_user_details/");
    return { statusCode: response.status, data: response.data };
  } catch (error) {
    console.log("console_error", error);
    return handleError(error);
  }
};
