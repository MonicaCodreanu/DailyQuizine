import React, { useRef } from "react";
import ReactDom from "react-dom";
import "./helpmodal.css";

function HelpModal({ setShowModal }) {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };
  return ReactDom.createPortal(
    <div className="container-modal" ref={modalRef} onClick={closeModal}>
      <div className="help-modal">
        <h2>Help</h2>
        <div className="helpmodal-text-container">
          <h4>Enter your nickname at the start screen and press join.</h4>
          <p>
            Your nickname will be displayed in the highscore field once you have played and recorded
            a score.
          </p>
          <br />
          <h4>Choose "Free Play" if you want to customize difficulty level and categories.</h4>
          <p>
            There will be 10 questions in total during Free Play with a 15 seconds timer to answer
            each.
          </p>
          <br />
          <h4>Choose "Challenge" if you want to challenge yourself to 20 difficult questions.</h4>
          {/* <p>
            You have one try everyday, so answer carefully. Comeback each day to try and beat your
            previous score. The questions are picked from different categories.{" "}
          </p> */}
          <br />
          <h4>
            After you played a game, the results will be displayed with your correct and incorrect
            answers.
          </h4>
          <br />
          <h4>
            Your high score will be stored in the local storage and displayed on the start page.
          </h4>
        </div>
        <button onClick={() => setShowModal(false)}>
          <img src="x.svg" alt="close button icon" />
        </button>
      </div>
    </div>,
    document.getElementById("helpPortal")
  );
}

export default HelpModal;
