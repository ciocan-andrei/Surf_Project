import React from "react";
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "./context";

const ModalFilter = () => {
  const { isFilterOpen, closeFilter } = useGlobalContext();
  return (
    <div
      className={`${
        isFilterOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <h3>modal container</h3>
        <button className="close-modal-btn" onClick={closeFilter}>
          <IoClose />
        </button>
      </div>
    </div>
  );
};

export default ModalFilter;
