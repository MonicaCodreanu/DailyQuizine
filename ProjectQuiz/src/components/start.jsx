import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { QuizContext } from "./context";
import "./start.css";
import React from "react";
import Tooltip from "./tooltip";

function Start() {
  const { highScores, nickName, setNickName } = useContext(QuizContext);

  const [inputField, setInputField] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function showHighScoresNames() {
    return highScores.map((score, index) => {
      return <li key={index}>{score.name}</li>;
    });
  }
  function showHighScores() {
    return highScores.map((score, index) => {
      return <li key={index}>{score.score}</li>;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(nickName);
    setInputField("");
    setSubmitted(!submitted);
  }

  return (
    <div className="start-wrapper">
      <div className="main">
        <img
          src="dailyquizine-logo-cropped.png"
          alt="Daily Quizine logotype"
          className="logotypeStart"
        />
        <div className="startHighscoreWrapper">
          <div className="start">
            <div className="startInputForm">
              <form onSubmit={handleSubmit}>
                <div className="startInputEl">
                  <input
                    type="text"
                    name="nickname"
                    value={inputField}
                    onChange={(event) => {
                      setInputField(event.target.value);
                      setNickName(event.target.value);
                    }}
                    placeholder="Enter nickname.."
                  />
                  <div>
                    <Tooltip
                      position="top"
                      tooltipText="If no name is submitted, 'Anonymous' will be used."
                    >
                      <img src="question-circle.svg" className="startInputHelp" />
                    </Tooltip>
                  </div>
                </div>
                <div className="startSubmitAndBtn">
                  {!submitted ? (
                    <button type="submit" className="startSubmitButton">
                      JOIN
                    </button>
                  ) : (
                    <button type="submit" className="startSubmitButtonAnimate">
                      <img
                        src="check-lg.svg"
                        alt="submit icon checkmark"
                        className="submitCheckmarkImg"
                      />
                    </button>
                  )}
                </div>
              </form>
            </div>
            <div className="startStartButtons">
              <Link to="/categories" id="playMusic">
                FREE PLAY
              </Link>
              <Link to="/daily">CHALLENGE</Link>
            </div>
          </div>
          <div className="highscore">
            <div className="insideHighscore"></div>
            <h2>High Score</h2>
            <div className="highscoreNamePoints">
              <p>Name</p>
              <p>Points</p>
            </div>
            <div className="scoreWrapper">
              <ol className="highscoreList">{showHighScoresNames()}</ol>
              <div className="highscorePoints">{showHighScores()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Start;
