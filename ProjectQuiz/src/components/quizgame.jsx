import { useContext, useEffect, useState } from "react";
import Results from "./results";
import "./quizgame.css";
import { QuizContext } from "./context";
import ProgressBar from "./progressbar";
import { useTimer } from "../Hooks/usetimer";
import Cancel from "./Modals/Cancel";

function QuizGame() {
  const [count, setCount] = useState(0); //saves the question number
  const [answers, setAnswers] = useState(null); //save the current answers
  const [correct, setCorrect] = useState(0); //counts the number of correct/wrong
  const [userAnswers, setUserAnswers] = useState([]); //for results page - show correct/wrong
  const [allAnswers, setAllAnswers] = useState(null); //save all answers (An array of arrays) for results page
  const [progress, setProgress] = useState(100); // for progress bar
  const [stopProgress, setStopProgress] = useState(false); // for progress bar
  const [isDeactive, setIsDeactive] = useState(false);
  const [copyAnswers, setCopyAnswers] = useState(null); //a copy of the array that maps the buttons
  const [showModalCancel, setShowModalCancel] = useState(false);

  const { pause, reset, running, seconds, start, stop } = useTimer({
    initialSeconds: 0,
    initiallyRunning: true,
  });
  const { data, category } = useContext(QuizContext);

  let indexCorrectAnswer;
  //for progress bar
  useEffect(() => {
    if (!stopProgress) {
      setProgress((oldProgress) => {
        if (oldProgress === 0) {
          setIsDeactive(true);
          pause();
          setUserAnswers([...userAnswers, "No answer"]);
          setTimeout(() => {
            start();
            setCount(count + 1);
            setIsDeactive(false);
          }, 3000);
          return 100;
        }
        return Math.max(oldProgress - 1, 0);
      });
    } else {
      stop();
    }
  }, [seconds]);

  const clickHandler = (event) => {
    const buttonId = document.getElementById(event.target.id);
    setIsDeactive(true); //
    if (
      data[count].correctAnswer === event.target.innerHTML ||
      data[count].correctAnswer.trim() + "&nbsp;" === event.target.innerHTML
    ) {
      setUserAnswers([...userAnswers, event.target.innerHTML]);
      setCorrect(correct + 1);
      buttonId.style.backgroundColor = "rgb(112, 206, 112)";
    } else if (data[count].correctAnswer !== event.target.innerHTML) {
      buttonId.style.backgroundColor = "rgb(238, 86, 86)";
    }
    setUserAnswers([...userAnswers, event.target.innerHTML]);

    pause();
    setTimeout(() => {
      setCount(count + 1);
      setProgress(100);
      start();
      buttonId.style.backgroundColor = "white";
      setIsDeactive(false); //
    }, 3000);
  };

  useEffect(() => {
    if (count === 10) {
      setStopProgress(true);
    }
  }, [count]);

  const openModalCancel = () => {
    setShowModalCancel(true);
  };

  useEffect(() => {
    if (data[count] && count < 10) {
      //
      if (isDeactive === false) {
        const answersArray = [...data[count].incorrectAnswers, data[count].correctAnswer];
        answersArray.sort(() => Math.random() - 0.5);
        setCopyAnswers(answersArray);
        indexCorrectAnswer = answersArray.findIndex((el) => el === data[count].correctAnswer);
        const answersButton = answersArray.map((answer, index) => {
          return (
            <button
              className="answerBtn"
              onClick={(e) => clickHandler(e)}
              key={index}
              id={index}
              disabled={isDeactive}
            >
              {answer}
            </button>
          );
        });
        if (allAnswers != null) {
          setAllAnswers((prev) => [...prev, answersArray]);
        } else {
          setAllAnswers([answersArray]);
        }
        setAnswers(answersButton);
      } else if (isDeactive === true) {
        const answersButton = copyAnswers.map((answer, index) => {
          return (
            <button
              className="answerBtn"
              onClick={(e) => clickHandler(e)}
              key={index}
              id={index}
              disabled={isDeactive}
            >
              {answer}
            </button>
          );
        });
        setAnswers(answersButton);
      }
    }
  }, [count, data, isDeactive]);

  if (!stopProgress && count >= 0 && count < 10) {
    return (
      <>
        <div className="question-wrapper">
          <div className="main-questions">
            <div className="topperContainer">
              <div className="imageDiv">
                <img src={category + ".svg"} />
              </div>
              <div className="gameTitleDiv">
                <img src="/dailyquizine-logo-cropped.png" alt="logo" />
              </div>
              <div className="imageDiv">
                <img src={category + ".svg"} />
              </div>
            </div>

            {data[count] ? (
              <>
                <div className="questionAndProgress">
                  <div className="topicContainer">
                    <div className="topicRowContainer">
                      <div className="leftSideTopic">
                        <h4 id="questionId">Question {count + 1}</h4>
                      </div>
                      <div className="topic">
                        <h2>{data[count].category.toUpperCase()}</h2>
                      </div>
                      <div className="rightSideTopic">
                        <h4>{data[count].difficulty}</h4>
                      </div>
                    </div>
                    <div className="question">
                      <h3>{data[count].question}</h3>
                    </div>
                  </div>
                  <div className="progressBar">
                    <ProgressBar completed={progress}></ProgressBar>
                  </div>
                </div>
              </>
            ) : (
              <p>Something went wrong, try again</p>
            )}
            <div className="answersdiv">{answers}</div>
            <div className="cancel">
              <button className="cancelBtn" onClick={openModalCancel} id="cancelBtn">
                CANCEL
              </button>
              {showModalCancel ? <Cancel setShowModal={setShowModalCancel} /> : null}
            </div>
          </div>
        </div>
      </>
    );
  } else if (stopProgress) {
    return (
      <>
        <div className="resultsContainer">
          <Results
            userAnswers={userAnswers}
            possibleAnswers={allAnswers}
            correctAnswer={correct}
            amountOfAnswers={data.length}
            fetchedData={data}
          />
        </div>
      </>
    );
  }
}

export default QuizGame;
