import React, { useEffect } from 'react';
import styled from 'styled-components';
import { getGeneratedQuiz } from '../../requests/api';

const QuizWrapper = styled.div`
`;
const QuizMain = () => {
  useEffect(() => {
    const generate = async () => getGeneratedQuiz();
    generate();
  }, []);
  
  return (
    <QuizWrapper></QuizWrapper>
  )
}
export default QuizMain;
