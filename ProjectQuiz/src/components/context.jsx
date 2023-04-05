import { createContext, useState, useEffect } from "react";

export const QuizContext = createContext();

export const Context = ({ children }) => {
  const [data, setData] = useState([]);
  const [gameStart, setGameStart] = useState(false);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(false);
  const [dailyData, setDailyData] = useState([]); //for Daily challenge
  const [isDailyChallenge, setDailyChallenge] = useState(false); //for Daily challenge
  const [nickName, setNickName] = useState("");
  //Local storage high-scores
  const NO_OF_HIGH_SCORES = 10;
  const HIGH_SCORES = "highScores";
  const highScoreString = localStorage.getItem(HIGH_SCORES);
  const highScores = JSON.parse(highScoreString) ?? [];

  // https://the-trivia-api.com/api/questions?categories=arts_and_literature&limit=10&difficulty=easy

  let url = "";
  const generateURL = () => {
    if (category !== "mixed" && difficulty) {
      url = `https://the-trivia-api.com/api/questions?categories=${category}&limit=10&difficulty=${difficulty}`;
      setGameStart(true);
    } else if (category === "mixed" && difficulty) {
      url = `https://the-trivia-api.com/api/questions?limit=10&difficulty=${difficulty}`;
      setGameStart(true);
    } else {
      url = "https://the-trivia-api.com/api/questions?limit=10";
      setGameStart(true);
    }
    return url;
  };

  const fetchData = () => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (gameStart) {
      generateURL();
      fetchData();
    }
  }, [gameStart]);

  const values = {
    setGameStart,
    setDifficulty,
    data,
    setCategory,
    category,
    difficulty,
    loading,
    NO_OF_HIGH_SCORES,
    HIGH_SCORES,
    highScoreString,
    highScores,
    nickName,
    setNickName,
    dailyData,
    setDailyData,
    isDailyChallenge,
    setDailyChallenge,
  };

  return <QuizContext.Provider value={values}>{children}</QuizContext.Provider>;
};
