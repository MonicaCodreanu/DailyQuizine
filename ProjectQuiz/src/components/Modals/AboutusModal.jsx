import React, { useRef } from "react";
import ReactDom from "react-dom";
import "./aboutusmodal.css";

function AboutusModal({ setShowModal }) {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };
  return ReactDom.createPortal(
    <div className="container-modal" ref={modalRef} onClick={closeModal}>
      <div className="aboutus-modal">
        <h2>About us</h2>
        <h4>This app was made by:</h4>
        <div className="aboutus-modal-text">
          <h5>Monica Codreanu</h5>
          <a href="https://github.com/MonicaCodreanu" target="_blank">
            https://github.com/MonicaCodreanu
          </a>
          <br />
          <h5>Alexander Lind</h5>
          <a href="https://github.com/Lindetti" target="_blank">
            https://github.com/Lindetti
          </a>
          <br />
          <h5>Gustav Wahlström</h5>
          <a href="https://github.com/gwahlstrom" target="_blank">
            https://github.com/gwahlstrom
          </a>
        </div>

        <button onClick={() => setShowModal(false)}>
          <img src="x.svg" alt="close button icon" />
        </button>
      </div>
    </div>,
    document.getElementById("aboutusPortal")
  );
}

export default AboutusModal;
