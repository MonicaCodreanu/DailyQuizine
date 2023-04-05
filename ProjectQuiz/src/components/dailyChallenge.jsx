import { useContext, useEffect, useState } from "react";
import { QuizContext } from "./context";
import Results from "./results";
import ProgressBar from "./progressbar";
import { useTimer } from "../Hooks/usetimer";
import "./quizgame.css";
import Cancel from "./Modals/Cancel";

function DailyChallenge() {
  const [counter, setCounter] = useState(0); //saves the question number
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

  const { dailyData, setDailyData, setDailyChallenge } = useContext(QuizContext);

  let indexCorrectAnswer;

  const fetchData = () => {
    fetch("https://the-trivia-api.com/api/questions?limit=20")
      .then((res) => res.json())
      .then((data) => {
        setDailyData(data);
        localStorage.setItem("daily_game", JSON.stringify(data));
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setDailyChallenge(true);
    fetchData();
  }, []);

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
            setCounter(counter + 1);
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
    setIsDeactive(true);
    if (
      dailyData[counter].correctAnswer === event.target.innerHTML ||
      dailyData[counter].correctAnswer.trim() + "&nbsp;" === event.target.innerHTML
    ) {
      setUserAnswers([...userAnswers, event.target.innerHTML]);
      setCorrect(correct + 1);
      buttonId.style.backgroundColor = "rgb(112, 206, 112)";
    } else if (dailyData[counter].correctAnswer !== event.target.innerHTML) {
      buttonId.style.backgroundColor = "rgb(238, 86, 86)";
    }
    setUserAnswers([...userAnswers, event.target.innerHTML]);

    pause();
    setTimeout(() => {
      setCounter(counter + 1);
      setProgress(100);
      start();
      buttonId.style.backgroundColor = "white";
      setIsDeactive(false);
    }, 3000);
  };

  useEffect(() => {
    if (counter === 20) {
      setStopProgress(true);
    }
  }, [counter]);

  const openModalCancel = () => {
    setShowModalCancel(true);
  };

  useEffect(() => {
    if (dailyData[counter] && counter < 20) {
      //
      if (isDeactive === false) {
        const answersArray = [
          ...dailyData[counter].incorrectAnswers,
          dailyData[counter].correctAnswer,
        ];
        answersArray.sort(() => Math.random() - 0.5);
        setCopyAnswers(answersArray);
        indexCorrectAnswer = answersArray.findIndex(
          (el) => el === dailyData[counter].correctAnswer
        );
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
  }, [counter, dailyData, isDeactive]);

  function getCategoryPicture(category) {
    if (category === "Arts & Literature") {
      return "arts_and_literature.svg";
    }
    if (category === "Film & TV") {
      return "film_and_tv.svg";
    }
    if (category === "Food & Drink") {
      return "food_and_drink.svg";
    }
    if (category === "Sport & Leisure") {
      return "sport_and_leisure.svg";
    }
    if (category === "General Knowledge") {
      return "general_knowledge.svg";
    }
    if (category === "Society & Culture") {
      return "society_and_culture.svg";
    }
    if (category === "Science") {
      return "science.svg";
    }
    if (category === "Music") {
      return "music.svg";
    }
    if (category === "History") {
      return "history.svg";
    }
    if (category === "Geography") {
      return "geography.svg";
    }
  }

  if (!stopProgress && counter >= 0 && counter < 20) {
    return (
      <>
        <div className="question-wrapper">
          <div className="main-questions">
            <div className="topperContainer">
              <div className="imageDiv">
                {dailyData[counter] ? (
                  <img src={getCategoryPicture(dailyData[counter].category)} />
                ) : (
                  ""
                )}
              </div>
              <div className="gameTitleDiv">
                <img src="/dailyquizine-logo-cropped.png" alt="logo" />
              </div>
              <div className="imageDiv">
                {dailyData[counter] ? (
                  <img src={getCategoryPicture(dailyData[counter].category)} />
                ) : (
                  ""
                )}
              </div>
            </div>

            {dailyData[counter] ? (
              <>
                <div className="questionAndProgress">
                  <div className="topicContainer">
                    <div className="topicRowContainer">
                      <div className="leftSideTopic">
                        <h4 id="questionId">Question {counter + 1}</h4>
                      </div>
                      <div className="topic">
                        <h2>{dailyData[counter].category.toUpperCase()}</h2>
                      </div>
                      <div className="rightSideTopic">
                        <h4>{dailyData[counter].difficulty}</h4>
                      </div>
                    </div>
                    <div className="question">
                      <h3>{dailyData[counter].question}</h3>
                    </div>
                  </div>
                  <div>
                    <ProgressBar completed={progress}></ProgressBar>
                  </div>
                </div>
              </>
            ) : (
              <p>loading...</p>
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
            amountOfAnswers={dailyData.length}
            fetchedData={dailyData}
          />
        </div>
      </>
    );
  }
}

export default DailyChallenge;
