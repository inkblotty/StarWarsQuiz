import { useReducer } from 'react';
import { quizReducer } from '../store/reducers';
import { answerQuizQuestion, initQuiz } from '../store/actions';
import { QuizState, SingleQuizField, SingleAnswerField } from '../store/types';

export interface QuizHandlerOutput {
  answerQuizQuestion: (question : SingleQuizField, answer : SingleAnswerField) => void;
  initQuiz: (input : QuizState) => void;
  quizState: QuizState;
}

/* abstracts dispatch out slightly so only pre-defined actions
can be called (no direct access to the dipatch) */
const QuizHandler = () : QuizHandlerOutput => {
  const [quizState, dispatchQuizState] = useReducer(quizReducer, {});
  return {
    quizState,
    initQuiz: (input : QuizState) => dispatchQuizState(initQuiz(input)),
    answerQuizQuestion: (question : SingleQuizField, answer : SingleAnswerField) => dispatchQuizState(answerQuizQuestion(question, answer)),
  };
}

export default QuizHandler;
