const reducer = (state, action) => {
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
