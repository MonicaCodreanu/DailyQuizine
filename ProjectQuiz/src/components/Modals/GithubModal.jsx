import React, { useRef } from "react";
import ReactDom from "react-dom";
import "./githubmodal.css";

function GithubModal({ setShowModal }) {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };
  return ReactDom.createPortal(
    <div className="container-modal" ref={modalRef} onClick={closeModal}>
      <div className="github-modal">
        <img src="github.svg" alt="github icon" />
        <h2>Link to GitHub repository:</h2>
        <a href="https://github.com/gwahlstrom/Project-Quiz" target="_blank">
          https://github.com/gwahlstrom/Project-Quiz
        </a>
        <button onClick={() => setShowModal(false)}>
          <img src="x.svg" alt="close button icon" />
        </button>
      </div>
    </div>,
    document.getElementById("githubPortal")
  );
}

export default GithubModal;
