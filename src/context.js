import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // CHECK FOR LOGGED USER
  // const [loggedUser, setLoggedUser] = useState(null);
  // if (localStorage.getItem("user")) {
  //   setLoggedUser(JSON.parse(localStorage.getItem("user")));
  // }

  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   setLoggedUser(null);
  // };

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
        // loggedUser,
        // handleLogout,
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
