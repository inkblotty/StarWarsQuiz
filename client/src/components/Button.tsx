import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${({ disabled, theme }) => disabled ? theme.colors.disabledColor : theme.colors.yellow};
  border: 2px solid ${({ theme }) => theme.colors.black };
  border-radius: 8px;
  box-shadow: ${({ disabled, theme }) => disabled ? 'none' : `2px 2px 3px ${theme.colors.textColor}`};
  color: ${({ disabled, theme }) => disabled ? theme.colors.medGray : theme.colors.black};
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
export default StyledButton;