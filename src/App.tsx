import React, { useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { makeTheme, ThemeProps } from './lib/helpers';
import Header from './components/Header';
import RadioButtons from './components/RadioButtons';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'StarJedi';
    src: local('StarJedi'), url('./assets/Starjedi.ttf') format('truetype');
  }
  * {
    background-color: ${({ theme }: ThemeProps) => theme.colors.backgroundColor};
    color: ${({ theme }: ThemeProps) => theme.colors.textColor};
    font-family: Verdana;
    margin: 0px;
    padding: 0px;
  };
`;

function App() {
  const [darkSideMode] = useState(false);

  const { theme: AppTheme } = makeTheme(darkSideMode);
  console.log('AppTheme: ', AppTheme);

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
