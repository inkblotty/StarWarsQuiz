import React from 'react';
import styled from 'styled-components';

import { FormField } from './types';

const StyledLabelText = styled.span``;
const StyledLabel = styled.label``;

interface Props {
  field: FormField;
  onChange: () => void;
};
const ToggleInput = ({ field, onChange } : Props) => {
  const {
    disabled,
    label,
    name,
    value,
  } = field;
  return (
    <StyledLabel
      className={classes.toggleSwitch}
      onClick={!disabled ? onChange : () => ''}
      id={`${name}-label`}
    >
      <StyledLabelText className={classes.switchLabelText}>
        {label}
      </StyledLabelText>
      <input
        className={classes.displayHidden}
        type='checkbox'
        checked={isActive}
        id={name}
        name={name}
        aria-labelledby={`${name}-aria-label`}
        readOnly
        aria-live='polite'
      />
      <span
        className={classes.displayHidden}
        id={`${name}-aria-label`}
        aria-live='polite'
      >
        {label}: {isActive ? 'on' : 'off'}
        <span>
          Press Space Bar to toggle on or off.
        </span>
      </span>
      <div className='toggle-background'>
        <span
          className={(isActive
              ? `${classes.switchLabel} ${classes.activeLabel}`
              : classes.switchLabel
          )}
          data-on={'On'}
          data-off={'Off'}
        />
        <span
          className={
            isActive
              ? `${classes.switchHandle} ${classes.activeHandle}`
              : classes.switchHandle
          }
          role='presentation'
          aria-hidden
        />
      </div>
    </StyledLabel>
  )
}

export default ToggleInput;
