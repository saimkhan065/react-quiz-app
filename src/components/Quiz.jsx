import { useState, useCallback } from "react";
import questions from "../questions";
import QuestionTimer from "./QuestionTimer";
import quizCompleteBanner from "../assets/quiz-complete.png";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]); //record user answers in a sequence
  const activeQuestionIndex = userAnswer.length; //sets the index to the next of what user has answered

  const isQuizComplete = activeQuestionIndex === questions.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    // handle state change
    setUserAnswer((prevUserAnswer) => {
      // by ... we keep appending to userAnswer state
      return [...prevUserAnswer, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  if (isQuizComplete) {
    return <Summary userAnswers={userAnswer} />;
  }
  const shuffledAnswers = [...questions[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeOut={10000}
          onTimeOut={handleSkipAnswer}
        />
        <h2>{questions[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answers) => (
            <li key={answers} className="answer">
              <button onClick={() => handleSelectAnswer(answers)}>
                {answers}
              </button>
              {/*wrap handleSelectAnswer as an arrow function because
            selected answer needs to be passed as a parameter for state handling*/}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
