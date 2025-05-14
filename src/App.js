import Router from "./route/Index";

import { ToastContainer } from "react-toastify";
import ThemeProvider from "./layout/provider/Theme";
import { useEffect } from "react";

const App = () => {
  const handleRightClick = (e) => {
    e.preventDefault();
  };
  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     // F12
  //     if (e.keyCode === 123) {
  //       e.preventDefault();
  //       return false;
  //     }
  //     // Ctrl+Shift+I / Ctrl+Shift+C / Ctrl+Shift+J
  //     if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "C" || e.key === "J")) {
  //       e.preventDefault();
  //       return false;
  //     }
  //     // Ctrl+U
  //     if (e.ctrlKey && e.key === "u") {
  //       e.preventDefault();
  //       return false;
  //     }
  //   };

  //   const handleContextMenu = (e) => {
  //     e.preventDefault();
  //   };

  //   document.addEventListener("keydown", handleKeyDown);
  //   document.addEventListener("contextmenu", handleContextMenu);

  //   // Cleanup
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, []);

  return (
    <div onContextMenu={handleRightClick}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
};
export default App;
