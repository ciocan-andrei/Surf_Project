const reducer = (state, action) => {
  if (action.type === "USER_SIGNED_IN") {
    const user = action.payload;
    localStorage.setItem("user", JSON.stringify(user));
    return {
      ...state,
      loggedUser: JSON.parse(localStorage.getItem("user")),
    };
  }
  if (action.type === "USER_SIGNED_OUT") {
    localStorage.removeItem("user");
    return {
      ...state,
      loggedUser: null,
    };
  }
  if (action.type === "IS_USER_SIGNED") {
    return {
      ...state,
      loggedUser: JSON.parse(localStorage.getItem("user")),
    };
  }
  if (action.type === "SHOW_MSG") {
    const info = action.payload;
    return {
      ...state,
      isModalOpen: true,
      modalContent: info.msg,
      modalType: info.type,
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return { ...state, isModalOpen: false };
  }
  if (action.type === "OPEN_MODAL_NEWSPOT") {
    const info = action.payload;
    return {
      ...state,
      isNewSpotOpen: true,
      newSpotLong: info.long,
      newSpotLat: info.lat,
    };
  }
  if (action.type === "CLOSE_MODAL_NEWSPOT") {
    return { ...state, isNewSpotOpen: false };
  }
  throw new Error("No matching action type found.");
};

export default reducer;
