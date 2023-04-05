import "./intro.css";

function Intro() {
  return (
    <>
      <div className="introContainer">
        <div className="introHeadline">
          <img src="bigbg.png" alt="" id="bigbg" />
          <img src="smallbg.png" alt="" id="smallbg" />
          <img src="daily.png" alt="" id="daily" />
          <img src="quizine.png" alt="" id="quizine" />
          <img src="qleft.png" alt="" id="qleft" />
          <img src="qright.png" alt="" id="qright" />
          <div className="introHeadlineIcons">
            <img src="ball.png" alt="" id="ballintro" />
            <img src="sciencebook.png" alt="" id="sciencebookintro" />
            <img src="ruin.png" alt="" id="ruinintro" />
            <img src="globe.png" alt="" id="globeintro" />
            <img src="hamburger.png" alt="" id="hamburgerintro" />
            <img src="book.png" alt="" id="bookintro" />
            <img src="brain.png" alt="" id="brainintro" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Intro;
