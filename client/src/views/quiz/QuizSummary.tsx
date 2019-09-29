import React from 'react';
import { SingleQuizField } from '../../store/types';
import Button from '../../components/Button';

interface Props {
  erroredList: SingleQuizField[];
  restartQuiz: () => void;
  successList: SingleQuizField[];
}
const QuizSummary = ({ erroredList, restartQuiz, successList }: Props) => {
  return (
    <div>
      You got {successList.length} out of {successList.length + erroredList.length}
      <dl>
        {successList.map((q, i) => (
          <React.Fragment key={`successQuestion-${i}`}>
            <dt>{q.label}</dt>
            <dd>Correct Answer: {q.correctAnswer}</dd>
            <dd>Your Answer: {q.value}</dd>
          </React.Fragment>
        ))}
      </dl>
      <dl>
        {erroredList.map((q, i) => (
          <React.Fragment key={`erroredQuestion-${i}`}>
            <dt>{q.label}</dt>
            <dd>Correct Answer: {q.correctAnswer}</dd>
            <dd>Your Answer: {q.value}</dd>
          </React.Fragment>
        ))}
      </dl>
      <Button onClick={restartQuiz}>
        Start a New Quiz
      </Button>
    </div>
  )
}

export default QuizSummary;
