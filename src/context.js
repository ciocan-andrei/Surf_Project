import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // CHECK FOR LOGGED USER
  const [isUserLogged, setIsUserLogged] = useState(false);

  const userLoggedOn = () => {
    setIsUserLogged(true);
  };

  const userLoggedOff = () => {
    localStorage.removeItem("user");
    setIsUserLogged(false);
  };

  // DASHBOARD MAP
  const [isMapFilterOpen, setIsMapFilterOpen] = useState(false);
  const [showResetFilterBtn, setShowResetFilterBtn] = useState(false);

  const toggleMapFilter = () => {
    setIsMapFilterOpen(!isMapFilterOpen);
  };
  const openResetFilterBtn = () => {
    setShowResetFilterBtn(true);
  };
  const closeResetFilterBtn = () => {
    setShowResetFilterBtn(false);
  };

  // SIDEBAR
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        //MAP FILTER BTN
        isMapFilterOpen,
        toggleMapFilter,
        //MAP FILTER RESET BTN
        showResetFilterBtn,
        openResetFilterBtn,
        closeResetFilterBtn,
        //SIDEBAR
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        //LOGGED USER
        isUserLogged,
        userLoggedOn,
        userLoggedOff,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
