import { useContext, useEffect, useState, useRef } from "react";
import "./results.css";
import { QuizContext } from "./context";
import Confetti from "react-confetti";

function Results(props) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const confetiRef = useRef(null);

  useEffect(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (props.correctAnswer === 10 || props.correctAnswer === 20) {
      setShowConfetti(true);
    }
  }, [props.correctAnswer]);

  const {
    data,
    setGameStart,
    difficulty,
    NO_OF_HIGH_SCORES,
    HIGH_SCORES,
    nickName,
    dailyData,
    isDailyChallenge,
  } = useContext(QuizContext);

  //Calculating Scores
  let multiplier;
  if (difficulty === "easy") {
    multiplier = 1;
  } else if (difficulty === "medium") {
    multiplier = 2;
  } else if (difficulty === "hard") {
    multiplier = 3;
  }
  const score = multiplier * props.correctAnswer;

  function checkHighScore(score) {
    const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;

    if (score > lowestScore) {
      saveHighScore(score, highScores);
    }
  }

  function saveHighScore(score, highScores) {
    const name = nickName ? nickName : "Anonymous";
    const newScore = { score, name };

    highScores.push(newScore); // 1. Add to list
    highScores.sort((a, b) => b.score - a.score); // 2. Sort the list
    highScores.splice(NO_OF_HIGH_SCORES); // 3. Select new list
    localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores)); // 4. Save to local storage
  }

  useEffect(() => {
    setGameStart(false);
    checkHighScore(score);
  }, []);

  const correctAnswersArray = (isDailyChallenge ? dailyData : data).map((item, index) => {
    return item.correctAnswer;
  });

  function setClassName(answer, index) {
    if (
      answer == correctAnswersArray[index] ||
      answer == correctAnswersArray[index].trim() + "&nbsp;"
    ) {
      if (answer == props.userAnswers[index]) {
        return "correctAnswerColor userAnswer";
      }
      return "correctAnswerColor";
    } else if (answer == props.userAnswers[index]) {
      return "incorrectAnswerColor userAnswer";
    } else if (answer != props.userAnswers[index]) {
      return "otherAnswerColor";
    }
  }

  const results = (isDailyChallenge ? dailyData : data).map((item, index) => {
    const indexCorrectAnswer = props.possibleAnswers[index].findIndex(
      (el) => el === item.correctAnswer
    );
    return (
      <div className="resultsQuestion" key={index}>
        <div className="wrongOrRightDiv">
          <h2>
            {props.userAnswers[index] === item.correctAnswer ||
            props.userAnswers[index] === item.correctAnswer.trim() + "&nbsp;"
              ? "Correct answer"
              : "Wrong answer"}
          </h2>
        </div>
        <div className="resultQuestionsDiv">
          <h4>
            Question {index + 1}: {item.question}
          </h4>
        </div>

        <div className="resultsAnswer">
          {props.possibleAnswers[index].map((answer, indexAnsw) => {
            return (
              <div className="newCorrectIncorrect" key={indexAnsw}>
                <p className={setClassName(answer, index)} key={answer}>
                  {answer}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <>
      {showConfetti ? (
        <div className="results-wrapper" ref={confetiRef}>
          <Confetti
            numberOfPieces={150}
            width={width}
            height={height}
            style={{ position: "absolute", top: 0, left: 0 }}
          />
          <div className="resultsInfo">
            <h1>Results</h1>
            <h2>{props.correctAnswer >= 10 ? "WOW ALL CORRECT" : ""} </h2>
            <h2>
              You had {props.correctAnswer} correct out of {props.amountOfAnswers}!
            </h2>
          </div>
          <div className="resultsScrollBox">{results}</div>
          <div className="playAgainDiv">
            <a href="./" className="playAgainBtn">
              Play Again
            </a>
          </div>
        </div>
      ) : (
        <div className="results-wrapper">
          <div className="resultsInfo">
            <h1>Results</h1>
            <h2>
              You had {props.correctAnswer} correct out of {props.amountOfAnswers}!
            </h2>
            <h3 className="resultsInfoBorder">Your answers are marked with a yellow border</h3>
          </div>
          <div className="resultsScrollBox">{results}</div>
          <div className="playAgainDiv">
            <a href="./" className="playAgainBtn">
              Play Again
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Results;
