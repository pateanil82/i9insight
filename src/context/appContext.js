import { createContext, useContext, useEffect, useState } from "react";
import { currentUserDetails } from "../services/authServices";
import { toast } from "react-toastify";
import { toastConfig } from "../config/toastConfig";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
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
  useEffect(() => {
    getCurrentUserDetails();
  }, []);
  const values = { userDetails };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;
