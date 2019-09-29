import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getGeneratedQuiz } from '../../requests/api';
import { ThemeProps } from '../../lib/theme';
import { focusOnFirst, rgba } from '../../lib/helpers';
import QuizHandler from '../../store';
import Loading from '../../components/Loading';
import RadioButtons from '../../components/RadioButtons';
import { SingleQuizField } from '../../store/types';
import QuizError from './QuizError';

export const StyledButton = styled.button`
  background-color: ${({ disabled, theme }) => disabled ? theme.colors.lightGray : theme.colors.yellow};
  border: 2px solid ${({ theme }) => theme.colors.black};
  border-radius: 8px;
  box-shadow: 2px 2px 3px ${({ theme }) => theme.colors.textColor};
  color: ${({ theme }) => theme.colors.black};
  cursor: ${({ disabled }: { disabled?: boolean }) => disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  font-size: 18px;
  height: 50px;
  justify-content: center;
  text-transform: uppercase;
  width: 80%;
  :focus {
    background-color: ${({ theme }) => theme.colors.focusColor};
  }
}
`;
const QuizTitle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const QuizHelperText = styled.p`
  font-size: 32px;
  height: 32px;
  text-align: center;
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
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { quizState, initQuiz, answerQuizQuestion } = QuizHandler();
  const [activeQIndex, setActiveQIndex] = useState<number | null>(null);

  const getQuiz = async () => {
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
        <StyledButton onClick={getQuiz}>Try Again</StyledButton>
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
  
  const forwardToAnswerQuestion = (answerValue: string | number) => {
    if (!answerValue) {
      return;
    }
    answerQuizQuestion(activeQuestion, { key: activeQuestionId.toString(), value: answerValue.toString() });
    const continueFinishButton = document.getElementById('continueFinishButton');
    if (!!continueFinishButton) {
      console.log('focusing on continue');
      continueFinishButton.focus();
    }
  }

  const continueToNext = (e: any) => {
    if (e) {
      e.preventDefault();
    }
    if (Object.keys(quizState).length === activeQIndex + 1) {
      setIsComplete(true);
    } else {
      setActiveQIndex(activeQIndex + 1);
      focusOnFirst();
    }
  }

  const successList = Object.keys(quizState).filter(key => (
    quizState[key].value === quizState[key].correctAnswer
  )).map(key => quizState[key]);
  const erroredList = Object.keys(quizState).filter(key => (
    quizState[key].value && (quizState[key].value !== quizState[key].correctAnswer)
  )).map(key => quizState[key]);

  console.log('successList: ', successList);
  console.log('erroredList: ', erroredList);

  return (
    <QuizWrapper>
      <QuizTitle>
        Question: {activeQIndex + 1}
      </QuizTitle>
      <RadioButtons
        correctAnswer={activeQuestion.correctAnswer.toString()}
        field={activeQuestion}
        onChange={forwardToAnswerQuestion}
      />
      {activeQuestion.value
        ? (
          <QuizHelperText>
            {activeQuestion.errored ? 'Wrong :(' : 'Correct! :)'}
          </QuizHelperText>
        ) : <QuizHelperText />}
      <StyledButton
        disabled={!activeQuestion.value}
        id='continueFinishButton'
        onClick={continueToNext}
      >
        {activeQIndex === (Object.keys(quizState).length - 1)
          ? 'Finish Quiz'
          : 'Next Question'
        }
      </StyledButton>
    </QuizWrapper>
  )
}
export default QuizMain;
