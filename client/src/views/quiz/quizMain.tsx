import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getGeneratedQuiz } from '../../requests/api';
import QuizHandler from '../../store';
import Loading from '../../components/Loading';
import QuizError from './QuizError';

const QuizWrapper = styled.div`
`;
const QuizMain = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { quizState, initQuiz } = QuizHandler();

  const getQuiz = async () => {
    try {
      setIsLoading(true);
      const quiz = await getGeneratedQuiz();
      initQuiz({ ...quiz.data.questions });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.toString());
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getQuiz();
  }, [!!initQuiz]);

  console.log('quizState: ', quizState);

  if (isLoading) {
    return <QuizWrapper><Loading /></QuizWrapper>;
  }
  if (error) {
    return (
      <QuizWrapper>
        <QuizError error={error || ''} />
      </QuizWrapper>
    );
  }
  
  return (
    <QuizWrapper>
      Quiz
    </QuizWrapper>
  )
}
export default QuizMain;
