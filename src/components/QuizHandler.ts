import { useReducer } from 'react';
import { quizReducer } from '../store/reducers';

const QuizHandler = () => {
  const [quizState, dispatchQuizState] = useReducer(quizReducer, {});
  return {
    quizState,
    dispatchQuizState,
  };
}

export default QuizHandler;
