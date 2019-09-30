import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getGeneratedQuiz } from '../../requests/api';
import { focusOnFirst, rgba } from '../../lib/helpers';
import QuizHandler from '../../store';
import Loading from '../../components/Loading';
import RadioButtons from '../../components/RadioButtons';
import Button from '../../components/Button';
import { SingleQuizField } from '../../store/types';

import QuizSummary from './QuizSummary';
import QuizError from './QuizError';

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
  overflow: scroll;
  padding: 20px 23px;
`;
const QuizMain = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { quizState, initQuiz, answerQuizQuestion } = QuizHandler();
  const [activeQIndex, setActiveQIndex] = useState<number | null>(null);

  const successList = Object.keys(quizState).filter(key => (
    quizState[key].value === quizState[key].correctAnswer
  )).map(key => quizState[key]);
  const erroredList = Object.keys(quizState).filter(key => (
    quizState[key].value && (quizState[key].value !== quizState[key].correctAnswer)
  )).map(key => quizState[key]);

  const getQuiz = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setIsComplete(false);
      const quiz = await getGeneratedQuiz();
      initQuiz({ ...quiz.data.questions });
      setActiveQIndex(0);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.toString());
    }
  }

  // initialization effect hook
  const initialized = !!initQuiz && !!getQuiz;
  useEffect(() => {
    getQuiz();
  }, [initialized]);

  // post-answer focus hook
  useEffect(() => {
    const continueFinishButton = document.getElementById('continueFinishButton');
    if (!!continueFinishButton) {
      continueFinishButton.focus();
    }
  }, [successList.length, erroredList.length]);

  // new question focus hook
  useEffect(() => {
    console.log('focusing on first');
    focusOnFirst();
  }, [!isLoading, activeQIndex]);

  const restartQuiz = () => {
    getQuiz();
  }

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
  if (isComplete) {
    return (
      <QuizWrapper>
        <QuizSummary
          quizState={quizState}
          restartQuiz={restartQuiz}
          successList={successList}
        />
      </QuizWrapper>
    )
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
  }

  const continueToNext = (e: any) => {
    if (e) {
      e.preventDefault();
    }
    if (Object.keys(quizState).length === activeQIndex + 1) {
      setIsComplete(true);
    } else {
      setActiveQIndex(activeQIndex + 1);
    }
  }

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
      <Button
        disabled={!activeQuestion.value}
        id='continueFinishButton'
        onClick={continueToNext}
      >
        {activeQIndex === (Object.keys(quizState).length - 1)
          ? 'Finish Quiz'
          : 'Next Question'
        }
      </Button>
    </QuizWrapper>
  )
}
export default QuizMain;
