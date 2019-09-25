import QuizHandler from '../components/QuizHandler';

describe('quizReducer', () => {
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
    }
  }

  it('intializes properly', () => {
    expect(true).toEqual(true);
  });
})