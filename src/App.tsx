import React, { useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { makeTheme, ThemeProps } from './lib/helpers';
import Header from './components/Header';
import RadioButtons from './components/RadioButtons';

const GlobalStyles = createGlobalStyle`
  * {
    color: ${({ theme }: ThemeProps) => theme.colors.textColor};
    font-family: Verdana;
    margin: 0px;
    padding: 0px;
  };
  #root {
    background: ${({ theme }: ThemeProps) => `${theme.colors.backgroundColor} url('${theme.backgroundImage}')`};
    background-size: cover;
    height: 100vh;
  }
`;

function App() {
  const [darkSideMode] = useState(false);

  const { theme: AppTheme } = makeTheme(darkSideMode);

  return (
    <ThemeProvider theme={AppTheme}>
      <React.Fragment>
        <Header />
        <RadioButtons
          label='Question'
          name='example-radio'
          options={[
            { name: 'opt-1', label: 'True' },
            { name: 'opt-2', label: 'False' },
          ]}
        />
        <GlobalStyles theme={AppTheme} />
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
