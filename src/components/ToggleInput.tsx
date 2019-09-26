import React from 'react';
import styled from 'styled-components';

import { FormField } from './types';

const switchHeight = 30;
const StyledInput = styled.input`
  height: 0;
  opacity: 0;
  overflow: hidden;
  width: 0;
  :focus ~ .toggle-background: {
    border-radius: ${switchHeight};
    box-shadow: ${({ theme }) => `0 0 5px ${theme.colors.blue}`};
  },
`;
const StyledHiddenSpan = styled.span`
  height: 0;
  opacity: 0;
  overflow: hidden;
  width: 0;
`;
const StyledLabelText = styled.span`
  align-items: center;
  display: flex;
  padding: 0 5px;
`;
const StyledLabel = styled.label`
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  font-weight: 400;
  height: ${switchHeight};
  outline: none;
  position: relative;
  userSelect: none;
`;
const SwitchLabel = styled.span`
  background-color: ${({ theme, itemProp }) => itemProp === 'false' ? theme.colors.disabledColor : theme.colors.yellow};
  border-radius: ${switchHeight}px;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.5);
  display: inline-block;
  height: ${switchHeight}px;
  justify-content: flex-start;
  width: ${switchHeight * 2}px;
`;
const SwitchHandle = styled.span`
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  border-radius: 50%;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.3);
  display: inline-block;
  height: ${switchHeight - 4}px;
  margin-left: -${switchHeight * 2 - 4}px;
  margin-top: 2px;
  position: absolute;
  transition: transform ease 0.3s;
  width: ${switchHeight - 4}px;
`;

interface Props {
  field: FormField;
  onChange: (e : any) => void;
};
const ToggleInput = ({ field, onChange } : Props) => {
  const {
    disabled,
    label,
    name,
    value,
  } = field;
  const isActive = !!value;
  return (
    <StyledLabel
      onClick={!disabled ? onChange : () => ''}
      id={`${name}-label`}
    >
      <StyledLabelText>
        {label}
      </StyledLabelText>
      <StyledInput
        type='checkbox'
        checked={isActive}
        id={name}
        name={name}
        aria-labelledby={`${name}-aria-label`}
        readOnly
        aria-live='polite'
      />
      <StyledHiddenSpan
        id={`${name}-aria-label`}
        aria-live='polite'
      >
        {label}: {isActive ? 'on ' : 'off '}
        <span>
          Press Space Bar to toggle on or off.
        </span>
      </StyledHiddenSpan>
      <div className='toggle-background'>
        <SwitchLabel
          itemProp={isActive.toString()}
          data-on={'On'}
          data-off={'Off'}
        />
        <SwitchHandle
          style={isActive ? { transform: `translateX(${switchHeight - 4}px)` } : {}}
          role='presentation'
          aria-hidden
        />
      </div>
    </StyledLabel>
  )
}

export default ToggleInput;
