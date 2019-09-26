import { initQuiz, answerQuizQuestion } from '../store/actions';

const quizData = {
  q1: {
    correctAnswer: 'b',
    label: 'Who\'s buried in Grant\'s tomb?',
    name: 'buriedInGrantTomb',
    options: [
      {
        label: 'Bob',
        value: 'a',
      },
      {
        label: 'Grant',
        value: 'b',
      },
      {
        label: 'Washington',
        value: 'c',
      }
    ],
    value: '',
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
  }
};

describe('quiz actions', () => {
  it('initQuiz returns as expected', () => {
    const expectedAction = {
      quizData,
      type: 'init',
    };
    const resultAction = initQuiz(quizData);
    expect(resultAction).toBeTruthy();
    expect(resultAction.type).toEqual(expectedAction.type);
    expect(resultAction.quizData.q1.correctAnswer)
      .toEqual(expectedAction.quizData.q1.correctAnswer);
  });

  it('initQuiz invalid input errors', () => {
    expect(() => {
      // @ts-ignore
      initQuiz([]);
    }).toThrow();
  });

  it('answerQuizQuestion correct value: returns as expected', () => {
    const expectedAction = {
      field: {
        errored: false,
        key: 'q2',
        value: '3ArTh',
      },
      type: 'success',
    };
    const resultAction = answerQuizQuestion(quizData.q2, { key: 'q2', value: '3ArTh' });
    expect(resultAction).toBeTruthy();
    expect(resultAction.type).toEqual(expectedAction.type);
    expect(resultAction.field.errored).toEqual(expectedAction.field.errored);
    expect(resultAction.field.key).toEqual(expectedAction.field.key);
    expect(resultAction.field.value).toEqual(expectedAction.field.value);
  });

  it('answerQuizQuestion incorrect value: returns as expected', () => {
    const expectedAction = {
      field: {
        errored: true,
        key: 'q2',
        value: 'JUp173R',
      },
      type: 'error',
    };
    const resultAction = answerQuizQuestion(quizData.q2, { key: 'q2', value: 'JUp173R' });
    expect(resultAction).toBeTruthy();
    expect(resultAction.type).toEqual(expectedAction.type);
    expect(resultAction.field.errored).toEqual(expectedAction.field.errored);
    expect(resultAction.field.key).toEqual(expectedAction.field.key);
    expect(resultAction.field.value).toEqual(expectedAction.field.value);
  });

  it('answerQuizQuestion invalid input errors', () => {
    expect(() => {
      // @ts-ignore
      answerQuizQuestion(quizData.q1);
    }).toThrow();
  });
});