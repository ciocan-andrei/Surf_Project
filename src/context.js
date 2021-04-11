import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
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

  //return provider
  return (
    <AppContext.Provider
      value={{
        //map filter btn
        isMapFilterOpen,
        toggleMapFilter,
        //map filter reset btn
        showResetFilterBtn,
        openResetFilterBtn,
        closeResetFilterBtn,
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
