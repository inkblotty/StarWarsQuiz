import { QuizState, SingleActionField, SingleQuizField } from './types';

export const initQuiz = (configObj : QuizState) => {
  if (!configObj || Array.isArray(configObj) || (typeof configObj !== 'object')) {
    throw new Error('Invalid config object.');
  }
  return {
    type: 'init',
    quizData: configObj,
  };
};

export const answerQuizQuestion = ({ correctAnswer } : SingleQuizField, { value, key } : SingleActionField) => {
  const required = [correctAnswer, key, value];
  if (!correctAnswer || !key || !value) {
    const missingRequired : string[] = [];
    required.forEach(input => {
      if (!input) {
        missingRequired.push(Object.keys({ input })[0]);
      } 
    });
    throw new Error(`Missing required fields: ${missingRequired.join(', ')}`);
  }
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
      errored: true,
      key,
      value,
    },
  };
}