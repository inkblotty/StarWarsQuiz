import { QuizState, SingleActionField, SingleQuizField } from './types';

export const initQuiz = (configObj : QuizState) => ({
  type: 'init',
  quizData: configObj,
});

export const answerQuizQuestion = ({ correctAnswer } : SingleQuizField, { value, key } : SingleActionField) => {
  if (correctAnswer === value) {
    return {
      type: 'success',
      field: {
        errored: false,
        key,
        value,
      },
    };
  }
  return {
    type: 'error',
    field: {
      errored: false,
      key,
      value,
    },
  };
}