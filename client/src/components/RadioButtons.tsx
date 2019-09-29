import React from 'react';
import styled, { withTheme } from 'styled-components';

import { ThemeProps } from '../lib/theme';
import { FormField } from './types';

interface Props {
  correctAnswer: string;
  field: FormField;
  onChange: (value: string | number) => void;
  theme: ThemeProps['theme'];
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
  margin-top: 8px;
  :focus-within label {
    background-color: ${({ theme }) => theme.colors.focusColor};
    margin: 0 auto;
  };
`;
const StyledLabel = styled.label` /* lots of repeats here from StyledButton, but element type needs to be different -- remedy */
  background-color: ${({ disabled, theme }) => disabled ? theme.colors.lightGray : theme.colors.yellow};
  border: 2px solid ${({ theme }) => theme.colors.black};
  box-shadow: 2px 2px 3px ${({ theme }) => theme.colors.textColor};
  color: ${({ theme }) => theme.colors.black};
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
const RadioButtons = ({ correctAnswer, field, onChange, theme, ...props }: Props) => {
  const { disabled, errored, label, name, options = [], value } = field;
  const isDisabled = disabled || !!value;
  const endStyles = (optValue: string) => {
    if (value && (optValue === correctAnswer)) {
      return {
        backgroundColor: theme.colors.green,
      };
    }
    if (value && (optValue !== correctAnswer)) {
      return {
        backgroundColor: theme.colors.lightRed,
      };
    }
    return {};
  };

  const captureKeyPress = (e : any, val : string | number) => {
    if (e && e.key && (e.key === 'Enter' || (e.key === 'Space'))) {
      onChange(val);
    }
  }

  return (
    <StyledFieldset>
      <StyledLegend>{label}</StyledLegend>
      {options.map((opt, i) => (
        <StyledDiv
          key={`${name}-radio-opt-${i}`}
        >
          <StyledLabel
            disabled={isDisabled}
            htmlFor={opt.value}
            onClick={isDisabled ? () => '' : (e: any) => onChange(opt.value)}
            onKeyPress={e => captureKeyPress(e, opt.value)}
            style={endStyles(opt.value.toString())}
            tabIndex={isDisabled ? -1 : 1}
          >
            <StyledRadio
              aria-disabled={isDisabled}
              aria-invalid={errored}
              disabled={isDisabled}
              checked={opt.value === value}
              type='radio'
            />
            {opt.label}
          </StyledLabel>
        </StyledDiv>
      ))}
    </StyledFieldset>
  );
};

export default withTheme(RadioButtons);
