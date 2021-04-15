import React, { useState, useContext, useReducer } from "react";
import reducer from "./reducer";

const AppContext = React.createContext();
const defaultState = {
  isModalOpen: false,
  modalContent: "",
  modalType: null,
  //new spot
  isNewSpotOpen: false,
  newSpotLong: null,
  newSpotLat: null,
  //logged user
  loggedUser: null,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  // CHECK FOR LOGGED USER
  const userSignedIn = (user) => {
    dispatch({ type: "USER_SIGNED_IN", payload: user });
  };
  const userSignedOut = () => {
    dispatch({ type: "USER_SIGNED_OUT" });
  };
  const isUserSigned = () => {
    dispatch({ type: "IS_USER_SIGNED" });
  };

  // MODAL INFOS
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };
  const modalMsg = (msg, type) => {
    dispatch({ type: "SHOW_MSG", payload: { msg, type } });
    if (type === "error") {
      throw new Error(msg);
    }
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

  // MODAL NEW SPOT
  const openNewSpot = (long, lat) => {
    dispatch({ type: "OPEN_MODAL_NEWSPOT", payload: { long, lat } });
  };
  const closeNewSpot = () => {
    dispatch({ type: "CLOSE_MODAL_NEWSPOT" });
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
        userSignedIn,
        userSignedOut,
        isUserSigned,
        //MODAL
        ...state,
        closeModal,
        modalMsg,
        //MODAL NEW SPOT
        closeNewSpot,
        openNewSpot,
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
