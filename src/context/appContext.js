import { createContext, useContext, useEffect, useState } from "react";
import { currentUserDetails } from "../services/authServices";
import { toast } from "react-toastify";
import { toastConfig } from "../config/toastConfig";
import { getDashboardData } from "../services/dashboardServices";
import { object } from "yup";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [chartData, setChartData] = useState({});

  const getCurrentUserDetails = async () => {
    try {
      const response = await currentUserDetails();
      if (response.statusCode === 200) {
        setUserDetails(response.data);
      }
    } catch (error) {
      console.log("console_error", error);
      toast.error("Failed to fetch user details", toastConfig);
    }
  };

  const getChartData = async (order_id) => {
    try {
      const response = await getDashboardData(order_id);

      if (response.statusCode === 200) {
        setChartData((prevChartData) => ({
          ...prevChartData,
          [response.data.display_order]: response.data,
        }));
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
      toast.error("Failed to fetch chart data", toastConfig);
    }
  };

  useEffect(() => {
    const fetchAllChartData = async () => {
      const orderIds = [1, 2, 3, 4, 5, 6];
      await Promise.all(orderIds.map((id) => getChartData(id)));
    };

    getCurrentUserDetails();
    fetchAllChartData();
  }, []);
  const values = { userDetails, chartData };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;
