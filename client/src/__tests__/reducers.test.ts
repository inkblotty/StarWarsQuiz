import {
  act,
  renderHook
} from '@testing-library/react-hooks';
import QuizHandler from '../store/QuizHandler';

const dummyQuizState = {
  q1: {
    correctAnswer: 'a',
    label: 'What is the Answer to this Question? (Pick A)',
    name: 'q1',
    options: [
      {
        label: 'A',
        name: 'a',
        value: 'a',
      },
      {
        label: 'B',
        name: 'b',
        value: 'b',
      },
      {
        label: 'C',
        name: 'c',
        value: 'c',
      }
    ],
    type: 'radio',
  },
  q2: {
    correctAnswer: '3ArTh',
    label: 'Which planet do you live on?',
    name: 'whichPlanet',
    options: [
      {
        label: 'Mars',
        value: 'm4RZ',
      },
      {
        label: 'Krypton',
        value: 'KRyP7On',
      },
      {
        label: 'Earth',
        value: '3ArTh',
      },
      {
        label: 'Jupiter',
        value: 'JUp173R',
      }
    ],
    value: '',
    type: 'radio',
  },
};

describe('quizReducer', () => {
  const { result } = renderHook(QuizHandler);

  it('intializes properly', () => {
    act(() => {
      result.current.initQuiz(dummyQuizState);
    });
    const quiz = result.current.quizState;
    expect(Object.keys(quiz)).toEqual(Object.keys(quiz));
    expect(quiz.q1.correctAnswer).toEqual(dummyQuizState.q1.correctAnswer);
  });

  it('answers a correct question', () => {
    const answer = { key: 'q1', value: 'a' };
    act(() => {
      result.current.answerQuizQuestion(dummyQuizState.q1, answer);
    });
    const quiz = result.current.quizState;
    expect(quiz.q1.value).toBeTruthy;
    expect(quiz.q1.errored).toBe(false);
    expect(quiz.q1.value).toEqual('a');
  });

  it('answers an incorrect question and errors', () => {
    const answer = { key: 'q2', value: 'm4RZ' };
    act(() => {
      result.current.answerQuizQuestion(dummyQuizState.q2, answer);
    });
    const quiz = result.current.quizState;
    expect(quiz.q2.value).toBeTruthy;
    expect(quiz.q2.errored).toBe(true);
    expect(quiz.q2.value).toEqual('m4RZ');
  });
});
