import React, { useRef } from "react";
import ReactDom from "react-dom";
import "./cancel.css";

function Cancel({ setShowModal }) {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };
  return ReactDom.createPortal(
    <div className="container-modal" ref={modalRef} onClick={closeModal}>
      <div className="cancel-modal">
        <h2>Are you sure you want to cancel?</h2>
        <div className="cancel-modal-buttons">
          <a href="./" className="cancel-yes-button">
            Yes
          </a>
          <button onClick={() => setShowModal(false)} className="cancel-no-button">
            No
          </button>
        </div>
        <button onClick={() => setShowModal(false)} className="cancel-modal-close-icon">
          <img src="x.svg" alt="close button icon" />
        </button>
      </div>
    </div>,
    document.getElementById("cancelPortal")
  );
}

export default Cancel;
