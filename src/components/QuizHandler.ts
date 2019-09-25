import { useReducer } from 'react';
import { quizReducer } from '../store/reducers';
import { answerQuizQuestion, initQuiz } from '../store/actions';
import { QuizState, SingleQuizField, SingleAnswerField } from '../store/types';

/* abstracts dispatch out slightly so only pre-defined actions can be called */
const QuizHandler = () => {
  const [quizState, dispatchQuizState] = useReducer(quizReducer, {});
  return {
    getQuizState: () => quizState,
    initQuiz: (input : QuizState) => dispatchQuizState(initQuiz(input)),
    answerQuizQuestion: (question : SingleQuizField, answer : SingleAnswerField) => dispatchQuizState(answerQuizQuestion(question, answer)),
  };
}

export default QuizHandler;
