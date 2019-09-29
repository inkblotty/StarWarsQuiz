import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getGeneratedQuiz } from '../../requests/api';
import { rgba } from '../../lib/helpers';
import QuizHandler from '../../store';
import Loading from '../../components/Loading';
import RadioButtons from '../../components/RadioButtons';
import { SingleQuizField } from '../../store/types';
import QuizError from './QuizError';

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.yellow};
  border: 2px solid black;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  font-size: 18px;
  height: 50px;
  justify-content: center;
  text-transform: uppercase;
  width: 80%;
}
`;
const QuizTitle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const QuizWrapper = styled.div`
  background-color: ${({ theme }) => rgba(theme.colors.backgroundColor, 0.8)};
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  max-width: 650px;
  min-width: 300px;
  padding: 20px 23px;
`;
const QuizMain = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { quizState, initQuiz, answerQuizQuestion } = QuizHandler();
  const [activeQIndex, setActiveQIndex] = useState<number | null>(null);

  const getQuiz = async () => {
    console.log('grabbing quiz');
    try {
      setIsLoading(true);
      const quiz = await getGeneratedQuiz();
      initQuiz({ ...quiz.data.questions });
      setActiveQIndex(0);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.toString());
    }
  }

  const initialized = !!initQuiz && !!getQuiz;
  useEffect(() => {
    getQuiz();
  }, [initialized]);

  if (error) {
    return (
      <QuizWrapper>
        <QuizError error={error || 'Quiz could not load. Please try again.'} />
        <Button onClick={getQuiz}>Try Again</Button>
      </QuizWrapper>
    );
  }
  if (isLoading || (activeQIndex === null)) {
    return (
      <QuizWrapper>
        <QuizTitle>Generating Quiz Questions</QuizTitle>
        <Loading />
      </QuizWrapper>
    );
  }
  
  const activeQuestionId = Object.keys(quizState)[activeQIndex];
  const activeQuestion : SingleQuizField = {
    ...quizState[activeQuestionId],
    name: `questionField-${activeQuestionId}`,
  };
  console.log('activeQuestion: ', activeQuestion);
  return (
    <QuizWrapper>
      <QuizTitle>
        Question: {activeQIndex + 1}
      </QuizTitle>
      <RadioButtons
        field={activeQuestion}
        onChange={(e : any) => { console.log(e) }}
      />
    </QuizWrapper>
  )
}
export default QuizMain;
