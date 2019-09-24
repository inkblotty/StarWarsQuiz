import React from 'react';
import styled from 'styled-components';

import { ThemeProps } from '../lib/helpers';

interface Props {
  disabled?: boolean;
  errored?: boolean;
  label: string;
  name: string;
  options: {
    label: string;
    name: string;
  }[];
  value?: string | number;
};

const StyledFieldset = styled.fieldset`
  border: none;
  display: flex;
  margin: 0;
  padding: 0;
`;
const StyledLegend = styled.legend`
  font-size: ${({ theme }) => theme.fontSize.subheading}px;
  margin-bottom: ${({ theme }) => theme.spacingUnit * 2}px;
  text-align: center;
`;
const StyledDiv = styled.div`
  display: flex;
  :focus-within label {
    border: 1px solid ${({ theme }) => theme.colors.focusColor};
    border-radius: ${({ theme }) => theme.spacingUnit}px;
    box-shadow: 0 0 3px ${({ theme }) => theme.colors.focusColor};
    margin: 0 auto;
  };
`;
const StyledLabel = styled.label`
  cursor: ${({ disabled }: { disabled?: boolean }) => disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  font-size: ${({ theme }: ThemeProps) => theme.fontSize.main}px;
  justify-content: center;
  margin: 1px auto; /* 1px to allow for focus border */
  max-width: 600px;
  padding: ${({ theme }: ThemeProps) => `${theme.spacingUnit * 2}px ${theme.spacingUnit * 3}px`};
  width: 100%;
`;
const StyledRadio = styled.input`
  height: 0;
  margin: 0;
  opacity: 0;
  width: 0;
  :focus {
    outline: none;
  };
`;
const RadioButtons = ({ options, value, ...props }: Props) => {
  return (
    <StyledFieldset>
      <StyledLegend>{props.label}</StyledLegend>
      {options.map((opt, i) => (
        <StyledDiv
          key={`${props.name}-radio-opt-${i}`}
        >
          <StyledLabel
            disabled={props.disabled}
            htmlFor={opt.name}
          >
            <StyledRadio
              aria-disabled={props.disabled}
              aria-invalid={props.errored}
              disabled={props.disabled}
              checked={opt.name === value}
              type='radio'
            />
            {opt.label}
          </StyledLabel>
        </StyledDiv>
      ))}
    </StyledFieldset>
  );
};

export default RadioButtons;
