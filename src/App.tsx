import React, { useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { makeTheme, ThemeProps } from './lib/theme';
import Header from './components/Header';
import RadioButtons from './components/RadioButtons';
import ToggleInput from './components/ToggleInput';

const GlobalStyles = createGlobalStyle`
  * {
    color: ${({ theme }: ThemeProps) => theme.colors.textColor};
    font-family: Verdana;
    margin: 0px;
    padding: 0px;
  };
  #root {
    background: ${({ theme }: ThemeProps) => `${theme.colors.backgroundColor} url('${theme.backgroundImage}')`};
    background-position: center;
    background-size: cover;
    height: 100vh;
    -webkit-transition: background-image 0.2s ease-in-out;
    transition: background-image 0.2s ease-in-out;
  }
`;

function App() {
  const [darkSideMode, setDarkSideMode] = useState(false);

  const { theme: AppTheme } = makeTheme(darkSideMode);

  const forwardDarkSideToggle = (e : any) => {
    if (e && e.target) {
      e.preventDefault();
    }
    setDarkSideMode(!darkSideMode);
  }

  return (
    <ThemeProvider theme={AppTheme}>
      <React.Fragment>
        <Header />
        <ToggleInput
          field={{
            name: 'darkSideModeToggle',
            label: 'Dark Side Mode',
            value: darkSideMode,
            type: 'checkbox'
          }}
          onChange={forwardDarkSideToggle}
        />
        <GlobalStyles theme={AppTheme} />
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
