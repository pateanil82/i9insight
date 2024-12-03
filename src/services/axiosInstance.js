import axios from "axios";
// const baseURL = process.env.REACT_APP_API_BASE_URL
const baseURL = "http://3.7.177.224:8200/api/v1/";
//console.log("Axios baseURL : ", baseURL);

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
