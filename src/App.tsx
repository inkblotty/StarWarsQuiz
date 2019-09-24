import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { makeTheme } from './lib/helpers';
import Header from './components/Header';
import RadioButtons from './components/RadioButtons';

function App() {
  const [darkSideMode] = useState(true);

  const { theme: AppTheme } = makeTheme(darkSideMode);
  console.log('AppTheme: ', AppTheme);

  return (
    <ThemeProvider theme={AppTheme}>
      <div>
        <Header />
        <RadioButtons
          label='Question'
          name='example-radio'
          options={[
            { name: 'opt-1', label: 'True' },
            { name: 'opt-2', label: 'False' },
          ]}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
