import React from 'react';
import styled from 'styled-components';
import { SingleQuizField, QuizState } from '../../store/types';
import Button from '../../components/Button';

const AnswerDef = styled.dt`
  margin-top: ${({ theme }) => theme.spacingUnit * 2}px;
  :first-of-type: {
    margin-top: 0;
  };
`;
const CorrectIcon = styled.span`
  color: ${({ theme }) => theme.colors.green};
  margin-right: ${({ theme }) => theme.spacingUnit}px;
`;
const ErrorIcon = styled.span`
  color: ${({ theme }) => theme.colors.red};
  margin-right: ${({ theme }) => theme.spacingUnit}px;
`;
const HeadingTotalsNum = styled.span`
  font-weight: 600;
`;
const StyledHeading = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.subheading}px;
  font-weight: 400;
`;

interface Props {
  quizState: QuizState;
  restartQuiz: () => void;
  successList: SingleQuizField[];
}
const QuizSummary = ({ quizState, restartQuiz, successList }: Props) => {
  return (
    <React.Fragment>
      <StyledHeading>
        You got
        <HeadingTotalsNum> {successList.length} </HeadingTotalsNum>
        out of
        <HeadingTotalsNum> {Object.keys(quizState).length}</HeadingTotalsNum>
      </StyledHeading>
      <dl>
        {Object.keys(quizState).map((key, i) => {
          const q = quizState[key];
          const { correctAnswer, errored, label, options, value } = q;
          const correctAnswerOpt = options.find(opt => opt.value === correctAnswer);
          const valOpt = options.find(opt => opt.value === value);

          const displayCorrectAnswer = correctAnswerOpt ? correctAnswerOpt.label : 'n/a';
          const displayVal = valOpt ? valOpt.label : 'n/a';

          return (
            <React.Fragment key={`summaryQuestion-${i}`}>
              <AnswerDef>
                {errored
                  ? (
                    <ErrorIcon>✘</ErrorIcon>
                  ) : (
                    <CorrectIcon>✓</CorrectIcon>
                  )}
                {label}
              </AnswerDef>
              {errored
                ? (
                  <React.Fragment>
                    <dd>Correct Answer: {displayCorrectAnswer}</dd>
                    <dd>Your Answer: {displayVal}</dd>
                  </React.Fragment>
                ) : (
                  <dd>Your answer: {displayVal}</dd>
                )}
            </React.Fragment>
          );
        })}
      </dl>
      <Button onClick={restartQuiz} style={{ marginBottom: 8, marginTop: 8 }}>
        Start a New Quiz
      </Button>
    </React.Fragment>
  )
}

export default QuizSummary;
