import React from 'react';
import styled from 'styled-components';

import ToggleInput from '../../components/ToggleInput';

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 16px;
`;

interface Props {
  darkSideMode: boolean;
  forwardDarkSideToggle: (e : any) => void;
}
const Settings = ({ darkSideMode, forwardDarkSideToggle }: Props) => {
  return (
    <StyledDiv>
      <ToggleInput
        field={{
          name: 'darkSideModeToggle',
          label: 'Dark Side Mode',
          value: darkSideMode,
          type: 'checkbox'
        }}
        onChange={forwardDarkSideToggle}
      />
    </StyledDiv>
  )
}
export default Settings;
