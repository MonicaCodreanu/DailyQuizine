import React, { useRef } from "react";
import ReactDom from "react-dom";
import "./readmemodal.css";

function ReadmeModal({ setShowModal }) {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };
  return ReactDom.createPortal(
    <div className="container-modal" ref={modalRef} onClick={closeModal}>
      <div className="readme-modal">
        <h2>Read Me</h2>
        <h4>This app was made using the following techniques:</h4>
        <ul>
          <li>React</li>
          <li>Vite</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>
            <a href="https://the-trivia-api.com/" target="_blank">
              Trivia API
            </a>
          </li>
        </ul>
        <h5>Deployed using Vercel</h5>
        <button onClick={() => setShowModal(false)}>
          <img src="x.svg" alt="close button icon" />
        </button>
      </div>
    </div>,
    document.getElementById("readmePortal")
  );
}

export default ReadmeModal;
