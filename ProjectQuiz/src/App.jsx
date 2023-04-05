import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer";
import QuizGame from "./components/quizgame";
import Start from "./components/start";
import Categories from "./components/categories";
import DailyChallenge from "./components/dailyChallenge";
import NotFound from "./components/404";
import { useEffect, useState } from "react";
import Intro from "./components/intro";
import BackgroundMusic from "./components/Music/BackgroundMusic";

function App() {
  const [introActive, setIntroActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIntroActive(true);
    }, 2960);
  }, []);

  return (
    <div className="wrapper">
      {!introActive ? <Intro /> : null}
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/quizgame" element={<QuizGame />} />
        <Route path="/daily" element={<DailyChallenge />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BackgroundMusic />
      <Footer />
    </div>
  );
}

export default App;
