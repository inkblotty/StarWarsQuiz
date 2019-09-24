import React, { useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { makeTheme } from './lib/helpers';
import Header from './components/Header';
import RadioButtons from './components/RadioButtons';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: StarJedi;
    src: local('StarJedi'), ur;(./assets/Starjedi.ttf) format('truetype');
  };
  body: {
    font-family: Verdana;
    margin: 0px;
  };
`;

function App() {
  const [darkSideMode] = useState(true);

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
        <GlobalStyles />
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
