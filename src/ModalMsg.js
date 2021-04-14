import React, { useEffect } from "react";

const ModalMsg = ({ modalContent, modalType, closeModal }) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 5000);
  });
  return (
    <div
      className={`modal ${modalType === "error" && "modal-error"} ${
        modalType === "info" && "modal-info"
      }`}
    >
      <p>{modalContent}</p>
    </div>
  );
};

export default ModalMsg;
