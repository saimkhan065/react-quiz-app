import { useState } from "react";
import questions from "../questions";

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]); //record user answers in a sequence
  const activeQuestionIndex = userAnswer.length; //sets the index to the next of what user has answered
  function handleSelectAnswer(selectedAnswer) {
    setUserAnswer((prevUserAnswer) => {
      return [...prevUserAnswer, selectedAnswer];
    });
  }

  return (
    <div id="question">
      <h2>{questions[activeQuestionIndex].text}</h2>
      <ul id="answers">
        {questions[activeQuestionIndex].answers.map((answers) => (
          <li key={answers} className="answer">
            <button onClick={() => handleSelectAnswer(answers)}>
              {answers}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
