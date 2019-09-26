import { QuizAction, QuizState } from './types';

export const quizReducer = (prevState : QuizState, action : QuizAction) : QuizState => {
  switch (action.type) {
    case 'init': {
      if (!action.quizData) {
        return prevState;
      }
      return Object.keys(action.quizData).reduce((prev, key) => ({
        ...prev,
        [key]: (action.quizData || {})[key],
      }), {});
    }
    case 'error': {
      const { key = null, value = '' } = action.field || {};
      if (!key) {
        return prevState;
      }
      const newState : QuizState = { ...prevState };
      newState[key].value = value;
      newState[key].errored = true;
      return newState;
    }
    case 'success': {
      const { key = null, value = '' } = action.field || {};
      if (!key) {
        return prevState;
      }
      const newState = { ...prevState };
      newState[key].value = value;
      newState[key].errored = false;
      return newState;
    }
    default: {
      return prevState;
    }
  };
}
