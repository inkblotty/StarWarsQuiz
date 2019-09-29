import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px 18px;
`;

interface Props {
  error: string;
}
const QuizError = ({ error }: Props) => (
  <StyledWrapper>
    {error}
  </StyledWrapper>
);
export default QuizError;
