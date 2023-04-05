import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./categories.css";
import { QuizContext } from "./context";

function Categories() {
  const quizContext = useContext(QuizContext);
  const [startDisabled, setStartDisabled] = useState(true);
  const {
    setDifficulty,
    setCategory,
    setGameStart,
    category,
    difficulty,
    loading,
  } = useContext(QuizContext);
  const [selectedButton, setSelectedButton] = useState({
    category: "",
    difficulty: "",
  });

  const clickHandler = (event) => {
    setCategory(event.target.name);
    setSelectedButton({ ...selectedButton, category: event.target.name });
  };

  const clickHandlerDif = (event) => {
    setDifficulty(event.target.name);
    setSelectedButton({ ...selectedButton, difficulty: event.target.name });
  };

  const getRandomCategory = (event) => {
    setCategory(event.target.name);
    setSelectedButton({ ...selectedButton, category: event.target.name });
    const arrayOfCategoriesRND = [
      "arts_and_literature",
      "film_and_tv",
      "food_and_drink",
      "general_knowledge",
      "geography",
      "history",
      "music",
      "science",
      "society_and_culture",
      "sport_and_leisure",
    ];
    function randomIntFromInterval(min, max) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    const randomIndex = randomIntFromInterval(0, 9);
    setCategory(arrayOfCategoriesRND[randomIndex]);
  };

  useEffect(() => {
    if (category && difficulty) {
      setStartDisabled(false);
      setGameStart(true);
    }
  }, [category, difficulty]);

  return (
    <>
      <div className="container">
        <img
          src="dailyquizine-logo-cropped.png"
          alt="Daily Quizine logotype"
          className="categoryHeadTitle"
        />
        <h3 className="categoryInstructions">
          Choose a difficulty and a category:
        </h3>
        <div className="categories-wrapper">
          <div className="difficulty">
            <Link to="/" className="backBtn">
              <img src="arrow-left.svg" alt="back arrow icon" id="back" />
              BACK
            </Link>
            <div className="dif-button-container">
              <button
                className={`diff-button ${
                  selectedButton.difficulty === "easy" ? "clicked" : ""
                }`}
                onClick={(e) => clickHandlerDif(e)}
                name="easy"
              >
                EASY
                <img src="circle-easy.svg" alt="easy circle icon" />
              </button>
              <button
                className={`diff-button ${
                  selectedButton.difficulty === "medium" ? "clicked" : ""
                }`}
                onClick={(e) => clickHandlerDif(e)}
                name="medium"
              >
                MEDIUM
                <img src="circle-medium.svg" alt="medium circle icon" />
              </button>
              <button
                className={`diff-button ${
                  selectedButton.difficulty === "hard" ? "clicked" : ""
                }`}
                onClick={(e) => clickHandlerDif(e)}
                name="hard"
              >
                HARD
                <img src="circle-hard.svg" alt="hard circle icon" />
              </button>
            </div>
          </div>
          <div className="categories-container">
            <div className="categories">
              <button
                className={`box ${
                  selectedButton.category === "arts_and_literature"
                    ? "clicked"
                    : ""
                }`}
                name="arts_and_literature"
                onClick={(e) => clickHandler(e)}
                id="arts"
              >
                ARTS & LITERATURE
                <img
                  src="arts_and_literature.svg"
                  alt="arts icon"
                  id="categoryIcons"
                  name="arts_and_literature"
                />
              </button>
              <button
                className={`box ${
                  selectedButton.category === "film_and_tv" ? "clicked" : ""
                }`}
                onClick={(e) => clickHandler(e)}
                name="film_and_tv"
              >
                FILM & TV
                <img
                  src="film_and_tv.svg"
                  alt="film and tv icon"
                  name="film_and_tv"
                  id="categoryIcons"
                />
              </button>
              <button
                className={`box ${
                  selectedButton.category === "food_and_drink" ? "clicked" : ""
                }`}
                onClick={(e) => clickHandler(e)}
                name="food_and_drink"
              >
                FOOD & DRINK
                <img
                  src="food_and_drink.svg"
                  alt="food and drink icon"
                  id="categoryIcons"
                  name="food_and_drink"
                />
              </button>
              <button
                className={`box ${
                  selectedButton.category === "sport_and_leisure"
                    ? "clicked"
                    : ""
                }`}
                onClick={(e) => clickHandler(e)}
                name="sport_and_leisure"
              >
                SPORTS & LEISURE
                <img
                  src="sport_and_leisure.svg"
                  alt="sports and leisure icon"
                  id="categoryIcons"
                  name="sport_and_leisure"
                />
              </button>
              <button
                className={`box ${
                  selectedButton.category === "general_knowledge"
                    ? "clicked"
                    : ""
                }`}
                onClick={(e) => clickHandler(e)}
                name="general_knowledge"
              >
                GENERAL KNOWLEDGE
                <img
                  src="general_knowledge.svg"
                  alt="general knowledge icon"
                  id="generalIcon"
                  name="general_knowledge"
                />
              </button>
              <button
                className={`box ${
                  selectedButton.category === "society_and_culture"
                    ? "clicked"
                    : ""
                }`}
                onClick={(e) => clickHandler(e)}
                name="society_and_culture"
              >
                SOCIETY & CULTURE
                <img
                  src="society_and_culture.svg"
                  alt="society and culture icon"
                  id="societyIcon"
                  name="society_and_culture"
                />
              </button>
              <button
                className={`box ${
                  selectedButton.category === "science" ? "clicked" : ""
                }`}
                onClick={(e) => clickHandler(e)}
                name="science"
              >
                SCIENCE
                <img
                  src="science.svg"
                  alt="science icon"
                  id="categoryIcons"
                  name="science"
                />
              </button>
              <button
                className={`box ${
                  selectedButton.category === "music" ? "clicked" : ""
                }`}
                onClick={(e) => clickHandler(e)}
                name="music"
              >
                MUSIC
                <img
                  src="music.svg"
                  alt="music icon"
                  id="categoryIcons"
                  name="music"
                />
              </button>
              <button
                className={`box ${
                  selectedButton.category === "history" ? "clicked" : ""
                }`}
                onClick={(e) => clickHandler(e)}
                name="history"
              >
                HISTORY
                <img
                  src="history.svg"
                  alt="history icon"
                  id="categoryIcons"
                  name="history"
                />
              </button>
              <button
                className={`box ${
                  selectedButton.category === "geography" ? "clicked" : ""
                }`}
                onClick={(e) => clickHandler(e)}
                name="geography"
              >
                GEOGRAPHY
                <img
                  src="geography.svg"
                  alt="geography icon"
                  id="categoryIcons"
                  name="geography"
                />
              </button>
              <button
                className={`box ${
                  selectedButton.category === "random" ? "clicked" : ""
                }`}
                onClick={(e) => getRandomCategory(e)}
                name="random"
              >
                RANDOM
                <img
                  src="random.svg"
                  alt="random selection icon"
                  id="randomIcon"
                  name="random"
                />
              </button>
              <button
                className={`box ${
                  selectedButton.category === "mixed" ? "clicked" : ""
                }`}
                onClick={(e) => clickHandler(e)}
                name=""
              >
                MIXED
                <img
                  src="mixed.svg"
                  alt="mixed selection icon"
                  id="categoryIcons"
                  name="mixed"
                />
              </button>
            </div>
            {loading ? (
              <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <Link
                to="/quizgame"
                style={startDisabled ? { pointerEvents: "none" } : null}
                className="startBtn"
              >
                <img src="play-fill.svg" alt="play icon" id="play" /> START
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Categories;
