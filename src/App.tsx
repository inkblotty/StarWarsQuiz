import React, { useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import { makeTheme, ThemeProps } from './lib/theme';
import Header from './components/Header';
import Settings from './views/settings';
import QuizMain from './views/quiz';

const GlobalStyles = createGlobalStyle`
  * {
    color: ${({ theme }: ThemeProps) => theme.colors.textColor};
    font-family: Verdana;
    margin: 0px;
    padding: 0px;
    -webkit-transition: color 0.2s ease-in-out;
    transition: color 0.2s ease-in-out;
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
const StyledAppWrapper = styled.div`
  display: grid;
  grid-template-rows: 100px minmax(300px, calc(100% - 180px)) 80px;
  height: 100vh;
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
      <StyledAppWrapper>
        <Header />
        <QuizMain />
        <Settings
          darkSideMode={darkSideMode}
          forwardDarkSideToggle={forwardDarkSideToggle}
        />
        <GlobalStyles theme={AppTheme} />
      </StyledAppWrapper>
    </ThemeProvider>
  );
}

export default App;
